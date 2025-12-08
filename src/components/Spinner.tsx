import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return <div className={`loader ${sizeClasses[size]} ${className}`} />;
}

export function LoadingSpinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Spinner size={size} className={className} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
