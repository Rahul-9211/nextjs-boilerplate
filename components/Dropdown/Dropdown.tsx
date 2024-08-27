import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/16/solid';

interface Option {
  label: string;
  icon: JSX.Element;
  shortcut?: string;
  onClick: () => void;
}

interface DropdownProps {
  options: Option[];
  buttonLabel: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, buttonLabel }) => {
  return (
    <div className=" w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          {buttonLabel}
          {/* <ChevronDownIcon className="size-4 fill-white/60" /> */}
          ic
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {options.map((option, idx) => (
            <MenuItem key={idx}>
              <button
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                onClick={option.onClick}
              >
                {option.icon}
                {option.label}
                {option.shortcut && (
                  <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                    {option.shortcut}
                  </kbd>
                )}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Dropdown;
