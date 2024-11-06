import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

interface CategoryDropdownProps {
  selected: any;
  setSelected: (value: any) => void;
}

function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default function CategoryDropdown({ selected, setSelected }: CategoryDropdownProps) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOptions = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/user/shop/categories?query=${encodeURIComponent(
          searchQuery
        )}&take=5`
      );
      const data = await response.json();
      setOptions(data.data);
    } catch (error) {
      console.error("Failed to fetch options:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchOptions = useCallback(
    debounce((searchQuery: string) => fetchOptions(searchQuery), 300),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedFetchOptions(query);
    } else {
      setOptions([]);
    }
  }, [query, debouncedFetchOptions]);

  return (
    <div className="mx-auto w-full">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value!)}
        onClose={() => setQuery("")}
      >
        <div className="relative border border-neutral-600 rounded-lg">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-inherit p-2 text-sm/6 text-white",
              "focus:outline-green-800 border border-white"
            )}
            displayValue={(option: any) => option?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter Category Name"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-neutral-500 bg-neutral-900 p-1",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {loading ? (
            <div className="px-3 py-2 text-sm text-gray-400">Loading...</div>
          ) : (
            options.map((option: any, index) => (
              <ComboboxOption
                key={index}
                value={option}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{option.name}</div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
