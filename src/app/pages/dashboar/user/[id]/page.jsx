"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getUserId(id) {
  const res = await fetch(`https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/user/${id}`);
  const data = await res.json();
  return data;
}
async function deleteUser(id) {
  const res = await fetch(`https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/user/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}
async function editUser(id, userData) {
  const res = await fetch(`https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}

export default function User({ params }) {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserId(params.id);
        setUserId(userData);
      } catch (error) {}
    };

    fetchUserData();
  },[setUserId, params.id]);

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser(userId.id);
      router.push("/pages/dashboar");
    } catch (error) {}
  };

  const handleEditUser = async () => {
    try {
      // Asegurarse de tener el ID del usuario
      const result = await editUser(userId.id, editedUser);
      // Cambiar a modo de edición
      setIsEditing(true);
      setEditedUser({ ...userId });
    } catch (error) {
    }
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveEdit = async () => {
    try {
      const result = await editUser(userId.id, editedUser);
      setIsEditing(false);
    } catch (error) {
    }
  };
  
  const handleCancelEdit = () => {

    setIsEditing(false);
    setEditedUser(null);
  };
  
  return (
    <div className="Container">
      {userId && (
        <section
          key={userId.id}
          className="m-2 grid w-fit border-2 border-slate-950 dark:border-slate-300 p-2"
        >
          <section className="flex justify-center items-center p-2">
            <Image
              src={userId.imageUrl}
              alt={userId.firstName}
              width={800}
              className="w-36 rounded-full"
            />
          </section>
          <section className="grid grid-cols-2">
            <h1 className="text-right mx-2">Name:</h1>
            <h2 className=" text-left">
              {userId.firstName} {userId.lastName}{" "}
            </h2>
          </section>
          <section className=" grid grid-cols-2">
            <h1 className="text-right mx-2">Email:</h1>{" "}
            <h2 className=" text-left">{userId.email} </h2>
          </section>
          <section className="grid grid-cols-2">
            <h1 className="text-right mx-2">Number Phone:</h1>
            <h2 className="text-left">{userId.phone} </h2>
          </section>
          <section className="text-center font-bold">
            <h1>{userId.admin ? "You are admin" : "You are not admin"}</h1>
          </section>
          <button onClick={handleDeleteUser} className="btnNavBar">
            Eliminar Usuario
          </button>
          <button onClick={handleEditUser} className="btnNavBar my-2">
            Editar Usuario
          </button>
        </section>
      )}
      {isEditing && (
        <div className="flex flex-col border-2 border-slate-700 w-fit">
          <section className="sectionForm">
            <label className="text-center mx-2">First Name:</label>
            <input
              type="text"
              value={editedUser.firstName}
              onChange={handleInputChange}
              name="firstName"
              className="input"
            />
          </section>

          <section className="sectionForm ">
            <label className="text-center mx-2">Last Name:</label>
            <input
              type="text"
              value={editedUser.lastName}
              onChange={handleInputChange}
              name="lastName"
              className="input"
            />
          </section>
          <section className="sectionForm">
            <label className="text-center mx-2">Phone:</label>
            <input
              type="text"
              value={editedUser.phone}
              onChange={handleInputChange}
              name="phone"
              className="input"
            />
          </section>

          <section className="sectionForm">
            <label className="text-center mx-2">Admin:</label>
            <select
              value={editedUser.admin.toString()} // Convertir a cadena
              onChange={handleInputChange}
              name="admin"
              className="input"
            >
              <option value={true}>Admin</option>
              <option value={false}>Not Admin</option>
            </select>
          </section>
          <button className="btnNavBar" onClick={handleSaveEdit}>
          Save
        </button>
        <button className="btnNavBar my-2" onClick={handleCancelEdit}>
          Cancel
        </button>
        </div>
      )}
    </div>
  );
}
