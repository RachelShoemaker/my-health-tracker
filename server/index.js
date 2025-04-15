const express = require("express");
const app = express(); // Takes express lib and runs it
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); // req.body

// Routes

// Create a food or weight entry.
app.post("/weights", async(req, res) => {
    // await, lets func complete before the tales is ready
    try {
        const { measurement_date, weight } = req.body;
        const newWeight = await pool.query("INSERT INTO weight_entries (measurement_date, weight) VALUES($1, $2) RETURNING *", [measurement_date, weight]);
        console.log("Received weigth:", weight);
        res.json(newWeight.rows[0]);
    } catch (e) {
        console.error(e.message);
    }
})
// Get all entries to list on the bottom half of a dashboard.
app.get("/weights", async(req, res) => {
    try {
        const allWeights = await pool.query("SELECT * FROM weight_entries");
        res.json(allWeights.rows);
    }
catch (e) {
    console.error(e.message);
}});

// Add this to index.js (or wherever you keep your routes)
// This route will fetch all weight entries and include 7/30/90 day averages

app.get("/weights/moving-averages", async (req, res) => {
    try {
      const queryText = `
        SELECT
          measurement_date,
          weight,
          /* 7-day moving average */
          AVG(weight) OVER (
            ORDER BY measurement_date 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
          ) AS avg_7_day,
  
          /* 30-day moving average */
          AVG(weight) OVER (
            ORDER BY measurement_date
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
          ) AS avg_30_day,
  
          /* 90-day moving average */
          AVG(weight) OVER (
            ORDER BY measurement_date
            ROWS BETWEEN 89 PRECEDING AND CURRENT ROW
          ) AS avg_90_day
  
        FROM weight_entries
        ORDER BY measurement_date
      `;
  
      const result = await pool.query(queryText);
  
      // You can optionally round/truncate your averages for display:
      // e.g., parseFloat(result.rows[i].avg_7_day).toFixed(2)
  
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  

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

