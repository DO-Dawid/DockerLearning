import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Brak połączenia z backendem');

  useEffect(() => {
    axios.get('http://localhost:8000/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(err => {
        console.error(err);
        setMessage('Błąd połączenia z backendem');
      });
  }, []);

  return (
    <div style={{ margin: 30 }}>
      <h1>React + Django + MSSQL</h1>
      <p>Wiadomość z backendu: {message}</p>
    </div>
  );
}

export default App;
