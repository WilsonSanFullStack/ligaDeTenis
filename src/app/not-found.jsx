import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="Container flex flex-col justify-center items-center">
      <h1 className="text-9xl">404</h1>
      <Link href="/pages"  className="text-9xl text-blue-700">Volver</Link>
      <Image src="/logo.png" alt="logo" width={800} height={800}/>
    </section>
  );
}
