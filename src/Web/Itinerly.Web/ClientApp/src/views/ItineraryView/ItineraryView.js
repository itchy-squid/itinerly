import React, { useEffect, useState } from 'react';
import { firestore } from '../../services/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import moment from 'moment';
import { toast } from 'react-toastify';

export const ItineraryView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const db = firebase.firestore();
        const querySnapshot = await getDocs(collection(firestore, "activities"))

        const docs = querySnapshot.docs.map(
          (doc) => {
            const data = doc.data();

            return {
              ...data,
              id: doc.id
            };
          });

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

  const renderForecastsTable = (records) => {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record =>
            <tr key={record.id}>
              <td>{record.name}</td>
            </tr>
          )}
        </tbody>
      </table>
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

