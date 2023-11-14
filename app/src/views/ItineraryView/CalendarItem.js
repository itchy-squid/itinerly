import styles from './Calendar.module.css';
import { useCallback, useEffect, useState } from 'react';
import { updateActivityAsync } from '../../state/activities';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useDragResize } from '../../hooks/useDragResize';
import { TIME_UNITS } from '../../constants';

export const CalendarItem = ({activity, hourHeight, date, calendarStartHour, calendarDuration}) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState();
  const [top, setTop] = useState();
  const [endsToday, setEndsToday] = useState(false);
  
  const sanitizeStartDuration = useCallback((start, duration) => {
    const dayStart = moment(date).local().startOf(TIME_UNITS.DAY).add({hours: calendarStartHour});

    const sanitizedStart = moment.max([
      moment(dayStart).local(), 
      moment(start).local()
    ]);

    const sanitizedEnd = moment.min([
      moment(dayStart).local().add({hours: calendarDuration}),
      moment(start).local().add({hours: duration})
    ]);

    return [
      sanitizedStart.hours(),
      moment.duration(sanitizedEnd.diff(sanitizedStart)).asHours()
    ]
  }, [date, calendarStartHour, calendarDuration]);

  useEffect(() => {
    setEndsToday(
      moment(activity.start).local().add({hours: activity.duration}).startOf(TIME_UNITS.DAY)
      .isSame(date)
    );
  }, [activity, date]);

  useEffect(() => {
    if(hourHeight) {
      const [start, duration] = sanitizeStartDuration(activity.start, activity.duration);
      setHeight(hourHeight * duration);
      setTop(hourHeight * start);
    }
  }, [activity, calendarStartHour, calendarDuration, hourHeight, sanitizeStartDuration]);

  const calculateDuration = ({deltaY}) => {
    const newHeight = height + deltaY;
    const newDuration = newHeight / hourHeight;

    let sanitizedDuration = Math.round(newDuration / 0.25) * 0.25;
    sanitizedDuration = Math.max(0.25, sanitizedDuration);
    sanitizedDuration = Math.min(
      sanitizedDuration, 
      calendarStartHour + calendarDuration - moment(activity.start).hour());
    
      return sanitizedDuration
  }

  const handleUpdateDuration = useDragResize(
    () => { document.body.style.cursor = "ns-resize"; },
    (delta) => { setHeight(hourHeight * calculateDuration(delta)); },
    (delta) => {
      document.body.style.cursor = 'auto';
      dispatch(updateActivityAsync({...activity, duration: calculateDuration(delta)}));
    }
  );

  const calculateStart = ({deltaY}) => {
    const newTop = top + deltaY;
    const newStartHour = (newTop / hourHeight) + calendarStartHour;
    
    let sanitizedStart = Math.round(newStartHour / 0.25) * 0.25;
    sanitizedStart = Math.max(0, sanitizedStart);
    sanitizedStart = Math.min(23.75, sanitizedStart);
    
    return sanitizedStart
  }

  const handleUpdateStart = useDragResize(
    () => { document.body.style.cursor = 'move'; },
    (delta) => { setTop(hourHeight * (calculateStart(delta) - calendarStartHour)); },
    (delta) => { 
      document.body.style.cursor = 'auto';
      dispatch(updateActivityAsync(
        {...activity, start: moment(activity.start).set({hour: calculateStart(delta)}).toISOString()}));
    }
  );

  return (
    <div className={styles.calenderItemContainer}>
      <div className={styles.calendarItem}
        style={{ height: `${height}px`, top: `${top}px` }}
        onMouseDown={handleUpdateStart}>

        <span className={styles.calendarItemLabel}>
            {activity.name}
        </span>
        
        {endsToday && (
          <div className={styles.calendarItemResizeHandle}
              onMouseDown={handleUpdateDuration}
          />
        )}
      </div>
    </div>
  );
}