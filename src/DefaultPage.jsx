import PlayIcon from "./assets/icon-play.svg?react";

const DefaultPage = () => {
  const dictionaryArray = [
    {
      word: "dictionary",
      phonetic: "/ˈdɪkʃəˌnɛɹi/",
      phonetics: [
        {
          text: "/ˈdɪkʃəˌnɛɹi/",
          audio: "",
        },
        {
          text: "/ˈdɪkʃ(ə)n(ə)ɹi/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/dictionary-uk.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=503422",
        },
        {
          text: "/ˈdɪkʃəˌnɛɹi/",
          audio: "",
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "A reference work with a list of words from one or more languages, normally ordered alphabetically, explaining each word's meaning, and sometimes containing information on its etymology, pronunciation, usage, translations, and other data.",
              synonyms: ["wordbook"],
              antonyms: [],
            },
            {
              definition:
                "(preceded by the) A synchronic dictionary of a standardised language held to only contain words that are properly part of the language.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "(by extension) Any work that has a list of material organized alphabetically; e.g., biographical dictionary, encyclopedic dictionary.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "An associative array, a data structure where each value is referenced by a particular key, analogous to words and definitions in a physical dictionary.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: ["wordbook"],
          antonyms: [],
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To look up in a dictionary.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "To add to a dictionary.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "To compile a dictionary.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/dictionary"],
    },
  ];

  const data = dictionaryArray[0];

  const playAudio = () => {
    const audioData = data.phonetics[1].audio
    const audio = new Audio(audioData)
    audio.play();

  }

  return (
    <>
      <div className="flex justify-between items-center pt-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-primary-800 dark:text-primary-100 font-bold md:text-4xl lg:text-6xl">
            {data?.word}
          </h1>
          <p className="text-secondary-100 md:text-2xl  text-lg lg:text-3xl">
            {data?.phonetic}
          </p>
        </div>
        <PlayIcon className="w-16 md:w-22 lg:scale-120"  onClick={playAudio}/>
      </div>

      {data?.meanings?.map((def, index) => (
        <div className="comp" key={index}>
          <div className="flex items-center pt-8">
            <p className="italic font-bold text-primary-800 md:text-xl dark:text-primary-100 text-lg lg:text-2xl">
              {def.partOfSpeech}
            </p>
            <div className="bg-primary-300 w-full h-0.5 ml-6 dark:bg-primary-500"></div>
          </div>
          <p className="pt-4 dark:text-primary-100 text-primary-800 md:text-lg lg:text-xl">Meaning</p>
          <div className="pt-4 lg:pt-6">
            <ul className="ml-4 flex flex-col gap-2 md:gap-4 lg:gap-6">
              {def.definitions?.map((def, i) => (
                <li
                  className="list-disc marker:text-secondary-100 pl-2 md:text-lg dark:text-primary-100 lg:text-xl"
                  key={i}
                >
                  <p>{def.definition}</p>
                  <p className="pt-2 text-primary-400">
                    {def.example && `"${def.example}"`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default DefaultPage;
