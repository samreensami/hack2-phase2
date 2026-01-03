import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vanilla">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-6xl font-bold text-olive mb-6">
          Task Web App
        </h1>
        <p className="text-2xl text-olive/80 mb-12">
          Organize your tasks efficiently with our modern interface
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            href="/login"
            className="px-10 py-4 text-lg font-semibold bg-orange text-white rounded-lg shadow-lg hover:bg-orange/90 transition-all duration-200 hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-10 py-4 text-lg font-semibold bg-olive text-white rounded-lg shadow-lg hover:bg-olive/90 transition-all duration-200 hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
