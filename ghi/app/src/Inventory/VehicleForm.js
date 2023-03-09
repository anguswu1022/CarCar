import React, { useEffect, useState } from "react";

function VehicleForm(props) {
  const [manufacturers, setManufacturers] = useState([]);
  const [name, setName] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.picture_url = picture_url;
    data.manufacturer_id = manufacturer;
    const vehicleUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const vehicleResponse = await fetch(vehicleUrl, fetchConfig);
    if (vehicleResponse.ok) {
      const newVehicle = await vehicleResponse.json();
      props.onVehicleModelCreated(newVehicle);
      setName("");
      setPictureUrl("");
      setManufacturer("");
    }
  };
  const fetchData = async () => {
    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(manufacturerUrl);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-vehicle-form">
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={name}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPictureUrl(e.target.value)}
                value={picture_url}
                placeholder="Picture URL"
                required
                type="url"
                name="pictureUrl"
                id="pictureUrl"
                className="form-control"
              />
              <label htmlFor="modelName">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={(e) => setManufacturer(e.target.value)}
                required
                id="manufacturer"
                name="manufacturer"
                className="form-select"
                value={manufacturer}
              >
                <option key="default" value="">
                  Choose a manufacturer
                </option>
                {manufacturers.map((manufacturer) => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VehicleForm;
