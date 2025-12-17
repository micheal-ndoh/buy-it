"use client";

import { useState } from "react";

interface ProductColorSelectorProps {
  colors: string[];
  selectedColor?: string;
}

const COLOR_MAP: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Gray: "#808080",
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#008000",
  Yellow: "#FFFF00",
  Purple: "#800080",
  Pink: "#FFC0CB",
  Orange: "#FFA500",
  Brown: "#A52A2A",
  Navy: "#000080",
  Teal: "#008080",
  Maroon: "#800000",
  Olive: "#808000",
  Lime: "#00FF00",
  Aqua: "#00FFFF",
  Fuchsia: "#FF00FF",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
};

export function ProductColorSelector({
  colors,
  selectedColor: initialSelectedColor,
}: ProductColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(
    initialSelectedColor || colors[0]
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="mb-6">
      <label className="block text-base font-semibold text-black dark:text-white mb-3">
        Color
      </label>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const hexColor = COLOR_MAP[color] || "#808080"; // Default to gray if not found
          const isSelected = selectedColor === color;

          return (
            <button
              key={color}
              type="button"
              onClick={() => handleColorSelect(color)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                isSelected
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
              style={{ backgroundColor: hexColor }}
              title={color}
              aria-label={`Select ${color} color`}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-lg drop-shadow-lg">
                    check
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selectedColor && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Selected: {selectedColor}
        </p>
      )}
      <input type="hidden" name="color" value={selectedColor || ""} />
    </div>
  );
}
