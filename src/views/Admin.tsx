import { useState, useEffect } from "react";
import axios from "axios";

import { getAllQuote } from "../utils/Quote";
import { AvailableImages, Quote } from "../models/Quote";

import AdminModal from "../components/AdminModal";
import FormModal from "../components/FormModal";
import DeleteModal from "../components/DeleteModal";
import Alert from "../components/Alert";
import { howFar } from "../utils/time";

export default function Admin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("password")) {
      setShowAdmin(true);
    } else {
      requestQuotes();
    }
  }, []);

  function submitPassword(newPassword: string) {
    return () => {
      setShowAdmin(false);
      localStorage.setItem("password", newPassword);
      requestQuotes();
    };
  }

  async function requestQuotes() {
    const quotes = await getAllQuote(localStorage.getItem("password") ?? "");
    if (typeof quotes == "string") {
      setErrorMsg(quotes);
      setShowAdmin(true);
    } else {
      setQuotes(
        quotes.sort((a: Quote, b: Quote) => {
          const ac = a.created_at;
          const bc = b.created_at;
          if (ac < bc) return 1;
          else if (ac > bc) return -1;
          else return 0;
        })
      );
    }
  }

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertContent, setAlertContent] = useState("");

  function resetAlert() {
    setShowAlert(false);
    setAlertType("");
    setAlertContent("");
  }

  async function handleNewQuote(
    quote: string,
    lang: string,
    image: AvailableImages,
    count: number
  ) {
    try {
      await axios.post("/api/addquote", {
        quote,
        lang,
        image,
        count,
        password: localStorage.getItem("password"),
      });
      setAlertContent("Quote added Successfully");
      setAlertType("success");
      setShowAlert(true);
      requestQuotes();
    } catch (err) {
      // @ts-ignore
      setAlertContent(err.message as string);
      setAlertType("danger");
      setShowAlert(true);
    }

    setTimeout(() => resetAlert(), 3000);
  }

  const [deleteModal, setDeleteModal] = useState("");

  async function deleteQuote(id: string) {
    try {
      await axios.post("/api/deletequote", {
        id,
        password: localStorage.getItem("password"),
      });
      setAlertContent("Quote deleted Successfully");
      setAlertType("success");
      setShowAlert(true);
      requestQuotes();
    } catch (err) {
      // @ts-ignore
      setAlertContent(err.message as string);
      setAlertType("danger");
      setShowAlert(true);
    }

    setTimeout(() => resetAlert(), 3000);
  }

  return (
    <div className="Admin container-lg p-5 d-flex flex-column">
      <Alert show={showAlert} type={alertType} content={alertContent} />
      <button
        className="btn btn-dark align-self-end mb-2"
        onClick={() => setShowForm(true)}
      >
        <i className="bi bi-plus me-1 fs-5" />
        <span className="fs-5">Add Quote</span>
      </button>
      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary">
            <th>Language</th>
            <th>Quotes</th>
            <th>Image</th>
            <th>Count</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td>{quote.lang}</td>
              <td>{quote.quote}</td>
              <td>{quote.image}</td>
              <td>{quote.count}</td>
              <td title={quote.created_at}>{howFar(quote.created_at)}</td>
              <td className="d-flex flex-row justify-content-around">
                <button
                  className="btn btn-danger"
                  onClick={() => setDeleteModal(quote.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminModal
        show={showAdmin}
        submitPassword={submitPassword}
        errorMsg={errorMsg}
      />
      <FormModal
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleNewQuote}
      />
      <DeleteModal
        id={deleteModal}
        onClose={() => setDeleteModal("")}
        onConfirm={deleteQuote}
      />
    </div>
  );
}
