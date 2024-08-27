"use client"
// components/NotStartedBtn.tsx
import { useEffect, useRef } from 'react';

interface NotStartedBtnProps {
  status: string;

}

const NotStartedBtn: React.FC<NotStartedBtnProps> = ({ status }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.classList.add('animate-on-load');
    }
  }, []);

  return (
    <button className="cssbuttons-io z-1" ref={buttonRef}>
      <span className=''>
        {status}
      </span>
    </button>
  );
};

export default NotStartedBtn;
