"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export default function Login({ data }) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      if (data) {

        if (data?.clerk) {

          if (data.admin) {
            router.replace("/pages/dashboar");

          } else {
            router.replace("/pages");
          }
        } else {

          router.replace("/registeruser");
        }
      } else {
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
