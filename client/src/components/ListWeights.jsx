import React, {Fragment, useEffect, useState} from "react";

const ListWeights = () => {
    const [weights, setWeights] = useState([]);

    // delete func
    const deleteWeight = async measurement_date => {
        try {
            const deleteWeight = await fetch(`http://localhost:5000/weights/${measurement_date}`, {
                method: "DELETE"
            });

            setWeights(weights.filter(w => w.measurement_date.split('T')[0] !== measurement_date));
        } catch (error) {
            console.error(error.message);
        }
    }

    const getWeights = async () => {
        try {
            const response = await fetch("http://localhost:5000/weights");
            const jsonData = await response.json();
            setWeights(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect (() => {
        getWeights();
    }, []);

    return (
    <Fragment>
        <table class="table table-dark">
  <thead>
    <tr>

      <th scope="col">Date</th>
      <th scope="col">Weight</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {weights.map( w => (
        <tr>
            <td>{w.measurement_date.split('T')[0]}</td>
            <td>{w.weight}</td>
            <td>Edit</td>
            <td><button className="btn btn-danger" 
                onClick={() => deleteWeight(w.measurement_date.split('T')[0])}>
                Delete
            </button></td>
        </tr>
    ))}
  </tbody>
</table>
    </Fragment>
    );
};

export default ListWeights;