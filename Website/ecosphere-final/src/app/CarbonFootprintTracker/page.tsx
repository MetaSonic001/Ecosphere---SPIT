// "use client";

// import { useState, useEffect } from "react";
// import { ActivityLogger } from "./components/ActivityLogger";
// import { FootprintSuggestions } from "./components/FootprintSuggestions";
// import { EmissionsTrends } from "./components/EmissionsTrends";
// import { SustainabilityChallenges } from "./components/SustainabilityChallenges";
// import { HabitTracker } from "./components/HabitTracker";
// import { EcoFitnessTracker } from "./components/EcoFitnessTracker";

// export default function CarbonFootprintTracker() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       // API call to fetch user data from Supabase
//       const response = await fetch("/api/trpc/user-data");
//       const data = await response.json();
//       setUserData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="mb-8 text-3xl font-bold">
//         Personalized Carbon Footprint Tracker
//       </h1>
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//         <ActivityLogger userData={userData} />
//         <FootprintSuggestions userData={userData} />
//         <EmissionsTrends userData={userData} />
//         <SustainabilityChallenges userData={userData} />
//         <HabitTracker userData={userData} />
//         <EcoFitnessTracker userData={userData} />
//       </div>
//     </div>
//   );
// }
