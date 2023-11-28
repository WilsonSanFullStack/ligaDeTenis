import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="Container flex items-center justify-center">
      <Link href="/sign-in">
        <div className="bg-dark  max-w-fit p-8 rounded-3xl animate-pulse">
          <Image src="/logo.png" alt="logo" width={800} height={800}/>
        </div>
      </Link>
    </div>
  );
}
