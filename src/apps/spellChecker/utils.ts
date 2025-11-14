import { toast } from 'react-toastify';
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

export const handleClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('복사에 성공했습니다.');
  } catch (e) {
    toast.error('복사에 실패했습니다.');
  }
};
