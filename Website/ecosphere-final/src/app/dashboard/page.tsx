import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-green-50 text-green-900 min-h-screen">
      <article className="grid lg:grid-cols-2">
        <div className="px-8 py-20 md:px-20 lg:py-32">
          <h1 className="text-5xl font-semibold md:text-6xl text-green-800">
            Welcome to EcoPlatform
          </h1>
          <p className="mt-4 text-lg text-green-700">
            An eco-conscious digital space, designed for sustainable and
            efficient user interactions. Sign up to get started or learn more
            about our vision.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              href="/sign-up"
              className="px-4 py-2 font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-4 py-2 font-semibold text-green-700 hover:text-green-900 hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </article>

      <article
        className="px-8 py-12 bg-green-100 md:px-20 md:py-20"
        id="features"
      >
        <h2 className="text-3xl font-semibold text-green-800">Why EcoPlatform?</h2>
        <p className="mt-4 text-green-700">
          We focus on sustainable technology solutions, minimizing our digital footprint while maximizing user experience. Here’s what makes us unique:
        </p>
        <div className="grid gap-8 mt-8 lg:grid-cols-3">
          <div className="flex flex-col h-48 gap-2 p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-lg font-medium text-green-800">Sustainable Design</h3>
            <p className="text-green-700">
              Thoughtfully designed to reduce energy consumption and maximize usability.
            </p>
          </div>
          <div className="flex flex-col h-48 gap-2 p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-lg font-medium text-green-800">Minimal Footprint</h3>
            <p className="text-green-700">
              Leveraging efficient technology to create a lighter digital footprint.
            </p>
          </div>
          <div className="flex flex-col h-48 gap-2 p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-lg font-medium text-green-800">User-Centric</h3>
            <p className="text-green-700">
              Designed with users in mind to ensure a smooth, seamless experience.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
