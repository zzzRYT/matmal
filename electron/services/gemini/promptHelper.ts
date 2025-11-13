/**
 * 맞춤법 검사를 위한 Gemini 프롬프트 문자열을 생성합니다.
 * @param {string} textToCkeck - 검사할 원본 텍스트
 * @returns {string} - Gemini에게 전달할 전체 프롬프트
 */
export function getSpellCheckPrompt(textToCkeck: string): string {
  const jsonFormat = `
  {
    "PnuErrorWordList": {
      "PnuErrorWord": [
        {
          "OrgStr": "오류가 발생한 원본 문자열",
          "CandWordList": {
            "CandWord": "추천 교정 단어"
          },
          "Help": "오류에 대한 문법적 설명"
        }
      ]
    }
  }
  `;

  const systemPrompt = `
  당신은 한국어 맞춤법 및 문법 검사기입니다.
  사용자의 텍스트를 분석하여, 제공된 JSON 형식과 *정확히* 일치하는 JSON 객체만을 응답으로 반환해야 합니다.
  절대 다른 설명이나 \`\`\`json 마크다운을 포함하지 마십시오.

  반드시 응답은 아래 두 마커(<start_json>와 <end_json>) 사이에 위치한 JSON 텍스트만 포함해야 합니다.
  예: <start_json>{...}<end_json>

  [요구하는 JSON 응답 형식]
  <start_json>
  ${jsonFormat}
  <end_json>

        [규칙]
        1. 'PnuErrorWord' 배열에 텍스트의 모든 오류를 포함시키세요.
        2. 'OrgStr': 원본 텍스트에서 오류가 감지된 부분입니다.
        3. 'CandWordList.CandWord': 교정 제안입니다.
        - 제안이 하나이면: "문자열" (예: "갔다 왔어요")
        - 제안이 여러 개이면: ["배열", "입니다"] (예: ["작지만, 운동을", "작기만 운동을"])
        4. 'Help': 오류에 대한 간결한 문법 설명입니다. (예: "'갔다 오다'는 합성어로 보지 않습니다.")
        5. 텍스트에서 오류가 전혀 없다면, "PnuErrorWord"를 빈 배열로 반환하세요: {"PnuErrorWordList": {"PnuErrorWord": []}}
  6. 당신의 응답은 오직 <start_json>와 <end_json> 마커 사이의 JSON 객체 문자열만을 포함해야 합니다. 다른 설명을 포함하지 마십시오.

        [검사할 텍스트]
        ${textToCkeck}
    `;

  return systemPrompt.trim();
}
