import { useEffect, useState } from 'react';
import './App.css';

/*
banned list
runner cards
rob types
*/

function App() {
  const [cards, setCards] = useState([]);
  const [factions, setFactions] = useState([]);
  const [selectedFactionCode, setSelectedFactionCode] = useState("");
  const [selectedFactionCodes, setSelectedFactionCodes] = useState(["haas-bioroid", "jinteki", "nbn", "weyland-consortium", "neutral-corp"]); //TODO: load from hook
  const [selectedFormat, setSelectedFormat] = useState("startup");
  const [selectedSideCode, setSelectedSideCode] = useState("");
  const [sides, setSides] = useState([]);
  const [types, setTypes] = useState([]);

  const formats = [
    {
      code: "eternal",
      name: "Eternal",
      packs: ["sg", "su21", "df", "ur"],
      bans: [
        "30076", /*Catalyst*/ 
        "30077", /*Syndicate*/ 
      ]
    },{
      code: "snapshot",
      name: "Snapshot",
      packs: ["sg", "su21", "df", "ur"],
      bans: [
        "30076", /*Catalyst*/ 
        "30077", /*Syndicate*/ 
      ]
    },{
      code: "standard",
      name: "Standard",
      packs: ["sg", "su21", "df", "ur"],
      bans: [
        "30076", /*Catalyst*/ 
        "30077", /*Syndicate*/ 
      ]
    },{
      code: "startup",
      name: "Startup",
      packs: ["sg", "su21", "df", "ur"],
      bans: [
        "30076", /*Catalyst*/ 
        "30077", /*Syndicate*/ 
      ]
    }
  ];

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

    fetch("https://netrunnerdb.com/api/2.0/public/types")
      .then(res => res.json())
      .then(response => {
        setTypes(response.data);
      })
    ;
  }, [])

  function OnChangeFaction(event) {
    let newVal = event.target.value;
    
    setSelectedFactionCode(newVal);
    if (newVal === "") { //TODO: do something better than magic string
      setSelectedFactionCodes(factions.filter(faction => faction.side_code === selectedSideCode).map(faction => faction.code));
    } else {
      setSelectedFactionCodes(["neutral-corp", "neutral-runner", newVal]);
    }
  }

  function OnChangeFormat(event) {
    setSelectedFormat(event.target.value);
  }

  function OnChangeSide(event) {
    let newVal = event.target.value;
    
    setSelectedSideCode(newVal);
    setSelectedFactionCodes(factions.filter(faction => faction.side_code === newVal).map(faction => faction.code));
  }

  function RenderCard(title, typeCode) {
    let filteredCards = cards;
    let filteredFormat = formats.filter(format => format.code === selectedFormat)[0];

    filteredCards = filteredCards.filter(card => card.side_code === selectedSideCode && card.type_code === typeCode && filteredFormat.packs.includes(card.pack_code) && !filteredFormat.bans.includes(card.code) && selectedFactionCodes.includes(card.faction_code))
    if (typeCode === "agenda") { //TODO: pass sort in as parameter
      filteredCards = filteredCards.sort((a, b) => a.faction_code.localeCompare(b.faction_code) || b.agenda_points - a.agenda_points || a.advancement_cost - b.advancement_cost || a.title.localeCompare(b.title))
    } else {
      filteredCards = filteredCards.sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title))
    }

    return ( 
      <>
        {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

        {
          filteredCards.map((card, index) => (
            <a href={`https://netrunnerdb.com/en/card/${card.code}`} rel="noreferrer" target="_blank">
              <img alt={card.title} className="card-image" key={index} src={`https://netrunnerdb.com/card_image/large/${card.code}.jpg`} />
            </a>
          ))
        }
      </>
    )
  }

  return (
    <div className="App">
      <span>Format: </span>
      <select onChange={OnChangeFormat} value={selectedFormat}>
        {
          formats.map((format, index) => (
            <option key={index} value={format.code}>{format.name}</option>
          ))
        }
      </select>

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
      {
        types.sort((a, b) => a.position - b.position).map((type, index) => (
          RenderCard(type.name, type.code)
        ))
      }
      {/*
      operation
        Econ
        Card Draw
        Tutor
        Additional Clicks
        Kill
        Recursion
        Lockdown
        Other
      asset
        Econ
        Card Draw
        Tutor
        Additional Clicks
        Kill
        Recursion
        Lockdown
        Other
      ice
        Barrier
        Code Gate
        Sentry
        Other
      */}
    </div>
  );
}

export default App;
