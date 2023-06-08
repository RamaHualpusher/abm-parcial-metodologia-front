import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

interface DeleteModalProps {
  message: string;
  onCancel: () => void;
  onOk: () => void;
  title: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ message, onCancel, onOk, title }) => {
  // Render
  return (
    <>
      <Modal show={!!message} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={onOk}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
