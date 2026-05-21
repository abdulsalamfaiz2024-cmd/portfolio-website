-- =============================================================================
-- TNSC Database — Initialization
-- Triple Nexus Strategic Company: NGO Consulting Operations
-- PostgreSQL 15+
-- =============================================================================
-- Run this script first. It creates extensions, shared types, and utility
-- functions that every subsequent migration depends on.
-- =============================================================================

BEGIN;

-- Extensions ----------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- gen_random_uuid() fallback

-- Custom ENUM Types ---------------------------------------------------------

CREATE TYPE org_type AS ENUM (
    'ngo_local',
    'ngo_international',
    'donor',
    'government',
    'un_agency',
    'private_sector',
    'academic'
);

CREATE TYPE engagement_status AS ENUM (
    'draft',
    'proposed',
    'active',
    'on_hold',
    'completed',
    'cancelled'
);

CREATE TYPE deliverable_status AS ENUM (
    'pending',
    'in_progress',
    'submitted',
    'revision_requested',
    'accepted'
);

CREATE TYPE payment_status AS ENUM (
    'unpaid',
    'partially_paid',
    'paid',
    'overdue',
    'written_off'
);

CREATE TYPE staff_type AS ENUM (
    'full_time',
    'part_time',
    'consultant',
    'intern'
);

CREATE TYPE indicator_type AS ENUM (
    'output',
    'outcome',
    'impact'
);

CREATE TYPE data_collection_method AS ENUM (
    'survey',
    'interview',
    'focus_group',
    'observation',
    'admin_records',
    'secondary_data'
);

CREATE TYPE currency AS ENUM (
    'USD',
    'YER',
    'SAR',
    'EUR'
);

-- Utility: auto-update "updated_at" column -----------------------------------

CREATE OR REPLACE FUNCTION trg_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION trg_set_updated_at()
    IS 'Sets updated_at to current timestamp on every UPDATE.';

COMMIT;
