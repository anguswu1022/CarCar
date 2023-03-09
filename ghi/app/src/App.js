import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import CustomerForm from "./Sales/CustomerForm";
import SalesPersonForm from "./Sales/SalesPersonForm";
import SaleRecordForm from "./Sales/SaleRecordForm";
import SaleList from "./Sales/SaleList";
import SalePersonHistory from "./Sales/SalePersonHistory";
import TechnicianForm from "./TechnicianForm";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import ManufacturerList from "./Inventory/ManufacturerList";
import ManufacturerForm from "./Inventory/ManufacturerForm";
import VehicleModelList from "./Inventory/VehicleModelList";

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

  const [manufacturer, setManufacturer] = useState([]);
  const fetchManufacturerData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setManufacturer(data.manufacturers);
    }
  };

  const [vehicleModel, setVehicleModel] = useState([]);
  const fetchVehicleModelData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setVehicleModel(data.models);
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
    fetchManufacturerData();
    fetchCustomersData();
    fetchVehicleModelData();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturers">
              <Route
                path=""
                element={<ManufacturerList manufacturers={manufacturer} />}
              />
              <Route path="new" element={<ManufacturerForm />} />
            </Route>
            <Route path="models">
              <Route
                path=""
                element={<VehicleModelList vehicleModels={vehicleModel} />}
              />
            </Route>
          </Route>
          <Route path="sales_persons/new" element={<SalesPersonForm />} />
          <Route path="sales">
            <Route path="" element={<SaleList sales={sales} />} />
            <Route
              path="new"
              element={
                <SaleRecordForm
                  customers={customers}
                  salesPersons={salesPerson}
                  sales={sales}
                  automobiles={automobiles}
                />
              }
            />
            <Route
              path="history"
              element={
                <SalePersonHistory salesPersons={salesPerson} sales={sales} />
              }
            />
          </Route>

          <Route path="customers/new" element={<CustomerForm />} />
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
