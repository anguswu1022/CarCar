import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const salesResponse = await fetch("http://localhost:8090/api/sales");

  if (salesResponse.ok) {
    const sales = await salesResponse.json();

    root.render(
      <React.StrictMode>
        <App sales={sales.sales} />
      </React.StrictMode>
    );
  } else {
    console.error(salesResponse);
  }
}
loadData();
