import Image from "next/image";
import Link from "next/link";


async function getTournament() {
  const res = await fetch('https://liga-de-tenis-6pw6n1ymu-ryuksan.vercel.app/api/tournament');
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
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={800}
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
