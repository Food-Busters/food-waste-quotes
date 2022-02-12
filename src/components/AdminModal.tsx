import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router";

import "./AdminModal.scss";

export default function AdminModal({
  show,
  submitPassword,
  errorMsg,
}: {
  show: boolean;
  submitPassword: (password: string) => () => void;
  errorMsg?: string;
}) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  function goHome() {
    navigate("/");
  }

  return (
    <Modal show={show} onHide={goHome} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="fw-bolder h3">Please Enter Password</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(errorMsg ?? "").length > 0 && (
          <p className="text-danger">{errorMsg}</p>
        )}
        <p>Password is required to access this menu.</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={goHome}>
          Go Home
        </button>
        <button className="btn btn-primary" onClick={submitPassword(password)}>
          Submit Password
        </button>
      </Modal.Footer>
    </Modal>
  );
}
