import React, { useEffect, useState } from 'react';

function AppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [vin, setVin] = useState('');

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        fetchData();
    } , []);

    return (
        <div className="row">
            <div className="mt-4 col-10">
                <h1>Appointments by VIN</h1>
                <div>
                    <label htmlFor="vinInput">Enter VIN:</label>
                    <input type="text" id="vinInput" onChange={(e) => setVin(e.target.value)} />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.filter((appointment)=>appointment.vin === vin).map((appointment, id) => (
                            <tr key={id} value={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppointmentHistory;
