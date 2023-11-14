import styles from './Calendar.module.css';
import moment from 'moment';
import { times } from 'lodash';
import { range } from 'lodash';
import { useEffect, useState } from 'react';
import { selectActivities } from '../../state/activities';
import { useSelector } from 'react-redux';
import { CalendarDay } from './CalendarDay';

export const Calendar = () => {
  const { activities, range: activitiesRange } = useSelector(selectActivities);
  const [ hourHeight, setHourHeight ] = useState(0);
  const [ renderStartTime ] = useState(0);
  const [ renderDuration ] = useState(24);
  const [ renderDays ] = useState(5);
  const [ days, setDays] = useState([]);

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const pxHeight = parseInt(rootStyle.getPropertyValue('--hour-height'));
    setHourHeight(pxHeight)
  }, []);

  useEffect(() => {
    const localFirstDay = moment(activitiesRange.start ?? '').local().startOf('day');
    const nextFiveDays = times(renderDays, nDays => moment(localFirstDay).add({ days: nDays }));
    
    setDays(nextFiveDays);

  }, [renderDays, activitiesRange])

  const style = {
    height: `calc(var(--hour-height) * ${renderDuration})`,
  };

  return (
    <div className={styles.calendar} style={style}>
      <div>
          {range(renderStartTime, renderStartTime + renderDuration).map((hour, idx) => (
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
              renderStartTime={renderStartTime}
              renderDuration={renderDuration}
              hourHeight={hourHeight} />
          ))}
      </div>
    </div>
  );
}

export default Calendar;
