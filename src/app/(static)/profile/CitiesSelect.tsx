"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ICity } from "country-state-city";
import { useState } from "react";

interface CitiesSelectProps {
    cities : ICity[] | undefined
}

export default function CitiesSelect({cities}: CitiesSelectProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState('');
  const filteredCities =
    query === ""
      ? cities ?? [] // Fallback to an empty array if cities is undefined
      : cities?.filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase());
        }) ?? []; // Ensure filter operation returns an array, even if cities is undefined

  return (
    <div className="mx-auto">
      <Combobox
        value={selected}
        onChange={(value: any) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded border-none bg-neutral-700 py-2 pr-8 pl-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(person: any) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white/5 bg-neutral-700 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredCities.map((city) => (
            <ComboboxOption
              key={city.name + city.stateCode}
              value={city.stateCode}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{city.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
