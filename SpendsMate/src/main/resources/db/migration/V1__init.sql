-- V1__init.sql

CREATE TABLE categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE vendor_category_mapping (
    id          SERIAL PRIMARY KEY,
    vendor_name VARCHAR(200) NOT NULL UNIQUE,  -- stored lowercase for case-insensitive match
    category_id INTEGER NOT NULL REFERENCES categories(id)
);

CREATE TABLE expenses (
    id          BIGSERIAL PRIMARY KEY,
    date        DATE           NOT NULL,
    amount      NUMERIC(12, 2) NOT NULL,
    vendor      VARCHAR(200)   NOT NULL,
    description TEXT,
    category_id INTEGER        NOT NULL REFERENCES categories(id),
    is_anomaly  BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_expenses_category_id ON expenses(category_id);
CREATE INDEX idx_expenses_date        ON expenses(date);

-- Seed data
INSERT INTO categories (name) VALUES
    ('Food'), ('Travel'), ('Shopping'), ('Utilities'), ('Entertainment'), ('Other');

INSERT INTO vendor_category_mapping (vendor_name, category_id) VALUES
    ('swiggy',   (SELECT id FROM categories WHERE name = 'Food')),
    ('zomato',   (SELECT id FROM categories WHERE name = 'Food')),
    ('uber',     (SELECT id FROM categories WHERE name = 'Travel')),
    ('ola',      (SELECT id FROM categories WHERE name = 'Travel')),
    ('amazon',   (SELECT id FROM categories WHERE name = 'Shopping')),
    ('flipkart', (SELECT id FROM categories WHERE name = 'Shopping')),
    ('netflix',  (SELECT id FROM categories WHERE name = 'Entertainment')),
    ('spotify',  (SELECT id FROM categories WHERE name = 'Entertainment'));