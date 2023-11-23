import Link from "next/link";
async function getTournament() {
  const res = await fetch('http://localhost:3000/api/tournament');
  const data = await res.json();
  return data;
}

export default async function Pages() {
  const tournament = await getTournament();
  return (
    <div className="Container">
      <h1 className="title">Tournament List</h1>
      <div className="grid grid-cols-4">
        {tournament &&
          tournament.map((item) => {
            return (
              <Link href={`/pages/tournament/${item.id}`} key={item.id}>
                <div
                  key={item.id}
                  className="border-2 border-slate-600 p-2 text-center rounded-xl"
                >
                  <h1 className="text-xl font-bold p-1">{item.name}</h1>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-xl"
                  />
                  <p className="text-justify">{item.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
