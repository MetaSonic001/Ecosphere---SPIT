"use client";

import Link from "next/link"; // Import Link
import { useState } from "react";
import { Award, Users, Calendar, Trophy, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Make a Difference Together
            </h1>
            <p className="mb-8 text-xl md:text-2xl">
              Join our community of eco-warriors and make sustainable living fun
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/host"
                className="rounded-full bg-green-600 px-8 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-green-700"
              >
                Host an Event
              </Link>
              <Link
                href="/participate"
                className="rounded-full border-2 border-white bg-transparent px-8 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-green-700"
              >
                Participate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Users className="h-12 w-12 text-green-600" />}
              title="Join Communities"
              description="Connect with like-minded people in your area"
            />
            <FeatureCard
              icon={<Calendar className="h-12 w-12 text-green-600" />}
              title="Eco Events"
              description="Participate in local sustainability events"
            />
            <FeatureCard
              icon={<Trophy className="h-12 w-12 text-green-600" />}
              title="Earn Points"
              description="Get rewarded for your eco-friendly actions"
            />
            <FeatureCard
              icon={<Award className="h-12 w-12 text-green-600" />}
              title="Track Progress"
              description="Monitor your sustainability journey"
            />
          </div>
        </div>
      </section>

      {/* Local Communities Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-3xl font-semibold">
            Connect with Local Sustainability Communities
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Sample Community Event Cards */}
            <CommunityCard
              title="Clean-Up Drive"
              date="Saturday, 10 AM"
              description="Join us for a neighborhood clean-up drive. Let's make our streets cleaner!"
            />
            <CommunityCard
              title="Tree Planting"
              date="Sunday, 9 AM"
              description="Help us plant trees to beautify the neighborhood and reduce carbon footprints."
            />
            <CommunityCard
              title="Recycling Initiative"
              date="Wednesday, 5 PM"
              description="Collect recyclables and help the environment by recycling."
            />
            <CommunityCard
              title="Beach Clean-Up"
              date="Friday, 8 AM"
              description="Join us for a beach clean-up event to preserve marine life."
            />
          </div>
        </div>
      </section>

      {/* Eco-Friendly Challenges Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-3xl font-semibold">
            Eco-Friendly Challenges
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Sample Challenge Cards */}
            <ChallengeCard
              title="Plastic-Free Week"
              description="Join us in going plastic-free for a week! See how much waste you can avoid."
            />
            <ChallengeCard
              title="Plant-Based Meals Challenge"
              description="Challenge yourself to have only plant-based meals for a week."
            />
            <ChallengeCard
              title="Zero-Waste Living"
              description="Reduce your daily waste by adopting zero-waste practices."
            />
            <ChallengeCard
              title="Car-Free Day"
              description="Challenge yourself to spend one day without using a car!"
            />
          </div>
        </div>
      </section>

      {/* Eco-Score Leaderboard Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-3xl font-semibold">
            Eco-Score Leaderboard
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Sample Leaderboard Cards */}
            <LeaderboardCard rank="1" name="John Doe" ecoScore={1200} />
            <LeaderboardCard rank="2" name="Jane Smith" ecoScore={1100} />
            <LeaderboardCard rank="3" name="Mike Johnson" ecoScore={1000} />
            <LeaderboardCard rank="4" name="Emily Brown" ecoScore={950} />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">EcoConnect</h3>
              <p className="text-gray-300">
                Building sustainable communities together.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-bold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/communities"
                    className="text-gray-300 hover:text-white"
                  >
                    Communities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-gray-300 hover:text-white"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/challenges"
                    className="text-gray-300 hover:text-white"
                  >
                    Challenges
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-bold">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-bold">Connect</h4>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EcoConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 text-center shadow-lg transition duration-300 hover:shadow-xl">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function CommunityCard({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{date}</p>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}

function ChallengeCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}

function LeaderboardCard({
  rank,
  name,
  ecoScore,
}: {
  rank: string;
  name: string;
  ecoScore: number;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h3 className="text-xl font-semibold">
        Rank {rank}: {name}
      </h3>
      <p className="mt-2 text-gray-600">Eco Score: {ecoScore}</p>
    </div>
  );
}
