import styles from './Calendar.module.css';
import moment from 'moment';
import {filter, sortBy, times} from 'lodash';
import { TIME_UNITS } from '../../constants';
import {range} from 'lodash';
import { CalendarItem } from './CalendarItem';
import { useEffect, useState } from 'react';
import { selectActivities } from '../../state/activities';
import { useSelector } from 'react-redux';

export const Calendar = () => {
  const activities = useSelector(selectActivities);
  const [renderSettings, setRenderSettings] = useState({});
  // const [_, setFirstDay] = useState();
  // const [_, setLastDay] = useState();
  const [days, setDays] = useState([]);

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const pxHeight = parseInt(rootStyle.getPropertyValue('--hour-height'));

    setRenderSettings(
      { 
        hourHeight: pxHeight,
        renderStartTime: 0,
        renderDuration: 24
      })
  }, []);

  useEffect(() => {
    const moments = activities
      .filter(a => a.start && a.duration > 0)
      .map(a => [moment(a.start), moment(a.start).add({hours: a.duration})])
      .reduce((acc, curr) => acc.concat(curr), []);

    const localFirstDay = moment.min(moments).startOf('day');
    //const localLastDay = moment.max(moments).day();
    const nextFiveDays = times(5, nDays => moment(localFirstDay).add({ days: nDays }));
    
    // setFirstDay(localFirstDay);
    // setLastDay(localLastDay);
    setDays(nextFiveDays);

  }, [activities])

  const style = {
    height: `calc(var(--hour-height) * ${renderSettings.duration})`,
  };

  return (
    <div className={styles.calendar} style={style}>
      <div>
          {range(renderSettings.renderStartTime, renderSettings.renderStartTime + renderSettings.renderDuration).map((hour, idx) => (
              <div key={`segment-${hour}`} className={styles.hour}>
                  <span className={styles.hourlabel}>{hour}</span>
              </div>
          ))}
      </div>
      <div className={styles.daysContainer}>
          <div className={styles.daysPrelude}/>
          {days.map((date, index) => (
              <CalendarDay activities={activities} 
                date={date} key={`day-${index}`} 
                renderSettings={renderSettings} />
          ))}
      </div>
    </div>
  );
}

const CalendarDay = ({ date, activities, renderSettings }) => {
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

export default Calendar;
