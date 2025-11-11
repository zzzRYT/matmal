import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
  secondary:
    'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-200',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
};

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-3 py-1.5 rounded focus:outline-none focus:ring';
  const cls = `${base} ${variantClasses[variant]} ${className}`.trim();
  return <button {...props} className={cls} />;
}
