-- =============================================================================
-- TNSC Database — Monitoring & Evaluation
-- =============================================================================
-- Logframe-style indicator tracking: define indicators, set targets, and
-- record measured results over time.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Indicator Frameworks (one per project)
-- ---------------------------------------------------------------------------
CREATE TABLE indicator_frameworks (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID            NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name            VARCHAR(200)    NOT NULL,
    version         SMALLINT        NOT NULL DEFAULT 1,
    approved_date   DATE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    UNIQUE (project_id, version)
);

COMMENT ON TABLE indicator_frameworks
    IS 'Versioned M&E logframes attached to a project.';

-- ---------------------------------------------------------------------------
-- 2. Indicators
-- ---------------------------------------------------------------------------
CREATE TABLE indicators (
    id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    framework_id        UUID            NOT NULL REFERENCES indicator_frameworks(id) ON DELETE CASCADE,
    indicator_code      VARCHAR(20)     NOT NULL,       -- e.g. OC-1.1, OP-2.3
    title               VARCHAR(300)    NOT NULL,
    title_ar            VARCHAR(300),
    indicator_type      indicator_type  NOT NULL,
    unit_of_measure     VARCHAR(60)     NOT NULL,       -- '% of households', 'number of trainings'
    baseline_value      NUMERIC(14,2),
    baseline_date       DATE,
    data_source         TEXT,
    collection_method   data_collection_method,
    collection_frequency VARCHAR(40),                   -- 'monthly', 'quarterly', 'endline'
    responsible_staff_id UUID           REFERENCES staff(id),
    disaggregation_notes TEXT,                          -- 'by sex, by governorate'
    sort_order          SMALLINT        NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    UNIQUE (framework_id, indicator_code)
);

COMMENT ON TABLE indicators
    IS 'Individual KPIs within a logframe: outputs, outcomes, and impact-level.';

-- ---------------------------------------------------------------------------
-- 3. Indicator Targets (planned values per period)
-- ---------------------------------------------------------------------------
CREATE TABLE indicator_targets (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    indicator_id    UUID            NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
    target_period   DATE            NOT NULL,       -- e.g. end of quarter
    target_value    NUMERIC(14,2)   NOT NULL,
    notes           TEXT,

    UNIQUE (indicator_id, target_period)
);

-- ---------------------------------------------------------------------------
-- 4. Indicator Results (actual measured values)
-- ---------------------------------------------------------------------------
CREATE TABLE indicator_results (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    indicator_id    UUID            NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
    reporting_date  DATE            NOT NULL,
    actual_value    NUMERIC(14,2)   NOT NULL,
    data_source     TEXT,
    collected_by    UUID            REFERENCES staff(id),
    verified        BOOLEAN         NOT NULL DEFAULT FALSE,
    verified_by     UUID            REFERENCES staff(id),
    verified_at     TIMESTAMPTZ,
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    UNIQUE (indicator_id, reporting_date)
);

COMMENT ON TABLE indicator_results
    IS 'Actual measured values for each indicator at a point in time.';

-- ---------------------------------------------------------------------------
-- 5. M&E Reports
-- ---------------------------------------------------------------------------
CREATE TABLE me_reports (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID            NOT NULL REFERENCES projects(id),
    report_type     VARCHAR(60)     NOT NULL,       -- 'monthly', 'quarterly', 'annual', 'endline'
    period_start    DATE            NOT NULL,
    period_end      DATE            NOT NULL,
    title           VARCHAR(250)    NOT NULL,
    prepared_by     UUID            REFERENCES staff(id),
    approved_by     UUID            REFERENCES staff(id),
    submitted_to    UUID            REFERENCES organizations(id), -- donor
    submitted_at    TIMESTAMPTZ,
    file_path       TEXT,
    status          deliverable_status NOT NULL DEFAULT 'pending',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_report_period CHECK (period_end >= period_start)
);

CREATE TRIGGER me_reports_updated_at
    BEFORE UPDATE ON me_reports
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

COMMIT;
