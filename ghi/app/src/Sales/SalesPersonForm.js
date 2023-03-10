import React, { useState } from "react";

export default function SalesPersonForm(props) {
  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      employee_number: employeeNumber,
    };

    const salesPersonUrl = "http://localhost:8090/api/sales_persons/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(salesPersonUrl, fetchConfig);
    if (response.ok) {
      const newSalesPerson = await response.json();
      props.onSalesPersonCreated(newSalesPerson);
      setName("");
      setEmployeeNumber("");
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    setEmployeeNumber(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new sales person</h1>
          <form onSubmit={handleSubmit} id="create-sales-person-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={employeeNumber}
                onChange={handleEmployeeNumberChange}
                placeholder="Employee Number"
                required
                type="text"
                name="employee_number"
                id="employee_number"
                className="form-control"
              />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
