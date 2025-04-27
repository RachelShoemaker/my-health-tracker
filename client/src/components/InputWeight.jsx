import React, { Fragment, useState } from "react";

const InputWeight = () => {
  const today = new Date().toISOString().split("T")[0];
  const [measurement_date, setDate] = useState(today);
  const [weight, setWeight] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Validate that the weight is a whole number
    const wholeNumberPattern = /^\d+$/;
    if (!wholeNumberPattern.test(weight)) {
      alert("Please enter a whole number for the weight.");
      return; // Prevents the fetch from being called
    }

    try {
      const body = { measurement_date, weight };
      const response = await fetch("http://localhost:5000/weights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      console.log("Server response:", response);
      // Redirect or reload
      window.location = "/";
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return ( // Visual display of this component.
    <Fragment>
      <h1>Weight tracker</h1>
      <form className="d-flex flex-column" onSubmit={onSubmitForm}>
        <h2>Enter the date</h2>
        <input
          type="date"
          className="form-control"
          value={measurement_date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h2>Enter your weight as a whole number</h2>
        <input
          type="text"
          className="form-control"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button className="btn btn-success mt-3">Add</button>
      </form>
    </Fragment>
  );
};

export default InputWeight;
