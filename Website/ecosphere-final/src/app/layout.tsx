import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco-Friendly Platform",
  description: "A sustainable platform with user-friendly authentication powered by Clerk.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <body className={`${inter.className} min-h-screen flex flex-col bg-[#e0f2e9] text-green-900`}>
          <header className="flex items-center h-16 gap-4 px-6 border-b border-green-300 bg-green-50">
            <Link href="/" className="text-xl font-semibold text-green-900">
              EcoPlatform
            </Link>
            <div className="ml-auto">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" className="text-green-700 hover:text-green-600">Sign In</Link>
              </SignedOut>
            </div>
          </header>

          <main className="grow px-6 py-10">{children}</main>

          <footer className="flex items-center justify-center h-16 text-sm bg-green-50 border-t border-green-300">
            <span>© 2023 EcoPlatform - Inspired by Nature</span>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  );
}
