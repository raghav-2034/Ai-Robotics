import * as React from 'react';
import { cn } from '@/utils/cn';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 to 100
  indicatorClassName?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => {
    // Clamp the value between 0 and 100
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted border border-border/10', className)}
        {...props}
      >
        <div
          className={cn('h-full w-full flex-1 bg-primary transition-all duration-300 ease-out-expo', indicatorClassName)}
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
