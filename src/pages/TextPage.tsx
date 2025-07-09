import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import LinkCard from '@/components/common-ui/LinkCard';
import { useState } from 'react';

export default function TextPage() {
  const [isBookmark, setIsBookmark] = useState(false);
  return (
    <div className="mx-auto flex h-screen max-w-[1180px] min-w-[328px] flex-col px-[102px] py-[56px]">
      <PageHeaderSection pageTitle="폴더1" folderId={1} />
      <PageControllerSection />
      <div>
        <LinkCard isBookmark={isBookmark} />
      </div>
    </div>
  );
}
