import React from 'react';

type BadgeVariant = 'held' | 'released' | 'pending';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  const variantStyles = {
    held: 'bg-red-100 text-red-800',
    released: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};