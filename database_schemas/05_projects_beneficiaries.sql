-- =============================================================================
-- TNSC Database — Projects & Beneficiaries
-- =============================================================================
-- NGO projects funded by grants and the communities they serve.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Projects
-- ---------------------------------------------------------------------------
CREATE TABLE projects (
    id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code        VARCHAR(30)     NOT NULL UNIQUE,
    grant_id            UUID            NOT NULL REFERENCES grants(id),
    implementing_org_id UUID            NOT NULL REFERENCES organizations(id),
    title               VARCHAR(250)    NOT NULL,
    title_ar            VARCHAR(250),
    description         TEXT,
    start_date          DATE            NOT NULL,
    end_date            DATE            NOT NULL,
    target_beneficiaries INTEGER        CHECK (target_beneficiaries >= 0),
    is_active           BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_project_dates CHECK (end_date >= start_date)
);

COMMENT ON TABLE projects
    IS 'Humanitarian or development projects run by NGO clients, funded by grants.';

CREATE TRIGGER projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- Project ↔ Sector
CREATE TABLE project_sectors (
    project_id  UUID    NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    sector_id   INTEGER NOT NULL REFERENCES sectors(id)  ON DELETE CASCADE,
    PRIMARY KEY (project_id, sector_id)
);

-- Project ↔ Location
CREATE TABLE project_locations (
    id              UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID    NOT NULL REFERENCES projects(id)       ON DELETE CASCADE,
    governorate_id  INTEGER NOT NULL REFERENCES governorates(id),
    district_id     INTEGER REFERENCES districts(id),
    community_name  VARCHAR(120),
    UNIQUE (project_id, governorate_id, district_id, community_name)
);

-- ---------------------------------------------------------------------------
-- 2. Project Activities
-- ---------------------------------------------------------------------------
CREATE TABLE activities (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID            NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    activity_code   VARCHAR(20)     NOT NULL,       -- e.g. A1.1, A2.3
    title           VARCHAR(250)    NOT NULL,
    title_ar        VARCHAR(250),
    description     TEXT,
    planned_start   DATE,
    planned_end     DATE,
    actual_start    DATE,
    actual_end      DATE,
    sort_order      SMALLINT        NOT NULL DEFAULT 0,
    UNIQUE (project_id, activity_code)
);

-- ---------------------------------------------------------------------------
-- 3. Beneficiary Groups
-- ---------------------------------------------------------------------------
CREATE TABLE beneficiary_groups (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(80)     NOT NULL UNIQUE,
    name_ar         VARCHAR(80)
);

INSERT INTO beneficiary_groups (name, name_ar) VALUES
    ('Children (< 5)',      'أطفال (أقل من 5)'),
    ('Children (5-17)',     'أطفال (5-17)'),
    ('Youth (18-24)',       'شباب (18-24)'),
    ('Adults (25-59)',      'بالغين (25-59)'),
    ('Elderly (60+)',       'كبار السن (60+)'),
    ('IDPs',                'نازحين'),
    ('Host Communities',    'مجتمعات مضيفة'),
    ('Returnees',           'عائدين'),
    ('People with Disabilities', 'أشخاص ذوي إعاقة');

-- ---------------------------------------------------------------------------
-- 4. Beneficiary Records (per activity per location per period)
-- ---------------------------------------------------------------------------
CREATE TABLE beneficiary_records (
    id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id         UUID        NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    location_id         UUID        NOT NULL REFERENCES project_locations(id),
    beneficiary_group_id INTEGER    NOT NULL REFERENCES beneficiary_groups(id),
    reporting_period    DATE        NOT NULL,       -- first day of month
    male_count          INTEGER     NOT NULL DEFAULT 0 CHECK (male_count >= 0),
    female_count        INTEGER     NOT NULL DEFAULT 0 CHECK (female_count >= 0),
    notes               TEXT,
    recorded_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (activity_id, location_id, beneficiary_group_id, reporting_period)
);

COMMENT ON TABLE beneficiary_records
    IS 'Monthly beneficiary counts disaggregated by sex, age group, and location.';

COMMIT;
