const express = require("express");
const app = express(); // Takes express lib and runs it
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); // req.body

// Routes

// Create a food or weight entry.
app.post("/weights", async(req, res) => {
    // await, lets func complete before the tables is ready.
    try {
        const { measurement_date, weight } = req.body;
        const newWeight = await pool.query("INSERT INTO weight_entries (measurement_date, weight) VALUES($1, $2) RETURNING *", [measurement_date, weight]);
        console.log("Received weigth:", weight);
        res.json(newWeight.rows[0]);
    } catch (e) {
        console.error(e.message);
    }
})

// Get all entries to list on the middle section of the dashboard.
app.get("/weights", async(req, res) => {
    try {
        const allWeights = await pool.query("SELECT * FROM weight_entries");
        res.json(allWeights.rows);
    }
catch (e) {
    console.error(e.message);
}});


// This route will fetch all weight entries and include 7/30/90 day averages
// This uses the windowing feature.
app.get("/weights/moving-averages", async (req, res) => {
    try {
      const queryText = `
        SELECT
        measurement_date,
        weight,

        /* 7-day calendar window */
        ROUND(
          AVG(weight) OVER (
            ORDER BY measurement_date
            RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
          )::numeric
        , 2) AS avg_7_day,

        /* 30-day calendar window */
        ROUND(
          AVG(weight) OVER (
            ORDER BY measurement_date
            RANGE BETWEEN INTERVAL '29 days' PRECEDING AND CURRENT ROW
          )::numeric
        , 2) AS avg_30_day,

        /* 90-day calendar window */
        ROUND(
          AVG(weight) OVER (
            ORDER BY measurement_date
            RANGE BETWEEN INTERVAL '89 days' PRECEDING AND CURRENT ROW
          )::numeric
        , 2) AS avg_90_day

      FROM weight_entries
      ORDER BY measurement_date DESC;
      `;
  
      const result = await pool.query(queryText);
    
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  
// Retrieves a specific log via date. The reason I used date as the identifier is because there can only be one weight for a date
app.get("/weights/:measurement_date", async (req, res) => {
    try {
        const { measurement_date } = req.params;
        const weight = await pool.query("SELECT * FROM weight_entries WHERE measurement_date = $1", [measurement_date]);
        res.json(weight.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Update an entry.
app.put("/weights/:measurement_date", async (req, res) => {
    try {
        const { measurement_date } = req.params;
        const { weight } = req.body;
        const updateWeight = await pool.query("UPDATE weight_entries SET weight = $1 WHERE measurement_Date = $2 RETURNING *", [weight, measurement_date]);
        res.json("Weight updated");
    } catch (error) {
        console.error(error.message);
    }
});

// Delete an entry.
app.delete("/weights/:measurement_date", async (req, res) => {
    try {
        const { measurement_date } = req.params;
        const deleteWeight = await pool.query("DELETE FROM weight_entries WHERE measurement_date = $1", [measurement_date]);
        res.json("Weight deleted");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("started server on port 5000")
});

