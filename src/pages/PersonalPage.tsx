import PageLayout from '@/components/page-layout/PageLayout';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { useUserStore } from '@/stores/userStore';
import { useEffect } from 'react';

export default function PersonalPage() {
  const { member, pageDetails, isLoading, error } = useFetchPersonalPage();
  const setUser = useUserStore((state) => state.setUser);

  const { nickName, email, colorCode } = member || {};

  useEffect(() => {
    if (nickName && email && colorCode) {
      setUser(nickName, email, colorCode);
    }
  }, [nickName, email, colorCode, setUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <PageLayout
        pageTitle={pageDetails?.pageTitle}
        pageDescription={pageDetails?.pageDescription}
        key={pageDetails?.id}
      />
    </>
  );
}
