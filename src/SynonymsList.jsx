import { useState, useEffect, useRef } from "react";
import ArrowDown from "./assets/icon-arrow-down.svg?react";

const SynonymsList = ({ synonyms, getDefinition }) => {
  const [showAll, setShowAll] = useState(false);
  const [visibleSynonyms, setVisibleSynonyms] = useState([]);
  const [containerWidth, setContainerWidth] = useState(250)
  
  const containerRef = useRef(null);


  useEffect(() => {

    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 640) setContainerWidth(430);
      else if(width >= 1024) setContainerWidth(900);
      else setContainerWidth(250);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!containerRef.current || showAll) return;

    
    let currentWidth = 0;
    let selectedSynonyms = [];
    const padding = 12;

    for (let synonym of synonyms) {
      const wordWidth = synonym.length * 8 + padding; 
      if (currentWidth + wordWidth > containerWidth) break;
      selectedSynonyms.push(synonym);
      currentWidth += wordWidth;
    }

    setVisibleSynonyms(selectedSynonyms);
  }, [synonyms, showAll, containerWidth]);



  return (
    <div className="gap-3 flex pt-6 items-center flex-wrap md:gap-5">
      <div
        ref={containerRef}
        className={`flex items-center gap-3 md:gap-5 transition-all duration-300 ${
          showAll ? "flex-wrap" : "overflow-hidden"
        }`}
      >
          <p className="text-primary-400 dark:text-primary-400 md:text-lg lg:text-xl">Synonyms</p>
        {(showAll ? synonyms : visibleSynonyms).map((synonym, index) => (
          <p key={index} className="text-secondary-100 font-bold hover:cursor-pointer md:text-lg lg:text-xl"
          onClick={() => getDefinition(synonym)}>
            {synonym}
          </p>
        ))}
        {synonyms.length > visibleSynonyms.length && showAll && (
          <button onClick={() => setShowAll(false)} className="border-primary-300 shadow border-1 rounded-full p-2 dark:border-none">
            <ArrowDown className="aspect-square w-3 h-3 rotate-180 stroke-icon-primary"/>
          </button>
        )}
      </div>
      {synonyms.length > visibleSynonyms.length && !showAll && (
        <button onClick={() => setShowAll(true)} className="border-primary-300 shadow border-1 rounded-full p-2 dark:border-none">
          <ArrowDown  className="aspect-square w-3 h-3 stroke-icon-primary"/>
        </button>
      )}
    </div>
  );
};

export default SynonymsList;
