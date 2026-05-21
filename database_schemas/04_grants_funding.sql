-- =============================================================================
-- TNSC Database — Grants & Donor Funding
-- =============================================================================
-- Tracks the funding NGO clients receive from donors, including disbursement
-- schedules. TNSC often helps NGOs set up these tracking structures.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Grants (funding awards to NGO clients)
-- ---------------------------------------------------------------------------
CREATE TABLE grants (
    id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    grant_code          VARCHAR(50)     NOT NULL UNIQUE,
    title               VARCHAR(250)    NOT NULL,
    donor_org_id        UUID            NOT NULL REFERENCES organizations(id),
    recipient_org_id    UUID            NOT NULL REFERENCES organizations(id),
    grant_currency      currency        NOT NULL DEFAULT 'USD',
    total_amount        NUMERIC(14,2)   NOT NULL CHECK (total_amount > 0),
    start_date          DATE            NOT NULL,
    end_date            DATE            NOT NULL,
    description         TEXT,
    is_active           BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_grant_dates CHECK (end_date >= start_date),
    CONSTRAINT chk_grant_parties CHECK (donor_org_id <> recipient_org_id)
);

COMMENT ON TABLE grants
    IS 'Donor funding awards received by NGO clients. One grant = one signed agreement.';

CREATE TRIGGER grants_updated_at
    BEFORE UPDATE ON grants
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- Grant ↔ Sector
CREATE TABLE grant_sectors (
    grant_id    UUID    NOT NULL REFERENCES grants(id)  ON DELETE CASCADE,
    sector_id   INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
    PRIMARY KEY (grant_id, sector_id)
);

-- Grant ↔ Location
CREATE TABLE grant_locations (
    grant_id        UUID    NOT NULL REFERENCES grants(id)          ON DELETE CASCADE,
    governorate_id  INTEGER NOT NULL REFERENCES governorates(id)    ON DELETE CASCADE,
    district_id     INTEGER REFERENCES districts(id),
    PRIMARY KEY (grant_id, governorate_id, COALESCE(district_id, 0))
);

-- ---------------------------------------------------------------------------
-- 2. Budget Lines (how funding is allocated)
-- ---------------------------------------------------------------------------
CREATE TABLE budget_categories (
    id      SERIAL          PRIMARY KEY,
    name    VARCHAR(100)    NOT NULL UNIQUE,
    name_ar VARCHAR(100)
);

INSERT INTO budget_categories (name, name_ar) VALUES
    ('Staff Costs',             'تكاليف الموظفين'),
    ('Travel & Transportation', 'السفر والنقل'),
    ('Equipment & Supplies',    'المعدات واللوازم'),
    ('Training & Workshops',    'التدريب وورش العمل'),
    ('Monitoring & Evaluation', 'المتابعة والتقييم'),
    ('Operational Costs',       'التكاليف التشغيلية'),
    ('Indirect / Overhead',     'التكاليف غير المباشرة');

CREATE TABLE grant_budget_lines (
    id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    grant_id            UUID            NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
    budget_category_id  INTEGER         NOT NULL REFERENCES budget_categories(id),
    description         VARCHAR(250),
    budgeted_amount     NUMERIC(14,2)   NOT NULL CHECK (budgeted_amount >= 0),
    UNIQUE (grant_id, budget_category_id)
);

-- ---------------------------------------------------------------------------
-- 3. Disbursements (tranches of funding released by donor)
-- ---------------------------------------------------------------------------
CREATE TABLE disbursements (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    grant_id        UUID            NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
    tranche_number  SMALLINT        NOT NULL CHECK (tranche_number > 0),
    amount          NUMERIC(14,2)   NOT NULL CHECK (amount > 0),
    disbursed_on    DATE            NOT NULL,
    received_on     DATE,
    bank_reference  VARCHAR(80),
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    UNIQUE (grant_id, tranche_number)
);

COMMENT ON TABLE disbursements
    IS 'Individual funding tranches released by the donor against a grant.';

COMMIT;
