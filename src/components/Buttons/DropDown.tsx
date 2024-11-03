import { FC } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useUserStore } from "@/store";
import { Logout } from "@/lib/auth";

type Props = {
  username: string;
};

export const Dropdown: FC<Props> = ({ username }: Props) => {
  const {clearUser}  = useUserStore();

  const handleLogout = async() => {
    const userLogout = await Logout();
    
    if(userLogout.status === 200){
      clearUser();
    }
  }

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
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Duplicate
            </button>
          </MenuItem>
          {/* <div className="my-1 h-px bg-white" /> */}
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Archive
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red-500" onClick={handleLogout}
            >
              Log Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};
