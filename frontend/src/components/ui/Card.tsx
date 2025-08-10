import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardSubtitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
}
