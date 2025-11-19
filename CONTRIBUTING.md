# Contributing to matmal

감사합니다! 프로젝트에 기여하는 방법을 안내합니다.

## 기여 방법

1. 이슈를 열거나(existing issue) 기능 요청, 버그 리포트를 확인하세요.
2. 새 브랜치를 만드세요: `git checkout -b feature/your-short-description` 또는 `fix/your-short-description`.
3. 작업 후 커밋하고 PR을 열어주세요.

## 브랜치 스타일

- 기능: `feature-<이슈번호>/short-desc`
- 버그 수정: `fix/<short>`
- 문서: `docs/<short>`

## PR 템플릿 및 체크리스트

- PR의 이름은 `[#이슈번호]: 간결한 PR제목`으로 작성해주시면 됩니다.

- PR을 열 때는 변경 내용(summary), 관련 이슈 번호, 테스트 방법을 적어주세요.
- PR 체크리스트 예:
  - [ ] 빌드 통과 (`npm run build`)
  - [ ] 린트 통과 (`npm run lint`)
  - [ ] 변경점에 대한 설명 추가

## 로컬에서 실행할 명령어

PR을 열기 전 또는 변경 사항을 검증할 때 아래 명령어들을 사용하세요. 이 저장소는 `npm` 스크립트를 표준으로 사용합니다.

- 의존성 설치

  ```bash
  npm ci
  ```

- 개발 서버 (Vite)

  ```bash
  npm run dev
  ```

- Electron으로 앱 실행 (개발)

  ```bash
  npm run start
  ```

권장 순서 (PR을 준비할 때):

1. `npm ci`
2. `npm run format` (또는 `npm run format:check`로 검사)
3. `npm run lint`
4. `npm run build`

이 순서로 확인하면 CI에서 발생하는 포맷/빌드 문제를 미리 줄일 수 있습니다.

## 코드 스타일

- TypeScript + React 규칙을 따릅니다.
- ESLint 및 Prettier 규칙을 따르며, CI에서 검사됩니다.

## 리뷰 프로세스

- 자동 CI가 통과하면 최소 1명의 리뷰어 승인 후 머지합니다.
- 중요 변경(아키텍처/보안)은 팀 합의 후 머지하세요.

## 릴리스

- `main`브랜치로 `merge`시 자동으로 `workflows`가 동작합니다.

> 주의해야할 점은 `release`의 버전은 `package.json`의 `version`을 따라갑니다. 따라서 `package.json`의 버전을 최신화 시켜주어야 다음 버전의 `release`가 올라갑니다.
