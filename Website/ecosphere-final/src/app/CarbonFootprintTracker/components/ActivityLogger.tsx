"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { toast } from "../../../hooks/use-toast";

export function ActivityLogger({ userData }) {
  const [activity, setActivity] = useState({
    type: "",
    value: "",
    unit: "",
  });

  const handleInputChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to save activity data
      const response = await fetch("/api/trpc/log-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });
      if (response.ok) {
        toast({
          title: "Activity Logged",
          description: "Your activity has been successfully recorded.",
        });
        setActivity({ type: "", value: "", unit: "" });
      } else {
        throw new Error("Failed to log activity");
      }
    } catch (error) {
      console.error("Error logging activity:", error);
      toast({
        title: "Error",
        description: "Failed to log activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          // API call to process and save Google Timeline data
          const response = await fetch("/api/trpc/process-timeline", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });
          if (response.ok) {
            toast({
              title: "Timeline Processed",
              description:
                "Your Google Timeline data has been successfully processed and logged.",
            });
          } else {
            throw new Error("Failed to process timeline");
          }
        } catch (error) {
          console.error("Error processing timeline:", error);
          toast({
            title: "Error",
            description:
              "Failed to process Google Timeline data. Please try again.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Log Your Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          name="type"
          value={activity.type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Activity Type</option>
          <option value="travel">Travel</option>
          <option value="energy">Energy Consumption</option>
          <option value="waste">Waste Generation</option>
          <option value="shopping">Shopping</option>
        </Select>
        <Input
          type="number"
          name="value"
          value={activity.value}
          onChange={handleInputChange}
          placeholder="Value"
          required
        />
        <Input
          type="text"
          name="unit"
          value={activity.unit}
          onChange={handleInputChange}
          placeholder="Unit (e.g., km, kWh, kg)"
          required
        />
        <Button type="submit">Log Activity</Button>
      </form>
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Upload Google Timeline</h3>
        <Input type="file" accept=".json" onChange={handleFileUpload} />
      </div>
    </div>
  );
}
