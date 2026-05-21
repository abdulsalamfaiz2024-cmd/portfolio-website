-- =============================================================================
-- TNSC Database — Organizations, Locations & Contacts
-- =============================================================================
-- Lookup tables for humanitarian sectors and Yemeni administrative divisions,
-- plus the main organizations and contacts tables.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Humanitarian Sectors (OCHA cluster alignment)
-- ---------------------------------------------------------------------------
CREATE TABLE sectors (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL UNIQUE,
    name_ar         VARCHAR(100),
    description     TEXT,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE sectors IS 'Humanitarian sector / cluster categories (WASH, Health, etc.)';

INSERT INTO sectors (name, name_ar) VALUES
    ('WASH',            'المياه والصرف الصحي والنظافة'),
    ('Health',          'الصحة'),
    ('Education',       'التعليم'),
    ('Protection',      'الحماية'),
    ('Food Security',   'الأمن الغذائي'),
    ('Shelter',         'المأوى'),
    ('Nutrition',       'التغذية'),
    ('Livelihoods',     'سبل العيش'),
    ('Camp Management', 'إدارة المخيمات'),
    ('Governance',      'الحوكمة');

-- ---------------------------------------------------------------------------
-- 2. Yemeni Administrative Divisions
-- ---------------------------------------------------------------------------
CREATE TABLE governorates (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(80)     NOT NULL UNIQUE,
    name_ar         VARCHAR(80)     NOT NULL,
    iso_code        CHAR(5)         UNIQUE          -- e.g. YE-SN
);

COMMENT ON TABLE governorates IS 'Yemen governorate-level divisions.';

INSERT INTO governorates (name, name_ar, iso_code) VALUES
    ('Sana''a',      'صنعاء',       'YE-SN'),
    ('Aden',         'عدن',         'YE-AD'),
    ('Taiz',         'تعز',         'YE-TA'),
    ('Hodeidah',     'الحديدة',     'YE-HU'),
    ('Ibb',          'إب',          'YE-IB'),
    ('Hadramaut',    'حضرموت',      'YE-HD'),
    ('Marib',        'مأرب',        'YE-MA'),
    ('Dhamar',       'ذمار',        'YE-DH'),
    ('Hajjah',       'حجة',         'YE-HJ'),
    ('Amran',        'عمران',       'YE-AM');

CREATE TABLE districts (
    id              SERIAL          PRIMARY KEY,
    governorate_id  INTEGER         NOT NULL REFERENCES governorates(id),
    name            VARCHAR(100)    NOT NULL,
    name_ar         VARCHAR(100),
    UNIQUE (governorate_id, name)
);

COMMENT ON TABLE districts IS 'District-level subdivisions within governorates.';

-- ---------------------------------------------------------------------------
-- 3. Organizations (NGOs, donors, partners)
-- ---------------------------------------------------------------------------
CREATE TABLE organizations (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(200)    NOT NULL,
    name_ar         VARCHAR(200),
    acronym         VARCHAR(20),
    org_type        org_type        NOT NULL,
    registration_no VARCHAR(50),
    country         VARCHAR(80)     NOT NULL DEFAULT 'Yemen',
    city            VARCHAR(80),
    address         TEXT,
    phone           VARCHAR(30),
    email           VARCHAR(120),
    website         VARCHAR(200),
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE organizations
    IS 'Every external entity TNSC works with: NGO clients, donors, UN agencies, government bodies.';

CREATE TRIGGER organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- Organization ↔ Sector many-to-many
CREATE TABLE organization_sectors (
    organization_id UUID    NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    sector_id       INTEGER NOT NULL REFERENCES sectors(id)       ON DELETE CASCADE,
    PRIMARY KEY (organization_id, sector_id)
);

-- ---------------------------------------------------------------------------
-- 4. Contacts (people at organizations)
-- ---------------------------------------------------------------------------
CREATE TABLE contacts (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID            NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    first_name      VARCHAR(80)     NOT NULL,
    last_name       VARCHAR(80)     NOT NULL,
    title           VARCHAR(120),               -- job title
    email           VARCHAR(120),
    phone           VARCHAR(30),
    is_primary      BOOLEAN         NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE contacts IS 'Named individuals at partner organizations.';

CREATE TRIGGER contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

COMMIT;
