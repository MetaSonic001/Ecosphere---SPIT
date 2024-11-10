"use client";

import { useState } from "react";
import dayjs from "dayjs";

export default function HostEventPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
  });
  const [events, setEvents] = useState<any[]>([]);

  // Get current month
  const currentMonth = dayjs().format("MMMM YYYY");
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  const daysInMonth = endOfMonth.date();

  // Handle click on a date to open the event form
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  // Handle event form submission
  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventDetails && eventDetails.title && selectedDate) {
      setEvents([...events, { ...eventDetails, date: selectedDate }]);
      setShowEventForm(false);
      setEventDetails({ title: "", description: "", time: "", location: "" });
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
      <h1 className="mb-6 text-3xl font-bold">Host an Event</h1>

      {/* Calendar */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">{currentMonth}</h2>
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
      </div>

      {/* Event Form */}
      {showEventForm && (
        <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">
            Create Event for {selectedDate}
          </h3>
          <form onSubmit={handleSubmitEvent}>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Event Title</label>
              <input
                type="text"
                value={eventDetails.title}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, title: e.target.value })
                }
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                value={eventDetails.description}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    description: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Time</label>
              <input
                type="text"
                value={eventDetails.time}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, time: e.target.value })
                }
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Location</label>
              <input
                type="text"
                value={eventDetails.location}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, location: e.target.value })
                }
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Add Event
            </button>
          </form>
        </div>
      )}

      {/* Display all hosted events */}
      <div className="mt-6 w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Your Hosted Events</h3>
        {events.length === 0 ? (
          <p>No events hosted yet.</p>
        ) : (
          events.map((event, index) => (
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
    </div>
  );
}
