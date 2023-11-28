import Image from "next/image";
import Link from "next/link";

async function getTournament() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tournament`, {cache: 'no-cache'});
    const data = await res.json();
    return data;
  } catch (error) {}
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
                  className="border-2 border-slate-600 p-2 text-center rounded-xl m-2"
                >
                  <h1 className="text-xl font-bold p-1">{item.name}</h1>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1000}
                    height={250}
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
