import { useEffect, useState } from 'react';
import './App.css';

/*
format drop down
banned list
DRY card display
runner cards
rob types
*/

function App() {
  const [cards, setCards] = useState([]);
  const [factions, setFactions] = useState([]);
  const [selectedFactionCode, setSelectedFactionCode] = useState("");
  const [selectedFactionCodes, setSelectedFactionCodes] = useState(["haas-bioroid", "jinteki", "nbn", "weyland-consortium", "neutral-corp"]);
  const [selectedSideCode, setSelectedSideCode] = useState("");
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
        setSelectedSideCode(response.data[0].code);
      })
    ;
  }, [])

  function OnChangeFaction(event) {
    let newVal = event.target.value;
    
    setSelectedFactionCode(newVal);
    if (newVal === "") {
      setSelectedFactionCodes(factions.filter(faction => faction.side_code === selectedSideCode).map(faction => faction.code));
    } else {
      setSelectedFactionCodes(["neutral-corp", "neutral-runner", newVal]);
    }
  }

  function OnChangeSide(event) {
    let newVal = event.target.value;
    
    setSelectedSideCode(newVal);
    setSelectedFactionCodes(factions.filter(faction => faction.side_code === newVal).map(faction => faction.code));
  }

  return (
    <div className="App">
      <span>Format: </span>
      <select></select>

      <span>&emsp;Side: </span>
      <select onChange={OnChangeSide} value={selectedSideCode}>
        {
          sides.sort((a, b) => a.name.localeCompare(b.name)).map((side, index) => (
            <option key={index} value={side.code}>{side.name}</option>
          ))
        }
      </select>
      

      <span>&emsp;Faction: </span>
      <select onChange={OnChangeFaction} value={selectedFactionCode}>
        <option value="">All</option>
        {
          factions.filter(faction => faction.side_code === selectedSideCode).sort((a, b) => a.name.localeCompare(b.name)).map((faction, index) => (
            <option key={index} value={faction.code}>{faction.name}</option>
          ))
        }
      </select>
  
      <hr />

      <h2>Identites</h2>
      {cards.filter(card => card.side_code === selectedSideCode && card.type_code === "identity" && packs.includes(card.pack_code) && !bannedCards.includes(card.code) && selectedFactionCodes.includes(card.faction_code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSideCode === "corp" ? <h2>Agendas</h2> : (null)}
      {cards.filter(card => card.side_code === selectedSideCode && card.type_code === "agenda" && packs.includes(card.pack_code) && !bannedCards.includes(card.code) && selectedFactionCodes.includes(card.faction_code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || b.agenda_points - a.agenda_points || a.advancement_cost - b.advancement_cost || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSideCode === "corp" ? <h2>Operations</h2> : (null)}
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
      {cards.filter(card => card.side_code === selectedSideCode && card.type_code === "operation" && packs.includes(card.pack_code) && !bannedCards.includes(card.code) && selectedFactionCodes.includes(card.faction_code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSideCode === "corp" ? <h2>Assets</h2> : (null)}
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
      {cards.filter(card => card.side_code === selectedSideCode && card.type_code === "asset" && packs.includes(card.pack_code) && !bannedCards.includes(card.code) && selectedFactionCodes.includes(card.faction_code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSideCode === "corp" ? <h2>Upgrades</h2> : (null)}
      {cards.filter(card => card.side_code === selectedSideCode && card.type_code === "upgrade" && packs.includes(card.pack_code) && !bannedCards.includes(card.code) && selectedFactionCodes.includes(card.faction_code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}

      {selectedSideCode === "corp" ? <h2>Ice</h2> : (null)}
      {/*
      Barrier
      Code Gate
      Sentry
      Other
      */}
      {cards.filter(card => card.side_code === selectedSideCode && card.type_code === "ice" && packs.includes(card.pack_code) && !bannedCards.includes(card.code) && selectedFactionCodes.includes(card.faction_code)).sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title)).map((card, index) => (
        <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
      ))}
    </div>
  );
}

export default App;
