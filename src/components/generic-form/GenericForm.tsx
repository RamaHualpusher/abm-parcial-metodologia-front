import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GenericFormProps } from '../../types/CamposFormularioGenerico';


export const GenericForm = <T,>({ initialData, fields, handleSubmit, handleCancel }: GenericFormProps<T>) => {
  const [data, setData] = useState<T>(initialData);

  const handleChange = (key: keyof T) => (e: React.ChangeEvent<HTMLElement>) => {
    setData({
      ...data,
      [key]: (e.target as HTMLInputElement).value
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(data);
  };

  return (
    <Form onSubmit={submitForm}>
      {fields.map((field) => {
        const value = data ? (data[field.key as keyof T] as unknown as string) : '';
        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
            return (
              <Form.Group key={field.key} controlId={field.key}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  required={field.required}
                  type={field.type}
                  value={value}
                  onChange={handleChange(field.key as keyof T)}
                />
              </Form.Group>
            );
          case 'select':
            return (
              <Form.Group key={field.key} controlId={field.key}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control as="select" value={value} onChange={handleChange(field.key as keyof T)}>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            );
          default:
            return null;
        }
      })}
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" type="button" onClick={handleCancel}>
        Cancelar
      </Button>
    </Form>
  );

};
