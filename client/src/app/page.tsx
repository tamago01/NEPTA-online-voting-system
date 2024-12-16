import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <div>
        <div className="bg-slate-100 sticky top-0 w-full z-10">
          <Header />
        </div>

        <div className="relative w-full h-auto">
          <img
            src="https://img.freepik.com/premium-photo/engaged-audience-financial-seminar-group-image_853163-18959.jpg"
            alt="Voters"
            className="h-[100vh] lg:h-[90vh] w-full object-cover shadow-lg"
          />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black text-sm sm:text-base md:text-lg w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-3 rounded-lg font-semibold hover:bg-green-600">
            Voting Has Not Started Yet!
          </button>
        </div>
      </div>
    </>
  );
}
