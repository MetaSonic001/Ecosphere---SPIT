"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Gift } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

// Initial sample data
const initialFoodItems = [
  {
    id: 1,
    name: "Apples",
    type: "Fruits",
    expirationDate: "2023-06-15",
    quantity: 5,
    opened: false,
  },
  {
    id: 2,
    name: "Milk",
    type: "Dairy",
    expirationDate: "2023-06-12",
    quantity: 1,
    opened: true,
  },
];

const consumptionData = [
  { name: "Fruits", consumed: 15, wasted: 2 },
  { name: "Vegetables", consumed: 20, wasted: 3 },
  { name: "Dairy", consumed: 10, wasted: 1 },
  { name: "Grains", consumed: 25, wasted: 4 },
];

export default function FoodInventoryDashboard() {
  const [items, setItems] = useState(initialFoodItems);
  const [newItem, setNewItem] = useState({
    name: "",
    type: "",
    expirationDate: "",
    quantity: "",
    opened: false,
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("expirationDate");

  // Handle adding new item
  const addItem = (e) => {
    e.preventDefault();
    if (
      !newItem.name ||
      !newItem.type ||
      !newItem.expirationDate ||
      !newItem.quantity
    )
      return;
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setNewItem({
      name: "",
      type: "",
      expirationDate: "",
      quantity: "",
      opened: false,
    });
  };

  // Filter and sort items
  const filteredAndSortedItems = items
    .filter((item) => {
      if (filter === "all") return true;
      if (filter === "expiringSoon") {
        const daysUntilExpiration = Math.floor(
          (new Date(item.expirationDate) - new Date()) / (1000 * 3600 * 24),
        );
        return daysUntilExpiration <= 3;
      }
      return item.type.toLowerCase() === filter;
    })
    .sort((a, b) => {
      if (sort === "expirationDate") {
        return new Date(a.expirationDate) - new Date(b.expirationDate);
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-center text-4xl font-bold text-teal-600">
        Food Inventory & Donation System
      </h1>

      {/* Add New Item Section */}
      <div className="mb-8 rounded-lg bg-teal-50 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-teal-800">
          Add New Item
        </h2>
        <form onSubmit={addItem} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            className="rounded border p-2"
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="rounded border p-2"
          >
            <option value="">Select type</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
          </select>

          <input
            type="date"
            value={newItem.expirationDate}
            onChange={(e) =>
              setNewItem({ ...newItem, expirationDate: e.target.value })
            }
            className="rounded border p-2"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            placeholder="Quantity"
            className="rounded border p-2"
          />
          <button
            type="submit"
            className="col-span-2 rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Filter and Sort Section */}
      <div className="mb-4 flex items-center justify-between">
        <select
          className="rounded border p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Items</option>
          <option value="expiringSoon">Expiring Soon</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
        </select>
        <select
          className="rounded border p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="expirationDate">Expiration Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Item List */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="max-h-64 overflow-y-auto">
          {filteredAndSortedItems.map((item) => {
            const daysUntilExpiration = Math.floor(
              (new Date(item.expirationDate) - new Date()) / (1000 * 3600 * 24),
            );
            return (
              <div
                key={item.id}
                className="flex items-center justify-between border-b p-4 last:border-none"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">{item.type}</p>
                  <p className="text-sm text-gray-600">
                    Expires: {item.expirationDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {daysUntilExpiration <= 3 && (
                    <span className="inline-flex items-center rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                      <AlertCircle className="mr-1 h-4 w-4" /> Expiring Soon
                    </span>
                  )}
                  {!item.opened && (
                    <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800">
                      Unopened
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Food Waste & Consumption Insights */}
      <div className="mt-8 rounded-lg bg-teal-50 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-teal-800">
          Food Waste & Consumption Insights
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={consumptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="consumed" fill="#4CAF50" />
            <Bar dataKey="wasted" fill="#FF7043" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donation Suggestion */}
      <div className="mt-8 rounded-lg bg-amber-50 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-amber-800">
          Donation Options
        </h2>
        <p className="mb-4 text-gray-700">
          If you have items nearing expiration and can't use them, consider
          donating to your local food bank or charity.
        </p>
        <div className="flex items-center space-x-2">
          <Gift className="h-6 w-6 text-amber-600" />
          <Link
            href="/donation-centers"
            className="font-medium text-amber-600 underline"
          >
            Find Donation Centers Nearby
          </Link>
        </div>
      </div>
    </div>
  );
}
