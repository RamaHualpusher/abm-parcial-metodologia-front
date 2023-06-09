import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DataLayer from '../../lib/data-layer';
import Persona from '../../types/persona';
import { FormField } from '../../types/CamposFormularioGenerico';
import { GenericForm } from '../generic-form/GenericForm';


interface PersonaFormProps {
  persona: Persona;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ persona }) => {
  // Utils
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = async (data: Persona) => {
    if (!persona?.id) {
      console.log('create');
      console.log(data);
      console.log(persona);
      await DataLayer.create.persona(data);
    } else {
      await DataLayer.update.persona(persona.id, data);
    }

    navigate('/personas');
  };

  // Manejar la acción de cancelar
  const handleCancel = () => {
    // Aquí puedes poner lo que quieras que suceda cuando se cancele el formulario.
    // Por ejemplo, podrías redirigir al usuario a la página de 'personas'.
    navigate('/personas');
  };

  const fields: FormField[] = [
    { key: 'firstName', label: 'Nombre', type: 'text', required: true },
    { key: 'lastName', label: 'Apellido', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true }
  ];

  return (
    <GenericForm 
      initialData={persona} 
      fields={fields} 
      handleSubmit={handleSubmit} 
      handleCancel={handleCancel}
    />
  );
};

export default PersonaForm;
