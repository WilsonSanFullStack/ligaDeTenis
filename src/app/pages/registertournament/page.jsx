'use client'
import { useState } from "react";
function validateFormData(tournament) {
  const error = {};
  // const selectedDate = new Date(tournament.date)
  // const currentDate = new Date()
  // currentDate.setDate(currentDate.getDate() + 3);
  // console.log(selectedDate);
  // console.log(currentDate);

  if (tournament.name.length < 3 || tournament.name.length === 0) {
    error.name = "Name is required";
  }
  if (tournament.description.length < 100 || tournament.description === 0) {
    error.description = "The descripction must be more than 100 characteres.";
  }
  // if (tournament.date) {
  //   const selectedDate = new Date(tournament.date);
  //   const currentDate = new Date();
  //   currentDate.setDate(currentDate.getDate() + 3);
  //   if (selectedDate <= currentDate) {
  //     error.date = "Date must be at least three days from the current date.";
  //   }
  // }
  if (tournament.category.length < 3 || tournament.category === 0) {
    error.category = "The category must be more than 3 characteres.";
  }
  if (tournament.registrationValue <= 1) {
    error.registrationValue = "The registration value must be greater zero";
  }
  if (tournament.place.length < 3 || tournament.place.length === 0) {
    error.place = "The place must be more than 3 characteres.";
  }

  return error;
}

export default function registerTournament() {
  const [showForm, setShowForm] = useState(true);
  const [confirmation, setConfirmation] = useState("");
  const [bug, setBug] = useState({});
  const [tournament, setTournament] = useState({
    name: "",
    description: "",
    date: "",
    category: "",
    registrationValue: "",
    place: "",
    userId: '',
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
  // const [selectedDate, setSelectedDate] = useState(null);
  // const handleDate = (date) => {
  //   setSelectedDate(date);
  //   setTournament({
  //     ...tournament,
  //     date: date,
  //   });
  //   setBug(
  //     validateFormData({
  //       ...tournament,
  //       date: date,
  //     })
  //   );
  // };
  const handleCategory = (e) => {
    setTournament({
      ...tournament,
      category: e.target.value,
    });
    setBug(
      validateFormData({
        ...tournament,
        category: e.target.value,
      })
    );
  };
  const handleRegisterValue = (e) => {
    setTournament({
      ...tournament,
      registrationValue: e.target.value,
    });
    setBug(
      validateFormData({
        ...tournament,
        registrationValue: e.target.value,
      })
    );
  };
  const handlePlace = (e) => {
    setTournament({
      ...tournament,
      place: e.target.value,
    });
    setBug(
      validateFormData({
        ...tournament,
        place: e.target.value,
      })
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const checking = validateFormData(tournament);
  //   if (Object.keys(checking).length === 0) {
  //     dispatch(registerTournament(tournament));
  //     if (!error) {
  //       setConfirmation(
  //         "Your tournament is being processed please wait a moment."
  //       );
  //       setTimeout(() => {
  //         setConfirmation("");
  //         navigate("/home");
  //       }, 5000);
  //       setTournament({
  //         name: "",
  //         description: "",
  //         date: "",
  //         category: "",
  //         registrationValue: "",
  //         place: "",
  //         userId: "",
  //       });
  //       setShowForm(false)
  //     }else {
  //       setShowForm(true)
  //     }
  //   }
  //   setBug(checking)
  // };
  return (
    <div className="Container">
      <h1 className="title">Register Tournament</h1>
      {confirmation && (
        <div>
          <section className="font-bold text-center text-xl mt-20 ">
            <h1>{confirmation}</h1>
          </section>
        </div>
      )}

      {showForm && (
        <form>
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
            {/* <section className="sectionForm">
              {tournament.date && <label>Date*</label>}
              <DatePicker
                selected={selectedDate}
                onChange={handleDate}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                placeholderText="Date*"
                dropdownMode="select"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                  },
                }}
                customInput={
                  <input
                    placeholder="Date* three days from the current date"
                    type="text"
                    className="input"
                    name="date"
                    value={tournament.date}
                    onChange={handleDate}
                  />
                }
              />
              {bug && <h1 className="error">{bug.date}</h1>}
            </section> */}
            <section className="sectionForm">
              {tournament.category && <label>Category*</label>}
              <input
                type="text"
                name="category"
                placeholder="Category*"
                value={tournament.category}
                onChange={handleCategory}
                className="input"
              />
              {bug && <h1 className="error">{bug.category}</h1>}
            </section>
            <section className="sectionForm">
              {tournament.registrationValue && <label>Registrate Value*</label>}
              <input
                type="number"
                name="registrationValue"
                placeholder="Registrate Value*"
                value={tournament.registrationValue}
                onChange={handleRegisterValue}
                className="input"
              />
              {bug && <h1 className="error">{bug.registrationValue}</h1>}
            </section>
            <section className="sectionForm">
              {tournament.place && <label>Place*</label>}
              <input
                type="text"
                name="place"
                placeholder="Place*"
                value={tournament.place}
                onChange={handlePlace}
                className="input"
              />
              {bug && <h1 className="error">{bug.place}</h1>}
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
