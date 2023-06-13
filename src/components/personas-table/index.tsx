import React, { useCallback, useState, lazy, Suspense, useEffect } from 'react';

import DataLayer from '../../lib/data-layer';
import Persona from '../../types/persona';
import { Action, Column } from '../../types/CamposTablaGenerica';
import GenericTable from '../generic-table/GenericTable';

const DeleteModal = lazy(() => import('../../components/delete-modal'));

const PersonasTable: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]); // Estado para almacenar las personas
  const [selectedPerson, setSelectedPerson] = useState<Persona | null>(null); // Persona seleccionada para eliminar

  // Acciones disponibles para la tabla
  const actions: Action = {
    create: true,
    update: true,
    delete: true,
  };

  // Columnas de la tabla
  const columns: Column<Persona>[] = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Email', field: 'email' },
  ];

  // Carga inicial de personas
  useEffect(() => {
    const fetchPersonas = async () => {
      const personas = await DataLayer.fetch.personas();
      setPersonas(personas);
    };

    fetchPersonas();
  }, []);

  // Manejadores de eventos
  const handleAdd = useCallback(() => {
    // Navegar a la página de creación de persona
  }, []);

  const handleUpdate = useCallback((person: Persona) => {
    // Navegar a la página de edición de persona con el id de la persona
  }, []);

  const handleDelete = useCallback((person: Persona) => {
    setSelectedPerson(person); // Abrir el modal de confirmación de eliminación
  }, []);

  const onDeleteModalCancel = useCallback(() => {
    setSelectedPerson(null); // Cerrar el modal de confirmación de eliminación
  }, []);

  const onDeleteModalOk = useCallback(async () => {
    if (selectedPerson) {
      await DataLayer.delete.persona(selectedPerson.id);
      setPersonas(personas => personas.filter(p => p.id !== selectedPerson.id)); // Actualizar el estado de las personas
      setSelectedPerson(null); // Cerrar el modal de confirmación de eliminación
    }
  }, [selectedPerson]);

  // Renderizado
  return (
    <>
      <GenericTable
        data={personas}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {selectedPerson && (
          <DeleteModal
            message={`Desea eliminar a ${selectedPerson.firstName} ${selectedPerson.lastName}?`}
            onCancel={onDeleteModalCancel}
            onOk={onDeleteModalOk}
            title="Eliminar Persona"
          />
        )}
      </Suspense>
    </>
  );
};

export default PersonasTable;
