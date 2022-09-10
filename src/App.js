import { useEffect, useState } from 'react';
import './App.css';

/*
rob types
*/

function App() {
  const [cards, setCards] = useState([]);
  const [factions, setFactions] = useState([]);
  const [formats, setFormats] = useState([]);
  const [selectedFactionCode, setSelectedFactionCode] = useState("");
  const [selectedFactionCodes, setSelectedFactionCodes] = useState(["haas-bioroid", "jinteki", "nbn", "weyland-consortium", "neutral-corp"]); //TODO: load from hook
  const [selectedFormat, setSelectedFormat] = useState("startup");
  const [selectedSideCode, setSelectedSideCode] = useState("");
  const [sides, setSides] = useState([]);
  const [types, setTypes] = useState([]);

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

    fetch("https://netrunnerdb.com/api/2.0/public/mwl")
      .then(res => res.json())
      .then(response => {
        let f = [
          {
            code: "standard",
            name: "Standard",
            packs: [
              "oac", /*Order and Chaos*/
              "dad", /*Data and Destiny*/
              "kg", /*Mumbad - Kala Ghoda*/
              "bf", /*Mumbad - Business First*/
              "dag", /*Mumbad - Democracy and Dogma*/
              "si", /*Mumbad - Salsette Island*/
              "tlm", /*Mumbad - The Liberated Mind*/
              "ftm", /*Mumbad - Fear the Masses*/
              "23s", /*Flashpoint - 23 Seconds*/
              "bm", /*Flashpoint - Blood Money*/
              "es", /*Flashpoint - Escalation*/
              "in", /*Flashpoint - Intervention*/
              "ml", /*Flashpoint - Martial Law*/
              "qu", /*Flashpoint - Quorum*/
              "dc", /*Red Sand - Daedalus Complex*/
              "so", /*Red Sand - Station One*/
              "eas", /*Red Sand - Earth's Scion*/
              "baw", /*Red Sand - Blood and Water*/
              "fm", /*Red Sand - Free Mars*/
              "cd", /*Red Sand - Crimson Dust*/
              "ss", /*Kitara - Sovereign Sight*/
              "dtwn", /*Kitara - Down the White Nile*/
              "cotc", /*Kitara - Council of the Crest*/
              "tdatd", /*Kitara - The Devil and the Dragon*/
              "win", /*Kitara - Whispers in Nalubaale*/
              "ka", /*Kitara - Kampala Ascendent*/
              "rar", /*Reign and Reverie*/
              "mo", /*Magnum Opus*/
              "df", /*Ashes - Downfall*/
              "ur", /*Ashes - Uprising*/
              "sg", /*System Gateway*/ 
              "su21", /*System Update 2021*/
              "ms", /*Midnight Sun*/
            ],
            bans: [
              "30076", /*Catalyst*/ 
              "30077", /*Syndicate*/ 
            ]
          },{
            code: "startup",
            name: "Startup",
            packs: [
              "df", /*Ashes - Downfall*/
              "ur", /*Ashes - Uprising*/
              "sg", /*System Gateway*/ 
              "su21", /*System Update 2021*/
              "ms", /*Midnight Sun*/
            ],
            bans: [
              "30076", /*Catalyst*/ 
              "30077", /*Syndicate*/ 
            ]
          },{
            code: "system-gateway",
            name: "System Gateway",
            packs: [
              "sg", /*System Gateway*/ 
            ],
            bans: [
              "30076", /*Catalyst*/ 
              "30077", /*Syndicate*/ 
            ]
          }
        ];

        let bans = Object.keys(response.data.filter(mwl => mwl.code === "standard-ban-list-22-08")[0].cards);
        let standard = f.filter(format => format.code === "standard")[0];
        standard.bans = standard.bans.concat(bans);
        setFormats(f);
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

  function RenderCard(code, title, index) {
    return (
      <a key={index} href={`https://netrunnerdb.com/en/card/${code}`} rel="noreferrer" target="_blank">
        <img alt={title} className="card-image" src={`https://static.nrdbassets.com/v1/large/${code}.jpg`} />
      </a>
    );
  }

  function RenderCards(title, typeCode) {
    let filteredCards = cards;
    let filteredFormat = formats.filter(format => format.code === selectedFormat)[0];

    filteredCards = filteredCards.filter(card => card.side_code === selectedSideCode && card.type_code === typeCode && filteredFormat.packs.includes(card.pack_code) && !filteredFormat.bans.includes(card.code) && selectedFactionCodes.includes(card.faction_code))

    //remove dups
    let x = 0;
    while (x < filteredCards.length) {
      let y = x + 1;
      while (y < filteredCards.length) {
        if (filteredCards[x].title === filteredCards[y].title) {
          filteredCards.splice(y, 1);
        }
        y++;
      }
      x++;
    }

    if (typeCode === "agenda") { //TODO: pass sort in as parameter
      filteredCards = filteredCards.sort((a, b) => a.faction_code.localeCompare(b.faction_code) || b.agenda_points - a.agenda_points || a.advancement_cost - b.advancement_cost || a.title.localeCompare(b.title));
    } else if (typeCode === "ice") {
      filteredCards = filteredCards.sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.cost - b.cost);
    } else {
      filteredCards = filteredCards.sort((a, b) => a.faction_code.localeCompare(b.faction_code) || a.title.localeCompare(b.title));
    }

    if (selectedSideCode === "corp" && typeCode === "ice") {
      return ( 
        <>
          {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

          <h4>Barrier</h4>
          {
            filteredCards.filter(card => card.keywords.includes("Barrier")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Code Gate</h4>
          {
            filteredCards.filter(card => card.keywords.includes("Code Gate")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Sentry</h4>
          {
            filteredCards.filter(card => card.keywords.includes("Sentry")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Other</h4>
          {
            filteredCards.filter(card => !card.keywords.includes("Barrier") && !card.keywords.includes("Code Gate") && !card.keywords.includes("Sentry")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }
        </>
      )
    } else if (selectedSideCode === "runner" && typeCode === "program") {
      return (
        <>
          {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

          <h4>Fracter</h4>
          {
            filteredCards.filter(card => card.keywords && card.keywords.includes("Fracter")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Decoder</h4>
          {
            filteredCards.filter(card => card.keywords && card.keywords.includes("Decoder")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Killer</h4>
          {
            filteredCards.filter(card => card.keywords && card.keywords.includes("Killer")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>AI</h4>
          {
            filteredCards.filter(card => card.keywords && card.keywords.includes("AI")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Other</h4>
          {
            filteredCards.filter(card => !card.hasOwnProperty("keywords") || (card.keywords && !card.keywords.includes("Icebreaker"))).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }
        </>
      )
    } else if (selectedSideCode === "runner" && typeCode === "hardware") {
      return (
        <>
          {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

          <h4>Console</h4>
          {
            filteredCards.filter(card => card.keywords && card.keywords.includes("Console")).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Other</h4>
          {
            filteredCards.filter(card => !card.hasOwnProperty("keywords") || (card.keywords && !card.keywords.includes("Console"))).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }
        </>
      )
    } else if (selectedSideCode === "corp" && (typeCode === "asset" || typeCode === "operation")) {
      return (
        <>
          {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

          <h4>Econ</h4>
          {
            filteredCards.filter(card => card.text.search(/(take|gain) \d+\[credit\]/i) >= 0 || card.text.search(/\d+\[recurring-credit\]/i) >= 0).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Draw</h4>
          {
            filteredCards.filter(card => card.text.search(/draw/i) >= 0).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Punishment</h4>
          {
            filteredCards.filter(card => card.text.search(/damage|tag/i) >= 0 || card.text.search(/loses \d+\[credit\]/i) >= 0 || card.text.search(/trash \d+ installed/i) >= 0).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Other</h4>
          {
            filteredCards.filter(card => card.text.search(/(take|gain) \d+\[credit\]/i) === -1 && card.text.search(/draw/i) === -1 && card.text.search(/damage|tag/i) === -1 && card.text.search(/loses \d+\[credit\]/i) === -1 && card.text.search(/trash \d+ installed/i) === -1 && card.text.search(/\d+\[recurring-credit\]/i) === -1).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }
        </>
      )
    } else if (selectedSideCode === "runner" && (typeCode === "resource" || typeCode === "event")) {
      return (
        <>
          {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

          <h4>Econ</h4>
          {
            filteredCards.filter(card => card.text.search(/(take|gain) \d+\[credit\]/i) >= 0 || card.text.search(/paying \d+\[credit\] less/i) >= 0 || card.text.search(/\d+\[recurring-credit\]/i) >= 0 || card.text.search(/spend hosted credits/i) >= 0).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Draw</h4>
          {
            filteredCards.filter(card => card.text.search(/draw/i) >= 0).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }

          <h4>Other</h4>
          {
            filteredCards.filter(card => card.text.search(/(take|gain) \d+\[credit\]/i) === -1 && card.text.search(/draw/i) === -1 && card.text.search(/paying \d+\[credit\] less/i) === -1 && card.text.search(/\d+\[recurring-credit\]/i) === -1 && card.text.search(/spend hosted credits/i) === -1).map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }
        </>
      )
    } else {
      return ( 
        <>
          {filteredCards.length > 0 ? <h2>{title}</h2> : (null)}

          {
            filteredCards.map((card, index) => (
              RenderCard(card.code, card.title, index)
            ))
          }
        </>
      )
    }
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
        types.sort((a, b) => a.position - b.position).map((type) => (
          RenderCards(type.name, type.code)
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
