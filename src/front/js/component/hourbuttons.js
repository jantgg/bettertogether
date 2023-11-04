import React, { useContext } from 'react';
import { Confirmation } from './confirmation';
import { Context } from "../store/appContext";

export const HourButtons = ({ numericDate, freelanceId, hours, handleHourClick, selectedDay, selectedHour, confirmationOpen }) => {
    const { store, actions } = useContext(Context);
    const formattedDay = selectedDay ? selectedDay.toLocaleDateString('en-US', { weekday: 'long' }) : '';
    const formattedDate = selectedDay ? selectedDay.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const formattedHour = selectedHour ?
        selectedHour.toString().padStart(2, '0')
        : '00';
    console.log('selectedhour en hourbuttons', selectedHour)
    console.log('formattedhour en hourbuttons', formattedHour)
    const isButtonDisabled = (time) => {
        return store.freelance_appointments.some(appointment => appointment.time === time);
        }
    return (
        <div>
            {Array.isArray(hours) && hours.length > 0 && hours.map((hour, index) => (
                <button key={index} onClick={() => handleHourClick(hour)} disabled={isButtonDisabled(hour)}>
                    {hour}
                </button>

            ))}
            {confirmationOpen && <Confirmation freelanceId={freelanceId} selectedDay={formattedDay}
                selectedDate={formattedDate}
                selectedHour={formattedHour} />}
        </div>
    );
};