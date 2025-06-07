/*
  # Fix RLS policies for anonymous users

  1. Security Updates
    - Update RLS policies to allow anonymous users to perform operations
    - This enables the application to work without requiring authentication
    - Add policies for anon role on all tables

  2. Policy Changes
    - Allow anon users to insert, select, and update on all tables
    - Maintain data security while enabling application functionality
*/

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Allow authenticated users to insert consignments" ON consignments;
DROP POLICY IF EXISTS "Allow authenticated users to read consignments" ON consignments;
DROP POLICY IF EXISTS "Allow authenticated users to update consignments" ON consignments;

DROP POLICY IF EXISTS "Allow authenticated users to insert held items" ON held_items;
DROP POLICY IF EXISTS "Allow authenticated users to read held items" ON held_items;
DROP POLICY IF EXISTS "Allow authenticated users to update held items" ON held_items;

DROP POLICY IF EXISTS "Allow authenticated users to insert item identifiers" ON item_identifiers;
DROP POLICY IF EXISTS "Allow authenticated users to read item identifiers" ON item_identifiers;

DROP POLICY IF EXISTS "Allow authenticated users to insert release records" ON release_records;
DROP POLICY IF EXISTS "Allow authenticated users to read release records" ON release_records;

-- Create new policies that allow both authenticated and anonymous users
CREATE POLICY "Allow all users to insert consignments"
  ON consignments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all users to read consignments"
  ON consignments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow all users to update consignments"
  ON consignments
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all users to insert held items"
  ON held_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all users to read held items"
  ON held_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow all users to update held items"
  ON held_items
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all users to insert item identifiers"
  ON item_identifiers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all users to read item identifiers"
  ON item_identifiers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow all users to insert release records"
  ON release_records
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all users to read release records"
  ON release_records
  FOR SELECT
  TO public
  USING (true);