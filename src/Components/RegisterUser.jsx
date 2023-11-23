"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function validateFormData(register) {
  const error = {};
  if (register.firstName.length < 3 || register.firstName.length === 0) {
    error.firstName = "Firts Name is required";
  }
  if (register.lastName.length < 3 || register.lastName.length === 0) {
    error.lastName = "Last Name is required";
  }
  if (register.phone.length < 10 || register.phone.length === 0) {
    error.phone = "Country Code and Phone number is required";
  }
  if (register.gender.length < 3 || register.gender === 0) {
    error.gender = "Gender is required";
  }

  return error;
}
export default function RegisterUser({ userClar }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(true);
  const [confirmation, setConfirmation] = useState("");
  const [register, setRegister] = useState({
    idClerk: userClar.id,
    image: userClar.image,
    email: userClar.email,
    firstName: "",
    lastName: "",
    gender: "",
    category: "",
    phone: "",
    admin: false,
  });
  const [bug, setBug] = useState({});
  const handleFirstName = (e) => {
    setRegister({
      ...register,
      firstName: e.target.value,
    });
    setBug(
      validateFormData({
        ...register,
        firstName: e.target.value,
      })
    );
  };
  const handleLastName = (e) => {
    setRegister({
      ...register,
      lastName: e.target.value,
    });
    setBug(
      validateFormData({
        ...register,
        lastName: e.target.value,
      })
    );
  };

  const handleGender = (e) => {
    setRegister({
      ...register,
      gender: e.target.value,
    });
    setBug(
      validateFormData({
        ...register,
        gender: e.target.value,
      })
    );
  };
  const handlePhone = (e) => {
    setRegister({
      ...register,
      phone: e.target.value,
    });
    setBug(
      validateFormData({
        ...register,
        phone: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checking = validateFormData(register);
    if (Object.keys(checking).length === 0) {
      const res = await fetch("https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/user", {
        method: "POST",
        body: JSON.stringify(register),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      try {
       if (data.id) {
          await router.push('/loader');
          setRegister({
            idClerk: "",
            image: "",
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            phone: "",
            admin: false,
          });
          setShowForm(false);
          setConfirmation(data)
        }
      } catch (error) {
        
      }
      } else {
      setShowForm(true);
    }
    setBug(checking);
  };
  return (
    <div className="Container">
      <h1 className="title">Register User </h1>
      {confirmation && (
        <div>
          <section className="font-bold text-center text-xl mt-20 ">
            <h1>{confirmation.firstName} {confirmation.lastName}</h1>
          </section>
        </div>
      )}
      {/* {error && (
        <div className="font-bold text-center text-xl mt-20" >
          <h1 className="error">{error}</h1>
        </div>
      )} */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <section className="section">
            <section className="sectionForm flex justify-center items-center">
              <Image
                src={register.image}
                alt="image of google"
                width={800}
                className="w-36 rounded-full"
              />
            </section>

            <section className="sectionForm">
              {register.firstName && (
                <label className="label">First Name*</label>
              )}
              <input
                type="text"
                id="firstName"
                placeholder="Firts Name*"
                value={register.firstName}
                onChange={handleFirstName}
                className="input"
              />
              {bug && <h1 className="error">{bug.firstName}</h1>}
            </section>

            <section className="sectionForm">
              {register.lastName && <label className="label">Last Name*</label>}
              <input
                type="text"
                id="lastName"
                placeholder="Last Name*"
                value={register.lastName}
                onChange={handleLastName}
                className="input"
              />
              {bug && <h1 className="error">{bug.lastName}</h1>}
            </section>

            <section className="sectionForm">
              {register.gender && <label>Gender*</label>}
              <input
                type="text"
                id="gender"
                name="gender"
                placeholder="Gender*"
                value={register.gender}
                onChange={handleGender}
                className="input"
              />
              {bug && <h1 className="error">{bug.gender}</h1>}
            </section>

            <section className="sectionForm">
              {register.phone && <label className="label">Phone*</label>}
              <input
                type="text"
                id="phone"
                placeholder="Phone*"
                value={register.phone}
                onChange={handlePhone}
                className="input"
              />
              {bug && <h1 className="error">{bug.phone}</h1>}
            </section>

            {register.firstName &&
              register.lastName &&
              register.gender &&
              register.image &&
              register.phone && (
                <section className="sectionForm">
                  <h1 className="label">Email</h1>
                  <h1 className="input">{register.email}</h1>
                </section>
              )}

            {register.firstName &&
              register.lastName &&
              register.gender &&
              register.email &&
              register.idClerk &&
              register.phone &&
              register.image && (
                <button type="submit" className="m-2 btn">
                  <h1 className="text-xl m-2">Enviar</h1>
                </button>
              )}
          </section>
        </form>
      )}
    </div>
  );
}
