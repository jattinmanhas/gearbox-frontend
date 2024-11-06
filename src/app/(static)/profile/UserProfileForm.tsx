"use client";
import React , {useState} from 'react'
import { City, State } from "country-state-city";
import CitiesSelect from './CitiesSelect';

export default function UserProfileForm() {
    const [cities, setCities] = useState(City.getCitiesOfCountry('IN'));

  return (
    <div className="flex flex-col md:flex-row max-w-5xl w-full bg-neutral-800 shadow-lg overflow-hidden rounded">
      <div className="p-8 bg-inherit text-center flex-grow">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-100">Neil Sims</h3>
        <div className="mt-8">
          <div className="flex items-center space-x-2">
            <label className="bg-gray-700 text-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-600 m-auto">
              <input type="file" className="hidden" />
              Choose Image
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            JPG, GIF, or PNG. Max size of 800K
          </p>
        </div>
      </div>
      {/* Left Side - Form */}
      <div className="p-8 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
          General Information
        </h2>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm">UserName</label>
              <input
                type="text"
                placeholder="Username"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Birthday</label>
              <input
                type="date"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Gender</label>
              <select className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm">Phone</label>
              <input
                type="tel"
                placeholder="+12-345 678 910"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 text-gray-100">Address</h3>

          <div>
            <label className="block text-sm">Street</label>
            <input
              type="text"
              placeholder="Enter your Street address"
              className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">City</label>
              <CitiesSelect cities={cities} />
            </div>
            <div>
              <label className="block text-sm">Select state</label>
              <select className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full">
                <option>State</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Country</label>
              <input
                type="text"
                placeholder="ZIP"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
                disabled
                value="INDIA"
              />
            </div>
            <div>
              <label className="block text-sm">Postal Code</label>
              <input
                type="text"
                placeholder="Enter Postal Code"
                className="bg-neutral-700 text-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-gray-100 rounded px-6 py-2 mt-6 hover:bg-blue-600"
          >
            Save All
          </button>
        </form>
      </div>
    </div>
  );
}
