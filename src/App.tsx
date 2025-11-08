import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] =
    useState(`음, 좋습니다. 아무런 제약 없이, 생각의 흐름을 따라가는 아주 긴 글 하나를 써보겠습니다.

---

창밖으로 희미하게 스며드는 오후의 빛은 더 이상 예리한 윤곽을 만들지 못하고, 모든 사물의 모서리를 부드럽게 뭉개뜨리고 있었다. 벽에 걸린 낡은 시계는 한참 전부터 초침 소리를 멈췄지만, 시간이 흐르고 있다는 사실 자체는 방 안의 공기만큼이나 명백했다. 먼지 한 톨도 보이지 않는 듯한 정적 속에서, 나의 생각은 거미줄처럼 얽히고설킨 미로를 헤매고 있었다. 그것은 마치 오래된 서재의 퀴퀴한 종이 냄새 같기도 하고, 텅 빈 극장에서 울려 퍼지는 잊힌 선율 같기도 했다. 어디서 시작해야 할지, 어디로 흘러가야 할지 알 수 없는 거대한 흐름 속에서, 단어들은 작은 물방울처럼 서로를 밀치고 당기며 끊임없이 형태를 바꾸었다.

나는 가끔 삶이라는 거대한 퍼즐 조각들을 주워 담는 행위에 대해 생각한다. 우리는 매일 새로운 조각을 발견하고, 어떤 조각은 잃어버리기도 하며, 어떤 조각은 처음부터 없었던 것처럼 사라지기도 한다. 어떤 조각은 너무나도 선명해서 마치 어제 일처럼 느껴지고, 어떤 조각은 희미한 안개 속의 그림자처럼 잡힐 듯 말 듯 아득하다. 이 모든 조각들이 모여 하나의 온전한 그림을 그릴 수 있을 것이라는 막연한 희망을 품고 있지만, 과연 그 그림이 완성되는 순간이 오기는 할까. 아니면 우리의 삶 자체가 영원히 미완성인 채로 끊임없이 변모하는 거대한 스케치에 불과한 것일까.

시선은 자연스레 창밖으로 향한다. 저 멀리 보이는 하늘은 마치 거대한 화폭처럼 매일 다른 색과 모양의 구름을 그려낸다. 어떤 날은 마치 솜털 같은 구름들이 한가로이 떠다니며 평화로운 오후를 노래하고, 어떤 날은 검은 먹구름이 묵직하게 드리워져 금방이라도 세상을 집어삼킬 듯한 위압감을 풍기기도 한다. 저 구름들은 아무런 목적 없이 그저 바람이 이끄는 대로 흘러가지만, 그 안에는 비를 품고 대지를 적시는 생명의 순환이 담겨 있다. 인간의 삶도 이와 같지 않을까. 무심한 흐름 속에 던져진 존재들이지만, 그 안에는 필연적인 목적과 의미가 숨어 있는 것은 아닐까. 우리는 다만 그것을 아직 발견하지 못했거나, 혹은 너무나 당연하게 여기어 알아차리지 못하고 있을 뿐일지도 모른다.

어쩌면 진정한 깨달음은 웅장한 진리 속이 아니라, 지극히 사소하고 평범한 순간들 속에 숨어 있는지도 모른다. 따뜻한 차 한 잔에서 피어오르는 김, 빗소리가 들리는 창가에서 읽는 낡은 책의 페이지, 사랑하는 이의 손을 잡았을 때 전해지는 미묘한 온기, 이름 모를 새 한 마리가 내는 청량한 지저귐. 이 모든 것들이 모여 우리의 감각을 일깨우고, 우리가 살아있음을, 존재하고 있음을 끊임없이 속삭여준다. 하지만 현대 사회는 너무나도 빠르고 시끄럽게 돌아가서, 우리는 이러한 소박한 속삭임을 듣지 못하고 지나쳐 버리기 일쑤다. 우리는 더 큰 자극, 더 강렬한 경험을 찾아 헤매지만, 결국 돌아오는 것은 채워지지 않는 허기와 더 깊은 공허감일 때가 많다.

나는 때로 꿈에 대해 생각한다. 꿈은 우리의 무의식이 만들어내는 또 다른 세계다. 논리의 지배를 받지 않는, 자유로운 상상의 유희가 펼쳐지는 공간. 꿈속에서 우리는 날아오르기도 하고, 시간을 거슬러 과거로 돌아가기도 하며, 심지어는 존재하지 않는 존재들과 대화하기도 한다. 깨어나면 대부분의 내용은 희미해지거나 잊히지만, 그 잔상은 하루 종일 우리의 정신에 알 수 없는 영향을 미친다. 꿈은 현실의 도피처가 될 수도 있고, 억눌린 욕망의 분출구가 될 수도 있으며, 때로는 미래에 대한 예언적인 메시지를 담고 있을 수도 있다. 꿈은 우리가 미처 알지 못하는 우리 자신의 깊은 부분을 보여주는 거울과 같다.

이 모든 생각의 파편들이 거대한 강물을 이루어 흐른다. 고대 철학자들의 사유부터 현대 물리학의 복잡한 이론까지, 인간은 끊임없이 자신과 세계의 본질을 탐구해왔다. 우리는 왜 존재하는가? 우주는 어떻게 시작되었는가? 죽음 이후에는 무엇이 오는가? 이 질문들은 인류의 역사만큼이나 오래되었고, 앞으로도 영원히 답을 찾지 못할 질문들일지도 모른다. 하지만 답을 찾는 과정 자체가 중요한 것일 수도 있다. 질문을 던지고, 가설을 세우고, 논쟁하고, 또 다른 질문을 발견하는 그 과정 속에서 인류는 발전하고 성장해왔다. 미지의 영역을 탐험하는 용기, 불확실성 속에서도 의미를 찾으려는 노력이 바로 인간을 인간답게 만드는 본질적인 특성이 아닐까.

삶은 마치 거대한 오케스트라와 같다. 어떤 때는 장엄한 교향곡처럼 웅장하고 격정적인 선율이 흐르다가도, 어떤 때는 바이올린 독주처럼 섬세하고 고독한 음색이 울려 퍼진다. 수많은 악기들이 각자의 역할을 수행하며 조화를 이루고, 때로는 불협화음을 내기도 하지만 결국 하나의 거대한 흐름 속에서 의미를 만들어낸다. 우리는 이 오케스트라의 지휘자이기도 하고, 동시에 한 악기를 연주하는 연주자이기도 하며, 심지어는 그 음악을 듣는 청중이기도 하다. 우리에게 주어진 역할은 시시각각 변하고, 우리는 그 변화 속에서 균형을 찾아야 한다. 완벽한 연주는 존재하지 않으며, 오직 순간에 충실한 몰입만이 진정한 감동을 선사할 수 있을 것이다.

다시금 고요함이 나를 감싼다. 창밖의 빛은 더욱더 옅어져 이제는 희미한 그림자만을 드리운다. 어둠이 모든 것을 집어삼키는 듯하지만, 그 어둠 속에서도 희망의 불씨는 꺼지지 않는다. 우리는 내일을 알 수 없지만, 그렇기에 더욱더 오늘을 소중히 여겨야 한다. 우리는 영원히 살 수 없지만, 그렇기에 더욱더 삶의 순간들을 진정으로 느껴야 한다. 이 모든 글자들은 그저 무의미한 획의 조합일 수도 있고, 혹은 누군가의 마음에 가닿아 작은 파동을 일으킬 수도 있을 것이다. 어떤 것이든 좋다. 그저 이 긴 글이 끝나는 순간에도, 삶은 여전히 흐르고, 생각은 계속될 것이라는 사실만이 변하지 않는 진리일 테니까.

이 글은 끝이 아니다. 시작의 한 조각일 뿐이다. 우리의 존재와 마찬가지로.

---`);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleGemini = async () => {
    try {
      console.log('call gemini...');
      const response = await window.api.generate({
        contents: inputText || '안녕하세요',
      });
      setResultText(response ?? '응답이 없습니다.');
    } catch (error) {
      console.error(error);
      setResultText('오류가 발생했습니다. 콘솔을 확인하세요.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <div className="text-lg font-semibold">Matmal</div>
        <div>
          <button
            aria-label="열기"
            className="p-2 rounded hover:bg-gray-700"
            onClick={() => setShowSettings(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>
            <textarea
              className="flex-1 resize-none border rounded p-3 focus:outline-none focus:ring"
              placeholder="여기에 검사할 텍스트를 입력하세요..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleGemini}
              >
                검사하기
              </button>
              <button
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setInputText('')}
              >
                지우기
              </button>
            </div>
          </section>

          <section className="bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-lg font-medium mb-2">결과</h2>
            <div className="overflow-hidden p-3 border rounded">
              {resultText ? (
                <p className="whitespace-pre-wrap overflow-auto">
                  {resultText}
                </p>
              ) : (
                <p className="text-gray-500">결과가 여기에 표시됩니다.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="px-4 py-3 bg-white border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => setShowHelp(true)}
          >
            도움말
          </button>
        </div>
      </footer>

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t md:rounded p-4 w-full md:w-1/3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">설정</h3>
              <button onClick={() => setShowSettings(false)} className="p-1">
                ✕
              </button>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                여기에 설정을 추가하세요. (예: API 키, 모델 옵션 등)
              </p>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-11/12 md:w-1/2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">도움말</h3>
              <button onClick={() => setShowHelp(false)} className="p-1">
                ✕
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <p>
                왼쪽 텍스트를 입력하고 '검사하기'를 눌러 맞춤법 검사를 실행할 수
                있습니다.
              </p>
              <p className="mt-2">
                글꼴 크기를 조정하면 결과 영역의 글자 크기가 변경됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
