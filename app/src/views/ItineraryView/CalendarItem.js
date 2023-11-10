import styles from './Calendar.module.css';
import { useEffect, useState } from 'react';
import { updateActivityAsync } from '../../state/activities';
import { useDispatch } from 'react-redux';

export const CalendarItem = ({activity, name, duration, start, renderSettings}) => {
  const dispatch = useDispatch();
  // const {updateActivity} = useSelectedProject();
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

    const calculateDuration = (mouseMoveEvent) => {
      const newHeight = height + (mouseMoveEvent.clientY - startY);
      const newDuration = newHeight / hourHeight;

      let sanitizedDuration = Math.round(newDuration / 0.25) * 0.25;
      sanitizedDuration = Math.max(0.25, sanitizedDuration);
      sanitizedDuration = Math.min(
        sanitizedDuration, 
        renderSettings.renderStartTime + renderSettings.renderDuration - start);
      
        return sanitizedDuration
    }

    const doResize = (mouseMoveEvent) => {
      setHeight(hourHeight * calculateDuration(mouseMoveEvent));
    };

    const stopResizing = (mouseMoveEvent) => {
        window.removeEventListener('mousemove', doResize);
        window.removeEventListener('mouseup', stopResizing);
        document.body.style.cursor = 'auto';
        dispatch(updateActivityAsync({...activity, duration: calculateDuration(mouseMoveEvent)}));
    };

    mouseDownEvent.preventDefault();
    document.body.style.cursor = "ns-resize";

    const startY = mouseDownEvent.clientY;
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