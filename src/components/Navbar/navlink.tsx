import React, { PropsWithChildren } from "react";
import ActiveLink from "./activelink";

type NavItemProps = {
  href: string;
  className?: string;
  onClick?: () => void;
};

export default function Navlink({
  href,
  children,
  onClick
}: PropsWithChildren<NavItemProps>) {
  return (
    <>
      <ActiveLink
        allowSubPath={href.startsWith("/")}
        className="inline-flex items-center gap-2 px-3 py-2 lg:py-1 rounded hover:bg-neutral-800"
        activeClassName="!bg-green-700 lg:text-white"
        href={href}
        clickHandler={onClick}
      >
        {children}
      </ActiveLink>
    </>
  );
}

// hover:bg-neutral-800 p-2 hover:rounded-sm lg:relative lg:after:content-[''] lg:after:bg-white lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:h-[2px] lg:after:w-0 lg:after:transition-width lg:p-0 lg:after:duration-200 lg:hover:after:w-full lg:hover:bg-transparent
