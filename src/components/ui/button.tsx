import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-heading font-medium transition-all duration-200 cursor-pointer rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            // Primary blue
            'border-transparent bg-primary text-white hover:bg-primary-hover hover:scale-[1.02] shadow-sm shadow-primary/10 active:scale-[0.98]':
              variant === 'primary',
            // Secondary green
            'border-transparent bg-secondary text-white hover:bg-secondary-hover hover:scale-[1.02] shadow-sm shadow-secondary/10 active:scale-[0.98]':
              variant === 'secondary',
            // Accent amber
            'border-transparent bg-accent text-white hover:bg-accent-hover hover:scale-[1.02] shadow-sm shadow-accent/10 active:scale-[0.98]':
              variant === 'accent',
            // Outline
            'border-border bg-transparent text-foreground hover:bg-muted hover:scale-[1.02]':
              variant === 'outline',
            // Ghost
            'border-transparent bg-transparent text-foreground hover:bg-muted':
              variant === 'ghost',
            // Link
            'border-transparent bg-transparent text-primary hover:underline p-0':
              variant === 'link',
          },
          {
            'px-3 py-1.5 text-xs font-semibold': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-7 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
