import styles from './Calendar.module.css';
import moment from 'moment';
import { filter } from 'lodash';
import { TIME_UNITS } from '../../constants';
import { CalendarItem } from './CalendarItem';
import { useEffect, useState } from 'react';

export const CalendarDay = ({ date, activities, hourHeight, renderStartTime, renderDuration }) => {
  const [todaysActivities, setTodaysActivities] = useState([]);

  useEffect(() => {
    const happensToday = ({ start, duration }) => {
      const startOfDay = moment(date).local().startOf(TIME_UNITS.DAY);
      const endOfDay = moment(date).local().endOf(TIME_UNITS.DAY);
      
      const startOfEvent = moment(start).local();
      const endOfEvent = moment(start).local().add({hours: duration});

      return !endOfEvent.isBefore(startOfDay) && !startOfEvent.isAfter(endOfDay);
    }

    setTodaysActivities(filter(activities, a => a.start && a.duration && happensToday(a)));
  }, [date, activities])


  return (
    <div className={styles.day}>
      {todaysActivities.map((activity, idx) => (
        <CalendarItem 
          key={idx} 
          date={date}
          activity={activity}
          name={activity.name} 
          duration={activity.duration} 
          start={moment(activity.start).hour()} 
          calendarStartHour={renderStartTime}
          calendarDuration={renderDuration}
          hourHeight={hourHeight}/>
      ))}
    </div>
  );
}
