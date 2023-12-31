import React, { useState } from "react";

export default function SalePersonHistory(props) {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const filteredSales = name
    ? props.sales.filter((sale) => sale.sales_person.name === name)
    : props.sales;

  return (
    <div className="mt-4">
      <h1>Sales person history</h1>
      <div className="mb-3">
        <select
          value={name}
          onChange={handleNameChange}
          className="form-select"
        >
          <option value="">Choose a sales person</option>
          {props.salesPersons.map((salesPerson) => {
            return (
              <option key={salesPerson.name} value={salesPerson.name}>
                {salesPerson.name}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => {
            return (
              <tr className="table-row" key={sale.id}>
                <td>{sale.sales_person.name}</td>
                <td>{sale.customer.name}</td>
                <td>{sale.automobile.vin}</td>
                <td>${sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
