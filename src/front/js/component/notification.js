import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import { format } from 'date-fns';

export const Notification = ({ message }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Al montarse el componente, se guarda la cita en la base de datos usando la función scheduleAppointment
        actions.scheduleAppointment(store.appointment)
    }, [])

    const formattedDate = format(new Date(store.appointment.day), 'yyyyMMdd');
    const formattedTime = store.appointment.time.replace(':', '') + '00';

    const startDate = `${formattedDate}T${formattedTime}`;
    const endDate = `${formattedDate}T${formattedTime}`;

    // Función para agregar la cita al calendario de Google
    const handleAddToGoogleCalendar = () => {
        // Construye un enlace para agregar la cita al calendario de Google
        const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Cita+con+el+profesional&dates=${startDate}/${endDate}&details=Detalles+de+la+cita&location=Ubicación+de+la+cita`;

        // Abre el enlace en una nueva pestaña del navegador
        window.open(calendarLink, '_blank');
    }

    // Función para agregar la cita a Microsoft Calendar
    const handleAddToMicrosoftCalendar = () => {
        const calendarLink = `https://outlook.live.com/calendar/0/deeplink/compose?startdt=${startDate}&enddt=${endDate}&subject=Cita+con+el+profesional&body=Detalles+de+la+cita&location=Ubicación+de+la+cita`;
        window.open(calendarLink, '_blank');
    }

    // Función para agregar la cita a iOS Calendar
    const handleAddToiOSCalendar = () => {
        const calendarLink = `cal://${startDate}/${endDate}/Cita con el profesional/Ubicación de la cita/Descripción de la cita`;

        window.open(calendarLink, '_blank');
    }

    return (
        <div className="notification">
            <h1>hello world from notification</h1>
            {message}
            <button onClick={handleAddToGoogleCalendar}>agregar a google calendar</button>
            <button onClick={handleAddToMicrosoftCalendar}>Agregar a Microsoft Calendar</button>
            <button onClick={handleAddToiOSCalendar}>Agregar a iOS Calendar</button>
        </div>
    );
}

