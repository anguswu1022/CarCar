export default function SaleList(props) {
  return (
    <div className="mt-4">
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Employee number</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {props.sales.map((sale) => {
            return (
              <tr className="table-row" key={sale.id}>
                <td>{sale.sales_person.name}</td>
                <td>{sale.sales_person.employee_number}</td>
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
