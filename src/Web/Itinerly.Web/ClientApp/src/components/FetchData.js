import React, { useEffect, useState } from 'react';
import { firestore } from '../services/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import moment from 'moment';

export const FetchData = () => {
    const displayName = FetchData.name;
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const db = firebase.firestore();
                const querySnapshot = await getDocs(collection(firestore, "weatherforecasts"))
                console.log(querySnapshot);

                const docs = querySnapshot.docs.map(
                    (doc) => {
                        const data = doc.data();

                        return {
                            ...data,
                            id: doc.id,
                            date: moment(data.Date.toDate())
                        };
                    });
                console.log(docs);

                setForecasts(docs);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const renderForecastsTable = (forecasts) => {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.id}>
                            <td>{forecast.date.format('YYYY-MM-DD')}</td>
                            <td>{forecast.TemperatureC}</td>
                            <td>{forecast.Summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderForecastsTable(forecasts);

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
}