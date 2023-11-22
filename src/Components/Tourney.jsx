"use client";
async function EnterTourney(requestBody) {
  const res = await fetch(`http://localhost:3000/api/relation`, {
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}

export async function Tourney({ tournament, user, useres }) {
 const requestBody = {
    tournamentId: tournament.id,
    userId: user.id,
  };
  const tournamentPlayers = tournament?.players.map(player => {
    const matchingUser = useres.find(u => u.id === player.userId);
    return {
      id: matchingUser.id,
      firstName: matchingUser.firstName,
      lastName: matchingUser.lastName,
      image: matchingUser.image
    };
  });

// console.log(tournamentPlayers)
  return (
    <div className="Container">
      {tournament && (
        <div
          key={tournament.id}
          className="border-2 border-slate-600 p-2 text-center rounded-xl flex justify-center items-center flex-col w-fit"
        >
          <h1 className="text-xl font-bold p-1">{tournament.name}</h1>
          <img
            src={tournament.image}
            alt={tournament.name}
            className="rounded-xl"
          />
          <p className="text-justify">{tournament.description}</p>
          <section className=" min-w-full flex justify-between px-24">
            <button
              className="btnNavBar"
              onClick={() => EnterTourney(requestBody)}
            >
              Enter
            </button>
            <button
              className="btnNavBar"
              // onClick={}
            >
              Go Out
            </button>
          </section>
        </div>
      )}
      {tournamentPlayers && (
        <div className="grid grid-cols-4 m-2 ">
          {tournamentPlayers.map((item) => {
            return (
              <section key={item.id} className="flex flex-col p-1 border-2 border-slate-700 rounded-xl items-center justify-center">
                <img src={item.image} alt={item.name} className="rounded-full w-32" />
                <h1 className="font-bold">{item.firstName} {item.lastName}</h1>

              </section>
            )
          })}
        </div>
      )}
    </div>
  );
}
