import React, { useState, useEffect, useCallback } from "react";

import Field from "./Components/Field";

export default function JSONForm({ schema }) {
  const [formState, setFormState] = useState({});
  const [formSchema, setFormSchema] = useState(schema);

  useEffect(() => {
    if (formSchema) {
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
  }, [formSchema]);

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
    setFormSchema(schema);
  }, [schema]);

  const handleUpdateField = useCallback(
    (field, updatedField) => {
      const { [field]: a, ...rest } = formState;
      console.log({ field, updatedField, a, rest });
      setFormState({
        ...rest,
        [updatedField.name]: {
          value: updatedField.value,
          type: updatedField.type
        }
      });
    },
    [formState]
  );

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
      <button onClick={handleReset}>reset</button>
    </>
  );
}
