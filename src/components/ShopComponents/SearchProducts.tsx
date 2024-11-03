"use client";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react'

export default function SearchProducts() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/shop/search?q=${encodedSearchQuery}`)
    }

  return (
    <form className="relative flex w-3/5 m-auto" onSubmit={onSearch}>
      <input
        id="search_products"
        type="text"
        name="search_products"
        className="block p-2 bg-neutral-800 border focus:outline-green-800 rounded-lg flex-1"
        placeholder="Search Products"
        autoComplete="off"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <MagnifyingGlassIcon className="w-8 h-8 text-white absolute -right-0 top-1" />
    </form>
  );
}
