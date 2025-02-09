import React, { useEffect, useState } from 'react';
import SeminarList from './components/SeminarList/SeminarList';
import './App.css';

function App() {
    const [seminars, setSeminars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //Получение данных о семинарах от json-server
        const fetchSeminars = async () => {
            try {
                const response = await fetch('http://localhost:3000/seminars');
                if (!response.ok) throw new Error('Ошибка загрузки данных');
                const data = await response.json();
                setSeminars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSeminars();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="App">
            <h1>Семинары</h1>
            <SeminarList seminars={seminars} setSeminars={setSeminars} />
        </div>
    );
}

export default App;