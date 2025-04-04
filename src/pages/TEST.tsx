import { Button } from '@/shared/ui/Button';

export default function TEST() {
  return (
    <div>
      <div className="!text-red-500">테스트입니다!</div>
      <Button variant="primary" size="lg" className="bg-red-500 text-white">
        버튼
      </Button>
    </div>
  );
}
