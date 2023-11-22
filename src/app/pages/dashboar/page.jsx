import TableTourney from "@/Components/TableTourney";
import TableUsers from "@/Components/TableUsers";

async function getTournament() {
  const res = await fetch("http://localhost:3000/api/tournament");
  const data = await res.json();
  return data;
}
async function getUsers() {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  return data;
}

export default async function Dashboar() {
  const tournaments = await getTournament();
  const users = await getUsers();
  console.log(users);
  return (
    <div className="Container grid grid-cols-2">
      <div className="m-2">
        <h1 className="title">Table of Tournament</h1>
        <TableTourney tournaments={tournaments} />
      </div>
      <div className="m-2">
      <h1 className="title">Table of Users</h1>
        <TableUsers users={users} />
      </div>
    </div>
  );
}
