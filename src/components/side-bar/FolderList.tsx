import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorUp from '@/assets/common-ui-assets/ColorUp.svg?react';
import ColorDown from '@/assets/common-ui-assets/ColorDown.svg?react';
import NoColorUp from '@/assets/common-ui-assets/NoColorUp.svg?react';
import NoColorDown from '@/assets/common-ui-assets/NoColorDown.svg?react';

type Folder = {
  folderId: number;
  folderTitle: string;
  children?: Folder[];
};

type FolderListProps = {
  folders: Folder[];
  getFolderLink: (folderId: number) => string;
  isFolderActive: (folderId: number) => boolean;
};

const FolderToggleIcon = ({
  isCollapsed,
  isActive,
}: {
  isCollapsed: boolean;
  isActive: boolean;
}) => {
  if (isActive) {
    return isCollapsed ? (
      <ColorDown width={16} height={16} />
    ) : (
      <ColorUp width={16} height={16} />
    );
  } else {
    return isCollapsed ? (
      <NoColorDown width={16} height={16} />
    ) : (
      <NoColorUp width={16} height={16} />
    );
  }
};

const FolderList: React.FC<FolderListProps> = ({
  folders,
  getFolderLink,
  isFolderActive,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<number>>(
    new Set()
  );

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  return (
    <div className="mt-2 flex flex-col gap-[2px]">
      {folders?.map((folder) => (
        <div key={folder.folderId}>
          <div className="flex items-center">
            <Link
              to={getFolderLink(folder.folderId)}
              className={`flex w-full items-center justify-between rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                isFolderActive(folder.folderId)
                  ? 'bg-primary-5 text-primary-50'
                  : 'text-gray-70 hover:bg-primary-5'
              }`}
            >
              {folder.folderTitle}
              {folder.children && folder.children.length > 0 ? (
                <button
                  onClick={() => toggleFolder(folder.folderId)}
                  className="hover:text-gray-70 mr-1 flex h-4 w-4 cursor-pointer items-center justify-center text-gray-50"
                  aria-label={`${folder.folderTitle} 폴더 ${expandedFolders.has(folder.folderId) ? '접기' : '펼치기'}`}
                >
                  <FolderToggleIcon
                    isCollapsed={!expandedFolders.has(folder.folderId)}
                    isActive={isFolderActive(folder.folderId)}
                  />
                </button>
              ) : (
                <div className="mr-1 h-4 w-4" />
              )}
            </Link>
          </div>

          {/* 폴더 뎁스2 리스트 - 펼쳐져 있을 때만 표시 */}
          {folder.children &&
            folder.children.length > 0 &&
            expandedFolders.has(folder.folderId) && (
              <div className="mt-1 ml-5 flex flex-col gap-[2px]">
                {folder.children.map((child) => (
                  <Link
                    key={child.folderId}
                    to={getFolderLink(child.folderId)}
                    className={`block rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                      isFolderActive(child.folderId)
                        ? 'bg-primary-5 text-primary-50'
                        : 'text-gray-70 hover:bg-primary-5'
                    }`}
                  >
                    <span className="pr-2">•</span>
                    <span>{child.folderTitle}</span>
                  </Link>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default FolderList;
