"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import SmartHomeIntegration from "../EnergyAnalyzer/components/SmartHomeIntegration";
import EnergyConsumptionInsights from "../EnergyAnalyzer/components/EnergyConsumptionInsights";
import OfficeCarbonTracker from "../EnergyAnalyzer/components/OfficeCarbonTracker";
import EcoFriendlySupplies from "../EnergyAnalyzer/components/EcoFriendlySupplies";

// Sample data structure for testing
const sampleData = [
  { device_id: "dev1", device_type: "Light", energy_consumption: 0.5, usage_time: 8, room: "Living Room", efficiency_rating: 4.5 },
  { device_id: "dev2", device_type: "TV", energy_consumption: 2.1, usage_time: 6, room: "Living Room", efficiency_rating: 3.8 },
  { device_id: "dev3", device_type: "Computer", energy_consumption: 1.8, usage_time: 10, room: "Office", efficiency_rating: 4.0 },
  { device_id: "dev4", device_type: "Fan", energy_consumption: 0.8, usage_time: 12, room: "Bedroom", efficiency_rating: 4.2 },
  { device_id: "dev5", device_type: "Thermostat", energy_consumption: 3.0, usage_time: 24, room: "Office", efficiency_rating: 3.5 }
];

interface DeviceData {
  device_id: string;
  device_type: string;
  energy_consumption: number;
  usage_time: number;
  room: string;
  efficiency_rating: number;
}

export default function Home() {
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [activeDevices, setActiveDevices] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('./../../../public/smart_home_data.csv');

        if (!response.ok) {
          console.warn('CSV file not found, using sample data');
          setDeviceData(sampleData);
          initializeActiveDevices(sampleData);
          return;
        }

        const csvString = await response.text();
        const result = Papa.parse<DeviceData>(csvString, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transform: (value, field) => {
            if (field === 'energy_consumption' || field === 'usage_time' || field === 'efficiency_rating') {
              return Number(value);
            }
            return value;
          },
        });

        if (result.errors.length > 0) {
          console.error('CSV parsing errors:', result.errors);
          throw new Error('Error parsing CSV: ' + result.errors[0].message);
        }

        setDeviceData(result.data);
        initializeActiveDevices(result.data);
      } catch (err) {
        console.warn('Error loading CSV, using sample data:', err);
        setDeviceData(sampleData);
        initializeActiveDevices(sampleData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const initializeActiveDevices = (data: DeviceData[]) => {
    const initialStates = data.reduce((acc, device) => {
      acc[device.device_id] = true; // Assume all devices are active initially
      return acc;
    }, {} as { [key: string]: boolean });
    setActiveDevices(initialStates);
  };

  const handleToggleDevice = (deviceId: string) => {
    setActiveDevices((prevState) => {
      const newState = { ...prevState, [deviceId]: !prevState[deviceId] };
      const updatedDeviceData = deviceData.map((device) => ({
        ...device,
        energy_consumption: newState[device.device_id] ? device.energy_consumption : 0, // Set consumption to 0 if turned off
      }));
      setDeviceData(updatedDeviceData);
      return newState;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading device data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Smart Home Energy Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SmartHomeIntegration deviceData={deviceData} activeDevices={activeDevices} onToggleDevice={handleToggleDevice} />
            <EnergyConsumptionInsights deviceData={deviceData} />
            <OfficeCarbonTracker deviceData={deviceData} />
            <EcoFriendlySupplies />
          </div>
        </div>
      </div>
    </div>
  );
}
