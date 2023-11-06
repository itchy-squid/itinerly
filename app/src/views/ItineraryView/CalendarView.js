import React from 'react';
import moment from 'moment';
import { Calendar } from './Calendar';
import { TIME_UNITS } from '../../constants';

export const CalendarView = ({events}) => {
  const days = events.map(ev => moment(ev.start).startOf(TIME_UNITS.DAY).toDate());

  return (
    <Calendar activities={events} days={days}>
    </Calendar>
  );
}

