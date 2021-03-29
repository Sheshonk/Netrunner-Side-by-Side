import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [cycles, setCycles] = useState([]);
  const bannedCards = ["30077"]; //TODO: add more
  const packs = ["sg", "su21", "df", "ur"];

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
      {cards.filter(card => card.side_code === "corp" && card.type_code === "identity" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      <h2>Agendas</h2>
      {cards.filter(card => card.side_code === "corp" && card.type_code === "agenda" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || b.agenda_points - a.agenda_points || a.advancement_cost - b.advancement_cost || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      <h2>Operations</h2>
      {/*
      Econ
      Card Draw
      Tutor
      Additional Clicks
      Kill
      Recursion
      Lockdown

      Other
      */}
      {cards.filter(card => card.side_code === "corp" && card.type_code === "operation" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      <h2>Assets</h2>
      {/*
      Econ
      Card Draw
      Tutor
      Additional Clicks
      Kill
      Recursion
      Lockdown

      Other
      */}
      {cards.filter(card => card.side_code === "corp" && card.type_code === "asset" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      <h2>Upgrades</h2>
      {cards.filter(card => card.side_code === "corp" && card.type_code === "upgrade" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      <h2>Ice</h2>
      {/*
      Barrier
      Code Gate
      Sentry
      Other
      */}
      {cards.filter(card => card.side_code === "corp" && card.type_code === "ice" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}
    </div>
  );
}

export default App;
