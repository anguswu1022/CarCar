import React, { useEffect, useState } from 'react';


function AutomobileList() {
    const [autos, setAutos] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    }

    useEffect(() => {
        getAutomobile();
    } , []);
    function getAutomobile() {
        fetchData();
    }
    function deleteAutomobile(vin) {
        fetch(`http://localhost:8100/api/automobiles/${vin}/`,{
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
                getAutomobile()
            })
        })
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Vehicle models</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autos.map((auto, id) => (
                            <tr key={id} value={auto.id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>
                                <button onClick={() => deleteAutomobile(auto.vin)} type="button" className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AutomobileList;
