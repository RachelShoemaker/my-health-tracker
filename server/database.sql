CREATE DATABASE health_data;

CREATE TABLE weight_entries (
  entry_id SERIAL PRIMARY KEY,
  measurement_date DATE NOT NULL,
  weight INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserts 100 days worth of entries starting from today's date to 99 days in the past. 
-- Weights can be between 100 and 150.
-- 
INSERT INTO weight_entries (measurement_date, weight)
SELECT gs::date AS measurement_date,
       (FLOOR(100 + random() * 50))::int AS weight
FROM generate_series(CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE - INTERVAL '100 days', '-1 day') AS gs;
