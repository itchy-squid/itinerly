import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Calendar } from '../../components/Calendar';

export const CalendarView = ({events}) => {
  
  return (
    <Calendar events={events} days={['Mon', 'Tue', 'Wed']}>
    </Calendar>
  );
}

