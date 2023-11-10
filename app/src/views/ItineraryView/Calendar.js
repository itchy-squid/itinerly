import styles from './Calendar.module.css';
import moment from 'moment';
import { times } from 'lodash';
import {range} from 'lodash';
import { useEffect, useState } from 'react';
import { selectActivities } from '../../state/activities';
import { useSelector } from 'react-redux';
import { CalendarDay } from './CalendarDay';

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

export default Calendar;
