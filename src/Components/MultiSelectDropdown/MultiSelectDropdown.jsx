import React, { useEffect, useState } from "react";
import "./MultiSelectDropdown.css";
import Select from "react-select";

export default function MultiSelectDropdown({
  employeeData,
  placeholderName,
  handleSelectedInfo,
  isEmpty,
  defaultSelectedList,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [defaultSelected, setDefaultSelected] = useState([]);

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    handleSelectedInfo(data);
  }
  useEffect(() => {
    if (isEmpty) {
      setSelectedOptions([]);
    }
  }, [isEmpty]);

  useEffect(() => {
    if (defaultSelectedList) {
      console.log("Entered", defaultSelectedList);
      setDefaultSelected(defaultSelectedList);
    }
  }, [defaultSelectedList]);
  return (
    <div className="dropdown-container m-2">
      <Select
        defaultValue={defaultSelected}
        options={employeeData}
        placeholder={placeholderName}
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
      />
    </div>
  );
}
