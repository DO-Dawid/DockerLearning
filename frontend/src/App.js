import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState(''); // Domyślnie pusty ciąg
  const [loading, setLoading] = useState(true); // Dodano stan ładowania
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/hello')
      .then(response => {
        console.log('Odpowiedź z backendu:', response.data); // Debugowanie odpowiedzi
        setMessage(response.data.message || 'Nieoczekiwana odpowiedź z backendu');
      })
      .catch(err => {
        console.error('Błąd przy żądaniu do /hello:', err); // Debugowanie błędu
        setMessage('Błąd połączenia z backendem');
      })
      .finally(() => {
        setLoading(false); // Zakończenie ładowania
      });
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/expenses/');
      console.log('Wydatki:', response.data); // Debugowanie odpowiedzi
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/expenses/', {
        description,
        amount,
      });
      setDescription('');
      setAmount('');
      fetchExpenses(); // Odśwież dane po dodaniu wydatku
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div style={{ margin: 30 }}>
      <h1>React + Django + MSSQL</h1>
      <p>
        {loading
          ? 'Ładowanie...'
          : `Wiadomość z backendu: ${message}`}
      </p>
      <div style={{ margin: '20px' }}>
        <h1>Dodaj wydatek</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Opis: </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Kwota: </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit">Dodaj</button>
        </form>

        <h2>Lista wydatków</h2>
        <button onClick={fetchExpenses}>Odśwież</button>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} - {expense.amount} PLN ({expense.date})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
