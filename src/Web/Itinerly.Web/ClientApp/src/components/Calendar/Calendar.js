import styles from './Calendar.module.css';
import moment, { duration } from 'moment';
import {filter, sortBy} from 'lodash';
import { TIME_UNITS } from '../../constants';

export const Calendar = ({ events, days }) => {
    return (
        <div className={styles.multiday}>
            <div>
                {Array(24).fill(null).map((_, idx) => (
                    <div key={`segment-${idx}`} className={styles.hour}>
                        <span className={styles.hourlabel}>{idx}</span>
                    </div>
                ))}
            </div>
            {days.map((date, index) => (
                <Day activities={events} date={date} key={`day-${index}`}/>
            ))}
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
            {activities.map(({id, duration, start}, idx) => (
                <CalendarItem key={`item-${idx}`} duration={duration} start={moment(start).hour()}/>
            ))}
        </div>
    );
}

const CalendarItem = ({name, duration, start, children}) => {
    const style = {
      position: `relative`,
      height: `calc((100% / 24) * ${duration})`,
      top: `calc((100% / 24) * ${start})`
    };

    return (
        <div className={styles.calendarItem} style={style}>
            {name}
        </div>
    );
}

export default Calendar;
