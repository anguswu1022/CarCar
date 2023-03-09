import React from "react";

export default function ManufacturerList(props) {
  return (
    <div className="mt-4">
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.name}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
