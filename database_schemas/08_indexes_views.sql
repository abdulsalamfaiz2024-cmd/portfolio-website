-- =============================================================================
-- TNSC Database — Indexes & Reporting Views
-- =============================================================================
-- Performance indexes for common queries and materialized views that power
-- dashboards and periodic reports.
-- =============================================================================

BEGIN;

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 1: INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

-- Organizations -----------------------------------------------------------
CREATE INDEX idx_organizations_type
    ON organizations (org_type)
    WHERE is_active = TRUE;

CREATE INDEX idx_organizations_name_trgm
    ON organizations USING gin (name gin_trgm_ops);
    -- Requires: CREATE EXTENSION IF NOT EXISTS pg_trgm;
    -- Enables fast ILIKE / similarity searches on org names.
    -- Remove this index if pg_trgm is not available.

-- Contacts ----------------------------------------------------------------
CREATE INDEX idx_contacts_org
    ON contacts (organization_id)
    WHERE is_active = TRUE;

-- Staff -------------------------------------------------------------------
CREATE INDEX idx_staff_department
    ON staff (department_id)
    WHERE is_active = TRUE;

CREATE INDEX idx_staff_type
    ON staff (staff_type)
    WHERE is_active = TRUE;

-- Engagements -------------------------------------------------------------
CREATE INDEX idx_engagements_client
    ON engagements (client_org_id);

CREATE INDEX idx_engagements_status
    ON engagements (status)
    WHERE status IN ('active', 'proposed');

CREATE INDEX idx_engagements_dates
    ON engagements (start_date, end_date);

-- Deliverables ------------------------------------------------------------
CREATE INDEX idx_deliverables_engagement
    ON deliverables (engagement_id);

CREATE INDEX idx_deliverables_due
    ON deliverables (due_date)
    WHERE status NOT IN ('accepted');

-- Timesheets --------------------------------------------------------------
CREATE INDEX idx_timesheets_staff_date
    ON timesheets (staff_id, work_date DESC);

CREATE INDEX idx_timesheets_engagement
    ON timesheets (engagement_id, work_date DESC);

-- Grants ------------------------------------------------------------------
CREATE INDEX idx_grants_donor
    ON grants (donor_org_id)
    WHERE is_active = TRUE;

CREATE INDEX idx_grants_recipient
    ON grants (recipient_org_id)
    WHERE is_active = TRUE;

CREATE INDEX idx_grants_dates
    ON grants (start_date, end_date);

-- Projects ----------------------------------------------------------------
CREATE INDEX idx_projects_grant
    ON projects (grant_id);

CREATE INDEX idx_projects_org
    ON projects (implementing_org_id)
    WHERE is_active = TRUE;

-- Beneficiary Records -----------------------------------------------------
CREATE INDEX idx_beneficiary_period
    ON beneficiary_records (reporting_period DESC);

CREATE INDEX idx_beneficiary_activity
    ON beneficiary_records (activity_id, reporting_period DESC);

-- Indicators & Results ----------------------------------------------------
CREATE INDEX idx_indicators_framework
    ON indicators (framework_id);

CREATE INDEX idx_indicator_results_date
    ON indicator_results (indicator_id, reporting_date DESC);

CREATE INDEX idx_indicator_results_unverified
    ON indicator_results (indicator_id)
    WHERE verified = FALSE;

-- Invoices ----------------------------------------------------------------
CREATE INDEX idx_invoices_engagement
    ON invoices (engagement_id);

CREATE INDEX idx_invoices_status
    ON invoices (status)
    WHERE status IN ('unpaid', 'overdue');

CREATE INDEX idx_invoices_due
    ON invoices (due_date)
    WHERE status = 'unpaid';

-- Expenses ----------------------------------------------------------------
CREATE INDEX idx_expenses_engagement
    ON expenses (engagement_id, expense_date DESC);

CREATE INDEX idx_expenses_unapproved
    ON expenses (engagement_id)
    WHERE approved_at IS NULL;


-- ═══════════════════════════════════════════════════════════════════════════
-- PART 2: REPORTING VIEWS
-- ═══════════════════════════════════════════════════════════════════════════

-- ---------------------------------------------------------------------------
-- V1. Engagement Summary Dashboard
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_engagement_summary AS
SELECT
    e.id                    AS engagement_id,
    e.reference_code,
    e.title,
    e.status,
    o.name                  AS client_name,
    o.org_type              AS client_type,
    sc.name                 AS service_category,
    e.contract_value,
    e.contract_currency,
    e.start_date,
    e.end_date,
    -- deliverable progress
    COUNT(DISTINCT d.id)                                        AS total_deliverables,
    COUNT(DISTINCT d.id) FILTER (WHERE d.status = 'accepted')  AS accepted_deliverables,
    -- staff & hours
    COUNT(DISTINCT es.staff_id)                                 AS assigned_staff,
    COALESCE(SUM(t.hours), 0)                                  AS total_hours_logged,
    -- financial
    COALESCE(inv.total_invoiced, 0)                             AS total_invoiced,
    COALESCE(pay.total_paid, 0)                                 AS total_paid
