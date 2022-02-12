import { Modal } from "react-bootstrap";

export default function DeleteModal({
  id,
  onClose,
  onConfirm,
}: {
  id: string;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}) {
  return (
    <Modal
      show={id.length > 0}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="fw-bolder h3">Delete Confirmation</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this?</p>
        <p className="text-danger">This action can't be undone!</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            onConfirm(id);
            onClose();
          }}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}
