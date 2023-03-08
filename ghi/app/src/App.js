import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import CustomerForm from "./Sales/CustomerForm";
import SalesPersonForm from "./Sales/SalesPersonForm";
import SaleRecordForm from "./Sales/SaleRecordForm";
import SaleList from "./Sales/SaleList";
import SalePersonHistory from "./Sales/SalePersonHistory";
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

export default function App() {
  const [sales, setSales] = useState([]);
  const fetchSalesData = async () => {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  };

  const [salesPerson, setSalesPerson] = useState([]);
  const fetchSalesPersonData = async () => {
    const url = "http://localhost:8090/api/sales_persons/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalesPerson(data.sales_persons);
    }
  };

  const [automobiles, setAutomobiles] = useState([]);
  const fetchAutomobilesData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  const [automobile, setAutomobile] = useState([]);
  const fetchAutomobileData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobile(data);
    }
  };

  const [customers, setCustomers] = useState([]);
  const fetchCustomersData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchSalesPersonData();
    fetchAutomobilesData();
    fetchAutomobileData();
    fetchCustomersData();
  }, []);


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales_persons/new" element={<SalesPersonForm />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="sales" element={<SaleList sales={sales} />} />
          <Route
            path="sales/new"
            element={
              <SaleRecordForm
                customers={customers}
                salesPersons={salesPerson}
                sales={sales}
                automobile={automobiles}
              />
            }
          />
          <Route
            path="sales_history"
            element={
              <SalePersonHistory salesPersons={salesPerson} sales={sales} />
            }
          />
          <Route path="technician" element={<TechnicianForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments">
          <Route path="new" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
