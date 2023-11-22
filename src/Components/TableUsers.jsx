"use client";

export default function UserTable({ users }) {
  console.log(users);

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
              <th className="py-2 px-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-slate-500" : "bg-slate-400"}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.firstName}</td>
                <td className="py-2 px-4">{user.lastName}</td>
                <td className="py-2 px-4">{user.gender}</td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
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
