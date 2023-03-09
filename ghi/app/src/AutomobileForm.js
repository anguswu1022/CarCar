import React, { useEffect, useState } from 'react';


function AutomobileForm() {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const automobileResponse = await fetch(automobileUrl, fetchConfig);
        if (automobileResponse.ok) {
            const newAutomobile = await automobileResponse.json();
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }
    const fetchData = async () => {
        const modelUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(modelUrl);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }
    useEffect(() => {
        fetchData();
    } , []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add an automobile to inventory</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                    <input onChange={e => setColor(e.target.value)} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={color} />
                    <label htmlFor="name">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setYear(e.target.value)} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                    <label htmlFor="modelName">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setVin(e.target.value)} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="modelName">VIN</label>
                </div>
                <div className="mb-3">
                    <select onChange={e => setModel(e.target.value)} required id="model" name="model" className="form-select" value={model}>
                    <option key="default" value="">Choose a model</option>
                    {models.map(model => {
                        return (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        )}
                    )}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AutomobileForm;
