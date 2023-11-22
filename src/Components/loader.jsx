"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export default function Login({ data }) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      if (isSignedIn) {
        // El usuario está autenticado, puedes redirigirlo a la página deseada
        if (data?.idClerk) {
          if (data.admin) {
            router.replace("/dashboard");
          } else {
            router.replace("/home");
          }
        } else {
          // Si el usuario no se encuentra en la base de datos, podrías redirigirlo a la página de registro.
          router.replace("/registeruser");
        }
      } else {
        // El usuario no está autenticado, podrías redirigirlo a la página de inicio de sesión.
        console.log('first')
      }
    };

    checkLogin();
  }, [isSignedIn, router]);

  return (
    <div className="Container flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
}
