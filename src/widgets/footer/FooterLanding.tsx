import Logo from '@/widgets/assets/Logo.svg?react';
import { Link } from 'react-router-dom';

export function FooterLanding() {
  return (
    <footer>
      <div className="w-full flex justify-between items-cente py-[48px] px-[66px]">
        <div className="flex items-center gap-[32px]">
          <Logo />
          <span className="text-[21px] font-[500] text-gray-90">
            © 2025 linkmoa
          </span>
        </div>

        <div className="flex gap-[32px] text-gray-70">
          <Link to="#">문의</Link>
          <Link to="#">이용약관</Link>
          <Link to="#">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  );
}
