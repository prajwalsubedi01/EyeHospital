import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: 'What services do you provide?', answer: 'We offer eye exams, cataract surgery, laser treatments, and more.' },
    { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans.' },
    { question: 'How can I book an appointment?', answer: 'You can book an appointment through our website or by calling us.' },
    { question: 'Is your staff qualified?', answer: 'Yes, our staff includes certified ophthalmologists, optometrists, and experienced nurses.' },
    { question: 'What should I bring to my appointment?', answer: 'Please bring your ID, insurance card, and any medical records related to your eye health.' },
    { question: 'How long will my appointment take?', answer: 'A standard eye exam typically takes about 30 minutes to 1 hour.' },
    { question: 'Are walk-in appointments available?', answer: 'Yes, we accept walk-ins based on availability.' },
    { question: 'What are your operating hours?', answer: 'We are open Monday to Friday, 9 AM to 5 PM, and Saturday from 9 AM to 12 PM.' },
    { question: 'Do you provide pediatric eye care?', answer: 'Yes, we provide eye care services for children as well.' },
    { question: 'How do I prepare for eye surgery?', answer: 'Our specialists will provide you with a detailed guide on preparation during your consultation.' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-xl font-medium">{faq.question}</h2>
              <button className="text-xl font-bold">
                {activeIndex === index ? '-' : '+'}
              </button>
            </div>
            {activeIndex === index && (
              <p className="mt-3 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
