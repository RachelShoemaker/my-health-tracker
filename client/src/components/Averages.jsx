import React, {Fragment, useState, useEffect} from "react";

const Averages = () => { // Do I need an input?
    const [averages, setAverages] = useState([]); // Is this correct?

    // Calculate the averages using the query function from the backend?
    const calculateAverages = async () => {
        // I believe I grab the call the method from the backend class index.js?
        try {
            const response = await fetch("http://localhost:5000/averages", { // This should give us the averages?
                method: "GET", // I believe the method is GET because I am receiving data?
                headers: {
                    "Content-Type": "application/json" // I want the response to be a json?
                },
            }); 
            const jsonData = await response.json(); // turns those averages into json?
            setAverages(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Some of the tutorial code uses a useEffect. Do I need one here?
    // useEffect(() => {
    //     calculateAverages();
    // }, []);

    return (
        <Fragment>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">7-day average</th>
                        <th scope="col">30-day average</th>
                        <th scope="col">90-day average</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((avg) => (
                        <tr>
                          <td >{avg.sevenDay}</td> 
                          <td>{avg.thirtyDay}</td>
                          <td>{avg.ninetyDay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
    
};

export default Averages;