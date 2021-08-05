import React, {useState, useEffect} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import BaseStats from "./BaseStats";
import EvolutionTab from "./EvolutionTab";
import Moves from "./Moves";
import PokemonDetails from "./PokemonDetails";
import TabPanel from './TabPanel';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  genera,
  flavorText,
  modalData,
  height,
  weight,
  abilities,
  moveSet,
  stats,
  types,
}) {
  // State
  const [value, setValue] = useState(0);
  const [isAboutTextEnglish, setIsAboutTextEnglish] = useState(true);
  const [englishAboutTextIndex, setEnglishAboutTextIndex] = useState(0);
  const [isSpeciesTextEnglish, setIsSpeciesTextEnglish] = useState(true);
  const [englishSpeciesTextIndex, setEnglishSpeciesTextIndex] = useState(0);
  // create function that updates setAboutTextIsEnglish state to true

  //console.log(`array is array`, Array.isArray(flavor_text_entries)) *** true


  // const findEnglishText = (pathName) => {
  //   let found = false;
  //   let i = 0;
  //   const pathNameEntries = modalData[pathName];

  //   if (pathName === "flavor_text_entries") {
  //     setIsAboutTextEnglish(found);
  //     while (found === false) {
  //       setEnglishAboutTextIndex(i);

  //       if (pathNameEntries?.[i]?.["language"]?.name === "en") {
  //         found = true;
  //         setIsAboutTextEnglish(found);
  //         setEnglishAboutTextIndex(i);
  //       }
  //       i++;
  //     }
  //   }
  //   if (pathName === "genera") {
  //     setIsSpeciesTextEnglish(found);

  //     while (found === false) {
  //       setEnglishSpeciesTextIndex(i);

  //       if (pathNameEntries?.[i]?.["language"]?.name === "en") {
  //         found = true;
  //         setIsSpeciesTextEnglish(found);
  //         setEnglishSpeciesTextIndex(i);
  //       }
  //       i++;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const flavorText = findEnglishText("flavor_text_entries")
  //   const generaText = findEnglishText("genera");
  //   // eslint-disable-next-line
  // }, []);

  //
  const handleChange = (event, newValue) => {
    console.log(`newValue`,newValue)
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="pokemon-modal-tabs"
          variant="fullWidth">
          {/* TAB TITLES */}
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Base Stats" {...a11yProps(1)} />
          <Tab label="Evolutions" {...a11yProps(2)} />
          <Tab label="Moves" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <div className="modalTabContent">
        {/****** ABOUT TAB ******/}
        <TabPanel value={value} index={0}>
          <PokemonDetails
            // isAboutTextEnglish={isAboutTextEnglish}
            // modalData={modalData}
            // englishAboutTextIndex={englishAboutTextIndex}
            // englishSpeciesTextIndex={englishSpeciesTextIndex}
            // isSpeciesTextEnglish={isSpeciesTextEnglish}
            genera={genera}
            flavorText={flavorText}
            height={height}
            weight={weight}
            abilities={abilities}
          />
        </TabPanel>

        {/****** BASE STATS TAB ******/}
        <TabPanel value={value} index={1}>
          <BaseStats stats={stats} types={types} />
        </TabPanel>
        {/****** EVOLUTION TAB ******/}
        <TabPanel value={value} index={2}>
          <EvolutionTab evolutionChainUrl={modalData["evolution_chain"]?.url} />
        </TabPanel>

        {/****** MOVES TAB ******/}
        <TabPanel value={value} index={3}>
          <Moves moveSet={moveSet} />
        </TabPanel>
      </div>
    </Box>
  );
}
