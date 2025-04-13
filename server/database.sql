CREATE DATABASE health_data;

CREATE TABLE calorie_entries (
  entry_id SERIAL PRIMARY KEY,
  entry_date DATE NOT NULL,
  meal_type VARCHAR(20),   -- e.g., Breakfast, Lunch, Dinner, Snack
  calories INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weight_entries (
  entry_id SERIAL PRIMARY KEY,
  measurement_date DATE NOT NULL,
  weight INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
