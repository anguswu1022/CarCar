import React, {useEffect, useState } from 'react';


function TechnicianForm() {
    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.employee_id = employeeId;
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const technicianResponse = await fetch(technicianUrl, fetchConfig);
        if (technicianResponse.ok) {
            const newTechnician = await technicianResponse.json();
            setName('');
            setEmployeeId('');
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a new technician</h1>
                <form onSubmit={handleSubmit} id="add-technician-form">
                <div className="form-floating mb-3">
                    <input onChange={e => setName(e.target.value)} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={name} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setEmployeeId(e.target.value)} value={employeeId} placeholder="Employee ID" required type="text" name="employeeId" id="employeeId" className="form-control" />
                    <label htmlFor="employeeId">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
