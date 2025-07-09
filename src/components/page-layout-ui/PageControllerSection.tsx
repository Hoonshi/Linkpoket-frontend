import DropDownView from '../common-ui/DropDownView';

export default function PageControllerSection() {
  return (
    <div className="flex h-[42px] items-center justify-between">
      {/* TODO: 하드코딩된 부분 데이터로 처리 */}
      <div className="text-[14px] font-[500] text-gray-50">폴더1 | 링크2개</div>
      <DropDownView />
    </div>
  );
}
