// import { useState } from 'react';

import { useState } from 'react';

type PageHeaderSectionProps = {
  pageTitle: string;
  pageDescription: string;
};

export default function PageHeaderSection({
  pageTitle,
  pageDescription,
}: PageHeaderSectionProps) {
  // TODO:추후 title,setTItle을 활용하여 데이터 수정을 통해 페이지 제목, 소개글 변경
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const MAX_TITLE_LENGTH = 21;
  const MAX_DESCRIPTION_LENGTH = 200;

  return (
    <div className="mx-auto flex w-full max-w-[1180px] min-w-[328px] flex-col gap-[8px] px-[64px] py-[24px]">
      <div className="relative w-full">
        <input
          type="text"
          value={pageTitle ?? ''}
          // TODO: onChange 로직 변경 필요
          onChange={(e) => {
            if (e.target.value.length <= MAX_TITLE_LENGTH) {
              setTitle(e.target.value);
            }
          }}
          // placeholder="제목을 입력하세요"
          className="inline-block text-[24px] font-bold text-gray-100 outline-none"
        />
      </div>
      <div>
        <textarea
          value={pageDescription ?? ''}
          onChange={(e) => {
            if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
              setDescription(e.target.value);
            }
          }}
          // placeholder="페이지에 대한 설명을 입력하세요. 디렉토리 소개글은 200자를 넘을 수 없습니다"
          className="text-gray-70 max-h-[98px] w-full resize-none overflow-y-auto text-[16px] font-[400] outline-none"
        />
      </div>
    </div>
  );
}
