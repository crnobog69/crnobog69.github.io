"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const internalValue = value
      ? value[0]
      : defaultValue
        ? defaultValue[0]
        : min;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (onValueChange) {
        onValueChange([newValue]);
      }
    };

    // Calculate progress percentage for styling
    const progressPercent = ((internalValue - min) / (max - min)) * 100;

    return (
      <div
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
      >
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-red-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          className="absolute w-full h-6 opacity-0 cursor-pointer"
          {...props}
        />
        <div
          className="absolute block h-5 w-5 rounded-full border border-border bg-background shadow-sm pointer-events-none"
          style={{ left: `calc(${progressPercent}% - 10px)` }}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
