import React, { useEffect, useState } from 'react';


function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };


    // useEffect(() => {
    //     fetchData();
    // } , []);

    function getAppointments() {
        fetchData();
    }

    function cancelAppointment(href) {
        fetch(`http://localhost:8080${href}cancel/`,{
            method:'put',
            body: JSON.stringify(),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                getAppointments()
            })
        })
    }

    useEffect(() => {
        getAppointments();
    }, []);

    // function cancelAppointment(href) {
    //     fetch(`http://localhost:8080${href}`,{
    //     method:'PUT',
    // }).then((result) => {
    //     result.json().then((resp) => {
    //         console.warn(resp)
    //         getAppointments()
    //     })
    // })
    // }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Appointments</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Car</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Complete/Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.filter((appointment)=>appointment.canceled===false&&appointment.completed===false).map((appointment, id) => (
                            <tr key={id} value={appointment.id}>
                                <td>{appointment.owner}</td>
                                <td>{appointment.vin}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                <button onClick={() => cancelAppointment(appointment.href)} type="button" className="btn btn-primary">Completed</button>
                                <button onClick={() => cancelAppointment(appointment.href)} type="button" className="btn btn-danger">Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AppointmentList;
