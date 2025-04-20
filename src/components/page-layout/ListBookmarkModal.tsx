import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmarkIcon.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmarkIcon.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import { useState } from 'react';

export default function ListBookmarkModal() {
  const [isBookmark, setIsBookmark] = useState(false);

  const handleBookmark = () => {
    setIsBookmark((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <button className="px-[10px] py-[10px]" onClick={handleBookmark}>
        {isBookmark === false ? (
          <InactiveBookmarkIcon className="cursor-pointer" />
        ) : (
          <ActiveBookmarkIcon className="relative top-[1px] cursor-pointer" />
        )}
      </button>
      <button className="active:bg-gray-10 h-[40px] cursor-pointer px-[10px] py-[10px] active:rounded-[8px]">
        <Menu />
      </button>
    </div>
  );
}
