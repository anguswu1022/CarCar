import React, {useEffect, useState } from 'react';


function AppointmentForm() {
    const [vin, setVin] = useState('');
    const [owner, setOwner] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.owner = owner;
        data.date = date;
        data.time = time;
        data.technician = technician;
        data.reason = reason;
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const appointmentResponse = await fetch(appointmentUrl, fetchConfig);
        if (appointmentResponse.ok) {
            const appointment = await appointmentResponse.json();
            setVin('');
            setOwner('');
            setDate('');
            setTime('');
            setTechnician('');
            setReason('');
        }
    };

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(() => {
        fetchData();
    } , []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new appointment</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                    <input onChange={e => setVin(e.target.value)} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" value={vin} />
                    <label htmlFor="vin">Vin</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setOwner(e.target.value)} value={owner} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                    <label htmlFor="owner">Owner</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setDate(e.target.value)} value={date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                    <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setTime(e.target.value)} value={time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                    <label htmlFor="time">Time</label>
                </div>
                <div className="mb-3">
                    <select onChange={e => setTechnician(e.target.value)} required id="technician" name="technician" className="form-select" value={technician}>
                    <option key="default" value="">Choose a technican</option>
                    {technicians.map((technician, id) => {
                        return (
                            <option key={id} value={technician.id}>{technician.name}</option>
                        )}
                    )}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setReason(e.target.value)} value={reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">Reason</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AppointmentForm;
