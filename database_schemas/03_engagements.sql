-- =============================================================================
-- TNSC Database — Consulting Engagements
-- =============================================================================
-- An engagement is a signed consulting contract between TNSC and an NGO client.
-- Each engagement has deliverables, assigned staff, and logged hours.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Service Categories
-- ---------------------------------------------------------------------------
CREATE TABLE service_categories (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(120)    NOT NULL UNIQUE,
    name_ar         VARCHAR(120),
    description     TEXT
);

INSERT INTO service_categories (name, name_ar) VALUES
    ('M&E System Design',              'تصميم أنظمة المتابعة والتقييم'),
    ('Data Management & BI',           'إدارة البيانات وذكاء الأعمال'),
    ('Capacity Building',              'بناء القدرات'),
    ('Proposal Development',           'إعداد المقترحات'),
    ('Organizational Assessment',      'التقييم المؤسسي'),
    ('Financial Systems Setup',        'إعداد الأنظمة المالية'),
    ('HR & Policy Development',        'الموارد البشرية وتطوير السياسات');

-- ---------------------------------------------------------------------------
-- 2. Engagements (Consulting Contracts)
-- ---------------------------------------------------------------------------
CREATE TABLE engagements (
    id                  UUID                PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code      VARCHAR(30)         NOT NULL UNIQUE,   -- e.g. TNSC-2024-017
    client_org_id       UUID                NOT NULL REFERENCES organizations(id),
    client_contact_id   UUID                REFERENCES contacts(id),
    service_category_id INTEGER             NOT NULL REFERENCES service_categories(id),
    title               VARCHAR(250)        NOT NULL,
    description         TEXT,
    status              engagement_status   NOT NULL DEFAULT 'draft',
    start_date          DATE                NOT NULL,
    end_date            DATE,
    contract_value      NUMERIC(14,2)       NOT NULL CHECK (contract_value >= 0),
    contract_currency   currency            NOT NULL DEFAULT 'USD',
    signed_date         DATE,
    notes               TEXT,
    created_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_engagement_dates
        CHECK (end_date IS NULL OR end_date >= start_date)
);

COMMENT ON TABLE engagements
    IS 'Each row is one consulting contract between TNSC and an NGO client.';

CREATE TRIGGER engagements_updated_at
    BEFORE UPDATE ON engagements
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- Engagement ↔ Sector (an engagement may span multiple sectors)
CREATE TABLE engagement_sectors (
    engagement_id   UUID    NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
    sector_id       INTEGER NOT NULL REFERENCES sectors(id)     ON DELETE CASCADE,
    PRIMARY KEY (engagement_id, sector_id)
);

-- ---------------------------------------------------------------------------
-- 3. Engagement Staff Assignments
-- ---------------------------------------------------------------------------
CREATE TABLE engagement_staff (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    engagement_id   UUID            NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
    staff_id        UUID            NOT NULL REFERENCES staff(id),
    role            VARCHAR(100)    NOT NULL,       -- 'Lead Consultant', 'Data Analyst', etc.
    allocated_days  NUMERIC(6,1),
    start_date      DATE,
    end_date        DATE,
    UNIQUE (engagement_id, staff_id)
);

-- ---------------------------------------------------------------------------
-- 4. Deliverables
-- ---------------------------------------------------------------------------
CREATE TABLE deliverables (
    id              UUID                PRIMARY KEY DEFAULT uuid_generate_v4(),
    engagement_id   UUID                NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
    title           VARCHAR(250)        NOT NULL,
    description     TEXT,
    due_date        DATE,
    status          deliverable_status  NOT NULL DEFAULT 'pending',
    submitted_at    TIMESTAMPTZ,
    accepted_at     TIMESTAMPTZ,
    file_path       TEXT,               -- path or URL to the delivered document
    sort_order      SMALLINT            NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

CREATE TRIGGER deliverables_updated_at
    BEFORE UPDATE ON deliverables
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- ---------------------------------------------------------------------------
-- 5. Timesheets
-- ---------------------------------------------------------------------------
CREATE TABLE timesheets (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id        UUID            NOT NULL REFERENCES staff(id),
    engagement_id   UUID            NOT NULL REFERENCES engagements(id),
    work_date       DATE            NOT NULL,
    hours           NUMERIC(4,2)    NOT NULL CHECK (hours > 0 AND hours <= 24),
    description     TEXT,
    is_billable     BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    -- one entry per person per engagement per day
    UNIQUE (staff_id, engagement_id, work_date)
);

COMMENT ON TABLE timesheets
    IS 'Daily hours logged by staff against a specific engagement.';

COMMIT;
