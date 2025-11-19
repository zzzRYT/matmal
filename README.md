# matmal

간편한 한국어 맞춤법 검사 데스크탑 앱

## 개요

- **matmal**은 Electron + Vite + React 기반의 데스크탑 애플리케이션입니다.
- 로컬 또는 외부 맞춤법/문법 검사 API와 연동하여 한국어 텍스트 검사 기능을 제공합니다.

## 빠른 시작 (개발)

요구사항: Node.js 18+ (권장 20), npm 또는 yarn

1. 의존성 설치

```bash
npm ci
```

2. 개발 서버 실행 (Renderer + Electron 개발 모드)

```bash
npm run dev
# 또는
npm run start
```

> 참고: `npm run dev`는 Vite 개발 서버만, `npm run start`는 Electron Forge로 앱을 실행합니다.

## 포매팅 (Prettier)

프로젝트는 코드 포맷터로 `Prettier`를 사용합니다. PR을 제출하기 전에 포맷 검사를 수행하세요.

- 포맷 검사:

```bash
npx prettier --check "**/*.{ts,tsx,js,jsx,json,css,md,html}"
```

- 자동 포맷:

```bash
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md,html}"
```

CI는 PR에서 Prettier 검사를 실행합니다. 로컬 에디터에서 자동 포맷을 활성화하면 개발이 편리합니다.

## 사용 가능한 명령어 (Commands)

아래는 이 리포지토리에서 빈번하게 사용하는 `npm` 스크립트와 설명입니다. PR을 열기 전에 적어도 `build`, `lint`, `format:check`를 실행해 주세요.

- 의존성 설치

```bash
npm ci
```

- 개발 서버 (Vite) 실행

```bash
npm run dev
```

- Electron으로 앱 실행 (개발용)

```bash
npm run start
```

- 빌드 (TypeScript 컴파일 + Vite 빌드)

```bash
npm run build
```

- ESLint 검사

```bash
npm run lint
```

- Prettier 포맷 자동 적용

```bash
npm run format
```

- Prettier 포맷 검사 (CI에서도 사용)

```bash
npm run format:check
```

- Electron 패키지 생성

```bash
npm run package
```

- 플랫폼별 설치파일 생성

```bash
npm run make
```

- GitHub Release로 배포

```bash
npm run publish
```

노트:

- `npm run publish`를 사용하려면 레포지토리 `config.forge.publishers` 설정 및 CI/로컬 환경에 `GITHUB_TOKEN`이 설정되어야 합니다.
- 로컬에서 포맷 및 린트 자동화를 원하면 `husky` + `lint-staged` 설정을 사용해 커밋 훅을 추가하세요. 자세한 내용은 `CONTRIBUTING.md`를 참고하세요.

## 빌드 및 배포

1. 빌드

```bash
npm run build
```

2. Electron 패키지 생성

```bash
npm run package
```

3. 설치 파일(플랫폼별) 생성

```bash
npm run make
```

4. GitHub Release에 배포

```bash
npm run publish
```

`publish`의 경우, `main`브랜치에 `merge`되면 자동으로 실행됩니다. 이 때, `package.json`파일의 `version`을 따라갑니다. 때문에 버전업 전 `package.json`파일 확인이 필요합니다.

## 기여

기여를 환영합니다! 자세한 안내는 [`CONTRIBUTING.md`](./CONTRIBUTING.md)를 참고하세요.

## 라이선스

MIT
