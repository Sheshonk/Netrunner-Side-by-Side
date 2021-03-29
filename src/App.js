import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    fetch("https://netrunnerdb.com/api/2.0/public/cards")
      .then(res => res.json())
      .then(response => {
        setCards(response.data);
      })
    ;
    
    fetch("https://netrunnerdb.com/api/2.0/public/cycles")
      .then(res => res.json())
      .then(response => {
        setCycles(response.data);
      })
    ;
  }, [])

  return (
    <div className="App">
      <h1>Corp</h1>
      <h2>Identites</h2>

      {cards.filter(card => card.side_code === "corp" && card.type_code === "identity").map((card, index) => (
          <div className="card" key={index}>
            {card.title}
          </div>
      ))}

      <h2>Agendas</h2>
      <h2>Operations</h2>
      <h2>Assets</h2>
      <h2>Upgrades</h2>
      <h2>Ice</h2>
    </div>
  );
}

function Card(props) {
  //console.log(props.card);

  if (props.card.side_code === "side_code" && props.card.type_code === "identity") {
    return (
      <div className="card" key={props.index}>
        {props.card.title}
      </div>
    );
  }
  else {
    return (null);
  }
}

export default App;
