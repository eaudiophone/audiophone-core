import React from 'react';

import FullCalendar from '@fullcalendar/react';
import '@fullcalendar/core/main.css';

import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/daygrid/main.css';

const CalendarComponent = () => (
	<FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
);

export default CalendarComponent;