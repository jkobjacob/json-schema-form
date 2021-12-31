import React, { useState, useCallback } from "react";

export default function TextField({ label, type, value, onValueChange, edit }) {
  const [typeChange, setTypeChange] = useState({
    inputType: type,
    jsType: type
  });
  const [labelChange, setLabelChange] = useState(label);
  const [valueChange, setValueChange] = useState(value);

  const handleTypeChange = useCallback((event) => {
    switch (event.target.value) {
      case "string":
        setTypeChange({
          type: "text",
          jsType: "string"
        });
        break;
      case "boolean":
        setTypeChange({
          type: "checkbox",
          jsType: "boolean"
        });
        break;
      case "number":
        setTypeChange({
          type: "number",
          jsType: "number"
        });
        break;
      default:
        setTypeChange({
          type: "text",
          jsType: "string"
        });
        break;
    }
  }, []);

  return (
    <label>
      {`${label}:[${type}]`}
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </label>
  );
}
