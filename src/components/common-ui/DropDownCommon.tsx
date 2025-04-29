import React from 'react';
import { cn } from '@/utils/cn';

type DropdownCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DropDownCommon({
  children,
  className = '',
}: DropdownCardProps) {
  return (
    <div
      className={cn(
        'border-gray-30 bg-gray-0 w-[198px] rounded-[10px] border p-2',
        className
      )}
      style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)' }}
    >
      {children}
    </div>
  );
}
