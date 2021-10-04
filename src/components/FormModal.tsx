import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function FormModal({
  show,
  onHide,
  onSubmit,
}: {
  show: boolean;
  onHide: () => void;
  onSubmit: (quote: string, count: number) => Promise<void>;
}) {
  const [quote, setQuote] = useState("");
  const [count, setCount] = useState(0);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <p className="fw-bolder h3">Add Quote</p>
      </Modal.Header>
      <Modal.Body>
        <p>Add your Quote here</p>
        <label className="form-label fw-bold">Quote</label>
        <textarea
          className="form-control"
          onChange={(e) => setQuote(e.target.value)}
        />
        <label className="form-label fw-bold">Count</label>
        <input
          type="number"
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            onHide();
            onSubmit(quote, count);
          }}
          disabled={!(quote.length && quote.includes("__PARAM__") && count)}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}