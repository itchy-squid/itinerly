import styles from './Calendar.module.css';

export const Calendar = ({ events, days }) => {
    console.log(events);
    return (
        <div className={styles.calendar}>
            <div className="hour-labels">
                {/* Render hour labels here. Perhaps map through an array of hours. */}
            </div>
            {days.map((day) => (
                <Day events={events} day={day} key={day}/>
            ))}
        </div>
    );
}

function Day({ day, events }) {
    return (
        <div className={styles.day}>
            {day}<br/>
            {events.map(event => <Event key={event.id} {...event} />)}
        </div>
    );
}

function Event({ id, name, startHour, duration }) {
    const style = {
        gridColumn: 'span 1',
        gridRow: `span ${duration}`
    };

    return (
        <div className="event">
            {name}
        </div>
    );
}

export default Calendar;
