import React, { useState, useEffect, useCallback } from "react";

import Field from "./Components/Field";
import AddField from "./Components/AddField";

export default function JSONForm({ schema }) {
  const [formState, setFormState] = useState({});
  const [formSchema, setFormSchema] = useState(schema);
  const [isUpdateField, setIsUpdateField] = useState(false);
  const [isAddField, setIsAddField] = useState(false);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    if (formSchema && !isUpdateField && !isAddField) {
      const getFormState = Object.keys(formSchema).reduce((acc, key) => {
        return {
          ...acc,
          [key]: {
            value: null,
            type: formSchema[key]
          }
        };
      }, {});
      setFormState(getFormState);
    }
  }, [formSchema, isUpdateField, isAddField]);

  const handleDelete = useCallback(
    (field) => {
      const { [field]: a, ...rest } = formSchema;
      setFormSchema({
        ...rest
      });
    },
    [formSchema]
  );

  const handleValueChange = useCallback(
    (field, value) => {
      const { [field]: a, ...rest } = formState;
      setFormState({
        ...rest,
        [field]: {
          ...a,
          value
        }
      });
    },
    [formState]
  );

  const handleReset = useCallback(() => {
    setIsAddField(false);
    setIsUpdateField(false);
    setFormSchema(schema);
  }, [schema]);

  const handleUpdateField = useCallback(
    (field, updatedField) => {
      setIsUpdateField(true);
      const { [field]: a, ...rest } = formState;
      const { [field]: aSchema, ...restSchema } = formSchema;
      console.log({ field, updatedField, a, rest });
      setFormState({
        ...rest,
        [updatedField.name]: {
          value: updatedField.value,
          type: updatedField.type
        }
      });
      setFormSchema({
        ...restSchema,
        [updatedField.name]: updatedField.type
      });
    },
    [formState, formSchema]
  );

  const handleAddField = useCallback((field) => {
    setIsAddField(true);
    setFormState((prevState) => ({
      ...prevState,
      [field.name]: {
        value: null,
        type: field.type
      }
    }));

    setFormSchema((prevSchema) => ({
      ...prevSchema,
      [field.name]: field.type
    }));
  }, []);

  useEffect(() => {
    console.log({
      formSchema,
      formState
    });
  }, [formSchema, formState]);

  return (
    <>
      {Object.keys(formSchema).map((field, key) => {
        return (
          <div>
            <Field
              type={formSchema[field]}
              key={`${field}-${key}`}
              fieldLabel={field}
              value={formState[field]?.value}
              onDelete={handleDelete}
              onFieldUpdate={handleUpdateField}
              onValueChange={(value) => handleValueChange(field, value)}
            />
          </div>
        );
      })}
      {addModal && (
        <AddField
          openModal={addModal}
          closeModal={() => setAddModal(false)}
          label=""
          type=""
          onFieldAdd={handleAddField}
        />
      )}
      <button onClick={() => setAddModal(true)}>Add Field</button>
      <button onClick={handleReset}>reset</button>
    </>
  );
}
