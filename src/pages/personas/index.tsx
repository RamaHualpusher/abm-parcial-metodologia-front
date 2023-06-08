import Button from 'react-bootstrap/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import usePersonas from '../../hooks/use-personas';
import DataLayer from '../../lib/data-layer';

import Persona from '../../types/persona';
import { Action, Column } from '../../types/CamposTablaGenerica';
import GenericTable from '../../components/generic-table/GenericTable';
import DeleteModal from '../../components/delete-modal';

const ErrorAlert = React.lazy(() => import('../../components/error-alert'));

const Personas: React.FC = () => {
  const navigate = useNavigate();
  const { error, loading, personas, refetch } = usePersonas(); // Asumiendo que usePersonas devuelve una función refetch

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | undefined>(undefined);
  

  const onDelete = React.useCallback((persona: Persona) => {
    setDeleteId(persona.id);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteId) return;
    await DataLayer.delete.persona(deleteId);
    setShowDeleteModal(false);
    refetch(); // Obtener los datos nuevamente después de eliminar la persona
  }, [deleteId, refetch]); // Agrega refetch a las dependencias

  const handleDeleteCancel = React.useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const onAdd = () => {
    navigate("/personas/crear");
  };

  const onUpdate = (persona: Persona) => {
    navigate(`/personas/${persona.id}`);
  };

  const columns: Column<Persona>[] = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Email', field: 'email' },
  ];

  const actions: Action = {
    create: true,
    update: true,
    delete: true,
  };

  if (error) {
    return <ErrorAlert errorMessage={error?.message || 'Something went wrong'} />
  }

  return loading
    ? <Spinner animation="border" />
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        <div style={{ float: 'right', paddingBottom: 10 }}>
          <Button href="/personas/crear">Crear Persona</Button>
        </div>
        <GenericTable 
          data={personas}
          columns={columns} 
          actions={actions}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        {showDeleteModal && (
          <DeleteModal
            title="Eliminar Persona"
            message="¿Estás seguro de que quieres eliminar esta persona?"
            onCancel={handleDeleteCancel}
            onOk={handleDeleteConfirm}
          />
        )}
      </React.Suspense>
    );
};

export default Personas;
