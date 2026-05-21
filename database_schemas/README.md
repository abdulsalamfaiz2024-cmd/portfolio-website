# TNSC Database Schema

> Normalized PostgreSQL schema for **Triple Nexus Strategic Company (TNSC)** — a consulting firm that helps local NGOs in Yemen set up operational systems, M&E frameworks, and data infrastructure.

## Schema Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        TNSC DATABASE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────┐  │
│  │ Organizations│◄──►│   Contacts   │    │  Sectors / Locations     │  │
│  └──────┬───────┘    └──────────────┘    └──────────────────────────┘  │
│         │                                                               │
│    ┌────┴────────────────────────────────┐                             │
│    │                                      │                             │
│    ▼                                      ▼                             │
│  ┌──────────────┐                  ┌──────────────┐                    │
│  │ Engagements  │                  │    Grants     │                    │
│  │ (Consulting) │                  │   (Funding)   │                    │
│  └──────┬───────┘                  └──────┬───────┘                    │
│         │                                  │                            │
│    ┌────┼──────────┐              ┌───────┼──────────┐                 │
│    │    │          │              │       │          │                  │
│    ▼    ▼          ▼              ▼       ▼          ▼                  │
│  Staff  Deliver-  Time-       Projects  Budget   Disburse-             │
│  Assign ables     sheets               Lines    ments                  │
│                                    │                                    │
│                               ┌────┼────────┐                          │
│                               │    │        │                           │
│                               ▼    ▼        ▼                           │
│                           Activ- Benefi-  Indicator                     │
│                           ities  ciaries  Frameworks                    │
│                                           │                             │
│                                      ┌────┼────┐                        │
│                                      ▼    ▼    ▼                        │
│  ┌──────────────┐              Indicators Targets Results               │
│  │  Financial   │                                                       │
│  │  (Invoices,  │              ┌──────────────┐                        │
│  │   Payments,  │              │  M&E Reports │                        │
│  │   Expenses)  │              └──────────────┘                        │
│  └──────────────┘                                                       │
└─────────────────────────────────────────────────────────────────────────┘
```

## Scripts (run in order)

| File | Purpose | Tables |
|------|---------|--------|
| `00_init.sql` | Extensions, ENUM types, trigger function | — |
| `01_organizations.sql` | Sectors, governorates, districts, organizations, contacts | 5 tables |
| `02_staff.sql` | Departments, staff, competency tracking | 4 tables |
| `03_engagements.sql` | Consulting contracts, deliverables, timesheets | 6 tables |
| `04_grants_funding.sql` | Donor grants, budget lines, disbursements | 5 tables |
| `05_projects_beneficiaries.sql` | NGO projects, activities, beneficiary records | 6 tables |
| `06_monitoring_evaluation.sql` | Indicator frameworks, targets, results, M&E reports | 5 tables |
| `07_financial.sql` | Invoices, payments, expenses | 5 tables |
| `08_indexes_views.sql` | 25+ indexes, 6 reporting views | — |

**Total: 36 tables · 25+ indexes · 6 views**

## Design Decisions

- **UUID primary keys** on business entities for safe distribution and API use. Serial IDs on lookup/reference tables where simplicity matters.
- **Bilingual columns** (`name` + `name_ar`) on user-facing reference data — matching TNSC's Arabic-first operational context.
- **Soft deletes** via `is_active` flags instead of `DELETE`, preserving audit history.
- **Generated columns** on `invoices` for `tax_amount` and `total_amount` — computed at the database level so application code cannot drift.
- **Partial indexes** on status columns (e.g., only active engagements, only unpaid invoices) to keep query plans fast on the rows that actually get queried.
- **CHECK constraints** on dates, amounts, and ranges — the database enforces business rules, not just the application.
- **`updated_at` triggers** on every mutable table via a shared function.

## Reporting Views

| View | What it answers |
|------|----------------|
| `v_engagement_summary` | How is each consulting contract progressing? (deliverables, hours, revenue) |
| `v_grant_utilization` | How much of each grant has been disbursed? |
| `v_staff_utilization` | How are consultant hours split between billable and non-billable work? |
| `v_indicator_achievement` | Are M&E indicators hitting their targets? |
| `v_beneficiary_reach` | How many people (by sex and group) did each project reach? |
| `v_overdue_items` | What deliverables and invoices are past due? |

## Tech Stack

- **PostgreSQL 15+** — `uuid-ossp`, `pgcrypto`, generated columns, partial indexes
- Designed for use with **Power BI** (DirectQuery or Import) and **Python** (psycopg2 / SQLAlchemy)
- Compatible with **SAP ERP** data imports via staging tables (not included here)

## Usage

```bash
# Connect to your PostgreSQL instance and run scripts in order:
psql -U tnsc_admin -d tnsc_db -f 00_init.sql
psql -U tnsc_admin -d tnsc_db -f 01_organizations.sql
psql -U tnsc_admin -d tnsc_db -f 02_staff.sql
psql -U tnsc_admin -d tnsc_db -f 03_engagements.sql
psql -U tnsc_admin -d tnsc_db -f 04_grants_funding.sql
psql -U tnsc_admin -d tnsc_db -f 05_projects_beneficiaries.sql
psql -U tnsc_admin -d tnsc_db -f 06_monitoring_evaluation.sql
psql -U tnsc_admin -d tnsc_db -f 07_financial.sql
psql -U tnsc_admin -d tnsc_db -f 08_indexes_views.sql
```
