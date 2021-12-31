import React from "react";

export default function CheckBoxField({ label, type, value, onValueChange }) {
  return (
    <label>
      {`${label}:[${type}]`}
      <input
        type="checkbox"
        value={value}
        onChange={(e) => onValueChange(e.target.checked)}
      />
    </label>
  );
}
