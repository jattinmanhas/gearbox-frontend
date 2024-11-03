"use client";
import { useEffect, useState, ReactNode, FC } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from ".";

interface HydrationZustandProps {
  children: ReactNode;
}

const HydrationZustand: FC<HydrationZustandProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [cookies] = useCookies(["userData"]);
    const {setUser, clearUser} = useUserStore();

  useEffect(() => {
    setIsHydrated(true);
    if(cookies.userData){
      setUser(cookies.userData);
    }else{
      clearUser();
    }
  }, []);

  return <>{isHydrated ? <div>{children}</div>: null}</>
};

export default HydrationZustand;
