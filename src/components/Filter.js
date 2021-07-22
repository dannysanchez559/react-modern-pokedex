import React, { useEffect } from "react";
import Select from "react-select";
import { fetchAllAbilities } from "../util/fetchPokemonData";
import allTypes  from "../util/allTypes";
import SortTypes from "../util/SortTypes";
import dropDownStyles from "../styles/dropDownStyles";

function Filter({
  selectTypeOption,
  setSelectTypeOption,
  selectAbilityOptions,
  setSelectAbilityOption,
  abilityOptions,
  setAbilityOptions,
  setSortType,
}) {
  // handler for Type drop-down
  const handleTypeChange = (selectTypeOption) => {
    setSortType(SortTypes.TYPE);
    setSelectTypeOption(selectTypeOption.value);
  };
  // handler for Abilities drop-down
  const handleAbilityChange = (selectAbilityOption) => {
    setSortType(SortTypes.ABIL);
    setSelectAbilityOption(selectAbilityOption.value);
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

  return (
    <div className="filterBar">
      <div>
        <Select
          className="filterDropDown"
          onChange={handleTypeChange}
          options={allTypes}
          placeholder="TYPE"
          styles={dropDownStyles}
        />
      </div>
      <Select
        placeholder="ABILITY"
        className="filterDropDown"
        onChange={handleAbilityChange}
        options={abilityOptions}
        styles={dropDownStyles}
      />
      <button onClick={() => setSortType(SortTypes.ABC)}>A-Z <img src="toggle.png" alt="toggle icon" /></button>
      <button onClick={() => setSortType(SortTypes.HEIGHT)}>HEIGHT <img src="toggle.png" alt="toggle icon" /></button>
      <button onClick={() => setSortType(SortTypes.WEIGHT)}>WEIGHT <img src="toggle.png" alt="toggle icon" /></button>
      <button onClick={() => setSortType(SortTypes.DEX_NO)}>DEX NO. <img src="toggle.png" alt="toggle icon" /></button>
    </div>
  );
}

export default Filter;
