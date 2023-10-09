import React, { useEffect, useState } from 'react';
import { activityService } from '../../services/firestore';
import moment from 'moment';
import { toast } from 'react-toastify';
import { CalendarView } from '../CalendarView';

export const ItineraryView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await activityService.getActivities('1');
        console.log(docs);
        setData(docs);
      }
      catch (err) {
        toast.error(err);
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderForecastsTable = (events) => {
    return (
      <CalendarView events={events}/>
    );
  }

  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderForecastsTable(data);

  return (
    <div>
      <h1 id="tableLabel">Itinerary</h1>
      <p>List itinerary details and activities.</p>
      {contents}
    </div>
  );
}

