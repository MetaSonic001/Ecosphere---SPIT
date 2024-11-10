"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { toast } from "../../../hooks/use-toast";

export function HabitTracker({ userData }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, [userData]);

  const fetchHabits = async () => {
    try {
      // API call to get user's habits
      const response = await fetch("/api/trpc/get-habits");
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  const toggleHabit = async (habitId, completed) => {
    try {
      // API call to update habit status
      await fetch(`/api/trpc/update-habit/${habitId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      fetchHabits(); // Refresh habits after update
      if (completed) {
        toast({
          title: "Habit Completed",
          description: "Great job! Keep up the good work.",
        });
      }
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eco-Friendly Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {habits.map((habit) => (
          <div key={habit.id} className="mb-2 flex items-center space-x-2">
            <Checkbox
              id={`habit-${habit.id}`}
              checked={habit.completed}
              onCheckedChange={(checked) => toggleHabit(habit.id, checked)}
            />
            <label
              htmlFor={`habit-${habit.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {habit.name}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
