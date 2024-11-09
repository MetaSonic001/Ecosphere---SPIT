import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      {user && (
        <p>You are signed in as: {user.firstName} {user.lastName}</p>
      )}
    </div>
  <SignOutButton />

  );
}