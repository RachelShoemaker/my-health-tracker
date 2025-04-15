import React, { Fragment, useState } from "react";

const EditWeight = ({ measurement_date, currentWeight, onUpdated }) => {
  const [newWeight, setNewWeight] = useState(currentWeight);

  // Function to handle update when the user clicks "Edit"
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/weights/${measurement_date}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ weight: newWeight })
      });
      const jsonData = await response.json();
      console.log("Updated weight:", jsonData);
      
      // Call a callback to let the parent know the record has been updated.
      window.location.reload();
    } catch (error) {
      console.error("Error updating weight:", error.message);
    }
  };

  return (
    <Fragment>
      {/* Use a unique modal ID based on measurement_date to avoid conflicts */}
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#editModal${measurement_date}`}
      >
        Edit entry
      </button>
      <div className="modal" id={`editModal${measurement_date}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit weight</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {/* Controlled input: onChange updates newWeight state */}
              <input
                type="text"
                className="form-control"
                value={newWeight}
                onChange={e => setNewWeight(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={handleUpdate}
              >
                Edit
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditWeight;
