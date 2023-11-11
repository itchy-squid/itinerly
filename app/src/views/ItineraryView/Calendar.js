import styles from './Calendar.module.css';
import moment from 'moment';
import { times } from 'lodash';
import {range} from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { selectActivities } from '../../state/activities';
import { useSelector } from 'react-redux';
import { CalendarDay } from './CalendarDay';
import { CalendarItem } from './CalendarItem';
import { useResize } from '../../hooks/useResize';

export const Calendar = () => {
  const [ nDays ] = useState(5);
  const componentRef = useRef()
  const { width } = useResize(componentRef)
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
    const nextFiveDays = times(nDays, i => moment(localFirstDay).add({ days: i }));
    
    // setFirstDay(localFirstDay);
    // setLastDay(localLastDay);
    setDays(nextFiveDays);

  }, [activities, nDays])

  const style = {
    height: `calc(var(--hour-height) * ${renderSettings.duration})`,
  };

  const dayComponents = useMemo(() => {
    return days.map((date, index) => (
      <CalendarDay activities={[]}
        date={date} key={`day-${index}`} 
        renderSettings={renderSettings} />
        ));
    }, [days, renderSettings]);

  return (
    <div className={styles.calendar} style={style}>
      <div style={{display: 'absolute'}}>
        <span>width: {width}</span>
      </div>
      <div>
          {range(renderSettings.renderStartTime, renderSettings.renderStartTime + renderSettings.renderDuration).map((hour, idx) => (
              <div key={`segment-${hour}`} className={styles.hour}>
                  <span className={styles.hourlabel}>{hour}</span>
              </div>
          ))}
      </div>
      <div className={styles.daysPreludeContainer}>
        <div className={styles.daysPrelude}/>
      </div>
      <div className={styles.daysContainer} ref={componentRef}>
        {dayComponents}
        <div style={{position: 'absolute'}}>
          {days && activities.map((activity, idx) => (
            <CalendarItem 
              key={idx} 
              activity={activity}
              name={activity.name} 
              duration={activity.duration} 
              start={moment(activity.start).hour()} 
              renderSettings={renderSettings}
              dayWidth={width/nDays}
              dayStart={days[0]}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
