-- =============================================================================
-- TNSC Database — Staff & Consultants
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Departments
-- ---------------------------------------------------------------------------
CREATE TABLE departments (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL UNIQUE,
    name_ar         VARCHAR(100),
    head_staff_id   UUID                            -- set after staff table exists
);

COMMENT ON TABLE departments IS 'TNSC internal departments.';

INSERT INTO departments (name, name_ar) VALUES
    ('Consulting',              'الاستشارات'),
    ('Monitoring & Evaluation', 'المتابعة والتقييم'),
    ('Business Intelligence',   'ذكاء الأعمال'),
    ('Finance & Admin',         'المالية والإدارة'),
    ('Operations',              'العمليات');

-- ---------------------------------------------------------------------------
-- 2. Staff
-- ---------------------------------------------------------------------------
CREATE TABLE staff (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_code   VARCHAR(20)     NOT NULL UNIQUE,
    first_name      VARCHAR(80)     NOT NULL,
    last_name       VARCHAR(80)     NOT NULL,
    email           VARCHAR(120)    NOT NULL UNIQUE,
    phone           VARCHAR(30),
    department_id   INTEGER         REFERENCES departments(id),
    staff_type      staff_type      NOT NULL DEFAULT 'full_time',
    job_title       VARCHAR(120),
    daily_rate      NUMERIC(10,2),
    rate_currency   currency        DEFAULT 'USD',
    hire_date       DATE            NOT NULL,
    end_date        DATE,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_staff_dates CHECK (end_date IS NULL OR end_date >= hire_date)
);

COMMENT ON TABLE staff IS 'TNSC employees and contracted consultants.';

CREATE TRIGGER staff_updated_at
    BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- Back-reference: department head
ALTER TABLE departments
    ADD CONSTRAINT fk_dept_head
    FOREIGN KEY (head_staff_id) REFERENCES staff(id)
    ON DELETE SET NULL;

-- ---------------------------------------------------------------------------
-- 3. Staff Competencies
-- ---------------------------------------------------------------------------
CREATE TABLE competency_areas (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL UNIQUE,
    category        VARCHAR(60)     -- 'technical', 'sectoral', 'language'
);

INSERT INTO competency_areas (name, category) VALUES
    ('Data Analysis',                  'technical'),
    ('Database Design',                'technical'),
    ('Power BI',                       'technical'),
    ('M&E Frameworks',                 'technical'),
    ('Proposal Writing',               'technical'),
    ('WASH Sector',                    'sectoral'),
    ('Health Sector',                  'sectoral'),
    ('Protection Sector',              'sectoral'),
    ('Arabic',                         'language'),
    ('English',                        'language');

CREATE TABLE staff_competencies (
    staff_id        UUID            NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    competency_id   INTEGER         NOT NULL REFERENCES competency_areas(id) ON DELETE CASCADE,
    proficiency     SMALLINT        NOT NULL CHECK (proficiency BETWEEN 1 AND 5),
    PRIMARY KEY (staff_id, competency_id)
);

COMMENT ON COLUMN staff_competencies.proficiency
    IS '1 = basic awareness, 5 = can lead and teach others.';

COMMIT;
