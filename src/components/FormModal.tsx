import { useState } from "react";
import { Modal } from "react-bootstrap";
import { AvailableImages, AvailableImagesValue } from "../models/Quote";

import "./FormModal.scss";

export default function FormModal({
  show,
  onHide,
  onSubmit,
}: {
  show: boolean;
  onHide: () => void;
  onSubmit: (
    quote: string,
    lang: string,
    image: AvailableImages,
    count: number
  ) => Promise<void>;
}) {
  const [quote, setQuote] = useState("");
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState<AvailableImages>(AvailableImagesValue[0]);
  const [count, setCount] = useState(0);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <p className="fw-bolder h3">Add Quote</p>
      </Modal.Header>
      <Modal.Body>
        <p className="fw-bold h5">Example</p>
        <p className="example">
          Methane Produced by this Meal equals to a dog's fart of __PARAM__
          days!
        </p>
        <p className="text-muted fst-italic">
          __PARAM__ will be replaced by 'count' proportional to amount of food
          left
        </p>
        <hr className="mb-0" />
        <label className="form-label fw-bold">Quote</label>
        <textarea
          className="form-control"
          onChange={(e) => setQuote(e.target.value)}
        />
        <label className="form-label fw-bold">Language</label>
        <select
          className="form-select"
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="th">Thai</option>
        </select>
        <label className="form-label fw-bold">Image</label>
        <select
          className="form-select"
          onChange={(e) => setImage(e.target.value as AvailableImages)}
        >
          {AvailableImagesValue.map((img) => (
            <option value={img}>{img}</option>
          ))}
        </select>
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
          className="btn btn-success"
          onClick={() => {
            onHide();
            onSubmit(quote.trim(), lang, image, count);
          }}
          disabled={!(quote.length && quote.includes("__PARAM__") && count)}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}
