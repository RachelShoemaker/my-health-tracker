
-- switch first
\connect health_data                

-- rebuild the table (safe to re-run)
DROP TABLE IF EXISTS weight_entries;

CREATE TABLE weight_entries (
  entry_id SERIAL PRIMARY KEY,
  measurement_date DATE UNIQUE NOT NULL,
  weight INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sample rows, 31 entries
INSERT INTO weight_entries (measurement_date, weight) VALUES
  ('2025-03-16', 116),('2025-03-17', 123), ('2025-03-18', 137),
  ('2025-03-19', 105),('2025-03-20', 146), ('2025-03-21', 102),
  ('2025-03-22', 140),('2025-03-23', 127), ('2025-03-24', 111),
  ('2025-03-25', 139),('2025-03-26', 101), ('2025-03-27', 144),
  ('2025-03-28', 111),('2025-03-29', 102), ('2025-03-30', 113),
  ('2025-03-31', 106),('2025-04-01', 135), ('2025-04-02', 131),
  ('2025-04-03', 127),('2025-04-04', 119), ('2025-04-05', 106),
  ('2025-04-06', 117),('2025-04-07', 111), ('2025-04-08', 146),
  ('2025-04-09', 102),('2025-04-10', 106), ('2025-04-11', 142),
  ('2025-04-12', 125),('2025-04-13', 133), ('2025-04-14', 154),
  ('2025-04-15', 126);
