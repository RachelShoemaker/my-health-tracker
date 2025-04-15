import React, {Fragment, useEffect, useState} from "react";

const Averages = () => {
    const [averages, setAverages] = useState([]);

    const getAverages = async () => {
        try {
            const response = await fetch("http://localhost:5000/weights/moving-averages");
            const jsonData = await response.json();
            setAverages(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getAverages();
    }, []);

    return (
        <Fragment>
            <h2 className="mt-4">Moving Averages</h2>
            <table className="table table-dark mt-3">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Weight</th>
                        <th scope="col">7-day Avg</th>
                        <th scope="col">30-day Avg</th>
                        <th scope="col">90-day Avg</th>
                    </tr>
                </thead>
                <tbody>
                    {averages.map((entry) => (
                        <tr key={entry.measurement_date}>
                            <td>{entry.measurement_date.split("T")[0]}</td>
                            <td>{entry.weight}</td>
                            <td>{entry.avg_7_day}</td>
                            <td>{entry.avg_30_day}</td>
                            <td>{entry.avg_90_day}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Averages;
