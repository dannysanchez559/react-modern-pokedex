import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EvolutionTab from "./EvolutionTab";
import Moves from "./Moves";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ div: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  modalData,
  height,
  weight,
  abilities,
  moveSet,
}) {
  const [value, setValue] = React.useState(0);
  const [isAboutTextEnglish, setIsAboutTextEnglish] = React.useState(true);
  const [englishAboutTextIndex, setEnglishAboutTextIndex] = React.useState(0);
  const [isSpeciesTextEnglish, setIsSpeciesTextEnglish] = React.useState(true);
  const [englishSpeciesTextIndex, setEnglishSpeciesTextIndex] =
    React.useState(0);
  // create function that updates setAboutTextIsEnglish state to true
  const findEnglishText = (pathName) => {
    let found = false;
    let i = 0;
    const pathNameEntries = modalData[pathName];

    if (pathName === "flavor_text_entries") {
      setIsAboutTextEnglish(found);
      while (found === false) {
        setEnglishAboutTextIndex(i);

        if (pathNameEntries[i]["language"].name === "en") {
          found = true;
          setIsAboutTextEnglish(found);
          setEnglishAboutTextIndex(i);
        }
        i++;
      }
    }
    if (pathName === "genera") {
      setIsSpeciesTextEnglish(found);

      while (found === false) {
        setEnglishSpeciesTextIndex(i);

        if (pathNameEntries[i]["language"].name === "en") {
          found = true;
          setIsSpeciesTextEnglish(found);
          setEnglishSpeciesTextIndex(i);
        }
        i++;
      }
    }
  };

  React.useEffect(() => {
    // checkAboutTextLanguage();
    findEnglishText("flavor_text_entries");
    findEnglishText("genera");
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="pokemon-modal-tabs">
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Base Stats" {...a11yProps(1)} />
          <Tab label="Evolutions" {...a11yProps(2)} />
          <Tab label="Moves" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <div className="modalTabContent">
        {/****** ABOUT TAB ******/}
        <TabPanel value={value} index={0}>
          <div className="aboutLeftContainer">
            {isAboutTextEnglish
              ? modalData["flavor_text_entries"][englishAboutTextIndex][
                  "flavor_text"
                ]
              : "Information not found"}
          </div>

          <div className="aboutRightContainer">
            <div className="speciesRowContainer">
              <p className="aboutSpecsLabel">Species</p>
              <p className="speciesValue">
                {isSpeciesTextEnglish
                  ? modalData["genera"][englishSpeciesTextIndex]["genus"]
                  : "Information not found"}
              </p>
            </div>

            <div className="heightRowContainer">
              <p className="aboutSpecsLabel">Height</p>
              <p className="heightValue">{height}</p>
            </div>

            <div className="weightRowContainer">
              <p className="aboutSpecsLabel">Weight</p>
              <p className="weightValue">{weight}</p>
            </div>

            <div className="abilitiesRowContainer">
              <p className="aboutSpecsLabel">Abilities</p>
              <p className="abilitiesValue">
                {abilities.map((index) => index["ability"].name + " ")}
              </p>
            </div>
          </div>
        </TabPanel>

        {/****** BASE STATS TAB ******/}
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>

        {/****** EVOLUTION TAB ******/}
        <TabPanel value={value} index={2}>
          <EvolutionTab evolutionChainUrl={modalData["evolution_chain"].url} />
        </TabPanel>

        {/****** MOVES TAB ******/}
        <TabPanel value={value} index={3}>
          <Moves moveSet={moveSet} />
        </TabPanel>
      </div>
    </Box>
  );
}
