"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
function validateFormData(tournament) {
  const error = {};
  if (tournament.name.length < 3 || tournament.name.length === 0) {
    error.name = "Name is required";
  }
  if (tournament.description.length < 100 || tournament.description === 0) {
    error.description = "The descripction must be more than 100 characteres.";
  }
  return error;
}

export default function RegisterTournament() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);
  const [confirmation, setConfirmation] = useState("");
  const [bug, setBug] = useState({});
  const [tournament, setTournament] = useState({
    name: "",
    description: "",
    image: '',
  });

  const handleName = (e) => {
    setTournament({
      ...tournament,
      name: e.target.value,
    });
    setBug(
      validateFormData({
        ...tournament,
        name: e.target.value,
      })
    );
  };
  const handleDescription = (e) => {
    setTournament({
      ...tournament,
      description: e.target.value,
    });
    setBug(
      validateFormData({
        ...tournament,
        description: e.target.value,
      })
    );
  };

  const handleImage = (e) => {
    setTournament({
      ...tournament,
      image: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checking = validateFormData(tournament);
    if (Object.keys(checking).length === 0) {
      const res = await fetch("https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/tournament", {
        method: "POST",
        body: JSON.stringify(tournament),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (checking) {
        setConfirmation(
          "Your tournament is being processed please wait a moment."
        );
        setConfirmation(data);
        router.push("/pages");
        setTournament({
          name: "",
          description: "",
          image: '',
        });
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    }
    setBug(checking);
  };
  return (
    <div className="Container">
      <h1 className="title">Register Tournament</h1>
      {confirmation && (
        <div>
          <section className="font-bold text-center text-xl mt-20 ">
            <h1>{confirmation.name}</h1>
          </section>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <section className="section">
            <section className="sectionForm">
              {tournament.name && <label>Name*</label>}
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={tournament.name}
                onChange={handleName}
                className="input"
              />
              {bug && <h1 className="error">{bug.name}</h1>}
            </section>

            <section className="sectionForm">
              {tournament.description && <label>Description(100*)</label>}
              <input
                type="text"
                name="description"
                placeholder="Description(100*)"
                value={tournament.description}
                onChange={handleDescription}
                className="input"
              />
              {bug && <h1 className="error">{bug.description}</h1>}
            </section>

            <section className="sectionForm">
              {tournament.image && <label>Image</label>}
              <input
                type="text"
                name="image"
                placeholder="Image"
                value={tournament.image}
                onChange={handleImage}
                className="input"
              />
            </section>

            {Object.keys(bug).length === 0 && (
              <button type="submit" className="m-2 btn">
                <h1 className="text-xl">Enviar</h1>
              </button>
            )}
          </section>
        </form>
      )}
    </div>
  );
}
