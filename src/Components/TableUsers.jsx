"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function UserTable({ users }) {

  const router = useRouter();

  const handleRowClick = (userId) => {
    router.push(`/pages/dashboar/user/${userId}`);
  };

  return (
    <div>
      {users && (
        <table className="min-w-full bg-slate-600 text-white border border-slate-700">
          <thead>
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Gender</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Admin</th>
              <th className="py-2 px-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              
              <tr
                
                className={index % 2 === 0 ? "bg-slate-500" : "bg-slate-400"}
                onClick={() => handleRowClick(user.clerk)}
                style={{ cursor: "pointer" }}
                key={user.id}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.firstName}</td>
                <td className="py-2 px-4">{user.lastName}</td>
                <td className="py-2 px-4">{user.gender}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">{user.admin.toString()}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <Image
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={800}
                    height={800}
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
