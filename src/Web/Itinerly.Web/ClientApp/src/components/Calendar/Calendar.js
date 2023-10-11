import styles from './Calendar.module.css';
import moment, { duration } from 'moment';
import {filter, sortBy} from 'lodash';
import { TIME_UNITS } from '../../constants';

export const Calendar = ({ events, days }) => {
    return (
        <div className={styles.calendar}>
            <div>
                {Array(24).fill(null).map((_, idx) => (
                    <div key={`segment-${idx}`} className={styles.hour}>
                        <span className={styles.hourlabel}>{idx}</span>
                    </div>
                ))}
            </div>
            <div className={styles.daysContainer}>
                {days.map((date, index) => (
                    <Day activities={events} date={date} key={`day-${index}`}/>
                ))}
            </div>
        </div>
    );
}

const Day = ({ date, activities }) => {
    const today = moment(date);

    const todaysEvents = sortBy(
        filter(activities, ev => moment(ev.start).isSame(today, TIME_UNITS.DAY)),
        ev => ev.start);

    return (
        <div className={styles.day}>
            {todaysEvents.map(({id, name, duration, start}, idx) => (
                <CalendarItem key={`item-${id}`} name={name} duration={duration} start={moment(start).hour()}/>
            ))}
        </div>
    );
}

const CalendarItem = ({name, duration, start}) => {
    const style = {
      position: `relative`,
      height: `calc((100% / 24) * ${duration})`,
      top: `calc((100% / 24) * ${start})`
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
