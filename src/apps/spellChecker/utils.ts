import { PnuErrorWord } from '../../../electron/services/schema';

export const getCandWord = (item: PnuErrorWord) => {
  if (typeof item.CandWordList.CandWord === 'string') {
    return item.CandWordList.CandWord;
  } else {
    if (Array.isArray(item.CandWordList.CandWord)) {
      return item.CandWordList.CandWord[0];
    }
  }
  return '';
};
