import dotenv from 'dotenv';
import { XMLParser } from 'fast-xml-parser';
import { SpellCheckerApiResponse, SpellCheckerRequest } from './schema';

dotenv.config();

const DEFAULT_URL = import.meta.env.HANSPELL_URL;
export async function hanSpellCheck({
  sentence,
  weakOpt = 0,
}: SpellCheckerRequest): Promise<SpellCheckerApiResponse> {
  if (!sentence) {
    throw new Error('sentence is required');
  }

  const url = `${process.env.HANSPELL_URL || DEFAULT_URL}?weakOpt=${weakOpt}`;
  const key = process.env.HANSPELL_API_KEY;

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
    throw new Error(`HanSpell API error: ${response.status} ${response.statusText} ${text}`);
  }
  const xml = await response.text();
  const parser = new XMLParser();
  const json = parser.parse(xml);
  return json.PnuNlpSpeller;
}
