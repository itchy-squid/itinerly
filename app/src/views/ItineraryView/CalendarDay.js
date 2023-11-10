import styles from './Calendar.module.css';
import moment from 'moment';
import { filter, sortBy } from 'lodash';
import { TIME_UNITS } from '../../constants';
import { CalendarItem } from './CalendarItem';
import { useEffect, useState } from 'react';

export const CalendarDay = ({ date, activities, renderSettings }) => {
  const [todaysEvents, setTodaysActivities] = useState([]);

  useEffect(() => {
    const today = date;

    setTodaysActivities(
      sortBy(
        filter(activities, ev => ev.start && moment(ev.start).isSame(today, TIME_UNITS.DAY)),
        ev => ev.start))

  }, [date])

  return (
    <div className={styles.day}>
      {todaysEvents.map((activity, idx) => (
        <CalendarItem 
          key={idx} 
          activity={activity}
          name={activity.name} 
          duration={activity.duration} 
          start={moment(activity.start).hour()} 
          renderSettings={renderSettings}/>
      ))}
    </div>
  );
}
