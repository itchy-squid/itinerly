import styles from './Calendar.module.css';
import { useEffect, useMemo, useState } from 'react';
import { updateActivityAsync } from '../../state/activities';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { TIME_UNITS } from '../../constants';
import { useDragResize } from '../../hooks/useDragResize';

export const CalendarItem = ({activity, renderSettings, dayWidth, dayStart}) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState();
  const [top, setTop] = useState();
  const [left, setLeft] = useState();
  const [width, setWidth] = useState();
  
  useEffect(() => {
    if(renderSettings.hourHeight) {
      setHeight(renderSettings.hourHeight * activity.duration);
      setTop(renderSettings.hourHeight * (moment(activity.start).hour() - renderSettings.renderStartTime));
    }
  }, [activity, renderSettings]);

  useEffect(() => {
    const nDays = moment(activity.start).startOf(TIME_UNITS.DAY).diff(dayStart, TIME_UNITS.DAYS);
    setLeft(Math.round(nDays * dayWidth));
  }, [activity, dayWidth, dayStart]);

  useEffect(() => {
    setWidth(Math.round(dayWidth) - 8);
  }, [dayWidth]);


  const calculateDuration = ({ deltaY }) => {
    const newHeight = height + deltaY;
    const newDuration = newHeight / renderSettings.hourHeight;

    let sanitizedDuration = Math.round(newDuration / 0.25) * 0.25;
    sanitizedDuration = Math.max(0.25, sanitizedDuration);
    sanitizedDuration = Math.min(
      sanitizedDuration, 
      renderSettings.renderStartTime + renderSettings.renderDuration - moment(activity.start).hour());
    
      return sanitizedDuration
  }

  const handleResizing = useDragResize(
    () => { document.body.style.cursor = "ns-resize"; },
    (delta) => { setHeight(renderSettings.hourHeight * calculateDuration(delta)); },
    (delta) => {
      document.body.style.cursor = 'auto';
      dispatch(updateActivityAsync({...activity, duration: calculateDuration(delta)}));
    }
  )

  const startDragging = (mouseDownEvent) => {
    const calculateStartHour = (mouseEvent) => {
      const newTop = top + (mouseEvent.clientY - startY);
      const newStartHour = (newTop / renderSettings.hourHeight) + renderSettings.renderStartTime;
      
      let sanitizedStart = Math.round(newStartHour / 0.25) * 0.25;
      sanitizedStart = Math.max(0, sanitizedStart);
      sanitizedStart = Math.min(23.75, sanitizedStart);
      
      return sanitizedStart
    }

    const doDrag = (mouseMoveEvent) => {
      setTop(renderSettings.hourHeight * (calculateStartHour(mouseMoveEvent) - renderSettings.renderStartTime));
    };

    const stopDragging = (mouseEvent) => {
        window.removeEventListener('mousemove', doDrag);
        window.removeEventListener('mouseup', stopDragging);
        document.body.style.cursor = 'auto';
        dispatch(updateActivityAsync(
          {...activity, start: moment(activity.start).set({hour: calculateStartHour(mouseEvent)}).toISOString()}));
    };

    mouseDownEvent.preventDefault();
    mouseDownEvent.stopPropagation();
    document.body.style.cursor = 'move';

    const startY = mouseDownEvent.clientY;
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDragging);
  }

  if(!activity.start || !activity.duration){
    return <></>
  }

  return (
    // <div className={styles.calenderItemContainer}>
      <div className={styles.calendarItem}
        style={{ 
          height: `${height}px`, 
          width: `${width}px`, 
          top: `${top}px`,
          left: `${left}px`}}

        onMouseDown={startDragging}>

        <span className={styles.calendarItemLabel}>
            {activity.name}
        </span>
        
        <div className={styles.calendarItemResizeHandle}
            onMouseDown={handleResizing}
        />
      </div>
    // </div>
  );
}