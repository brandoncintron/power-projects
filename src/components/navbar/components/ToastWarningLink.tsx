"use client"

import Link from 'next/link';
import { toast } from 'sonner';

interface ToastWarningLinkProps {
  label: string;
  message: string;
  className?: string;
}

const ToastWarningLink = ({ label, message, className = "" }: ToastWarningLinkProps) => {
  return (
    <Link 
      href="#" 
      onClick={() => toast.warning(message, {
        duration: 3000,
        position: "bottom-right",
      })} 
      className={`no-underline cursor-pointer ${className}`}
    >
      <span className="text-base">{label}</span>
    </Link>
  );
};

export default ToastWarningLink; 