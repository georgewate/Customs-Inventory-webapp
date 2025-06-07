/*
  # Initial Schema Setup for Customs Inventory System

  1. New Tables
    - `consignments`
      - Basic consignment information
      - Tracks status and metadata
    - `held_items`
      - Items held from consignments
      - Links to consignment via foreign key
    - `item_identifiers`
      - Serial numbers and other identifiers for held items
    - `release_records`
      - Records of item releases
      - Links to held items

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create consignments table
CREATE TABLE IF NOT EXISTS consignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_id TEXT UNIQUE NOT NULL,
  importer TEXT NOT NULL,
  examination_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL CHECK (status IN ('held', 'released', 'partial')) DEFAULT 'held',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create held_items table
CREATE TABLE IF NOT EXISTS held_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_id uuid REFERENCES consignments(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  hs_code TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  quantity_unit TEXT NOT NULL DEFAULT 'units',
  total_quantity INTEGER,
  total_quantity_unit TEXT DEFAULT 'units',
  hold_reason TEXT NOT NULL,
  warehouse TEXT NOT NULL,
  section TEXT,
  shelf TEXT,
  currency TEXT DEFAULT 'USD',
  item_value DECIMAL(10,2),
  hold_duration TEXT DEFAULT '1-3',
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('held', 'released')) DEFAULT 'held',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create item_identifiers table
CREATE TABLE IF NOT EXISTS item_identifiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  held_item_id uuid REFERENCES held_items(id) ON DELETE CASCADE,
  identifier TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create release_records table
CREATE TABLE IF NOT EXISTS release_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  held_item_id uuid REFERENCES held_items(id) ON DELETE CASCADE,
  release_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  release_reference TEXT NOT NULL,
  release_reason TEXT NOT NULL,
  authorizing_officer TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE held_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_identifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE release_records ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read consignments"
  ON consignments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert consignments"
  ON consignments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update consignments"
  ON consignments
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read held items"
  ON held_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert held items"
  ON held_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update held items"
  ON held_items
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read item identifiers"
  ON item_identifiers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert item identifiers"
  ON item_identifiers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read release records"
  ON release_records
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert release records"
  ON release_records
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_consignments_updated_at
  BEFORE UPDATE ON consignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_held_items_updated_at
  BEFORE UPDATE ON held_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();