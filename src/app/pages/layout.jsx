import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function PagesLayuot({ children }) {
  return (
    <div>
      <nav className="navBar">
        <ul>
          <li>
            <Link href="/pages">Home</Link>
          </li>
          <li>
            <Link href="/pages/tournament">Tournaments</Link>
          </li>
          <li>
            <Link href="/pages/profile">Profile</Link>
          </li>
          <li>
            <Link href="/pages/registertournament">Registro Torneo</Link>
          </li>
          <li>
            <UserButton/>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
