import { Button } from '@/shared/ui/button';
import DropDown from '@/shared/ui/DropDown';
import DropDownInline from '@/shared/ui/DropDownInline';
import { ViewToggle } from '@/shared/ui/ViewToggle';
import { FooterLanding } from '@/widgets/footer/FooterLanding';
import { Header } from '@/widgets/header/Header';
import SideBar from '@/widgets/side-bar/SideBar';
import { useState } from 'react';

const sharedPagesData = [
  { id: '1', title: '공유 페이지 1' },
  { id: '2', title: '공유 페이지 2' },
];

export default function TEST() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="m-10 flex flex-col gap-[24px]">
      <div>
        <p>드랍다운</p>
        <DropDown
          isHost={true}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onWithDrawPage={() => console.log('탈퇴')}
          onDeletePage={() => console.log('삭제')}
          onContact={() => console.log('문의')}
        />
      </div>
      <p>버튼 variant: 'primary', size: 'md' 기준</p>
      <div>
        <Button>버튼</Button>
      </div>
      <p>드랍다운인라인</p>
      <div>
        <DropDownInline
          id="1"
          type="directory"
          initialTitle="타이틀"
          initialLink="링크"
        />
      </div>
      <div className="flex flex-col gap-[24px]">
        <p>View 토글</p>
        <div>
          <ViewToggle selectedView="grid" onChange={() => console.log('hi')} />
        </div>
        <div className="text-[18px] font-bold"></div>
        <div>
          <p>헤더1</p>
          <Header hasSidebar={true} showDepth={true} isLoggedIn={true} />
          <p>헤더2</p>
          <Header hasSidebar={false} showDepth={false} isLoggedIn={false} />
          <p>헤더3</p>
          <Header hasSidebar={false} showDepth={true} isLoggedIn={true} />
        </div>
        <p>메뉴바</p>
        <div>
          <SideBar
            avatarUrl="/avatar.png"
            nickname="김링크"
            email="linkmoa@gmail.com"
            sharedPages={sharedPagesData}
            showFooter={true}
          />
        </div>
        <p>랜딩페이지 푸터</p>
        <FooterLanding />
      </div>
    </div>
  );
}
