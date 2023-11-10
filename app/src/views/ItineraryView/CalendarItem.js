import styles from './Calendar.module.css';
import { useEffect, useState } from 'react';
import { updateActivityAsync } from '../../state/activities';
import { useDispatch } from 'react-redux';
import moment from 'moment';

export const CalendarItem = ({activity, start, renderSettings}) => {
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

    const calculateDuration = (mouseEvent) => {
      const newHeight = height + (mouseEvent.clientY - startY);
      const newDuration = newHeight / renderSettings.hourHeight;

      let sanitizedDuration = Math.round(newDuration / 0.25) * 0.25;
      sanitizedDuration = Math.max(0.25, sanitizedDuration);
      sanitizedDuration = Math.min(
        sanitizedDuration, 
        renderSettings.renderStartTime + renderSettings.renderDuration - start);
      
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

    mouseDownEvent.preventDefault();
    document.body.style.cursor = "ns-resize";

    const startY = mouseDownEvent.clientY;
    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResizing);
  };

  return (
    <div className={styles.calenderItemContainer}>
      <div className={styles.calendarItem}
        style={{
          height: `${height}px`,
          top: `${top}px`,
        }}>

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