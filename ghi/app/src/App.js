import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import CustomerForm from "./Sales/CustomerForm";
import SalesPersonForm from "./Sales/SalesPersonForm";
import SaleRecordForm from "./Sales/SaleRecordForm";
import SaleList from "./Sales/SaleList";

function App(props) {
  // if (props.sales === undefined) {
  //   return null;
  // }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales_persons/new" element={<SalesPersonForm />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="sales" element={<SaleList sales={props.sales} />} />
          <Route path="sales/new" element={<SaleRecordForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
