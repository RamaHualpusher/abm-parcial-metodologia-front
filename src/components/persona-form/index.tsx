import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DataLayer from '../../lib/data-layer';
import Persona from '../../types/persona';
import { FormField } from '../../types/CamposFormularioGenerico';
import { GenericForm } from '../generic-form/GenericForm';
import { useParams } from 'react-router-dom';

const PersonaForm: React.FC = () => {
  // Utils
  const navigate = useNavigate();
  const { id } = useParams(); // Extraer 'id' de la ruta

  const [persona, setPersona] = React.useState<Persona | null>(null); // Estado para almacenar la persona

  React.useEffect(() => {
    // Si existe un 'id', entonces obtenemos los datos de la persona
    if (id) {
      const fetchPersona = async () => {
        const persona = await DataLayer.fetch.persona(id);
        setPersona(persona);
      };

      fetchPersona();
    } else {
      setPersona({} as Persona); // Inicializamos con un objeto Persona vacío
    }
  }, [id]);

  // Handlers
  const handleSubmit = async (data: Persona) => {
    if (!id) {
      await DataLayer.create.persona(data);
    } else {
      await DataLayer.update.persona(id, data);
    }

    navigate('/personas');
  };

  // Manejar la acción de cancelar
  const handleCancel = () => {
    navigate('/personas');
  };

  const fields: FormField[] = [
    { key: 'firstName', label: 'Nombre', type: 'text', required: true },
    { key: 'lastName', label: 'Apellido', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true }
  ];

  return (
    (persona || !id) ? (
        <GenericForm 
            initialData={persona!} 
            fields={fields} 
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel}
        />
    ) : (
        <div>Loading...</div> // Show a loading message while persona is being fetched
    )
  );
};

export default PersonaForm;
