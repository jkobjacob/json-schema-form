import React, { useCallback, useState } from "react";

import TextField from "./FormFields/TextField";
import CheckBoxField from "./FormFields/CheckBoxField";
import EditField from "./EditField";

export default function Field({
  type,
  add,
  value,
  fieldLabel,
  onDelete,
  onValueChange,
  onFieldUpdate
}) {
  const types = useState(["string", "boolean", "number"]);
  const [editModal, setEditModal] = useState(false);

  const getFieldComponent = useCallback((type) => {
    switch (type) {
      case "string":
        return TextField;
      case "boolean":
        return CheckBoxField;
      default:
        return TextField;
    }
  }, []);

  const SchemaField = getFieldComponent(type);

  return (
    <>
      <SchemaField
        label={fieldLabel}
        value={value}
        type={type}
        edit={editModal}
        onValueChange={onValueChange}
      />
      <button onClick={() => setEditModal(true)}>edit</button>
      <button onClick={() => onDelete(fieldLabel)}>delete</button>
      {editModal && (
        <EditField
          openModal={editModal}
          closeModal={() => setEditModal(false)}
          types={types}
          type={type}
          value={value}
          label={fieldLabel}
          onFieldUpdate={onFieldUpdate}
        />
      )}
    </>
  );
}
