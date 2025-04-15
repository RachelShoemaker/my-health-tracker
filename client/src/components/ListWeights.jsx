import React, {Fragment, useEffect, useState} from "react";
import EditWeight from "./EditWeight";

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
        <table className="table table-dark">
  <thead>
    <tr>

      <th scope="col">Date</th>
      <th scope="col">Weight</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  {weights.map((w) => (
  <tr key={w.measurement_date}>
    <td>{w.measurement_date.split('T')[0]}</td>
    <td>{w.weight}</td>
    <td>
      <EditWeight
        measurement_date={w.measurement_date.split("T")[0]} 
        currentWeight={w.weight}
        onUpdated={(updatedData) => {
          setWeights(
            weights.map(item =>
              item.measurement_date.split("T")[0] === updatedData.measurement_date.split("T")[0]
                ? updatedData 
                : item
            )
          );
        }}
      />
    </td>
    <td>
      <button 
        className="btn btn-danger"
        onClick={() => deleteWeight(w.measurement_date.split('T')[0])}
      >
        Delete
      </button>
    </td>
  </tr>
))}
  </tbody>
</table>
    </Fragment>
    );
};

export default ListWeights;