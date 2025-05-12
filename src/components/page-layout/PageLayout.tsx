import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import PageHeaderSection from './PageHeaderSection';
import PageControllerSection from './PageControllerSection';
import PageContentSection from './PageContentSection';

type PageLayoutProps = {
  pageTitle: string;
  pageDescription: string;
};

export default function PageLayout({
  pageTitle,
  pageDescription,
}: PageLayoutProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      <PageHeaderSection
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />

      {/* Boundary line */}
      <div className="border-b-gray-30 mb-[40px] w-full border-b" />

      {/* CONTROLLER SECTION*/}
      <PageControllerSection view={view} setView={setView} />

      {/*CONTENT SECTION*/}
      <PageContentSection view={view} />
    </div>
  );
}
