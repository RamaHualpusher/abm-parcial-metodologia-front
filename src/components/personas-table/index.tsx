import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Table from 'react-bootstrap/Table';

import DataLayer from '../../lib/data-layer';
import Persona from '../../types/persona';

const DeleteModal = React.lazy(() => import('../../components/delete-modal'));

interface PersonasTableProps {
  personas: Persona[];
}

const PersonasTable: React.FC<PersonasTableProps> = ({ personas }) => {
  // State
  const [selectedPerson, setSelectedPerson] = React.useState<Persona | null>(null);
  const [filteredData, setFilteredData] = React.useState<Persona[]>(personas);

  // Handlers
  const deletePerson = React.useCallback((person: Persona) => {
    setSelectedPerson(person);
  }, [setSelectedPerson]);
  const onDeleteModalCancel = React.useCallback(() => {
    setSelectedPerson(null);
  }, [setSelectedPerson]);
  const onDeleteModalOk = React.useCallback(async () => {
    await DataLayer.delete.persona(selectedPerson?.id!);
    setFilteredData((preValue: Persona[]) => preValue.filter((pv: Persona) => pv.id !== selectedPerson?.id));
    setSelectedPerson(null);
  }, [selectedPerson, setSelectedPerson]);

  // Render
  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((p: Persona) => (
              <tr key={p.id} style={{ verticalAlign: 'middle' }}>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.email}</td>
                <td>
                  <Button href={`/personas/${p.id}`} size="sm">Editar</Button>
                  {' '}
                  <Button onClick={() => deletePerson(p)} size="sm" variant="danger">Eliminar</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      {
        selectedPerson && (
          <DeleteModal
            message={`Desea eliminar a ${selectedPerson.firstName} ${selectedPerson.lastName}?`}
            onCancel={onDeleteModalCancel}
            onOk={onDeleteModalOk}
            title="Eliminar Persona"
          />
        )
      }
    </>
  );
};

export default PersonasTable;
