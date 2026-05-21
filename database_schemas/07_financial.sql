-- =============================================================================
-- TNSC Database — Financial (Invoicing & Expenses)
-- =============================================================================
-- TNSC's own billing and expense tracking for consulting engagements.
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. Invoices (TNSC bills to NGO clients)
-- ---------------------------------------------------------------------------
CREATE TABLE invoices (
    id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number      VARCHAR(30)     NOT NULL UNIQUE,   -- INV-2024-0042
    engagement_id       UUID            NOT NULL REFERENCES engagements(id),
    billed_to_org_id    UUID            NOT NULL REFERENCES organizations(id),
    invoice_date        DATE            NOT NULL,
    due_date            DATE            NOT NULL,
    subtotal            NUMERIC(14,2)   NOT NULL DEFAULT 0,
    tax_rate            NUMERIC(5,4)    NOT NULL DEFAULT 0,
    tax_amount          NUMERIC(14,2)   GENERATED ALWAYS AS (subtotal * tax_rate) STORED,
    total_amount        NUMERIC(14,2)   GENERATED ALWAYS AS (subtotal * (1 + tax_rate)) STORED,
    invoice_currency    currency        NOT NULL DEFAULT 'USD',
    status              payment_status  NOT NULL DEFAULT 'unpaid',
    notes               TEXT,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_invoice_dates CHECK (due_date >= invoice_date),
    CONSTRAINT chk_subtotal CHECK (subtotal >= 0)
);

CREATE TRIGGER invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Invoice Line Items
-- ---------------------------------------------------------------------------
CREATE TABLE invoice_lines (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id      UUID            NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description     VARCHAR(250)    NOT NULL,
    quantity        NUMERIC(8,2)    NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price      NUMERIC(12,2)   NOT NULL CHECK (unit_price >= 0),
    line_total      NUMERIC(14,2)   GENERATED ALWAYS AS (quantity * unit_price) STORED,
    sort_order      SMALLINT        NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------------------
-- 3. Payments Received
-- ---------------------------------------------------------------------------
CREATE TABLE payments (
    id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id      UUID            NOT NULL REFERENCES invoices(id),
    payment_date    DATE            NOT NULL,
    amount          NUMERIC(14,2)   NOT NULL CHECK (amount > 0),
    payment_method  VARCHAR(40)     NOT NULL DEFAULT 'bank_transfer',
    bank_reference  VARCHAR(80),
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 4. Expenses (TNSC operational costs against engagements)
-- ---------------------------------------------------------------------------
CREATE TABLE expense_categories (
    id      SERIAL          PRIMARY KEY,
    name    VARCHAR(100)    NOT NULL UNIQUE,
    name_ar VARCHAR(100)
);

INSERT INTO expense_categories (name, name_ar) VALUES
    ('Travel',              'سفر'),
    ('Accommodation',       'إقامة'),
    ('Communication',       'اتصالات'),
    ('Printing & Materials','طباعة ومواد'),
    ('Venue Rental',        'استئجار قاعات'),
    ('Software & Licenses', 'برمجيات وتراخيص'),
    ('Miscellaneous',       'متفرقات');

CREATE TABLE expenses (
    id                  UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    engagement_id       UUID            NOT NULL REFERENCES engagements(id),
    expense_category_id INTEGER         NOT NULL REFERENCES expense_categories(id),
    staff_id            UUID            REFERENCES staff(id),           -- who incurred it
    expense_date        DATE            NOT NULL,
    amount              NUMERIC(12,2)   NOT NULL CHECK (amount > 0),
    expense_currency    currency        NOT NULL DEFAULT 'USD',
    description         VARCHAR(250),
    receipt_path        TEXT,           -- scanned receipt file reference
    approved_by         UUID            REFERENCES staff(id),
    approved_at         TIMESTAMPTZ,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE expenses
    IS 'Actual expenses incurred by TNSC staff while delivering an engagement.';

COMMIT;
