import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer>
      <div>
        <div className="flex flex-col gap-1 px-[24px] pt-[16px] pb-[24px]">
          <div className="text-gray-70 flex gap-[20px] text-[19px] leading-[150%] font-[500]">
            <Link to="#">문의</Link>
            <Link to="#">이용약관</Link>
            <Link to="#">개인정보처리방침</Link>
          </div>
          <p className="text-[21px] font-[400] text-gray-50">© 2025 linkmoa</p>
        </div>
      </div>
    </footer>
  );
}
