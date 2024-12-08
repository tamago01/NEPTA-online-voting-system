import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <div className="w-1/4 bg-white shadow-md p-6">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/nepta.png"
            alt="Nepta Logo"
            height={50}
            width={180}
            className="object-contain"
          />
        </div>

        <nav className="space-y-2">
          {[
            { icon: "/icons/dash.svg", text: "Welcome", href: "/" },
            {
              icon: "/icons/pc.svg",
              text: "Add Candidate",
              href: "/add-candidate",
            },
            { icon: "/icons/pc.svg", text: "Add Voters", href: "/add-voters" },
            {
              icon: "/icons/login.svg",
              text: "Login/Register",
              href: "/login",
            },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="group flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-pink-400 hover:text-white cursor-pointer"
            >
              <Image
                src={item.icon}
                alt={`${item.text} icon`}
                height={24}
                width={24}
                className="group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-black group-hover:text-white font-medium text-lg whitespace-nowrap">
                {item.text}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="w-3/4">
        <div className="max-w-4xl mx-auto">
          <Image
            src="/images/voters.jpg"
            alt="Voters"
            width={1200}
            height={600}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
