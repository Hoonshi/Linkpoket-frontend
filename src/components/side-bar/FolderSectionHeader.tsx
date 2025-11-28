import NoColorUp from '@/assets/common-ui-assets/NoColorUp.svg?react';
import NoColorDown from '@/assets/common-ui-assets/NoColorDown.svg?react';

type FolderSectionHeaderProps = {
  isOpen?: boolean;
  onCreateClick?: (e: React.MouseEvent) => void;
  onToggleClick?: (e: React.MouseEvent) => void;
  showToggle?: boolean;
};

const FolderSectionHeader: React.FC<FolderSectionHeaderProps> = ({
  isOpen,
  onToggleClick,
  showToggle,
}) => {
  return (
    <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
      <div className="group flex w-full items-center justify-between">
        <div className="flex gap-[20px]">
          <div>폴더</div>
        </div>
        {showToggle && isOpen ? (
          <NoColorUp
            className="text-gray-40 hover:text-gray-90 cursor-pointer"
            onClick={onToggleClick}
            aria-label="폴더 접기"
            height={18}
            width={18}
          />
        ) : (
          <NoColorDown
            className="text-gray-40 hover:text-gray-90 cursor-pointer"
            onClick={onToggleClick}
            aria-label="폴더 펼치기"
            height={18}
            width={18}
          />
        )}
      </div>
    </div>
  );
};

export default FolderSectionHeader;
