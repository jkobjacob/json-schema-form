import React, { useState, useCallback } from "react";

export default function EditField({
  openModal,
  closeModal,
  type,
  types,
  label,
  value,
  onFieldUpdate
}) {
  const [field, setField] = useState({
    name: label,
    value: value,
    type: type
  });

  const handleNameChange = useCallback((name) => {
    setField((prevState) => ({
      ...prevState,
      name
    }));
  }, []);

  const handleTypeChange = useCallback((type) => {
    setField((prevState) => ({
      ...prevState,
      type
    }));
  }, []);

  const handleValueChange = useCallback((value) => {
    setField((prevState) => ({
      ...prevState,
      value
    }));
  }, []);

  const handleFieldUpdate = useCallback(() => {
    onFieldUpdate(label, field);
    closeModal();
  }, [label, field, onFieldUpdate, closeModal]);

  return (
    <div className={openModal ? "modal modal-show" : "modal modal-hide"}>
      <div className="modal-content">
        <div className="item">
          <label>
            Field Name
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </label>
        </div>
        <div className="item">
          <label>
            Field type
            <select
              name="field-type"
              value={field.type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
            </select>
          </label>
        </div>
        <div className="item">
          <label>
            Field Value
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button onClick={handleFieldUpdate}>update</button>
      <button onClick={closeModal}>cancel</button>
    </div>
  );
}
