import styles from './Calendar.module.css';
import { useEffect, useState } from 'react';
import { updateActivityAsync } from '../../state/activities';
import { useDispatch } from 'react-redux';
import moment from 'moment';

export const CalendarItem = ({activity, renderSettings}) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState();
  const [top, setTop] = useState();
  
  useEffect(() => {
    if(renderSettings.hourHeight) {
      setHeight(renderSettings.hourHeight * activity.duration);
      setTop(renderSettings.hourHeight * (moment(activity.start).hour() - renderSettings.renderStartTime));
    }
  }, [activity, renderSettings]);

  const startResizing = (mouseDownEvent) => {
    const startY = mouseDownEvent.clientY;

    const calculateDuration = (mouseEvent) => {
      const newHeight = height + (mouseEvent.clientY - startY);
      const newDuration = newHeight / renderSettings.hourHeight;

      let sanitizedDuration = Math.round(newDuration / 0.25) * 0.25;
      sanitizedDuration = Math.max(0.25, sanitizedDuration);
      sanitizedDuration = Math.min(
        sanitizedDuration, 
        renderSettings.renderStartTime + renderSettings.renderDuration - moment(activity.start).hour());
      
        return sanitizedDuration
    }

    const doResize = (mouseMoveEvent) => {
      setHeight(renderSettings.hourHeight * calculateDuration(mouseMoveEvent));
    };

    const stopResizing = (mouseEvent) => {
        window.removeEventListener('mousemove', doResize);
        window.removeEventListener('mouseup', stopResizing);
        document.body.style.cursor = 'auto';
        dispatch(updateActivityAsync({...activity, duration: calculateDuration(mouseEvent)}));
    };

    console.log('resizing...');
    mouseDownEvent.preventDefault();
    mouseDownEvent.stopPropagation();
    document.body.style.cursor = "ns-resize";

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResizing);
  };

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

    console.log('dragging...');
    mouseDownEvent.preventDefault();
    mouseDownEvent.stopPropagation();
    document.body.style.cursor = 'move';
    console.log(`dragging ${activity.name}...`);

    const startY = mouseDownEvent.clientY;
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDragging);
  }

  return (
    <div className={styles.calenderItemContainer}>
      <div className={styles.calendarItem}
        style={{ height: `${height}px`, top: `${top}px` }}
        onMouseDown={startDragging}>

        <span className={styles.calendarItemLabel}>
            {activity.name}
        </span>
        
        <div className={styles.calendarItemResizeHandle}
            onMouseDown={startResizing}
        />
      </div>
    </div>
  );
}