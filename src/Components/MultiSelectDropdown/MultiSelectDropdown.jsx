import React, { useState } from "react";
import "./MultiSelectDropdown.css";
import Select from "react-select";

export default function MultiSelectDropdown({ employeeData, placeholderName }) {
  const [selectedOptions, setSelectedOptions] = useState();

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <div className="dropdown-container m-2">
      <Select
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
