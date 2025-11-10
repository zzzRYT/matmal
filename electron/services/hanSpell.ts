import dotenv from 'dotenv';
import { XMLParser } from 'fast-xml-parser';

dotenv.config();

const DEFAULT_URL =
  'https://dcplxo2e85.execute-api.ap-northeast-2.amazonaws.com/v1/PnuWebSpeller/check';

export async function hanSpellCheck(
  sentence: string,
  weakOpt = 0,
  apiKey?: string
) {
  if (!sentence) {
    throw new Error('sentence is required');
  }

  const url = `${process.env.HANSPELL_URL || DEFAULT_URL}?weakOpt=${weakOpt}`;
  const key = apiKey || process.env.HANSPELL_API_KEY;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; utf-8',
      'x-api-key': `${key}`,
    },
    body: JSON.stringify({ sentence }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `HanSpell API error: ${response.status} ${response.statusText} ${text}`
    );
  }
  const xml = await response.text();
  const parser = new XMLParser();
  const json = parser.parse(xml);
  return json;
}
