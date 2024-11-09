import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const { userId } = await auth();

  
  // If the user isn't signed in, redirect to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected page. Only authenticated users can see this.</p>
    </div>
  );
}