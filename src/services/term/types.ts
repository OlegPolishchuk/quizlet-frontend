export interface Term {
  word: string;
  phonetics: TermPhonetic[];
  meanings: TermMeaning[];
}

export interface TermPhonetic {
  text: string;
  audio: string;
}

export interface TermMeaning {
  partOfSpeech: string;
  definitions: [
    {
      definition: string;
      example: string;
      synonyms: [];
      antonyms: [];
    },
  ];
}
