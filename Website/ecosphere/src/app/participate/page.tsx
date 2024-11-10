"use client";

import { useState } from "react";
import dayjs from "dayjs";

// Sample events
const events = [
  {
    date: "2024-11-10",
    title: "Clean-Up Drive",
    description:
      "Neighborhood clean-up drive. Join us to make our streets cleaner!",
    time: "10:00 AM",
    location: "Main Park",
  },
  {
    date: "2024-11-15",
    title: "Tree Planting",
    description: "Help us plant trees and beautify the neighborhood.",
    time: "9:00 AM",
    location: "West Park",
  },
  {
    date: "2024-11-20",
    title: "Recycling Initiative",
    description: "Collect recyclables and help the environment.",
    time: "5:00 PM",
    location: "City Center",
  },
  {
    date: "2024-11-25",
    title: "Beach Clean-Up",
    description: "Join us for a beach clean-up to preserve marine life.",
    time: "8:00 AM",
    location: "Sunset Beach",
  },
];

export default function ParticipatePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<any>(null);

  // Get current month
  const currentMonth = dayjs().format("MMMM YYYY");
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  const daysInMonth = endOfMonth.date();

  // Get all the events for the current month
  const monthlyEvents = events.filter(
    (event) => dayjs(event.date).month() === dayjs().month(),
  );

  // Handle click on a date to show event details
  const handleDateClick = (date: string) => {
    const event = events.find((event) => event.date === date);
    if (event) {
      setEventDetails(event);
      setShowModal(true);
    }
  };

  // Render the calendar grid
  const renderCalendar = () => {
    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = dayjs().date(i).format("YYYY-MM-DD");
      const isEventDay = events.some((event) => event.date === date);
      calendarDays.push(
        <div
          key={i}
          className={`cursor-pointer rounded-lg border p-4 text-center ${
            isEventDay ? "bg-green-500 text-white" : "hover:bg-gray-200"
          } relative`}
          onClick={() => handleDateClick(date)}
        >
          {i}
          {isEventDay && (
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>,
      );
    }
    return calendarDays;
  };

  return (
    <div className="flex flex-col items-center p-8">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold">Participate in Events</h1>

      {/* Calendar */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">{currentMonth}</h2>
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
      </div>

      {/* Event List */}
      <div className="mt-6 w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Upcoming Events</h3>
        {monthlyEvents.length === 0 ? (
          <p>No upcoming events this month.</p>
        ) : (
          monthlyEvents.map((event, index) => (
            <div key={index} className="border-b py-2">
              <h4 className="font-semibold">{event.title}</h4>
              <p>
                {event.time} | {event.location}
              </p>
              <p>{event.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal for Event Details */}
      {showModal && eventDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6">
            <h3 className="text-2xl font-semibold">{eventDetails.title}</h3>
            <p className="text-sm text-gray-600">{eventDetails.date}</p>
            <p className="mt-4">{eventDetails.description}</p>
            <p className="mt-2 font-semibold">
              Location: {eventDetails.location}
            </p>
            <p className="mt-2 font-semibold">Time: {eventDetails.time}</p>
            <button
              className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
