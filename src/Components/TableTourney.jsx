'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function TableTourney({ tournaments }) {
  const router = useRouter();
  const handleRowClick = (id) => {
    router.push(`/pages/tournament/${id}`);
  };

  return (
    <div>
      {tournaments && (
        <table className="min-w-full bg-slate-600 text-white border border-slate-700 m-2">
          <thead>
            <tr>
              <th className="py-2 px-4 border-r border-slate-700">#</th>
              <th className="py-2 px-4 border-r border-slate-700">Name</th>
              <th className="py-2 px-4 border-r border-slate-700">Description</th>
              <th className="py-2 px-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament, index) => (
              <tr key={tournament.id} 
                className={index % 2 === 0 ? 'bg-slate-500' : 'bg-slate-400'}
                onClick={() => handleRowClick(tournament.id)}
                style={{ cursor: "pointer" }}
              >
                <td className="py-2 px-4 border-r border-slate-700">{index + 1}</td>
                <td className="py-2 px-4 border-r border-slate-700">{tournament.name}</td>
                <td className="py-2 px-4 border-r border-slate-700">{tournament.description}</td>
                <td className="py-2 px-4">
                  <Image
                    // src={tournament.image}
                    alt={tournament.name}
                    width={150}
                    height={150}
                    className="w-10 h-10 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
