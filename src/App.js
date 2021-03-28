import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    fetch("https://netrunnerdb.com/api/2.0/public/cycles")
      .then(res => res.json())
      .then(response => {
        setCycles(response.data);
        setIsLoading(false);
      })
    ;
  })

  return (
    <div className="App">
      {isLoading && <h1>Loading...</h1>}

      {cycles.map((cycle, index) => (
        <h3 key={index}>{cycle.name}: {cycle.code}</h3>
      ))}
    </div>
  );
}

export default App;
