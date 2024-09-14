import React, { useState } from "react";

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
    <button
      type="button"
      className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
      onClick={onClick}
    >
      <span className="flex text-lg font-semibold text-black">{question}</span>
      <svg
        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    {isOpen && (
      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
        <p>
          {answer}{" "}
          <a
            href="#"
            title=""
            className="text-blue-600 transition-all duration-200 hover:underline"
          >
            aliqua dolor
          </a>
        </p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          <FAQItem
            question="How to create an account?"
            answer="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
            isOpen={openIndex === 0}
            onClick={() => toggleFAQ(0)}
          />
          <FAQItem
            question="How can I make payment using Paypal?"
            answer="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
            isOpen={openIndex === 1}
            onClick={() => toggleFAQ(1)}
          />
          <FAQItem
            question="Can I cancel my plan?"
            answer="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
            isOpen={openIndex === 2}
            onClick={() => toggleFAQ(2)}
          />
          <FAQItem
            question="How can I reach to support?"
            answer="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."
            isOpen={openIndex === 3}
            onClick={() => toggleFAQ(3)}
          />
        </div>
        <p className="text-center text-gray-600 text-base mt-9">
          Didn’t find the answer you are looking for?{" "}
          <a
            href="#"
            title=""
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
