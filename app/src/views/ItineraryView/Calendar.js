import styles from './Calendar.module.css';
import moment from 'moment';
import {filter, sortBy} from 'lodash';
import { TIME_UNITS } from '../../constants';
import {range} from 'lodash';
import { CalendarItem } from './CalendarItem';
import { useEffect, useState } from 'react';

export const Calendar = ({ activities, days }) => {
  const [renderSettings, setRenderSettings] = useState({});

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
    const today = moment(date);

    const todaysEvents = sortBy(
        filter(activities, ev => ev.start && moment(ev.start).isSame(today, TIME_UNITS.DAY)),
        ev => ev.start);

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
