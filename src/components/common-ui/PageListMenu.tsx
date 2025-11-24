import { useState, useMemo } from 'react';

interface PageListMenuProps {
  personalPage: any;
  sharedPages: any[];
  allCards: any[];
  activeIndex: number;
  onItemClick: (index: number) => void;
}

export default function PageListMenu({
  personalPage,
  sharedPages,
  allCards,
  activeIndex,
  onItemClick,
}: PageListMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 페이지 이름 목록 생성 (처음에 불러온 데이터 그대로 사용)
  const pageList = useMemo(() => {
    const pages: Array<{ title: string; index: number }> = [];

    // 개인 페이지 추가
    if (personalPage?.pageTitle) {
      const personalCardIndex = allCards.findIndex(
        (card) => card.id === 'space-travel'
      );
      if (personalCardIndex !== -1) {
        pages.push({
          title: personalPage.pageTitle,
          index: personalCardIndex,
        });
      }
    }

    // 공유 페이지들 추가
    sharedPages.forEach((page: any) => {
      const cardIndex = allCards.findIndex(
        (card) => card.pageId === page.pageId
      );
      if (cardIndex !== -1) {
        pages.push({ title: page.pageTitle, index: cardIndex });
      }
    });

    return pages;
  }, [personalPage, sharedPages, allCards]);

  // 목록 항목 클릭 핸들러
  const handleMenuItemClick = (index: number) => {
    onItemClick(index);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 좌측 하단 목록 아이콘 버튼 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="목록 보기"
      >
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
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>

      {/* 목록 메뉴 오버레이 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 메뉴 */}
          <div className="fixed bottom-24 left-6 z-50 w-64 rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md">
            <div className="max-h-[60vh] overflow-y-auto rounded-2xl p-4">
              {pageList.length > 0 ? (
                pageList.map((page, idx) => {
                  const isActive = page.index === activeIndex;
                  return (
                    <button
                      key={`${page.title}-${idx}`}
                      onClick={() => handleMenuItemClick(page.index)}
                      className={`w-full rounded-xl px-4 py-3 text-left transition-all ${
                        isActive
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            isActive ? 'bg-white' : 'bg-gray-400'
                          }`}
                        />
                        <span className="font-medium">{page.title}</span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-center text-gray-500">
                  페이지가 없습니다
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
