import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface HeaderProps {
  link: string;
}

export function Header({ link }: HeaderProps) {
  return (
    <header className="w-full h-[3.5rem] flex items-center px-6 bg-white border-b border-neutral-300">
      <Link to={link}>
        <FaArrowLeft size="1.25rem" />
      </Link>
    </header>
  );
}
