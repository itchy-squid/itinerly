import styles from './Calendar.module.css';
import moment from 'moment';
import {filter, sortBy} from 'lodash';
import { TIME_UNITS } from '../../constants';
import {range} from 'lodash';


export const Calendar = ({ activities, days }) => {
    const renderSettings = { 
        renderStartTime: 16,
        renderDuration: 8
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
                    <Day activities={activities} date={date} key={`day-${index}`} renderSettings={renderSettings} />
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
            {todaysEvents.map(({id, name, duration, start}, idx) => (
                <CalendarItem key={`item-${id}`} name={name} duration={duration} start={moment(start).hour()} renderSettings={renderSettings}/>
            ))}
        </div>
    );
}

const CalendarItem = ({name, duration, start, renderSettings}) => {
    const style = {
      position: `relative`,
      height: `calc(var(--hour-height) * ${duration})`,
      top: `calc(var(--hour-height) * (${start - renderSettings.renderStartTime}))`
    };

    return (
        <div className={styles.calendarItem} style={style}>
            <span className={styles.calendarItemLabel}>
                {name}
            </span>
        </div>
    );
}

export default Calendar;
