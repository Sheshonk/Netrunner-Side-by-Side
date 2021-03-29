import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [cycles, setCycles] = useState([]);
  const packs = ["sg", "su21", "df", "ur", "urbp"];

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

      {cards.filter(card => card.side_code === "corp" && card.type_code === "identity" && packs.includes(card.pack_code)).sort((a, b) => (a.title > b.title) ? 1 : -1).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      <h2>Agendas</h2>
      <h2>Operations</h2>
      <h2>Assets</h2>
      <h2>Upgrades</h2>
      <h2>Ice</h2>
    </div>
  );
}

export default App;
