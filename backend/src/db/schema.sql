-- ============================================================
-- MeaningMatters Network — Database Schema
-- Run this file once to set up the database:
--   psql -U mmn_user -d mmn_db -f src/db/schema.sql
-- ============================================================

-- ── Admins ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,          -- bcrypt hash
  role       VARCHAR(30) NOT NULL DEFAULT 'admin',  -- admin | superadmin
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Volunteer Applications ───────────────────────────────────
CREATE TABLE IF NOT EXISTS volunteers (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(30),
  motivation  TEXT,
  status      VARCHAR(30) NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  notes       TEXT,                                     -- internal admin notes
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Mentor Applications ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentors (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  expertise   VARCHAR(255),
  experience  TEXT,
  status      VARCHAR(30) NOT NULL DEFAULT 'pending',
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Partnership Inquiries ────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id           SERIAL PRIMARY KEY,
  org_name     VARCHAR(255) NOT NULL,
  contact_name VARCHAR(120),
  email        VARCHAR(255) NOT NULL,
  details      TEXT,
  status       VARCHAR(30) NOT NULL DEFAULT 'pending',
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Contact Messages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(255),
  message    TEXT NOT NULL,
  status     VARCHAR(30) NOT NULL DEFAULT 'unread',  -- unread | read | replied
  notes      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Newsletter Subscribers ───────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id           SERIAL PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  status       VARCHAR(30) NOT NULL DEFAULT 'active',  -- active | unsubscribed
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Event Registrations ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS event_registrations (
  id         SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_date VARCHAR(100),
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  phone      VARCHAR(30),
  status     VARCHAR(30) NOT NULL DEFAULT 'registered',  -- registered | attended | cancelled
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes for common lookups ───────────────────────────────
CREATE INDEX IF NOT EXISTS idx_volunteers_status    ON volunteers(status);
CREATE INDEX IF NOT EXISTS idx_volunteers_email     ON volunteers(email);
CREATE INDEX IF NOT EXISTS idx_mentors_status       ON mentors(status);
CREATE INDEX IF NOT EXISTS idx_partners_status      ON partners(status);
CREATE INDEX IF NOT EXISTS idx_contact_status       ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email     ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_event_reg_event      ON event_registrations(event_name);
CREATE INDEX IF NOT EXISTS idx_event_reg_email      ON event_registrations(email);

-- ── Bookstore ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS books (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  author       VARCHAR(255) NOT NULL,
  price        NUMERIC(10,2) NOT NULL,
  category     VARCHAR(100),
  description  TEXT,
  cover_color  VARCHAR(100) DEFAULT 'from-emerald-500 to-teal-600',
  in_stock     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id           SERIAL PRIMARY KEY,
  customer_name  VARCHAR(120) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(30),
  items        JSONB NOT NULL,   -- [{id, title, qty, price}]
  total        NUMERIC(10,2) NOT NULL,
  status       VARCHAR(30) NOT NULL DEFAULT 'pending', -- pending | paid | fulfilled | cancelled
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_orders_status  ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email   ON orders(customer_email);
