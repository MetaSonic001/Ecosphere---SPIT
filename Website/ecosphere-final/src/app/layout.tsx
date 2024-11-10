import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignUp,
} from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { Globe2, Leaf, Activity, Target, Users, Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

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

export const metadata: Metadata = {
  title: "Eco-Friendly Platform",
  description:
    "A sustainable platform with user-friendly authentication powered by Clerk.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#2c5f2d", colorBackground: "#e0f2e9" }, // Eco-friendly green tones
          elements: {
            formButtonPrimary:
              "bg-green-700 border border-green-700 hover:bg-green-600 text-white",
            formFieldInput:
              "border border-green-400 bg-white focus:border-green-700",
            card: "bg-white shadow-lg",
          },
        }}
      >
        <body
          className={`${inter.className} min-h-screen flex flex-col bg-[#e0f2e9] text-green-900`}
        >
          <nav className="border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-6 h-6 text-green-500" />
                  <Link
                    href="/"
                    className="text-xl font-semibold text-green-900"
                  >
                    EcoTracker
                  </Link>
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
                              We&apos;re on a mission to make environmental
                              impact tracking accessible and actionable for
                              everyone.
                            </p>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center space-x-4">
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      className="text-green-700 hover:text-green-600"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-green-700 hover:text-green-600"
                    >
                      Sign Up
                    </Link>
                  </SignedOut>
                </div>
              </div>
            </div>
          </nav>

          <main className="grow px-6 py-10">{children}</main>

          <footer className="flex items-center justify-center h-16 text-sm bg-green-50 border-t border-green-300">
            <span>© 2023 EcoPlatform - Inspired by Nature</span>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  );
}
