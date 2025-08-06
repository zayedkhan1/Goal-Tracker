import { useEffect, useState } from 'react';

const quotes = [
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Setting goals is the first step in turning the invisible into the visible.",
    author: "Tony Robbins"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "A goal properly set is halfway reached.",
    author: "Zig Ziglar"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  }
];

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="transition-opacity duration-500 ease-in-out">
      <blockquote className="text-gray-600 dark:text-gray-300 italic">
        "{currentQuote.text}"
      </blockquote>
      <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
        — {currentQuote.author}
      </p>
    </div>
  );
};

export default Quote;