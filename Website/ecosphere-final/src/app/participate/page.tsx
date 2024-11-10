"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export default function ParticipatePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<Event | null>(null);

  // Get current month
  const currentMonth = dayjs().format("MMMM YYYY");
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  const daysInMonth = endOfMonth.date();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/events?month=${dayjs().format("YYYY-MM")}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get all the events for the current month
  const monthlyEvents = events.filter(
    (event) => dayjs(event.date).month() === dayjs().month()
  );

  // Handle click on a date to show event details
  const handleDateClick = (date: string) => {
    const event = events.find(
      (event) => dayjs(event.date).format("YYYY-MM-DD") === date
    );
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
      const isEventDay = events.some(
        (event) => dayjs(event.date).format("YYYY-MM-DD") === date
      );
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
        </div>
      );
    }
    return calendarDays;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

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
          monthlyEvents.map((event) => (
            <div key={event.id} className="border-b py-2">
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
            <p className="text-sm text-gray-600">
              {dayjs(eventDetails.date).format("YYYY-MM-DD")}
            </p>
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
