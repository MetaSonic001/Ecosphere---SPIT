"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Globe,
  TreePine,
  Droplets,
  Wind,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const GlobalDashboard = () => {
  // Mock data - in a real app, this would come from an API
  const temperatureData = [
    { month: "Jan", value: 1.1 },
    { month: "Feb", value: 1.2 },
    { month: "Mar", value: 1.3 },
    { month: "Apr", value: 1.4 },
    { month: "May", value: 1.5 },
    { month: "Jun", value: 1.6 },
  ];

  const sustainabilityScores = {
    global: 65,
    local: 72,
    personal: 81,
  };

  const metrics = [
    {
      title: "Global Temperature Rise",
      value: "+1.5°C",
      trend: "up",
      icon: Globe,
    },
    {
      title: "Forest Coverage",
      value: "-2.3%",
      trend: "down",
      icon: TreePine,
    },
    {
      title: "Water Quality Index",
      value: "73/100",
      trend: "up",
      icon: Droplets,
    },
    {
      title: "Air Quality",
      value: "85/100",
      trend: "up",
      icon: Wind,
    },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Global Environmental Impact Dashboard
        </h1>
        <p className="text-gray-500">
          Real-time insights into our planet's health
        </p>
      </header>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                </div>
                <div className="flex items-center">
                  <metric.icon className="w-8 h-8 text-blue-500" />
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-red-500 ml-2" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-green-500 ml-2" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Global Trends</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability Index</TabsTrigger>
          <TabsTrigger value="reports">Monthly Reports</TabsTrigger>
          <TabsTrigger value="goals">Personal Goals</TabsTrigger>
        </TabsList>

        {/* Global Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Rise Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sustainability Index Tab */}
        <TabsContent value="sustainability">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Global Score</span>
                  <span>{sustainabilityScores.global}%</span>
                </div>
                <Progress value={sustainabilityScores.global} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Local Score</span>
                  <span>{sustainabilityScores.local}%</span>
                </div>
                <Progress value={sustainabilityScores.local} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Personal Score</span>
                  <span>{sustainabilityScores.personal}%</span>
                </div>
                <Progress value={sustainabilityScores.personal} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Environmental Impact Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Carbon Footprint</h4>
                      <p className="text-2xl font-bold">2.4 tons</p>
                      <p className="text-sm text-gray-500">
                        -12% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Water Usage</h4>
                      <p className="text-2xl font-bold">4,500 L</p>
                      <p className="text-sm text-gray-500">
                        -8% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Waste Generated</h4>
                      <p className="text-2xl font-bold">45 kg</p>
                      <p className="text-sm text-gray-500">
                        -15% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    Reduce Carbon Footprint
                  </h4>
                  <Progress value={75} />
                  <p className="text-sm text-gray-500 mt-1">
                    Goal: 2 tons/year | Current: 2.4 tons
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Water Conservation</h4>
                  <Progress value={60} />
                  <p className="text-sm text-gray-500 mt-1">
                    Goal: 4,000 L/month | Current: 4,500 L
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Zero Waste</h4>
                  <Progress value={85} />
                  <p className="text-sm text-gray-500 mt-1">
                    Goal: 30 kg/month | Current: 45 kg
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalDashboard;
