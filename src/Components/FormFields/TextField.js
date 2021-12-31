import React from "react";

export default function TextField({ label, type, value, onValueChange }) {
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
