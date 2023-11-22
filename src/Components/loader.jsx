"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export default function Login({ data }) {
  const { isSignedIn } = useUser();
  const router = useRouter();
// console.log('1data')
// console.log(data)
  useEffect(() => {
    const checkLogin = async () => {
      if (data) {
        // El usuario está autenticado, puedes redirigirlo a la página deseada
        // console.log('0')
        if (data?.clerk) {
          // console.log('1')
          if (data.admin) {
            router.replace("/pages/dashboard");
            // console.log('2')
          } else {
            router.replace("/pages");
            // console.log('3')
          }
        } else {
          // Si el usuario no se encuentra en la base de datos, podrías redirigirlo a la página de registro.
          // console.log('4')
          router.replace("/registeruser");
        }
      } else {
        // El usuario no está autenticado, podrías redirigirlo a la página de inicio de sesión.
        // console.log('5')
        router.replace("/registeruser");
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
