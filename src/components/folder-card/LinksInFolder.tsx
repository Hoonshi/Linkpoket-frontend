import { useMobile } from '@/hooks/useMobile';
import LinkLogo from '@/components/common-ui/LinkLogo';
import { LinkDetail } from '@/types/links';

export default function LinksInFolder({
  displayLinks,
}: {
  displayLinks: LinkDetail[];
}) {
  // 폴더 상세 정보를 가져와서 링크 정보 추출

  const isMobile = useMobile();

  if (!displayLinks || displayLinks.length === 0) {
    return null;
  }

  return (
    <>
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
              return null;
            })();

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
                src={imageUrl || ''}
                alt=""
                className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.link-logo-fallback')) {
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
              return null;
            })();

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
                src={imageUrl || ''}
                alt=""
                className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.link-logo-fallback')) {
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
              return null;
            })();

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
                src={imageUrl || ''}
                alt=""
                className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.link-logo-fallback')) {
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
    </>
  );
}
