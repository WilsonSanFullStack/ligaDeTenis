"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
async function EnterTourney(requestBody) {
  const res = await fetch(`https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/relation`, {
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}
async function ExitTourney(requestBody) {
  const res = await fetch(`https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/relation`, {
    method: "DELETE",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}
async function updateTournament(tournamentId, tournamentData) {
  const res = await fetch(
    `https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/tournament/${tournamentId}`,
    {
      method: "PUT",
      body: JSON.stringify(tournamentData),
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
}

export function Tourney({ tournament, user, useres }) {
  const [editingTournament, setEditingTournament] = useState(null);
  const [isUpdated, setUpdated] = useState(false);
  const router = useRouter();
  const requestBody = {
    tournamentId: tournament.id,
    userId: user.id,
  };
  const handleEnterTourney = async () => {
    await EnterTourney(requestBody);
  };

  const handleExitTourney = async (requestBodys) => {
    await ExitTourney(requestBodys);
  };
  const tournamentPlayers = tournament?.players.map((player) => {
    const matchingUser = useres.find((u) => u.id === player.userId);
    return {
      playerId: player.id, // Agregamos el id de la relación directamente
      userId: matchingUser.id,
      firstName: matchingUser.firstName,
      lastName: matchingUser.lastName,
      image: matchingUser.image,
    };
  });
  const handleEditTournament = () => {
    setEditingTournament({ ...tournament });
  };

  const handleSaveEdit = async () => {
    try {
      const tournamentId = editingTournament.id;
      await updateTournament(tournamentId, editingTournament);

      setEditingTournament(null);
      setUpdated(!isUpdated);
    } catch (error) {
      console.error("Error al actualizar el torneo", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTournament(null);
  };

  useEffect(() => {
    // Aquí puedes realizar operaciones asíncronas de efecto, si es necesario
  }, [isUpdated]);
  const handleDeleteTournament = async () => {
    try {
      // Asegúrate de tener el ID del torneo
      const tournamentId = tournament.id;

      // Llama a la función asincrónica aquí
      const res = await fetch(
        `https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/tournament/${tournamentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        // Eliminación exitosa, puedes actualizar el estado o realizar otras acciones necesarias
        router.push('/pages');
      } else {
        // Manejar errores
        console.error("Error al eliminar el torneo", await res.json());
      }

      // Actualiza el estado si es necesario
      setUpdated(!isUpdated);
    } catch (error) {
      console.error("Error al eliminar el torneo", error);
    }
  };
  return (
    <div className="Container">
      {tournament && (
        <div
          key={tournament.id}
          className="border-2 border-slate-600 p-2 text-center rounded-xl flex justify-center items-center flex-col w-fit"
        >
          <h1 className="text-xl font-bold p-1">{tournament.name}</h1>
          <Image
            src={tournament.image}
            alt={tournament.name}
            width={800}
            className="rounded-xl"
          />
          <p className="text-justify">{tournament.description}</p>
          <section className=" min-w-full flex justify-between px-24">
            <button
              className="btnNavBar"
              onClick={() => handleEnterTourney(requestBody)}
            >
              Enter
            </button>
          </section>
          {user.admin && (
            <section className="min-w-full flex justify-between px-24">
              <button className="btnNavBar" onClick={handleEditTournament}>
                Edit Tournament
              </button>
              <button className="btnNavBar" onClick={handleDeleteTournament}>
                Delete Tournament
              </button>
            </section>
          )}
        </div>
      )}
      {editingTournament && (
        <div className="border-2 border-slate-600 p-2 text-center rounded-xl flex justify-center items-center flex-col">
          <h1 className="text-xl font-bold p-2">Edit Tournament</h1>
          <input
            type="text"
            value={editingTournament.name}
            onChange={(e) =>
              setEditingTournament({
                ...editingTournament,
                name: e.target.value,
              })
            }
            className="input w-96 m-2"
          />
          <input
            value={editingTournament.description}
            onChange={(e) =>
              setEditingTournament({
                ...editingTournament,
                description: e.target.value,
              })
            }
            className="input w-96 m-2"
          />
          <button className="btnNavBar" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="btnNavBar" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      )}
      <h1 className="title border-b-2 border-slate-700">Players</h1>
      {tournamentPlayers && (
        <div className="grid grid-cols-4 m-2 ">
          {tournamentPlayers.map((item, x) => {
            const requestBodys = {
              tournamentId: tournament.id,
              userId: user.id,
              playerId: item.playerId,
            };
            return (
              <section
                key={x + 1}
                className="flex flex-col p-1 border-2 border-slate-700 rounded-xl items-center justify-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={800}
                  className="rounded-full w-32"
                />
                <h1 className="font-bold">
                  {item.firstName} {item.lastName}
                </h1>
                {(user.admin || user.id === item.userId) && (
                  <button
                    className="btnNavBar"
                    onClick={() => handleExitTourney(requestBodys)}
                  >
                    Go Out
                  </button>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
