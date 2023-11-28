import { Tourney } from "@/Components/Tourney";
import { auth, currentUser } from "@clerk/nextjs";
async function loadPOsts() {
  try {
    const { userIds } = auth();
  if (userIds) {
  }
    const user = await currentUser();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${user.id}`);
    const userId = await res.json();
    userId.imageUrl = user.imageUrl;
    return userId;
  } catch (error) {
    
  }
  
}
async function getAllUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
    const useres = await res.json();
    return useres;
  } catch (error) {
    
  }
    
}
async function getTournamentId(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tournament/${id}`);
  const data = await res.json();
  return data;
  } catch (error) {
    
  }
  
}

async function Tournament({ params }) {
  const tournament = await getTournamentId(params.id);
  const user = await loadPOsts();
  const useres = await getAllUser()
  return <Tourney tournament={tournament} user={user} useres={useres} />;
}
export default Tournament;
