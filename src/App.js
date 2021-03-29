import { useEffect, useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [selectedSide, setSelectedSide] = useState("corp");
  const [sides, setSides] = useState([]);
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

    fetch("https://netrunnerdb.com/api/2.0/public/sides")
      .then(res => res.json())
      .then(response => {
        response.data[0].label = "Corp";
        response.data[0].value = "corp";
        setSides(response.data);
      })
    ;
  }, [])

  /*
  ChangeSide = (selectedOption) => {
    setSelectedSide(selectedOption);
  }
  
  ChangeSide(optionSelected) {
    setSelectedSide(optionSelected.value);
  }
*/
  return (
    <div className="App">
      <span>Side: </span>
      <Select
        options = {sides}
      />
      {/*
      <select onChange={this.ChangeSide} value={selectedSide}>
        {
          sides.sort((a, b) => a.name.localeCompare(b.name)).map((side, index) => (
            <option value={side.code}>{side.name}</option>
          ))
        }
      </select>
      */}

      <span>&emsp;Faction: </span>
      <select>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>

      <span>&emsp;{selectedSide}</span>

      <hr />

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
