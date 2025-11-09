import { useEffect, useState } from 'react';

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 10;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="맨 위로 이동"
      className="bg-gray-90 hover:bg-gray-70 fixed right-12 bottom-12 z-[9999] flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition"
    >
      <ChevronUpIcon />
    </button>
  );
}
