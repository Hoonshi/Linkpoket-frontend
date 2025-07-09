import DropDownInline from '@/components/common-ui/DropDownInline';
import FolderCard from '@/components/common-ui/FolderCard';
import LinkCard from '@/components/common-ui/LinkCard';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useState } from 'react';

export default function TextPage() {
  const [isBookmark, setIsBookmark] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <LinkCard isBookmark={isBookmark} />
      <FolderCard isBookmark={isBookmark} />
      <DropDownInline
        id={1}
        type="folder"
        initialTitle="폴더"
        isDropDownInline={false}
        setIsDropDownInline={() => {}}
      />
      <PageControllerSection />
    </div>
  );
}
