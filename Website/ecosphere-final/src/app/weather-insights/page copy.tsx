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

  // Step 1: Get user location
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

  // Step 2: Fetch weather data and alerts
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

  // Step 3: Define behavioral adaptation tips based on conditions
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

  // Step 4: Render extreme weather alerts
  const renderAlerts = () => {
    if (!alertData.length)
      return <p>No extreme weather alerts at the moment.</p>;
    return (
      <div>
        {alertData.map((alert: any, index: number) => (
          <div key={index} className="alert">
            <h3>{alert.event}</h3>
            <p>{alert.description}</p>
            <strong>Action:</strong> {getAlertAction(alert.event)}
          </div>
        ))}
      </div>
    );
  };

  // Step 5: Define actions based on alert types
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

  // Step 6: Define climate action tips based on weather patterns
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
    <div className="weather-page">
      <h1>Weather Forecast and Tips</h1>

      {/* Real-Time Weather Data Display */}
      {weatherData && (
        <div className="weather-info">
          <h2>Current Weather</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Conditions: {weatherData.current.condition.text}</p>
        </div>
      )}

      {/* Behavioral Adaptation Tips */}
      <div className="behavioral-tips">
        <h2>Behavioral Tips</h2>
        <ul>
          {getBehavioralTips().map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Extreme Weather Alerts */}
      <div className="alerts">
        <h2>Extreme Weather Alerts</h2>
        {renderAlerts()}
      </div>

      {/* Climate Action Tips */}
      <div className="climate-action-tips">
        <h2>Climate Action Tips</h2>
        <ul>
          {getClimateActionTips().map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherPage;
