"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Bike, Car, Leaf, TreeDeciduous, Droplets } from "lucide-react";

// Types for our data structures
interface Activity {
  id: string;
  type: "transport" | "energy" | "waste" | "shopping";
  value: number;
  date: string;
  carbonImpact: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number;
  progress: number;
  startDate: string;
  joined?: boolean;
}

interface EcoFitnessActivity {
  id: string;
  type: "walking" | "running" | "cycling";
  distance: number;
  carbonSaved: number;
  date: string;
}

const CarbonFootprintTracker = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Zero Waste Week",
      description:
        "Minimize your waste production for a week by refusing single-use items",
      duration: 7,
      progress: 0,
      startDate: new Date().toISOString(),
      joined: false,
    },
    {
      id: "2",
      title: "Car-Free Month",
      description:
        "Use public transport or bike for all your commutes this month",
      duration: 30,
      progress: 0,
      startDate: new Date().toISOString(),
      joined: false,
    },
    {
      id: "3",
      title: "Energy Saver",
      description: "Reduce your energy consumption by 20% this month",
      duration: 30,
      progress: 0,
      startDate: new Date().toISOString(),
      joined: false,
    },
  ]);
  const [fitnessActivities, setFitnessActivities] = useState<
    EcoFitnessActivity[]
  >([]);
  const [activeTab, setActiveTab] = useState("activities");
  const [showActivityConfirmation, setShowActivityConfirmation] =
    useState(false);
  const [showChallengeConfirmation, setShowChallengeConfirmation] =
    useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  // Activity Logging Section
  const ActivityLogging = () => {
    const [newActivity, setNewActivity] = useState({
      type: "transport",
      value: 0,
    });

    const handleActivitySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowActivityConfirmation(true);
      // Handle activity submission to database
    };

    return (
      <>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Log Daily Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleActivitySubmit} className="space-y-4">
              <div>
                <Label>Activity Type</Label>
                <select
                  className="w-full rounded border p-2"
                  value={newActivity.type}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      type: e.target.value as Activity["type"],
                    })
                  }
                >
                  <option value="transport">Transport</option>
                  <option value="energy">Energy Usage</option>
                  <option value="waste">Waste</option>
                  <option value="shopping">Shopping</option>
                </select>
              </div>
              <div>
                <Label>Value (km/kWh/kg)</Label>
                <Input
                  type="number"
                  value={newActivity.value}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      value: Number(e.target.value),
                    })
                  }
                />
              </div>
              <Button type="submit">Log Activity</Button>
            </form>
          </CardContent>
        </Card>

        <AlertDialog
          open={showActivityConfirmation}
          onOpenChange={setShowActivityConfirmation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Activity Logged Successfully!</AlertDialogTitle>
              <AlertDialogDescription>
                Your activity has been recorded and your carbon impact has been
                calculated.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => setShowActivityConfirmation(false)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };
  // Emissions Trend Chart
  const EmissionsTrend = () => {
    const data = [
      { name: "Mon", emissions: 45 },
      { name: "Tue", emissions: 38 },
      { name: "Wed", emissions: 42 },
      { name: "Thu", emissions: 35 },
      { name: "Fri", emissions: 39 },
      { name: "Sat", emissions: 30 },
      { name: "Sun", emissions: 28 },
    ];

    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Weekly Carbon Emissions</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  // Sustainability Challenges Section
  const SustainabilityChallenges = () => {
    const handleJoinChallenge = (challenge: Challenge) => {
      setSelectedChallenge(challenge);
      setShowChallengeConfirmation(true);
    };

    const confirmJoinChallenge = () => {
      if (selectedChallenge) {
        const updatedChallenges = challenges.map((c) =>
          c.id === selectedChallenge.id ? { ...c, joined: true } : c
        );
        setChallenges(updatedChallenges);
      }
      setShowChallengeConfirmation(false);
    };

    return (
      <>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Available Challenges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <div className="flex items-center gap-2">
                    <Leaf className="text-green-500" />
                    {!challenge.joined && (
                      <Button
                        onClick={() => handleJoinChallenge(challenge)}
                        variant="outline"
                        size="sm"
                      >
                        Join Challenge
                      </Button>
                    )}
                    {challenge.joined && (
                      <span className="text-sm text-green-600">Joined</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{challenge.description}</p>
                <Progress value={challenge.progress} className="h-2" />
                <p className="text-xs text-gray-500">
                  Duration: {challenge.duration} days
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <AlertDialog
          open={showChallengeConfirmation}
          onOpenChange={setShowChallengeConfirmation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Join Challenge</AlertDialogTitle>
              <AlertDialogDescription>
                Are you ready to start the "{selectedChallenge?.title}"
                challenge? This will help you reduce your carbon footprint!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={confirmJoinChallenge}>
                Join Challenge
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };

  // Eco-Fitness Tracking Section
  const EcoFitnessTracking = () => {
    return (
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Eco-Fitness Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <Bike className="mx-auto mb-2 text-green-600" />
              <h3 className="font-medium">Cycling</h3>
              <p className="text-sm text-gray-600">2.5kg CO2 saved</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <TreeDeciduous className="mx-auto mb-2 text-blue-600" />
              <h3 className="font-medium">Walking</h3>
              <p className="text-sm text-gray-600">1.8kg CO2 saved</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <Droplets className="mx-auto mb-2 text-purple-600" />
              <h3 className="font-medium">Running</h3>
              <p className="text-sm text-gray-600">3.2kg CO2 saved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto space-y-6 p-4">
      <h1 className="mb-6 text-3xl font-bold">Carbon Footprint Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities">Activity Tracking</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="fitness">Eco-Fitness</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ActivityLogging />
            <EmissionsTrend />
          </div>
          <Alert>
            <AlertDescription>
              Tip: Try using public transport more often to reduce your carbon
              footprint!
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="challenges">
          <SustainabilityChallenges />
        </TabsContent>

        <TabsContent value="fitness">
          <EcoFitnessTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarbonFootprintTracker;
