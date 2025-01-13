"use client";

import { useState } from "react";

interface HeaderProps {
  counties: string[];
  selectedCounty: string;
  onCountyChange: (value: string) => void;
}
import { RiArrowDropDownLine } from "react-icons/ri";

export function Header({
  counties,
  selectedCounty,
  onCountyChange,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between py-4">
        {/* Title on the Left */}
        <h2 className="lg:text-3xl text-xl font-bold tracking-tight ml-9">
          EV Population Dashboard
        </h2>

        {/* Dropdown on the Right */}
        <div className="relative mr-8">
          {/* Dropdown Trigger */}
          <button
            className="flex lg:text-lg text-medium justify-between w-[200px] bg-white border rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCounty || "Select County"}
            <span className="lg:text-3xl text-2xl">
              <RiArrowDropDownLine />
            </span>
          </button>

          {/* Dropdown Content */}
          {isOpen && (
            <ul className="absolute mt-2 w-[200px] bg-white border rounded-md shadow-lg max-h-screen z-50">
              {/* "All Counties" Option */}
              <li
                className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                  selectedCounty === "All Counties"
                    ? "bg-blue-200 font-semibold"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (selectedCounty !== "All Counties") {
                    onCountyChange("All Counties");
                    setIsOpen(false);
                  }
                }}
                style={{
                  pointerEvents:
                    selectedCounty === "All Counties" ? "none" : "auto", // Disable click when selected
                  opacity: selectedCounty === "All Counties" ? 0.5 : 1, // Visual feedback
                }}
              >
                All Counties
              </li>

              {/* Dynamic Counties */}
              {counties.map((county, index) => (
                <li
                  key={`${county}-${index}`}
                  className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                    selectedCounty === county ? "bg-blue-200 font-semibold" : ""
                  }`}
                  onClick={() => {
                    onCountyChange(county);
                    setIsOpen(false);
                  }}
                >
                  {county}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
