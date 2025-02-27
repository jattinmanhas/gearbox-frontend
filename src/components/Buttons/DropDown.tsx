"use client";

import { FC } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { useUserStore } from "@/store";
import { Logout } from "@/lib/auth";
import { UserPen, UserCog, LogOut } from "lucide-react";
import Link from "next/link";

type Props = {
  username: string;
};

export const Dropdown: FC<Props> = ({ username }: Props) => {
  const { user, clearUser } = useUserStore();

   const handleLogout = async () => {
    const userLogout = await Logout();

    if (userLogout.status === 200) {
      clearUser();
    }else{
      alert("Failed to Logout")
    }
  };

  return (
    <div className="w-full z-50">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-neutral-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-white/10 focus:outline-none data-[hover]:bg-neutral-700 data-[open]:bg-neutral-700 data-[focus]:outline-1 data-[focus]:outline-white">
          {username}
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-neutral-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <Link href="/profile">
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <UserPen /> PROFILE
              </button>
            </MenuItem>
          </Link>
          <MenuSeparator className=" h-px bg-neutral-600" />
          {user?.roleId !== "53fdd43c-132b-4843-a3cc-2504db47698f" && (
            <Link href="/dashboard">
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  <UserCog /> DASHBOARD
                </button>
              </MenuItem>
            </Link>
          )}
          {/* <div className="my-1 h-px bg-white" /> */}
          <MenuSeparator className=" h-px bg-neutral-600" />
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red-500"
              onClick={handleLogout}
            >
              <LogOut /> Log Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};
