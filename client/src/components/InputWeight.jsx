import React, { Fragment, useState, useEffect } from "react";

const InputWeight = () => {
    const today = new Date().toISOString().split('T')[0];
    const [measurement_date, setDate] = useState(today);
    const [weight, setWeight] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { measurement_date,weight };
            const response = await fetch("http://localhost:5000/weights", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h1>Weight tracker</h1>
            <form className="d-flex flex-column" onSubmit={onSubmitForm}>
                <h2>Enter the date</h2>
                <input type="date" className="form-control" value={measurement_date} onChange={e => setDate(e.target.value)}/>
                <h2>Enter weight</h2>
                <input type="text" className="form-control" value={weight} onChange={e => setWeight(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputWeight;