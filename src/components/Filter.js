import React, { useEffect } from "react";
import Select from "react-select";
import { fetchAllAbilities } from "../util/fetchPokemonData";
import SortTypes from "../util/SortTypes";

function Filter({
  selectTypeOption,
  setSelectTypeOption,
  selectAbilityOptions,
  setSelectAbilityOption,
  abilityOptions,
  setAbilityOptions,
  setSortType
}) {
  // handler for Type drop-down
  const handleTypeChange = (selectTypeOption) => {
    setSelectTypeOption(selectTypeOption);
    if (setSelectTypeOption) {
      console.log(`Selected: ${selectTypeOption.label}`);
    }
  };
  // handler for Abilities drop-down
  const handleAbilityChange = (selectAbilityOption) => {
    setSelectAbilityOption(selectAbilityOption);

    if (setSelectAbilityOption) {
      console.log(`Selected: ${selectAbilityOption.label}`);
    }
  };

  // get all Abilities and save data to hook
  const getAllAbilities = async () => {
    try {
      // data: array of objects with keys: "name" and "url"
      const data = await fetchAllAbilities();

      // abiliObj: array of choice objects with "value" and "label"(capitalized) for drop-down
      const abiliObjs = data.map((obj) => {
        const name = obj["name"];
        const choice = {
          value: name,
          label: name[0].toUpperCase() + name.slice(1),
        };
        return choice;
      });
      // sort array of objects by "value" key alphabetically
      const sortedAbilities = abiliObjs.sort((a, b) => {
        const nameA = a["value"].toUpperCase();
        const nameB = b["value"].toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      // store sorted ability options array into state variable: abilityOptions
      setAbilityOptions(sortedAbilities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetch all abilities
    getAllAbilities();
  }, []);

  // array of options for Type drop-down
  const allTypes = [
    {
      value: "fire",
      label: "Fire",
    },
    {
      value: "grass",
      label: "Grass",
    },
    {
      value: "water",
      label: "Water",
    },
    {
      value: "normal",
      label: "Normal",
    },
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "electric",
      label: "Electric",
    },
    {
      value: "ice",
      label: "Ice",
    },
    {
      value: "psychic",
      label: "Psychic",
    },
    {
      value: "ground",
      label: "Ground",
    },
    {
      value: "rock",
      label: "Rock",
    },
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "fighting",
      label: "Fighting",
    },
    {
      value: "poison",
      label: "Poison",
    },
    {
      value: "ghost",
      label: "Ghost",
    },
    {
      value: "fairy",
      label: "Fairy",
    },
    {
      value: "dragon",
      label: "Dragon",
    },
    {
      value: "steel",
      label: "Steel",
    },
    {
      value: "flying",
      label: "Flying",
    },
  ];
  return (
    <div className="filterBar">
      <div>
        <Select
          className="filterDropDown"
          onChange={handleTypeChange}
          options={allTypes}
          placeholder="Select Type"
        />
      </div>
      <Select
        placeholder="Select Ability"
        className="filterDropDown"
        onChange={handleAbilityChange}
        options={abilityOptions}
      />
      <button onClick={()=>setSortType(SortTypes.ABC)}>A-Z</button>
      <button onClick={()=>setSortType(SortTypes.HEIGHT)}>Height</button>
      <button onClick={()=>setSortType(SortTypes.WEIGHT)}>Weight</button>
      <button onClick={()=>setSortType(SortTypes.DEX_NO)}>Dex No.</button>
    </div>
  );
}

export default Filter;
