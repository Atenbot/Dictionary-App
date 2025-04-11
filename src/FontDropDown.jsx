import { useState, useEffect, useRef } from "react";
import ArrowDown from "./assets/icon-arrow-down.svg?react";

const FontDropDown = ({ font, onFontChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState(() => {
    return sessionStorage.getItem("currentFont") || "inter"
  });
  const elementRef = useRef(null);
  const iconRef = useRef(null);

  const handleFontChange = (newFont) => {
    onFontChange(newFont);
    const fontChange = newFont.replaceAll("font-", "")
    setCurrentFont(fontChange);
    sessionStorage.setItem("currentFont", fontChange)
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(e.target) &&
      !iconRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  let fontUsed;

  switch (currentFont) {
    case "inter":
      fontUsed = "Sans Serif";
      break;
    case "lora":
      fontUsed = "Serif";
      break;
    case "inconsolata":
      fontUsed = "Mono";
      break;
    default:
      fontUsed = "Sans Serif";
  }

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center gap-x-2 dark:text-primary-100 md:text-lg lg:text-xl"
        onClick={toggleDropdown}
        onMouseEnter={toggleDropdown}
        ref={iconRef}
      >
        {fontUsed}
        <ArrowDown className="aspect-square stroke-icon-primary md:scale-120 lg:scale-150" />
      </button>
      {isOpen && (
        <div
          className="flex absolute flex-col rounded-lg shadow-lg p-4 w-36 right-4 mt-2 space-y-1.5 z-50 bg-primary-100 dark:bg-primary-500 text-primary-800 dark:text-primary-100 lg:gap-y-2"
          ref={elementRef}
          onMouseLeave={toggleDropdown}
        >
          <button
            className="text-left hover:text-secondary-100 font-bold md:text-lg lg:text-xl"
            onClick={() => handleFontChange("font-inter")}
          > Sans Serif</button>
          <button
            className="text-left hover:text-secondary-100 font-lora font-bold italic md:text-lg lg:text-xl"
            onClick={() => handleFontChange("font-lora")}
          >
            Serif
          </button>
          <button
            className="text-left hover:text-secondary-100 font-inconsolata font-semibold md:text-lg lg:text-xl"
            onClick={() => handleFontChange("font-inconsolata")}
          >
            Mono
          </button>
        </div>
      )}
    </div>
  );
};

export default FontDropDown;
