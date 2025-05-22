import { useEffect, useState } from 'react';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import FolderItemIcon from '@/assets/common-ui-assets/FolderItemIcon.svg?react';
import { useCreateFolder } from '@/hooks/mutations/useCreateFolder';

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: number;
  parentFolderId: number;
  commandType?: string;
}

export default function AddFolderModal({
  isOpen,
  onClose,
  pageId = 1,
  parentFolderId = 1,
  commandType = 'CREATE',
}: AddFolderModalProps) {
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [error, setError] = useState('');

  const isConfirmDisabled = !folderName;

  const createFolderMutation = useCreateFolder({
    onSuccess: () => {
      setFolderName('');
      setFolderDescription('');
      setError('');
      onClose();
      console.log('폴더 생성 성공');
    },
    onError: () => {
      setError('폴더 생성에 실패했습니다.');
    },
  });

  const handleCreateFolder = () => {
    if (!folderName) {
      setError('폴더명을 입력해 주세요');
      return;
    }
    setError('');
    createFolderMutation.mutate({
      baseRequest: {
        pageId,
        commandType,
      },
      folderName,
      parentFolderId,
      folderDescription,
    });
  };

  const inputClass = 'w-full';

  useEffect(() => {
    const updateFolder = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/folders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            baseRequest: {
              pageId: 1,
              commandType: 'CREATE',
            },
            folderName: 'B2',
            parentFolderId: 1,
            folderDescription: 'favorite directory4',
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          console.error('서버 오류:', errData);
        } else {
          const data = await res.json();
          console.log('업데이트 성공:', data);
        }
      } catch (error) {
        console.error('요청 실패:', error);
      }
    };

    updateFolder(); // ✅ 내부에서 실행
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>폴더 추가</Modal.Header>
      <Modal.Body className="py-4">
        {error && (
          <div className="text-status-danger mb-2 text-center text-[15px] font-semibold">
            <span>❗</span> {error}
          </div>
        )}
        <div>
          <div className="text-gray-90 mb-4 flex items-center px-[8px] py-[11px] text-sm font-semibold">
            <FolderItemIcon className="mr-[10px] h-[18px] w-[18px]" />
            폴더 추가
          </div>
          <div className="space-y-4">
            <Input
              label="폴더명"
              placeholder="폴더명을 입력해 주세요"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              isModal
              inputSize="medium"
              containerClassName={inputClass}
              labelClassName="font-bold leading-[140%]"
              variant={error && !folderName ? 'error' : 'default'}
            />
            <Input
              label="설명"
              placeholder="폴더에 대한 설명을 입력해 주세요"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              isModal
              inputSize="medium"
              containerClassName={inputClass}
              labelClassName="font-bold leading-[140%]"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="pt-0">
        <Modal.CancelButton
          onClick={() => {
            setFolderName('');
            setFolderDescription('');
            setError('');
            onClose();
          }}
        />
        <Modal.ConfirmButton
          onClick={handleCreateFolder}
          disabled={isConfirmDisabled || createFolderMutation.isPending}
          variant={folderName ? 'primary' : 'default'}
        >
          {createFolderMutation.isPending ? '전송 중...' : '전송'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
}
