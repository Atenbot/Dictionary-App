import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import Explorer from './Explorer.jsx'

const MainApp = () => {
  const [font, setFont] = useState('font-inter');

  useEffect(() => {
    document.body.className = font;
  }, [font]);

  const handleFontChange = (newFont) => {
    setFont(newFont);
  }

  return (
    <StrictMode>
    <Header font={font} setFont={setFont} handleFontChange={handleFontChange}/>
    <Explorer font={font}/>
  </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<MainApp />)
