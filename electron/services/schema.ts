export interface SpellCheckerParams {
  weakOpt: number;
}

export interface SpellCheckerRequestBody {
  sentence: string;
}

export type SpellCheckerRequest = SpellCheckerRequestBody &
  Partial<SpellCheckerParams>;

export type CandWord = {
  CandWord: string | string[];
};

export interface PnuErrorWord {
  CandWordList: CandWord;
  Help: string;
  OrgStr: string;
}

export interface SpellCheckerApiResponse {
  PnuErrorWordList: {
    PnuErrorWord: PnuErrorWord[];
  };
}
