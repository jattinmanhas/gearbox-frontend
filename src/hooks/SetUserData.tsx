"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { useCookies } from "react-cookie";

const UseSyncUserDataFromCookie = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {
    if (cookies.userData && !user) {
      let userData;
      if (typeof cookies.userData === "string") {
        try {
          userData = JSON.parse(cookies.userData);
        } catch (e) {
          console.error("Error parsing userData cookie:", e);
          userData = cookies.userData;
        }
      } else {
        userData = cookies.userData;
      }
      setUser(userData);
      removeCookie("userData", { path: "/" });
      router.refresh();
    }
  }, [cookies.userData, setUser, router, user]);

  return null;
};

export default UseSyncUserDataFromCookie;