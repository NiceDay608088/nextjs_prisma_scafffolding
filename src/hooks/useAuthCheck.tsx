"use client";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_KEY_USER_DATA } from "@/utils/constants";

export default function useAuthCheck() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useLayoutEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(COOKIE_KEY_USER_DATA));
    // console.log("cookies", token);
    if (!token) {
      router.replace("/");
    } else {
      const userData = JSON.parse(decodeURIComponent(token).split("=")[1]);
      setUsername(userData.name);
    }
  }, [router]);

  return username;
}
