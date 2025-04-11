import SearchIcon from "./assets/icon-search.svg?react";
import PlayIcon from "./assets/icon-play.svg?react";
import NewWindow from "./assets/icon-new-window.svg?react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DefaultPage from "./DefaultPage";
import ArrowDown from "./assets/icon-arrow-down.svg?react";
import SynonymsList from "./SynonymsList";
import NotFound from "./NotFound";
import Loader from "./Loader";

const Explorer = ({ font }) => {
  const [word, setWord] = useState("");
  const [wordError, setWordError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [wordSearched, setWordSearched] = useState(() => {
    const savedValue = sessionStorage.getItem("wordSearched");
    return savedValue ? savedValue : false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [definition, setDefinition] = useState(() => {
    const savedDefinition = sessionStorage.getItem("definition");
    return savedDefinition ? JSON.parse(savedDefinition) : null;
  });

  const moreThanThree = definition?.meanings?.some(
    (meaning) => meaning.definitions.length > 3
  );

  const getAudio = () => {
    const data = definition;
    const audio = data?.phonetics.find((p) => p.audio)?.audio;
    return audio || "";
  };

  const playAudio = () => {
    const url = getAudio();
    if (url) {
      const audio = new Audio(url);
      audio.play();
    } else {
      alert("no audio available");
    }
  };

  const handleSetOnce = () => {
    if (!wordSearched) {
      setWordSearched(true);
      sessionStorage.setItem("wordSearched", true);
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getDefinition(word);
    }
  };

  const getDefinition = async (word) => {
    setWordError(false);
    setEmptyError(false);

    const trimmedWord = word.trim();
    if (trimmedWord.length == 0) {
      setEmptyError(true);
      setTimeout(() => {
        setEmptyError(false);
      }, 1000);
      return;
    } else {
      setIsLoading(true);
      handleSetOnce();
      setWord(trimmedWord);

      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const data = response.data;
        setIsLoading(false);
        setDefinition(data[0]);
        sessionStorage.setItem("definition", JSON.stringify(data[0]));
        setWord("");
      } catch (error) {
        setWordError(true);
      }
    }
  };

  return (
    <div className="dark:bg-primary-800">
      <div className="max-w-7xl pt-10 mx-4 dark:bg-primary-800 md:mx-10 lg:mx-64">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type any word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeydown}
            className={`rounded-2xl bg-primary-300 dark:bg-primary-600 dark:text-primary-300 font-bold w-full px-4 py-4 md:py-4.5 md:text-lg lg:py-5 border-1 border-primary-300 dark:border-primary-600 focus:border-secondary-100 outline-none ${
              emptyError ? "outline-solid outline-1 outline-secondary-200" : ""
            }`}
          />
          <button className="absolute right-0 md:scale-120 hover:cursor-pointer h-[60px] w-[60px] flex items-center justify-center">
            <SearchIcon className="" onClick={() => getDefinition(word)} />
          </button>
        </div>
        {emptyError && (
          <p className="text-secondary-200 pt-2 ml-1 md:text-lg">
            Please, enter a word
          </p>
        )}
        {wordError && <NotFound font={font} />}
        {isLoading && !wordError && <Loader />}
        {!wordSearched ? (
          <DefaultPage />
        ) : (
          !wordError &&
          !isLoading && (
            <>
              <div className="flex justify-between items-center pt-8">
                <div className="flex flex-col gap-2">
                  <h1 className=" text-primary-800 dark:text-primary-100 text-3xl font-bold md:text-4xl lg:text-6xl">
                    {definition?.word}
                  </h1>
                  <p className="text-secondary-100 text-lg md:text-2xl lg:text-3xl">
                    {definition?.phonetic}
                  </p>
                </div>
                <PlayIcon
                  className="w-16 md:w-22 lg:scale-120 hover:cursor-pointer"
                  onClick={playAudio}
                />
              </div>

              {definition?.meanings?.map((def, index) => (
                <div className="comp" key={index}>
                  <div className="flex items-center pt-6">
                    <p className="italic font-bold text-primary-800 dark:text-primary-100 text-lg md:text-xl lg:text-2xl">
                      {def.partOfSpeech}
                    </p>
                    <div className="bg-primary-300 dark:bg-primary-500 w-full h-0.5 ml-6"></div>
                  </div>
                  <p className="pt-6 dark:text-primary-100 md:text-lg lg:text-xl">
                    Meaning
                  </p>
                  <div className="pt-4 lg:pt-6">
                    <ul className="ml-4 flex flex-col gap-3 md:gap-4 lg:gap-6">
                      {def.definitions
                        ?.slice(0, showMore ? def.definitions.length : 3)
                        .map((def, i) => (
                          <li
                            className="list-disc marker:text-secondary-100 pl-2 md:text-lg lg:text-xl"
                            key={i}
                          >
                            <p className="text-primary-800 dark:text-primary-100">
                              {def.definition}
                            </p>
                            <p className="pt-2 text-primary-400 dark:text-primary-400">
                              {def.example && `"${def.example}"`}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {def?.synonyms && def.synonyms.length > 0 && (
                    <SynonymsList
                      synonyms={def.synonyms}
                      getDefinition={getDefinition}
                    />
                  )}
                </div>
              ))}
              {moreThanThree && (
                <div className="flex items-center pt-10 pb-2">
                  <div className="flex-1 h-0.5 hidden  bg-primary-300 dark:bg-primary-400"></div>
                  <button
                    className="rounded-full w-full md:w-48 md:py-2.5 lg:py-3.5 md:mx-auto hover:cursor-pointer flex items-center justify-center gap-3 bg-primary-300 dark:bg-primary-600 py-2"
                    onClick={() => setShowMore(!showMore)}
                  >
                    <p className="text-lg font-inconsolata text-primary-500 font-semibold dark:text-primary-100 lg:text-xl">
                      {showMore ? "Show Less" : "Show More"}
                    </p>
                    <ArrowDown
                      className={`stroke-icon-primary lg:scale-140 ${
                        showMore ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div className="flex-1 hidden h-0.5 bg-primary-300 dark:bg-primary-400"></div>
                </div>
              )}
            </>
          )
        )}

        {!wordError && !isLoading && (
          <div className="pb-10 pt-4">
            {
              <div className="bg-primary-300 dark:bg-primary-500 w-full h-0.5 mt-4 mb-4 dark:primary-500"></div>
            }
            <p className="text-primary-700 dark:text-primary-100 pt-2 md:text-lg lg:text-xl">
              Source
            </p>
            <a
              href={`https://en.wiktionary.org/wiki/${
                wordSearched ? definition?.word : "dictionary"
              }`}
              className="text-primary-600 dark:text-primary-100 md:text-lg lg:text-xl flex flex-wrap items-center gap-1 lg:gap-2.5  break-words"
            >
              {
                <p className="break-words">{`https://en.wiktionary.org/wiki/${
                  wordSearched ? definition?.word : "dictionary"
                }`}</p>
              }
              <NewWindow className="scale-100 md:scale-120 lg:scale-150" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
