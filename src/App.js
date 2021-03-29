import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [factions, setFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedSide, setSelectedSide] = useState("corp");
  const [sides, setSides] = useState([]);

  const bannedCards = [/*Catalyst*/ "30076", /*Syndicate*/ "30077"]; //TODO: add more
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

    fetch("https://netrunnerdb.com/api/2.0/public/factions")
      .then(res => res.json())
      .then(response => {
        setFactions(response.data);
      })
    ;

    fetch("https://netrunnerdb.com/api/2.0/public/sides")
      .then(res => res.json())
      .then(response => {
        setSides(response.data);
      })
    ;
  }, [])

  function OnChangeFaction(event) {
    setSelectedFaction(event.target.value);
  }

  function OnChangeSide(event) {
    setSelectedFaction("");
    setSelectedSide(event.target.value);
  }

  return (
    <div className="App">
      <span>Format: </span>
      <select></select>

      <span>&emsp;Side: </span>
      <select onChange={OnChangeSide} value={selectedSide}>
        {
          sides.sort((a, b) => a.name.localeCompare(b.name)).map((side, index) => (
            <option value={side.code}>{side.name}</option>
          ))
        }
      </select>
      

      <span>&emsp;Faction: </span>
      <select onChange={OnChangeFaction} value={selectedFaction}>
        <option value={null}>All</option>
        {
          factions.filter(faction => faction.side_code === selectedSide).sort((a, b) => a.name.localeCompare(b.name)).map((faction, index) => (
            <option value={faction.code}>{faction.name}</option>
          ))
        }
      </select>
  
      <hr />

      <h2>Identites</h2>
      {cards.filter(card => card.side_code === selectedSide && card.type_code === "identity" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSide === "corp" ? <h2>Agendas</h2> : (null)}
      {cards.filter(card => card.side_code === selectedSide && card.type_code === "agenda" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || b.agenda_points - a.agenda_points || a.advancement_cost - b.advancement_cost || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSide === "corp" ? <h2>Operations</h2> : (null)}
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
      {cards.filter(card => card.side_code === selectedSide && card.type_code === "operation" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSide === "corp" ? <h2>Assets</h2> : (null)}
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
      {cards.filter(card => card.side_code === selectedSide && card.type_code === "asset" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSide === "corp" ? <h2>Upgrades</h2> : (null)}
      {cards.filter(card => card.side_code === selectedSide && card.type_code === "upgrade" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSide === "corp" ? <h2>Ice</h2> : (null)}
      {/*
      Barrier
      Code Gate
      Sentry
      Other
      */}
      {cards.filter(card => card.side_code === selectedSide && card.type_code === "ice" && packs.includes(card.pack_code) && !bannedCards.includes(card.code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}
    </div>
  );
}

export default App;
