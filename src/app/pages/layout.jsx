import { UserButton,  currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function loadUser() {
  // Get the userId from auth() -- if null, the user is not logged in
  // const { userIds } = auth();
  // if (userIds) {
  //   // Query DB for user specific information or display assets only to logged in users
  // }
  // Get the User object when you need access to the user's information
  const user = await currentUser();
  const res = await fetch(`https://liga-de-tenis-ryuksan.vercel.app/api/user/${user.id}`);
  const userId = await res.json();
  return userId;
}

export default async function PagesLayuot({ children }) {
  const userId = await loadUser();
  return (
    <div>
      <nav className="navBar">
        <ul>
          <li>
            <Link href="/pages">Home</Link>
          </li>
          <li>
            <Link href="/pages/profile">Profile</Link>
          </li>
          <li>
            <Link href="/pages/registertournament">Registro Torneo</Link>
          </li>
          <li>{userId?.admin && <Link href="/pages/dashboar">Dasboar</Link>}</li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
