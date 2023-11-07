import styles from './Calendar.module.css';
import moment from 'moment';
import {filter, sortBy} from 'lodash';
import { TIME_UNITS } from '../../constants';
import {range} from 'lodash';
import { useEffect, useState } from 'react';


export const Calendar = ({ activities, days }) => {
    const renderSettings = { 
      renderStartTime: 0,
      renderDuration: 24
    }

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
                <Day activities={activities} 
                  date={date} key={`day-${index}`} 
                  renderSettings={renderSettings} />
            ))}
        </div>
      </div>
    );
}

const Day = ({ date, activities, renderSettings }) => {
    // const [ addActivityStart, setAddActivityStart ] = useState(null);
    const today = moment(date);

    const todaysEvents = sortBy(
        filter(activities, ev => moment(ev.start).isSame(today, TIME_UNITS.DAY)),
        ev => ev.start);

    // const handleAddClick = (ev) => {
    //   setAddActivityStart(18);
    // }

    return (
        <div className={styles.day}>
            {todaysEvents.map(({id, name, duration, start}, idx) => (
                <CalendarItem 
                  key={idx} 
                  name={name} 
                  duration={duration} 
                  start={moment(start).hour()} 
                  renderSettings={renderSettings}/>
            ))}
            {/* {addActivityStart && (
              <CalendarItem name='(No title)' 
                duration={1} 
                start={addActivityStart} 
                renderSettings={renderSettings}/>
            )} */}
        </div>
    );
}

const CalendarItem = ({name, duration, start, renderSettings}) => {
  const [hourHeight, setHourHeight] = useState();
  const [height, setHeight] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const pxHeight = parseInt(rootStyle.getPropertyValue('--hour-height'));

    setHourHeight(pxHeight);
  }, []);

  useEffect(() => {
    if(hourHeight) {
      setHeight(hourHeight * duration);
      setTop(hourHeight * (start - renderSettings.renderStartTime));
    }
  }, [hourHeight, duration, start, renderSettings]);

  const startResizing = (mouseDownEvent) => {
    mouseDownEvent.preventDefault();

    const startY = mouseDownEvent.clientY;

    const doResize = (mouseMoveEvent) => {
      const newHeight = height + (mouseMoveEvent.clientY - startY);
      const newDuration = newHeight / hourHeight;

      let sanitizedDuration = Math.round(newDuration / 0.25) * 0.25;
      sanitizedDuration = Math.max(0.25, sanitizedDuration);
      sanitizedDuration = Math.min(
        sanitizedDuration, 
        renderSettings.renderStartTime + renderSettings.renderDuration - start);
      
      setHeight(hourHeight * sanitizedDuration);
    };

    const stopResizing = () => {
        window.removeEventListener('mousemove', doResize);
        window.removeEventListener('mouseup', stopResizing);
    };

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResizing);
  };

  return (
    <div className={styles.calendarItem}
      style={{
        position: 'relative',
        height: `${height}px`,
        top: `${top}px`
      }}>

      <span className={styles.calendarItemLabel}>
          {name}
      </span>
      
      {/* Resizing Handle */}
      <div
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: '4px', 
            right: '4px', 
            height: '10px', 
            cursor: 'ns-resize' }}
          onMouseDown={startResizing}
      />
    </div>
  );
}

export default Calendar;
