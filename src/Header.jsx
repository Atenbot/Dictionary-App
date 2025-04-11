import { useEffect, useState } from "react";
import Logo  from "./assets/logo.svg?react"
import FontDropDown from "./FontDropDown";
import ToggleSwitch from "./ToggleSwitch";
import Moon from './assets/icon-moon.svg?react'

const Header = ({ font, handleFontChange, setFont }) => {

  const body = document.documentElement;

  const [isOn, setIsOn] = useState(() => {
    const stored = sessionStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false
  });

  useEffect(() => {
    const storedFont = sessionStorage.getItem("selectedFont");
    if (storedFont) {setFont(storedFont)};
  }, []);

  useEffect(() => {
    sessionStorage.setItem("selectedFont", font);
  }, [font])

  useEffect(() => {
    
    sessionStorage.setItem("darkMode", JSON.stringify(isOn))

    isOn ? body.classList.add('dark') : body.classList.remove('dark')
  }, [isOn])

    useEffect(() => {

      const hasRun = sessionStorage.getItem("hasRunOnce");

      if (!hasRun) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsOn(prefersDark);

        sessionStorage.setItem("hasRunOnce", "true")
      }
  }, [])

  return ( 
    <div className="dark:bg-primary-800">
    <div className="max-w-7xl mx-4 pt-8 flex justify-between bg-primary-100 dark:bg-inherit md:mx-10 md:mt-4 lg:mx-64 lg:mt-12">
      <Logo className="w-7 md:scale-120 lg:scale-150"/>
      <div className="flex items-center gap-x-4 md:gap-x-6">
        <FontDropDown font={font} setFont={setFont} onFontChange={handleFontChange}/>
        <div className="h-7 w-[1px] bg-primary-300 dark:bg-primary-500 md:h-10"></div>
        <ToggleSwitch isOn = {isOn} setIsOn = {setIsOn} />
        <Moon className="scale-100 md:scale-120 lg:scale-150 stroke-[#838383] hover:stroke-secondary-100 hover:cursor-pointer dark:stroke-secondary-100"
        onClick = {() => {setIsOn(!isOn)}}/>
      </div>
    </div>
    </div>


   );
}
 
export default Header;


