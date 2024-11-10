/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/0gzobQYstbf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { IBM_Plex_Sans } from 'next/font/google'

ibm_plex_sans({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { TrophyIcon } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu"

export function MarketHero() {
  return (
    <React.Fragment>
      <header className="bg-white shadow-sm dark:bg-gray-950">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="text-lg">Acme Store</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
            <Link
              href="#"
              className="relative text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                3
              </Badge>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                >
                  <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <section className="bg-gray-100 py-12 md:py-24 dark:bg-gray-800">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover the Perfect Product
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Explore our curated collection of high-quality products for your everyday needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Shop Now
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                prefetch={false}
              >
                Explore Categories
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/placeholder.svg"
              alt="Featured Product"
              width={600}
              height={600}
              className="mx-auto aspect-square rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Shop by Category</h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">Explore our wide range of product categories.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <Link href="#" className="group" prefetch={false}>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800">
                <BoltIcon className="h-8 w-8 text-primary group-hover:text-primary/90 dark:text-primary dark:group-hover:text-primary/90" />
                <span className="text-sm font-medium group-hover:underline">Electronics</span>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800">
                <ShirtIcon className="h-8 w-8 text-primary group-hover:text-primary/90 dark:text-primary dark:group-hover:text-primary/90" />
                <span className="text-sm font-medium group-hover:underline">Clothing</span>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800">
                <HomeIcon className="h-8 w-8 text-primary group-hover:text-primary/90 dark:text-primary dark:group-hover:text-primary/90" />
                <span className="text-sm font-medium group-hover:underline">Home</span>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800">
                <PaintbrushIcon className="h-8 w-8 text-primary group-hover:text-primary/90 dark:text-primary dark:group-hover:text-primary/90" />
                <span className="text-sm font-medium group-hover:underline">Beauty</span>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800">
                <TrophyIcon className="h-8 w-8 text-primary group-hover:text-primary/90 dark:text-primary dark:group-hover:text-primary/90" />
                <span className="text-sm font-medium group-hover:underline">Sports</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <div className="py-12 md:py-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
          <div>
            <img
              src="/placeholder.svg"
              alt="Customer Service"
              width={600}
              height={600}
              className="mx-auto aspect-square rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Outstanding Customer Service</h2>
              <p className="text-gray-500 md:text-lg dark:text-gray-400">
                Our team is dedicated to providing you with the best experience possible. Contact us with any questions or concerns.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-10 w-fit items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Featured Products</h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">Check out our top picks for this month.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="#" className="group" prefetch={false}>
              <div className="space-y-2">
                <img
                  src="/placeholder.svg"
                  alt="Product 1"
                  width={600}
                  height={400}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-sm font-medium leading-none group-hover:underline">Product 1</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$29.99</p>
                </div>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="space-y-2">
                <img
                  src="/placeholder.svg"
                  alt="Product 2"
                  width={600}
                  height={400}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-sm font-medium leading-none group-hover:underline">Product 2</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$49.99</p>
                </div>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="space-y-2">
                <img
                  src="/placeholder.svg"
                  alt="Product 3"
                  width={600}
                  height={400}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-sm font-medium leading-none group-hover:underline">Product 3</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$39.99</p>
                </div>
              </div>
            </Link>
            <Link href="#" className="group" prefetch={false}>
              <div className="space-y-2">
                <img
                  src="/placeholder.svg"
                  alt="Product 4"
                  width={600}
                  height={400}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-sm font-medium leading-none group-hover:underline">Product 4</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$19.99</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

function Package2Icon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.732l-7-4.056a2 2 0 00-2 0L4 6.268A2 2 0 003 8v8a2 2 0 001 1.732l7 4.056a2 2 0 002 0l7-4.056A2 2 0 0021 16z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  )
}

function SearchIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  )
}

function ShoppingCartIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l1 10a1 1 0 001 1h11a1 1 0 001-1l1-10H3zM16 13a4 4 0 11-8 0" />
    </svg>
  )
}

function BoltIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ShirtIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5l1.04 1.04c.2.2.34.45.39.72L6 8h12l.57-1.24c.05-.27.2-.52.39-.72L20 5M10 4.5V3h4v1.5m-1 4.5v12m2.5-12H6M4 5v16h16V5" />
    </svg>
  )
}

function HomeIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10v10a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V10L12 4z" />
    </svg>
  )
}

function PaintbrushIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v7m4-7v7m4-7v7m-4 5v4m-4-4v4m4-12h-4" />
    </svg>
  )
}

function PhoneIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
    </svg>
  )
}

function StorefrontIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16V4H4v6zm-1 6h18a1 1 0 001-1V7H3v8a1 1 0 001 1z" />
    </svg>
  )
}