import Breadcrumb from '@/shared/ui/BreadCrumb';

export default function TEST() {
  const data = {
    breadcrumb: [
      { id: '1', name: '디렉토리1' },
      { id: '2', name: '디렉토리2' },
    ],
    current: { id: '2', name: '디렉토리2' },
  };

  return (
    <div>
      <Breadcrumb items={data.breadcrumb} />
    </div>
  );
}
