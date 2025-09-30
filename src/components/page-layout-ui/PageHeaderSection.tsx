import { useState } from 'react';

import { Button } from '../common-ui/button';
import { useModalStore } from '@/stores/modalStore';
import { useLocation } from 'react-router-dom';
import { useUpdateTitle } from '@/hooks/useUpdateTitle';

type PageHeaderSectionProps = {
  pageTitle: string;
  folderId?: string;
};

const MAX_TITLE_LENGTH = 12;

export default function PageHeaderSection({
  pageTitle,
  folderId,
}: PageHeaderSectionProps) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const { debouncedUpdate, handleBlur } = useUpdateTitle(folderId, title);
  const { openLinkModal } = useModalStore();
  const location = useLocation();
  const currentLocation = location.pathname;
  const isLinkButtonVisible = currentLocation !== '/bookmarks';

  return (
    <div className="mb-[24px] flex w-full min-w-[328px] items-center justify-between">
      <div className="relative w-full">
        <input
          id="page-title"
          type="text"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_TITLE_LENGTH) {
              setTitle(value);
              debouncedUpdate({ title: value });
            }
          }}
          onBlur={() => {
            handleBlur(title);
          }}
          className={`outline-nontext-gray-90' } inline-block text-[22px] font-bold`}
        />
      </div>
      <div className="hidden md:block">
        {isLinkButtonVisible && (
          <Button
            size="sm"
            className="whitespace-nowrap"
            onClick={openLinkModal}
          >
            + 링크추가
          </Button>
        )}
      </div>
    </div>
  );
}
