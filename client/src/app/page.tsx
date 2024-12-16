import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div>
        <div className="flex w-full min-h-screen bg-gray-50">
          <div className="w-1/4 bg-white shadow-md p-6">
            <Link href="/">
              <div className="mb-8 flex justify-center border-b">
                <Image
                  src="/images/nepta.png"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-72 h-36 object-contain"
                />
              </div>
            </Link>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="group flex items-center gap-4 lg:px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-green-400 hover:text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.98 20v-1h6.405q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-6.403V4h6.404q.69 0 1.152.463T20 5.616v12.769q0 .69-.463 1.153T18.385 20zm-.71-4.461l-.703-.72l2.32-2.319H4.019v-1h8.868l-2.32-2.32l.702-.718L14.808 12z"
                  />
                </svg>
                <span className="text-black group-hover:text-white font-medium text-lg whitespace-nowrap">
                  Welcome
                </span>
              </Link>
            </nav>
          </div>
          <div className="relative mx-auto w-full h-screen">
            <Image
              src="https://img.freepik.com/premium-photo/engaged-audience-financial-seminar-group-image_853163-18959.jpg"
              alt="Voters"
              width={1200}
              height={600}
              className="h-screen shadow-lg object-cover"
            />

            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black w-full py-3 rounded-lg font-semibold hover:bg-green-600">
              Voting Has Not Started Yet!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
