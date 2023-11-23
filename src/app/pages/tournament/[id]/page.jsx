import { Tourney } from "@/Components/Tourney";
import { auth, currentUser } from "@clerk/nextjs";
async function loadPOsts() {
  const { userIds } = auth();
  if (userIds) {
  }
    const user = await currentUser();
    const res = await fetch(`http://localhost:3000/api/user/${user.id}`);
    const userId = await res.json();
    userId.imageUrl = user.imageUrl;
    return userId;
}
async function getAllUser() {
    const res = await fetch(`http://localhost:3000/api/user`);
    const useres = await res.json();
    return useres;
}
async function getTournamentId(id) {
  const res = await fetch(`http://localhost:3000/api/tournament/${id}`);
  const data = await res.json();
  return data;
}

async function Tournament({ params }) {
  const tournament = await getTournamentId(params.id);
  const user = await loadPOsts();
  const useres = await getAllUser()
  return <Tourney tournament={tournament} user={user} useres={useres} />;
}
export default Tournament;