FROM engagements e
JOIN organizations o         ON o.id = e.client_org_id
JOIN service_categories sc   ON sc.id = e.service_category_id
LEFT JOIN deliverables d     ON d.engagement_id = e.id
LEFT JOIN engagement_staff es ON es.engagement_id = e.id
LEFT JOIN timesheets t       ON t.engagement_id = e.id
LEFT JOIN LATERAL (
    SELECT SUM(i.total_amount) AS total_invoiced
    FROM invoices i WHERE i.engagement_id = e.id
) inv ON TRUE
LEFT JOIN LATERAL (
    SELECT SUM(p.amount) AS total_paid
    FROM payments p
    JOIN invoices i ON i.id = p.invoice_id
    WHERE i.engagement_id = e.id
) pay ON TRUE
GROUP BY
    e.id, e.reference_code, e.title, e.status,
    o.name, o.org_type, sc.name,
    e.contract_value, e.contract_currency,
    e.start_date, e.end_date,
    inv.total_invoiced, pay.total_paid;

COMMENT ON VIEW v_engagement_summary
    IS 'One row per engagement with deliverable progress, hours, and financials.';

-- ---------------------------------------------------------------------------
-- V2. Grant Utilization
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_grant_utilization AS
SELECT
    g.id                    AS grant_id,
    g.grant_code,
    g.title,
    donor.name              AS donor_name,
    recip.name              AS recipient_name,
    g.total_amount,
    g.grant_currency,
    g.start_date,
    g.end_date,
    COALESCE(SUM(dis.amount), 0)    AS total_disbursed,
    g.total_amount - COALESCE(SUM(dis.amount), 0) AS remaining_balance,
    ROUND(
        COALESCE(SUM(dis.amount), 0) / NULLIF(g.total_amount, 0) * 100, 1
    )                               AS utilization_pct
FROM grants g
JOIN organizations donor   ON donor.id = g.donor_org_id
JOIN organizations recip   ON recip.id = g.recipient_org_id
LEFT JOIN disbursements dis ON dis.grant_id = g.id
GROUP BY
    g.id, g.grant_code, g.title,
    donor.name, recip.name,
    g.total_amount, g.grant_currency,
    g.start_date, g.end_date;

-- ---------------------------------------------------------------------------
-- V3. Staff Utilization (hours per month)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_staff_utilization AS
SELECT
    s.id                    AS staff_id,
    s.first_name || ' ' || s.last_name AS staff_name,
    s.job_title,
    dep.name                AS department,
    DATE_TRUNC('month', t.work_date)::DATE AS month,
    SUM(t.hours)            AS total_hours,
    SUM(t.hours) FILTER (WHERE t.is_billable) AS billable_hours,
    COUNT(DISTINCT t.engagement_id)           AS engagements_worked
FROM staff s
JOIN departments dep    ON dep.id = s.department_id
JOIN timesheets t       ON t.staff_id = s.id
GROUP BY s.id, staff_name, s.job_title, dep.name, month;

-- ---------------------------------------------------------------------------
-- V4. Indicator Achievement (target vs actual)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_indicator_achievement AS
SELECT
    p.project_code,
    p.title                 AS project_title,
    ind.indicator_code,
    ind.title               AS indicator_title,
    ind.indicator_type,
    ind.unit_of_measure,
    ind.baseline_value,
    it.target_period,
    it.target_value,
    ir.actual_value,
    ROUND(
        ir.actual_value / NULLIF(it.target_value, 0) * 100, 1
    )                       AS achievement_pct,
    ir.verified
FROM indicators ind
JOIN indicator_frameworks f ON f.id = ind.framework_id
JOIN projects p             ON p.id = f.project_id
LEFT JOIN indicator_targets it ON it.indicator_id = ind.id
LEFT JOIN indicator_results ir ON ir.indicator_id = ind.id
    AND ir.reporting_date = it.target_period;

-- ---------------------------------------------------------------------------
-- V5. Beneficiary Reach (totals per project per period)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_beneficiary_reach AS
SELECT
    p.project_code,
    p.title                 AS project_title,
    bg.name                 AS beneficiary_group,
    br.reporting_period,
    SUM(br.male_count)      AS total_male,
    SUM(br.female_count)    AS total_female,
    SUM(br.male_count + br.female_count) AS total_reached
FROM beneficiary_records br
JOIN activities a           ON a.id = br.activity_id
JOIN projects p             ON p.id = a.project_id
JOIN beneficiary_groups bg  ON bg.id = br.beneficiary_group_id
GROUP BY p.project_code, p.title, bg.name, br.reporting_period;

-- ---------------------------------------------------------------------------
-- V6. Overdue Items (deliverables + invoices)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_overdue_items AS
SELECT
    'deliverable'           AS item_type,
    d.id                    AS item_id,
    e.reference_code        AS engagement_ref,
    d.title                 AS item_title,
    d.due_date,
    d.status::TEXT           AS item_status,
    NOW()::DATE - d.due_date AS days_overdue
FROM deliverables d
JOIN engagements e ON e.id = d.engagement_id
WHERE d.status NOT IN ('accepted')
  AND d.due_date < CURRENT_DATE

UNION ALL

SELECT
    'invoice'               AS item_type,
    i.id                    AS item_id,
    e.reference_code        AS engagement_ref,
    i.invoice_number        AS item_title,
    i.due_date,
    i.status::TEXT           AS item_status,
    NOW()::DATE - i.due_date AS days_overdue
FROM invoices i
JOIN engagements e ON e.id = i.engagement_id
WHERE i.status IN ('unpaid', 'overdue')
  AND i.due_date < CURRENT_DATE

ORDER BY days_overdue DESC;

COMMENT ON VIEW v_overdue_items
    IS 'Combined list of overdue deliverables and unpaid invoices, sorted by urgency.';

COMMIT;
