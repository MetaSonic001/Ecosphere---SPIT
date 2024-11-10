"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";

// Sample inventory data with descriptions removed
const inventory = [
  {
    id: 1,
    name: "Apples",
    quantity: 5,
    category: "Fruits",
    expiryDate: "2024-11-20",
  },
  {
    id: 2,
    name: "Milk",
    quantity: 1,
    category: "Dairy",
    expiryDate: "2024-11-15",
  },
  {
    id: 3,
    name: "Bread",
    quantity: 3,
    category: "Bakery",
    expiryDate: "2024-11-12",
  },
  {
    id: 4,
    name: "Bananas",
    quantity: 6,
    category: "Fruits",
    expiryDate: "2024-11-18",
  },
  {
    id: 5,
    name: "Rice",
    quantity: 10,
    category: "Grains",
    expiryDate: "2025-01-01",
  },
  {
    id: 6,
    name: "Canned Beans",
    quantity: 8,
    category: "Canned Goods",
    expiryDate: "2026-05-10",
  },
  {
    id: 7,
    name: "Carrots",
    quantity: 4,
    category: "Vegetables",
    expiryDate: "2024-11-25",
  },
  {
    id: 8,
    name: "Peanut Butter",
    quantity: 2,
    category: "Condiments",
    expiryDate: "2025-03-15",
  },
];

// Sample donation centers data with added description
const donationCenters = [
  {
    id: 1,
    name: "Sri Aurobindo Ashram",
    location: "Street 123, City",
    contact: "123-456-7890",
    description: "A peaceful ashram supporting local communities in need.",
  },
  {
    id: 2,
    name: "The Akshaya Patra Foundation",
    location: "Street 456, City",
    contact: "987-654-3210",
    description: "Providing food to individuals and families every day.",
  },
  {
    id: 3,
    name: "Goonj Donation center",
    location: "Street 789, City",
    contact: "555-123-4567",
    description:
      "Supporting local families through food and financial donations.",
  },
];

export default function DonationPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Handle item selection
  const toggleItemSelection = (itemId: number, maxQuantity: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId],
    );
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: 1,
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (
    itemId: number,
    value: number,
    maxQuantity: number,
  ) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.min(Math.max(value, 1), maxQuantity), // Ensure quantity is between 1 and maxQuantity
    }));
  };

  // Handle donation action
  const handleDonation = () => {
    if (selectedItems.length > 0 && selectedCenter) {
      alert(
        `Successfully donated ${selectedItems.length} items to ${donationCenters.find((center) => center.id === selectedCenter)?.name}`,
      );
    } else {
      alert("Please select items and a donation center to donate.");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-8">
      {/* Dashboard Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-teal-600">
          Donation Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your inventory and donate to a cause.
        </p>
      </div>

      {/* Inventory Section */}
      <div className="my-10">
        <h2 className="text-3xl font-semibold text-gray-800">Your Inventory</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {inventory.map((item) => (
            <div key={item.id} className="rounded-lg bg-white p-6 shadow-lg">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Expiry Date: {item.expiryDate}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Category: {item.category}
                </p>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id, item.quantity)}
                  className="mt-4 h-6 w-6 accent-teal-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Center Section */}
      <div className="my-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Donation Centers Near You
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {donationCenters.map((center) => (
            <div
              key={center.id}
              className={`hover:scale-102 cursor-pointer rounded-lg border-2 bg-white p-6 shadow-lg transition-transform duration-200 ease-in-out hover:shadow-md ${
                selectedCenter === center.id
                  ? "border-teal-500"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedCenter(center.id)}
            >
              <div className="flex flex-col">
                <h3 className="mt-4 text-xl font-semibold text-teal-600">
                  {center.name}
                </h3>
                <div className="mt-2 flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <p className="text-sm">{center.location}</p>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-gray-600">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <p className="text-sm">{center.contact}</p>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {center.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Cart Section */}
      <div className="my-10">
        <h3 className="text-2xl font-semibold text-gray-800">
          Items in Your Cart
        </h3>
        <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
          {selectedItems.length === 0 ? (
            <p className="text-gray-600">
              Your cart is empty. Please select items to donate.
            </p>
          ) : (
            selectedItems.map((itemId) => {
              const item = inventory.find((i) => i.id === itemId);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-teal-600">
                      {item.name}
                    </span>
                    <span className="text-gray-600">
                      Available: {item.quantity}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={quantities[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        +e.target.value,
                        item.quantity,
                      )
                    }
                    className="w-16 rounded border px-2 py-1 text-gray-700"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Donation Button */}
      <div className="mt-8">
        <button
          onClick={handleDonation}
          className="w-full transform rounded-lg bg-teal-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-teal-700"
        >
          Donate Selected Items
        </button>
      </div>
    </div>
  );
}
