import React, { useEffect, useState } from "react";

export default function SaleRecordForm(props) {
  const [soldAutomobiles, setSoldAutomobiles] = useState(props.sales);
  const [availableAutomobiles, setAvailableAutomobiles] = useState([]);
  const [salesPerson, setSalesPerson] = useState("");
  const [customer, setCustomer] = useState("");
  const [automobile, setAutomobile] = useState("");
  const [price, setPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      customer,
      automobile,
      sales_person: salesPerson,
      price,
    };

    const saleUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(saleUrl, fetchConfig);
    setSubmitted(true);
    if (response.ok) {
      const newAutomobileSale = await response.json();
      setSoldAutomobiles((oldAutomobileSales) => [
        ...oldAutomobileSales,
        newAutomobileSale,
      ]);
      setSalesPerson("");
      setCustomer("");
      setAutomobile("");
      setPrice("");
      setSubmitted(false);
    }
  };

  const handleSalesPersonChange = (event) => {
    const value = event.target.value;
    setSalesPerson(value);
  };

  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };

  const handleAutomobileChange = (event) => {
    const value = event.target.value;
    setAutomobile(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  useEffect(() => {
    const soldAutomobileVins = soldAutomobiles.map(
      (soldAutomobile) => soldAutomobile.automobile.vin
    );
    setAvailableAutomobiles(
      props.automobiles.filter(
        (automobile) => !soldAutomobileVins.includes(automobile.vin)
      )
    );
  }, [soldAutomobiles]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="mb-3">
              <select
                value={automobile}
                onChange={handleAutomobileChange}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose an automobile</option>
                {availableAutomobiles.map((automobile) => {
                  return (
                    <option key={automobile.vin} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={salesPerson}
                onChange={handleSalesPersonChange}
                required
                name="sales_person"
                id="sales_person"
                className="form-select"
              >
                <option value="">Choose a sales person</option>
                {props.salesPersons.map((salesPerson) => {
                  return (
                    <option
                      key={salesPerson.employee_number}
                      value={salesPerson.employee_number}
                    >
                      {salesPerson.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={customer}
                onChange={handleCustomerChange}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a customer</option>
                {props.customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                value={price}
                onChange={handlePriceChange}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
