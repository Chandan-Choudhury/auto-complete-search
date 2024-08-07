"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [query, setQuery] = useState(""); // State to hold the user's search query.
  const [suggestions, setSuggestions] = useState([]); // State to hold search suggestions.
  const [selectedMedicine, setSelectedMedicine] = useState(null); // State to hold the selected medicine details.
  const [cachedData, setCachedData] = useState([]); // State to cache search results.

  useEffect(() => {
    // Function to fetch data from the server based on the query.
    const fetchData = async () => {
      if (query.length > 1) {
        // Only fetch data if query length is greater than 1.
        if (cachedData[query]) {
          // If data for the query is already cached, use it.
          setSuggestions(cachedData[query]);
        } else {
          try {
            // Make an HTTP GET request to fetch data.
            const response = await axios.get(`${URL}?q=${query}`);
            setSuggestions(response.data); // Update suggestions with the fetched data.
            if (response.data.length > 0) {
              // Cache the fetched data if there are results.
              setCachedData((prev) => ({ ...prev, [query]: response.data }));
            }
          } catch (error) {
            // Handle any errors that occur during the fetch.
            console.error("Error fetching data:", error);
            setSuggestions([]);
          }
        }
      } else {
        // Clear suggestions if query length is less than 2.
        setSuggestions([]);
      }
    };

    // Debounce the fetchData function to limit the number of API calls.
    const debounceFetch = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceFetch); // Clean up the timeout on component unmount or query change.
  }, [query, cachedData]); // useEffect dependencies: query and cachedData.

  const handleSuggestionClick = (medicine) => {
    setQuery(""); // Clear the search query.
    setSelectedMedicine(medicine); // Set the selected medicine details.
    setSuggestions([]); // Clear suggestions.
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Auto Complete Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a Medicine..."
        className="border border-gray-400 p-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <ul className="mt-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-h-96 rounded-lg overflow-y-auto">
        {suggestions.map((medicine, index) => (
          <li
            key={medicine._id}
            className="bg-white p-4 shadow-md hover:shadow-lg hover:bg-gray-400 hover:text-white transition-shadow duration-300 ease-in-out cursor-pointer"
            onClick={() => handleSuggestionClick(medicine)}
          >
            <b>{index + 1}.</b> {medicine.title.toUpperCase()}
          </li>
        ))}
      </ul>
      {selectedMedicine && (
        <div className="mt-8 bg-white p-6 shadow-md rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">{selectedMedicine.title}</h2>
          <p className="mb-2">
            <span className="font-bold">Composition:</span>{" "}
            {selectedMedicine.composition}
          </p>
          <p className="mb-2">
            <span className="font-bold">Category:</span>{" "}
            {selectedMedicine.category}
          </p>
          <p className="mb-2">
            <span className="font-bold">Manufacturer:</span>{" "}
            {selectedMedicine.manufacturer}
          </p>
          <p className="mb-2">
            <span className="font-bold">Pack Size:</span>{" "}
            {selectedMedicine.pack_size}
          </p>
        </div>
      )}
    </div>
  );
}
