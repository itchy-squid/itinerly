import styles from './Calendar.module.css';
import moment from 'moment';
import { filter, sortBy } from 'lodash';
import { TIME_UNITS } from '../../constants';
import { CalendarItem } from './CalendarItem';
import { useEffect, useState } from 'react';

export const CalendarDay = ({ date, activities, renderSettings }) => {
  const [todaysActivities, setTodaysActivities] = useState([]);

  useEffect(() => {
    setTodaysActivities(
      sortBy(
        filter(activities, ev => ev.start && moment(ev.start).isSame(date, TIME_UNITS.DAY)),
        ev => ev.start))

  }, [date, activities])

  return (
    <div className={styles.day}>
      {/* {todaysActivities.map((activity, idx) => (
        <CalendarItem 
          key={idx} 
          activity={activity}
          name={activity.name} 
          duration={activity.duration} 
          start={moment(activity.start).hour()} 
          renderSettings={renderSettings}/>
      ))} */}
    </div>
  );
}
