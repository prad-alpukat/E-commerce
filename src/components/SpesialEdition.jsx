import React from "react";
import CountUp from "./CountUp"; // Make sure to import the CountUp component

export default function SpesialEdition() {
  return (
    <div className="container ">
      {/* <section className="rounded-xl 2xl:py-24 2xl:bg-white container mx-auto my-10 ">
        <div className="container mx-auto w-11/12 px-4  overflow-hidden glass backdrop-brightness-50  sm:px-6 lg:px-8 rounded-xl ">
          <div className="py-10 sm:py-16 lg:py-24 2xl:pl-24">
            <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-8 2xl:gap-x-20">
              <div>
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                  Spesial Edition
                </h2>
                <p className="mt-4 text-base text-gray-50">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
                <h5 className="mt-8 text-white text-2xl">
                  Discount 20%, Limited Edition Only. Use Code: NEWOFF20%{" "}
                </h5>

                <div className="flex flex-row items-center mt-8 space-x-4 lg:mt-12">
                  <a href="#" title="" className="flex" role="button"></a>
                  <a href="#" title="" className="flex" role="button"></a>
                </div>
              </div>
              <div className="relative px-12">
                <svg
                  className="absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2 -mb-48 lg:-mb-72 text-yellow-300 w-[460px] h-[460px] sm:w-[600px] sm:h-[600px]"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <img
                  className="relative w-full max-w-xs mx-auto -mb-60 lg:-mb-64"
                  src="https://picsum.photos/id/237/460/460"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Table untuk experience */}
      <section className="py-10  sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* <div className="text-center">
            <h4 className="text-xl font-medium text-white">
              Tabel angka menunjukkan kerja keras yang telah kami lakukan dalam
              6 tahun terakhir.
            </h4>
          </div> */}
          <div className="grid grid-cols-1 gap-6 px-6 mt-8 sm:px-0 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12 ">
            <div
              className="overflow-hidden bg-white border border-gray-200 rounded-lg"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div className="ml-4">
                    <CountUp endValue={6} duration={8000} />
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Years in business
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden bg-white border border-gray-200 rounded-lg"
              data-aos="fade-down"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div className="ml-4">
                    <CountUp endValue={37} duration={8000} />
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Team members
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden bg-white border border-gray-200 rounded-lg"
              data-aos="fade-up"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4">
                    <CountUp endValue={3274} duration={8000} />
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Products delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden bg-white border border-gray-200 rounded-lg"
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              <div className="px-4 py-6">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <div className="ml-4">
                    <CountUp endValue={98} duration={8000} />
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Customer success
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
