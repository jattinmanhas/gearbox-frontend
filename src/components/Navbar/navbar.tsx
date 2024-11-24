"use client";
import Link from "next/link";
import React, { useState, FC } from "react";
import Hamburger from "@heroicons/react/24/solid/Bars3Icon";
import XMark from "@heroicons/react/24/solid/XMarkIcon";
import { NavItems } from "@/constants/navLinks";
import Navlink from "./navlink";
import GreenButton from "../Buttons/GreenButton";
import { Dropdown } from "../Buttons/DropDown";
import { useUserStore } from "@/store";

const navIcons = {
  show: <Hamburger className="size-7" />,
  hide: <XMark className="size-7" />,
};

interface NavProps {
  navItems: NavItems[];
}

export default function Navbar({ navItems }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {user} = useUserStore();

  const handleNavLinkClick = () => {
    const checkbox = document.getElementById(
      "topBarToggler"
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="border-b border-neutral-700 px-10 lg:flex lg:justify-between lg:h-14 transition-all">
      <div className="flex shrink-0 lg:min-w-40 justify-between items-center lg:flex lg:h-full lg:items-center lg:border-0">
        <Link
          href="/"
          aria-label="home"
          className="text-2xl py-1"
          onClick={handleNavLinkClick}
        >
          GearBox
        </Link>
        <label
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          htmlFor="topBarToggler"
          className="block cursor-pointer lg:hidden"
        >
          {" "}
          {navIcons[isMenuOpen ? "hide" : "show"]}{" "}
        </label>
      </div>
      <input className="peer hidden" id="topBarToggler" type="checkbox" />

      <div className="hidden flex-col mt-4 lg:mt-0 flex-1 lg:flex lg:flex-row lg:items-center text-base peer-checked:flex lg:justify-between">
        <div className="flex flex-col gap-2 border-b border-neutral-700 lg:flex-1 lg:flex-row lg:border-0 lg:p-0 lg:justify-center;">
          {navItems.map((navItem) => (
            <Navlink
              key={navItem.link}
              href={navItem.link}
              onClick={handleNavLinkClick}
            >
              {navItem.label}
            </Navlink>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-2 lg:border:0 lg:p-0">
          {user ? (
            <Dropdown username={user.username} />
          ) : (
            <Link href="/login" className="w-full lg:w-fit">
              <GreenButton name="Login" type="button" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
