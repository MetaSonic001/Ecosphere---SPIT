"use client";

import React, { useState, useEffect } from "react";

const WeatherPage: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [weatherData, setWeatherData] = useState<any>(null);
  const [alertData, setAlertData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const WEATHER_API_KEY = "0ff1e50af8b048b2b4a193549240911";
  const WEATHER_API_URL = "https://api.weatherapi.com/v1";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return;
      try {
        const weatherRes = await fetch(
          `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${location.lat},${location.lon}`,
        );
        const weatherData = await weatherRes.json();
        setWeatherData(weatherData);

        const alertRes = await fetch(
          `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${location.lat},${location.lon}&alerts=yes`,
        );
        const alertData = await alertRes.json();
        setAlertData(alertData.alerts || []);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const getBehavioralTips = () => {
    if (!weatherData) return [];
    const tips = [];
    if (weatherData.current.temp_c > 30) {
      tips.push("It's hot! Consider conserving energy by minimizing AC usage.");
    }
    if (weatherData.current.temp_c < 10) {
      tips.push(
        "It's cold! Seal windows to retain heat and reduce heating costs.",
      );
    }
    if (weatherData.current.humidity > 70) {
      tips.push(
        "High humidity detected. Use a dehumidifier to stay comfortable.",
      );
    }
    return tips;
  };

  const renderAlerts = () => {
    if (!alertData.length)
      return <p>No extreme weather alerts at the moment.</p>;
    return (
      <div>
        {alertData.map((alert: any, index: number) => (
          <div
            key={index}
            className="alert rounded-lg bg-red-100 p-4 shadow-md"
          >
            <h3 className="font-bold text-red-600">{alert.event}</h3>
            <p>{alert.description}</p>
            <strong>Action:</strong> {getAlertAction(alert.event)}
          </div>
        ))}
      </div>
    );
  };

  const getAlertAction = (alertType: string) => {
    switch (alertType) {
      case "Heatwave":
        return "Stay hydrated and avoid outdoor activities.";
      case "Storm":
        return "Stay indoors and secure loose outdoor objects.";
      case "Flood":
        return "Move to higher ground and avoid flooded areas.";
      default:
        return "Stay safe and follow local guidance.";
    }
  };

  const getClimateActionTips = () => {
    const tips = [];
    if (weatherData?.current.temp_c > 25) {
      tips.push("Reduce energy usage by limiting AC time.");
    }
    if (weatherData?.current.temp_c < 15) {
      tips.push("Save energy by lowering heating settings when not needed.");
    }
    return tips;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Weather Insights</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Weather Info */}
        <div className="rounded-lg bg-blue-50 p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Current Weather</h2>
          {weatherData ? (
            <>
              <p>
                Temperature:{" "}
                <span className="font-semibold">
                  {weatherData.current.temp_c}°C
                </span>
              </p>
              <p>
                Humidity:{" "}
                <span className="font-semibold">
                  {weatherData.current.humidity}%
                </span>
              </p>
              <p>
                Conditions:{" "}
                <span className="font-semibold">
                  {weatherData.current.condition.text}
                </span>
              </p>
            </>
          ) : (
            <p>No weather data available</p>
          )}
        </div>

        {/* Behavioral Tips */}
        <div className="rounded-lg bg-green-50 p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Behavioral Tips</h2>
          <ul className="list-inside list-disc">
            {getBehavioralTips().map((tip, index) => (
              <li key={index} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Extreme Weather Alerts */}
      <div className="mt-6 rounded-lg bg-yellow-50 p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Extreme Weather Alerts</h2>
        {renderAlerts()}
      </div>

      {/* Climate Action Tips */}
      <div className="mt-6 rounded-lg bg-purple-50 p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Climate Action Tips</h2>
        <ul className="list-inside list-disc">
          {getClimateActionTips().map((tip, index) => (
            <li key={index} className="text-gray-700">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherPage;
