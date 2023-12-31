import React, { useEffect, useState } from 'react';
import star from '/app/src/AutoService/star.png';


function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [autos, setAutos] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };
    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };


    function getAppointments() {
        fetchData();
        fetchAutos();
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
                getAppointments()
            })
        })
    }

    function completeAppointment(href) {
        fetch(`http://localhost:8080${href}complete/`,{
            method:'put',
            body: JSON.stringify(),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            result.json().then((resp) => {
                getAppointments()
            })
        })
    }

    function isStarred(appointment) {
        let isStarredItem = false;
        autos.forEach(auto => {
            if(appointment.vin === auto.vin) {
                isStarredItem = true;
            }
        });
        return isStarredItem;
    }

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <div className="row">
            <div className="mt-4 col-10">
                <h1>Appointments</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIP</th>
                            <th>Owner</th>
                            <th>VIN</th>
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
                                <td>{isStarred(appointment) ?  (<img src={star} width="35" />) : null}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.vin}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                <button onClick={() => completeAppointment(appointment.href)} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>Completed</button>
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
