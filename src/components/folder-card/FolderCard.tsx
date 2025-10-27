import { useState, useRef, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { FolderDetail } from '@/types/folders';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { useMobile } from '@/hooks/useMobile';
import LinkLogo from '../common-ui/LinkLogo';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';

const DropDownInline = lazy(() => import('../common-ui/DropDownInline'));

export default function FolderCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: FolderDetail;
}) {
  const isMobile = useMobile();
  const [isDropDownInline, setIsDropDownInline] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { getCurrentColor } = useFolderColorStore();
  const folderId = item.folderId?.toString();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const currentFolderColor = getCurrentColor();

  const { mutate: updateFolderBookmark } = useUpdateFolderBookmark({
    folderId: folderId,
    pageId: pageId as string,
  });

  // 폴더 상세 정보를 가져와서 링크 정보 추출
  const requestParams = {
    pageId: pageId || '',
    commandType: 'VIEW',
    folderId: item.folderId,
    sortType: 'BASIC',
  };

  const { data: folderDetailsData } = useFetchFolderDetails(requestParams);
  const linkData = folderDetailsData?.data?.linkDetailResponses ?? [];

  const getFolderLink = (folderId: string) => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/shared/')) {
      const pathParts = currentPath.split('/');
      const sharedPageId = pathParts[2];
      return `/shared/${sharedPageId}/folder/${folderId}`;
    }
    if (currentPath.startsWith('/bookmarks')) {
      return `/bookmarks/folder/${folderId}`;
    }
    return `/personal/folder/${folderId}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isDropdownArea = target.closest('[data-dropdown]');
    const isButtonArea = target.closest('[data-card-button]');
    const isModalArea = target.closest('[data-ignore-outside-click]');
    if (isDropdownArea || isButtonArea || isModalArea) return;

    setParentsFolderId(folderId);
    const folderLink = getFolderLink(item.folderId);
    navigate(folderLink);
  };

  const handleBookmarkClick = () => {
    updateFolderBookmark();
  };

  const handleMenuClick = () => {
    setIsDropDownInline((v) => !v);
  };

  // 실제 링크 데이터 사용 (상위 3개만)
  const displayLinks = linkData.slice(0, 3);

  return (
    <div
      // ▶ 바깥 컨테이너 투명 처리
      className={`group relative flex h-[242px] flex-col items-center gap-4 rounded-[16px] border border-transparent bg-transparent p-[16px] hover:cursor-pointer ${
        isMobile ? 'min-w-[125px]' : 'min-w-[156px]'
      }`}
      onClick={handleCardClick}
    >
      {/* ===== Folder Icon ===== */}
      <div
        className="relative mx-auto"
        style={{
          width: isMobile ? '96px' : '120px',
          height: isMobile ? '96px' : '120px',
        }}
      >
        {/* Back body of folder (투명도 적용) */}
        <div
          className="absolute inset-0 rounded-[24px] opacity-90 shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
          style={{
            background: currentFolderColor.gradient,
          }}
        />

        {/* 여러 겹의 카드 - 실제 링크 파비콘 표시 */}
        <div
          className="absolute top-5 left-[48%] -translate-x-1/2 rounded-[14px] bg-white/60 shadow-[0_2px_6px_rgba(0,0,0,0.08)] backdrop-blur-sm"
          style={{
            transform: 'translateX(20%) rotate(8deg)',
            width: isMobile ? '54px' : '74px',
            height: isMobile ? '48px' : '67px',
          }}
        >
          {/* 첫 번째 링크 파비콘 */}
          {displayLinks &&
            displayLinks[0] &&
            (() => {
              const firstLink = displayLinks[0];
              const imageUrl = (() => {
                const url = firstLink.representImageUrl;
                if (
                  url &&
                  (url.toLowerCase().includes('.png') ||
                    url.toLowerCase().includes('.jpg') ||
                    url.toLowerCase().includes('.jpeg'))
                ) {
                  return firstLink.representImageUrl;
                }
                if (firstLink.faviconUrl) {
                  return firstLink.faviconUrl;
                }
                return null; // 이미지가 없으면 null 반환
              })();

              // SwiftUI 색상 팔레트 함수

              const showLinkLogo = !imageUrl;

              return showLinkLogo ? (
                <div className="absolute top-2 right-2">
                  <LinkLogo
                    title={firstLink.linkName || '?'}
                    size={isMobile ? 14 : 18}
                  />
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt=""
                  className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
                  onError={(e) => {
                    // 에러 시 LinkLogo로 대체
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (
                      parent &&
                      !parent.querySelector('.link-logo-fallback')
                    ) {
                      // const bgColor = getColorByLetter(
                      //   firstLink.linkName || '?'
                      // );
                      const containerSize = isMobile ? 14 : 18;

                      const linkLogo = document.createElement('div');
                      linkLogo.className =
                        'link-logo-fallback absolute top-2 right-2';
                      parent.appendChild(linkLogo);
                      linkLogo.innerHTML = `
                        <div class="link-logo-fallback-container flex items-center justify-center text-center font-bold select-none relative overflow-hidden" 
                             style="width: ${containerSize}px; height: ${containerSize}px; background-color: #f8f8f8; font-size: ${Math.floor(containerSize * 0.45)}px; border-radius: 16px; cursor: pointer;">
                          <span class="hover-text" 
                                style="font-weight: 800; color: #000000; transition: transform 0.2s ease; position: relative;">${firstLink.linkName?.charAt(0)?.toUpperCase() || '?'}</span>
                        </div>
                      `;
                    }
                  }}
                />
              );
            })()}
        </div>
        <div
          className="absolute top-7 left-[18%] rounded-[13px] bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.10)] backdrop-blur-md"
          style={{
            transform: 'rotate(-6deg)',
            width: isMobile ? '52px' : '72px',
            height: isMobile ? '47px' : '65px',
          }}
        >
          {/* 두 번째 링크 파비콘 */}
          {displayLinks &&
            displayLinks[1] &&
            (() => {
              const secondLink = displayLinks[1];
              const imageUrl = (() => {
                const url = secondLink.representImageUrl;
                if (
                  url &&
                  (url.toLowerCase().includes('.png') ||
                    url.toLowerCase().includes('.jpg') ||
                    url.toLowerCase().includes('.jpeg'))
                ) {
                  return secondLink.representImageUrl;
                }
                if (secondLink.faviconUrl) {
                  return secondLink.faviconUrl;
                }
                return null; // 이미지가 없으면 null 반환
              })();

              // SwiftUI 색상 팔레트 함수

              const showLinkLogo = !imageUrl;

              return showLinkLogo ? (
                <div className="absolute top-2 right-2">
                  <LinkLogo
                    title={secondLink.linkName || '?'}
                    size={isMobile ? 14 : 18}
                  />
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt=""
                  className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
                  onError={(e) => {
                    // 에러 시 LinkLogo로 대체
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (
                      parent &&
                      !parent.querySelector('.link-logo-fallback')
                    ) {
                      // const bgColor = getColorByLetter(
                      //   secondLink.linkName || '?'
                      // );
                      const containerSize = isMobile ? 14 : 18;

                      const linkLogo = document.createElement('div');
                      linkLogo.className =
                        'link-logo-fallback absolute top-2 right-2';
                      parent.appendChild(linkLogo);
                      linkLogo.innerHTML = `
                        <div class="link-logo-fallback-container flex items-center justify-center text-center font-bold select-none relative overflow-hidden" 
                             style="width: ${containerSize}px; height: ${containerSize}px; background-color: #f8f8f8; font-size: ${Math.floor(containerSize * 0.45)}px; border-radius: 16px; cursor: pointer;">
                          <span class="hover-text" 
                                style="font-weight: 800; color: #000000; transition: transform 0.2s ease; position: relative;">${secondLink.linkName?.charAt(0)?.toUpperCase() || '?'}</span>
                        </div>
                      `;
                    }
                  }}
                />
              );
            })()}
        </div>
        <div
          className="absolute top-9 left-[10%] rounded-[12px] bg-white/60 shadow-[0_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-md"
          style={{
            transform: 'rotate(-4deg)',
            width: isMobile ? '50px' : '70px',
            height: isMobile ? '45px' : '63px',
          }}
        >
          {/* 세 번째 링크 파비콘 */}
          {displayLinks &&
            displayLinks[2] &&
            (() => {
              const thirdLink = displayLinks[2];
              const imageUrl = (() => {
                const url = thirdLink.representImageUrl;
                if (
                  url &&
                  (url.toLowerCase().includes('.png') ||
                    url.toLowerCase().includes('.jpg') ||
                    url.toLowerCase().includes('.jpeg'))
                ) {
                  return thirdLink.representImageUrl;
                }
                if (thirdLink.faviconUrl) {
                  return thirdLink.faviconUrl;
                }
                return null; // 이미지가 없으면 null 반환
              })();

              // SwiftUI 색상 팔레트 함수

              const showLinkLogo = !imageUrl;

              return showLinkLogo ? (
                <div className="absolute top-2 right-2">
                  <LinkLogo
                    title={thirdLink.linkName || '?'}
                    size={isMobile ? 14 : 18}
                  />
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt=""
                  className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
                  onError={(e) => {
                    // 에러 시 LinkLogo로 대체
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (
                      parent &&
                      !parent.querySelector('.link-logo-fallback')
                    ) {
                      // const bgColor = getColorByLetter(
                      //   thirdLink.linkName || '?'
                      // );
                      const containerSize = isMobile ? 14 : 18;

                      const linkLogo = document.createElement('div');
                      linkLogo.className =
                        'link-logo-fallback absolute top-2 right-2';
                      parent.appendChild(linkLogo);
                      linkLogo.innerHTML = `
                        <div class="link-logo-fallback-container flex items-center justify-center text-center font-bold select-none relative overflow-hidden" 
                             style="width: ${containerSize}px; height: ${containerSize}px; background-color: #f8f8f8; font-size: ${Math.floor(containerSize * 0.45)}px; border-radius: 16px; cursor: pointer;">
                          <span class="hover-text" 
                                style="font-weight: 800; color: #000000; transition: transform 0.2s ease; position: relative;">${thirdLink.linkName?.charAt(0)?.toUpperCase() || '?'}</span>
          </div>
                      `;
                    }
                  }}
                />
              );
            })()}
        </div>

        {/* Front pocket (투명도 적용) */}
        <div
          className="absolute right-0 bottom-0 left-0 h-[64%] rounded-b-[22px] opacity-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_-2px_10px_rgba(0,0,0,0.06)]"
          style={{
            background: currentFolderColor.gradient
              .replace('0.85', '0.6')
              .replace('0.82', '0.55')
              .replace('0.8', '0.5'),
            clipPath: 'polygon(0% 7%, 86% 7%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Divider line */}
        <div
          className="absolute right-0 left-0"
          style={{
            top: '44%',
            height: 1,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0) 100%)',
          }}
          aria-hidden
        />
      </div>
      {/* ===== /Folder Icon ===== */}

      {/* 북마크 버튼 - 우측 상단 */}
      <button
        data-card-button
        className="absolute top-2 right-2 z-10 cursor-pointer"
        onClick={handleBookmarkClick}
        aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>

      <div className="flex flex-1 flex-col items-center justify-between">
        <div className="flex flex-col gap-1 text-center">
          <p
            className={`text-[15px] font-bold ${isMobile ? 'overflow-hidden' : ''}`}
            style={
              isMobile
                ? {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                  }
                : {}
            }
          >
            {item.folderName}
          </p>
          {!isMobile && (
            <p className="text-[13px] font-[400] text-gray-50">
              {item.createdDate} · 폴더
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-end">
          <div className="relative">
            <button
              ref={menuButtonRef}
              data-card-button
              className="cursor-pointer p-1"
              onClick={handleMenuClick}
              aria-label="메뉴 열기"
            >
              <CardMenu />
            </button>
          </div>
        </div>

        {/* 드롭다운을 카드 외부로 이동 */}
        {isDropDownInline && (
          <Suspense fallback={<DropDownInlineSkeleton />}>
            <DropDownInline
              id={folderId}
              type="folder"
              initialTitle={item.folderName}
              isDropDownInline={isDropDownInline}
              setIsDropDownInline={setIsDropDownInline}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
