"use client";
import { useEffect, useState, ReactNode, FC } from "react";
import { useUserStore } from ".";

interface HydrationZustandProps {
  children: ReactNode;
}

const HydrationZustand: FC<HydrationZustandProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div>: null}</>
};

export default HydrationZustand;
