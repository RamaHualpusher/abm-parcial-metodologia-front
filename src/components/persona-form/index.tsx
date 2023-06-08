import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import DataLayer from '../../lib/data-layer';
import Persona from '../../types/persona';

interface PersonaFormProps {
  persona: Persona;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ persona }) => {
  // State
  const [email, setEmail] = React.useState<string>(persona?.email ?? '');
  const [firstName, setFirstName] = React.useState<string>(persona?.firstName ?? '');
  const [lastName, setLastName] = React.useState<string>(persona?.lastName ?? '');
  const [validated, setValidated] = React.useState<boolean>(false);

  // Utils
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    // Check if action is create or edit
    const payload: Persona = { email, firstName, lastName };

    if (!persona?.id) {
      console.log('create');
      console.log(payload);
      console.log(persona);
      await DataLayer.create.persona(payload);
    } else {
      await DataLayer.update.persona(persona.id, payload);
    }

    navigate('/personas');
  };

  // Render
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control onChange={(e) => setFirstName(e.target.value)} placeholder="Ingrese nombre" required type="text" value={firstName} />
        <Form.Control.Feedback type="invalid">
          Campo Nombre es obligatorio.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Apellido</Form.Label>
        <Form.Control onChange={(e) => setLastName(e.target.value)} placeholder="Ingrese apellido" required type="text" value={lastName} />
        <Form.Control.Feedback type="invalid">
          Campo Apellido es obligatorio.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required type="email" value={email} />
        <Form.Control.Feedback type="invalid">
          Campo Email es obligatorio y debe ser un email válido.
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Nunca compartiremos su email con nadie.
        </Form.Text>
      </Form.Group>
      <Button type="submit" variant="primary">
        Guardar
      </Button>
    </Form>
  );
};

export default PersonaForm;
