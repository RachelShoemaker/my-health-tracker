import React, {Fragment, useEffect, useState} from "react";

const ListWeights = () => {
    const [weights, setWeights] = useState([]);
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
            <td>Delete</td>
        </tr>
    ))}
  </tbody>
</table>
    </Fragment>
    );
};

export default ListWeights;