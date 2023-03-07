import React, { useEffect, useState } from "react";

export default function SaleRecordForm() {
  const [salesPersons, setSalesPersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [salesPerson, setSalesPerson] = useState("");
  const [customer, setCustomer] = useState("");
  const [automobile, setAutomobile] = useState("");
  const [price, setPrice] = useState("");

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
    if (response.ok) {
      const newSale = await response.json();

      setSalesPerson("");
      setCustomer("");
      setAutomobile("");
      setPrice("");
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

  const fetchSalesPersonsData = async () => {
    const url = "http://localhost:8090/api/sales_persons/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalesPersons(data.sales_persons);
    }
  };

  const fetchCustomersData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  const fetchAutomobilesData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  useEffect(() => {
    fetchSalesPersonsData();
    fetchCustomersData();
    fetchAutomobilesData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
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
                {salesPersons.map((salesPerson) => {
                  return (
                    <option key={salesPerson.id} value={salesPerson.id}>
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
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  );
                })}
              </select>
            </div>
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
                {automobiles
                  .filter((automobile) => !automobile.sold)
                  .map((automobile) => {
                    return (
                      <option key={automobile.vin} value={automobile.vin}>
                        {automobile.vin}
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
