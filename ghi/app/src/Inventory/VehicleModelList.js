import React from "react";

export default function VehicleModelList(props) {
  return (
    <div className="mt-4">
      <h1>Vehicle Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {props.vehicleModels.map((vehicle) => {
            return (
              <tr className="table-row" key={vehicle.href}>
                <td>{vehicle.name}</td>
                <td>{vehicle.manufacturer.name}</td>
                <td>
                  <img src={vehicle.picture_url} style={{ width: "300px" }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
