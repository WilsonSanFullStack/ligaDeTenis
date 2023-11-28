import TableTourney from "@/Components/TableTourney";
import TableUsers from "@/Components/TableUsers";

async function getTournament() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tournament`);
  const data = await res.json();
  return data;
  } catch (error) {
    
  }
  
}
async function getUsers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
  const data = await res.json();
  return data;
  } catch (error) {
    
  }
  
}

export default async function Dashboar() {
  const tournaments = await getTournament();
  const users = await getUsers();
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
