import styles from './Calendar.module.css';
import moment from 'moment';
import {filter, sortBy} from 'lodash';
import { TIME_UNITS } from '../../constants';
import {range} from 'lodash';
import { CalendarItem } from './CalendarItem';

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
    const today = moment(date);

    const todaysEvents = sortBy(
        filter(activities, ev => moment(ev.start).isSame(today, TIME_UNITS.DAY)),
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
