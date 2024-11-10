import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { Globe2, Leaf, Activity, Target, Users, Heart } from "lucide-react";

const LandingPage = () => {
  // Features data
  const features = [
    {
      title: "Personal Carbon Footprint Tracker",
      description:
        "Track and analyze your daily carbon emissions through activities like travel, energy usage, and consumption.",
      icon: <Activity className="w-10 h-10 text-green-500" />,
      highlights: [
        "Activity logging and monitoring",
        "Smart device integration",
        "Real-time emissions calculation",
        "Personalized reduction tips",
      ],
    },
    {
      title: "Global Environmental Metrics",
      description:
        "Stay informed about critical environmental trends and their impact on our planet.",
      icon: <Globe2 className="w-10 h-10 text-blue-500" />,
      highlights: [
        "Real-time environmental data",
        "Country sustainability rankings",
        "Interactive global maps",
        "Monthly trend reports",
      ],
    },
    {
      title: "Eco-Friendly Challenges",
      description:
        "Join community challenges and develop sustainable habits through gamified experiences.",
      icon: <Target className="w-10 h-10 text-purple-500" />,
      highlights: [
        "Monthly sustainability challenges",
        "Habit tracking system",
        "Community leaderboards",
        "Achievement rewards",
      ],
    },
    {
      title: "Green Fitness Tracking",
      description:
        "Transform your fitness routine into environmental action with our eco-fitness tracking.",
      icon: <Heart className="w-10 h-10 text-red-500" />,
      highlights: [
        "Carbon-saving workouts",
        "Green route suggestions",
        "Impact visualization",
        "Community challenges",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-green-500" />
              <span className="text-xl font-bold">EcoTracker</span>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {features.map((feature) => (
                        <li key={feature.title} className="row-span-3">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-center gap-2">
                              {feature.icon}
                              <div className="text-sm font-medium leading-none">
                                {feature.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {feature.description}
                            </p>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px]">
                      <li className="row-span-3">
                        <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <Users className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Join the Movement
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Connect with eco-conscious individuals and
                            participate in global initiatives.
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px]">
                      <li className="row-span-3">
                        <p className="text-sm text-muted-foreground">
                          We&apos;re on a mission to make environmental impact
                          tracking accessible and actionable for everyone.
                        </p>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Track Your Environmental Impact
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of people making a difference through personal
            environmental tracking and sustainable living.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="relative overflow-hidden">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">1M+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">50K+</h3>
              <p className="text-gray-600">Trees Planted</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">100K+</h3>
              <p className="text-gray-600">Carbon Tons Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of environmentally conscious individuals and
            start tracking your impact today.
          </p>
          <Button size="lg">Get Started Now</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">EcoTracker</h3>
              <p className="text-gray-400">
                Making environmental impact tracking accessible and actionable
                for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>Carbon Footprint Tracker</li>
                <li>Global Metrics</li>
                <li>Eco Challenges</li>
                <li>Green Fitness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;