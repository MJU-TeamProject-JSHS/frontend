# DDiNG 앱 디자인 시스템

> 이 문서는 DDiNG 앱에서 사용하는 모든 그라데이션과 SVG 아이콘을 정의합니다. 
> 새로운 기능을 추가하거나 디자인을 수정할 때 이 문서의 스타일을 참고하여 일관성을 유지하세요.

## 📐 디자인 컨셉

DDiNG 앱은 **글래스모피즘(Glassmorphism) + 그라데이션** 스타일을 사용합니다.
- 색상 팔레트: 인디고(Indigo) - 퍼플(Purple) - 핑크(Pink) - 블루(Blue) - 시안(Cyan) 계열
- 모든 페이지는 부드러운 그라데이션 배경을 사용
- 카드와 버튼은 투명도와 백드롭 블러를 활용한 글래스 효과 적용

---

## 🎨 그라데이션 가이드

### 1️⃣ 페이지 배경 그라데이션

#### 메인 배경 (밝은 톤) - 대부분의 페이지에 사용
```tsx
className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
```
**사용 위치:**
- AI 페이지
- 게시글 목록/상세/작성 페이지
- 자료실 목록/상세 페이지
- 객관식 문제 업로드/결과 페이지

**색상 값:**
- from: `#eef2ff` (indigo-50)
- via: `#faf5ff` (purple-50)
- to: `#fdf2f8` (pink-50)

---

#### 마이페이지 배경 (슬레이트 톤)
```tsx
className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30"
```
**색상 값:**
- from: `#f8fafc` (slate-50)
- via: `rgba(238, 242, 255, 0.3)` (indigo-50/30)
- to: `rgba(250, 245, 255, 0.3)` (purple-50/30)

---

#### 풀스크린 그라데이션 (진한 톤) - 강조 페이지
```tsx
className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
```
**사용 위치:**
- 스플래시 스크린
- 카카오 로그인 페이지
- AI 로딩 페이지
- 프로필 카드 배경
- 타이틀 카드 배경

**색상 값:**
- from: `#6366f1` (indigo-500)
- via: `#a855f7` (purple-500)
- to: `#ec4899` (pink-500)

---

### 2️⃣ 버튼 그라데이션

#### 주요 액션 버튼 (3-color 그라데이션)
```tsx
className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
```
**사용 위치:**
- 문제 생성하기 버튼
- 게시글 작성 버튼
- 주요 제출 버튼

---

#### 보조 액션 버튼 (2-color 그라데이션)

**퍼플-인디고 (기본 확인/제출)**
```tsx
className="bg-gradient-to-br from-purple-400 to-indigo-400"
```
- 색상: `#a78bfa` → `#818cf8`
- 사용: 닉네임 변경 제출, 프로필 사진 기본 이미지 선택

**로즈-핑크 (삭제/로그아웃/경고)**
```tsx
className="bg-gradient-to-br from-rose-400 to-pink-400"
```
- 색상: `#fb7185` → `#f472b6`
- 사용: 삭제 확인, 로그아웃, 마이페이지 로그아웃 메뉴

**에메랄드-틸 (성공/완료)**
```tsx
className="bg-gradient-to-br from-emerald-400 to-teal-400"
```
- 색상: `#34d399` → `#2dd4bf`
- 사용: 공지사항 메뉴, 프로필 사진 갤러리 선택

**블루-시안 (정보)**
```tsx
className="bg-gradient-to-br from-blue-400 to-cyan-400"
```
- 색상: `#60a5fa` → `#22d3ee`
- 사용: 이용안내 메뉴, 프로필 사진 카메라 선택

---

### 3️⃣ AI 카테고리 카드 그라데이션

#### 객관식 문제
```tsx
className="bg-gradient-to-br from-amber-400 to-orange-400"
```
- 색상: `#fbbf24` → `#fb923c`
- 아이콘: `FileQuestion`

#### 암기 노트
```tsx
className="bg-gradient-to-br from-rose-400 to-pink-400"
```
- 색상: `#fb7185` → `#f472b6`
- 아이콘: `BookOpen`

#### 주관식 문제
```tsx
className="bg-gradient-to-br from-purple-400 to-indigo-400"
```
- 색상: `#a78bfa` → `#818cf8`
- 아이콘: `MessageSquare`

#### OX 문제
```tsx
className="bg-gradient-to-br from-emerald-400 to-teal-400"
```
- 색상: `#34d399` → `#2dd4bf`
- 아이콘: `CheckCircle2`

---

### 4️⃣ 아이콘 배경 그라데이션

#### 인디고-퍼플 (파일/게시글)
```tsx
className="bg-gradient-to-br from-indigo-400 to-purple-400"
```
- 색상: `#818cf8` → `#a78bfa`
- 사용: 파일 아이콘, 게시글 아이콘, 다운로드 버튼 (자료실)

#### 핑크-로즈 (게시글 특화)
```tsx
className="bg-gradient-to-br from-pink-400 to-rose-400"
```
- 색상: `#f472b6` → `#fb7185`
- 사용: 게시글 다운로드 버튼

#### 시안-블루 (정보 카드)
```tsx
className="bg-gradient-to-br from-cyan-400 to-blue-400"
```
- 색상: `#22d3ee` → `#60a5fa`
- 사용: 인포메이션 아이콘

---

### 5️⃣ 카드/컨테이너 배경 그라데이션

#### 성공 배너 (3-color)
```tsx
className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
```
- 색상: `#10b981` → `#14b8a6` → `#06b6d4`
- 사용: 문제 생성 완료 배너

#### 정답 표시 배경 (밝은 톤)
```tsx
className="bg-gradient-to-br from-emerald-50 to-teal-50"
```
- 색상: `#ecfdf5` → `#f0fdfa`
- 테두리: `border-emerald-200/50`

#### 선택된 옵션 배경
```tsx
className="bg-gradient-to-br from-indigo-50 to-purple-50"
```
- 색상: `#eef2ff` → `#faf5ff`
- 테두리: `border-indigo-200`

#### 정보 카드 배경
```tsx
className="bg-gradient-to-br from-cyan-50 to-blue-50"
```
- 색상: `#ecfeff` → `#eff6ff`
- 테두리: `border-cyan-200/50`

#### 다운로드 카드 배경 (인디고-퍼플)
```tsx
className="bg-gradient-to-br from-indigo-100 to-purple-100"
```
- 색상: `#e0e7ff` → `#f3e8ff`
- 테두리: `border-indigo-200`

#### 다운로드 카드 배경 (핑크-로즈)
```tsx
className="bg-gradient-to-br from-pink-100 to-rose-100"
```
- 색상: `#fce7f3` → `#ffe4e6`
- 테두리: `border-pink-200`

---

### 6️⃣ 텍스트 그라데이션

#### DDiNG 로고
```tsx
className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
```
- 색상: `#4f46e5` → `#9333ea`
- 사용: 모든 페이지 상단 로고

---

### 7️⃣ 네비게이션 바

#### 활성화된 탭 아이콘
```tsx
className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-200"
```

#### 비활성화된 탭 아이콘
```tsx
className="bg-gray-100"
// 텍스트: text-gray-500
```

---

### 8️⃣ 특수 효과 그라데이션

#### 상단 페이드 효과
```tsx
className="bg-gradient-to-t from-slate-50 via-indigo-50/30 to-transparent"
```

#### 구분선
```tsx
className="bg-gradient-to-r from-transparent via-gray-300 to-transparent"
```

---

## 🎯 SVG 아이콘 목록

DDiNG 앱에서 사용하는 모든 SVG 아이콘은 `/imports` 디렉토리의 `svg-*.ts` 파일들에 정의되어 있습니다.

### 주요 SVG 파일과 사용처

#### 1. svg-znex0hqym3.ts
**위치:** `/imports/Container.tsx`에서 사용
**용도:** 로봇 아이콘 (AI 관련 기능)
```tsx
<Path d="M9.99775 6.66517V3.33258H6.66517" stroke="white" />
<Path d="M14.9966 6.66517H4.99888C4.07861 6.66517..." stroke="white" />
// ... 로봇 모양의 Path들
```

#### 2. svg-r6ddvkxa7v.ts
**위치:** Status 컴포넌트
**용도:** 상태바 아이콘들 (배터리, 신호 등)

#### 3. svg-lolv7.tsx
**위치:** Figma 임포트 컴포넌트
**용도:** 특정 UI 엘리먼트의 벡터 그래픽

### Lucide React 아이콘 사용

앱에서는 대부분의 아이콘을 `lucide-react` 라이브러리에서 가져옵니다:

```tsx
import { 
  User,           // 사용자 프로필
  FileText,       // 파일/문서
  Info,           // 정보
  Bell,           // 알림
  Tag,            // 태그/버전
  LogOut,         // 로그아웃
  Bot,            // AI/챗봇
  ClipboardList,  // 게시글 목록
  FolderOpen,     // 자료실
  Sparkles,       // 반짝임 효과
  GraduationCap,  // 교육/학습
  BookOpen,       // 책/암기
  Brain,          // AI/학습
  Zap,            // 빠름/번개
  FileQuestion,   // 객관식 문제
  MessageSquare,  // 주관식 문제
  CheckCircle2,   // OX 문제/완료
  Upload,         // 업로드
  Download,       // 다운로드
  Heart,          // 좋아요
  Eye,            // 조회수
  ArrowLeft,      // 뒤로가기
  Plus,           // 추가
  Camera,         // 카메라
  Image,          // 이미지
  Check,          // 체크/확인
  X,              // 닫기/취소
  Trash2,         // 삭제
  ChevronRight,   // 오른쪽 화살표
  ChevronLeft,    // 왼쪽 화살표
  Smartphone      // 스마트폰/디바이스
} from 'lucide-react';
```

---

## 📏 그라데이션 사용 규칙

### 방향성
- `bg-gradient-to-br`: 오른쪽 하단 (기본, 대부분의 카드/버튼)
- `bg-gradient-to-r`: 오른쪽 (텍스트, 가로 버튼)
- `bg-gradient-to-b`: 하단 (Figma 임포트 레거시)
- `bg-gradient-to-t`: 상단 (페이드 효과)

### 투명도 활용
- 배경: `bg-white/5`, `bg-white/10`, `bg-white/20`
- 테두리: `border-white/20`, `border-white/30`
- 글래스 효과: `backdrop-blur-md`, `backdrop-blur-sm`

### 그림자 효과
```tsx
// 퍼플 계열
shadow-lg shadow-purple-200
shadow-indigo-100/50

// 핑크 계열
shadow-pink-100/50
shadow-[0px_4px_12px_0px_rgba(251,113,133,0.3)]

// 일반
shadow-xl
shadow-2xl
```

---

## 💡 새로운 기능 추가 시 가이드라인

### 1. 새로운 페이지 배경
- 기본적으로 `from-indigo-50 via-purple-50 to-pink-50` 사용
- 강조가 필요한 경우 `from-indigo-500 via-purple-500 to-pink-500`

### 2. 새로운 버튼
- 주요 액션: `from-indigo-500 via-purple-500 to-pink-500`
- 확인/제출: `from-purple-400 to-indigo-400`
- 삭제/경고: `from-rose-400 to-pink-400`
- 완료/성공: `from-emerald-400 to-teal-400`
- 정보: `from-blue-400 to-cyan-400`

### 3. 새로운 카테고리 카드
4가지 색상을 순환하여 사용:
1. `from-amber-400 to-orange-400` (주황)
2. `from-rose-400 to-pink-400` (핑크)
3. `from-purple-400 to-indigo-400` (보라)
4. `from-emerald-400 to-teal-400` (청록)

### 4. 아이콘 선택
- Lucide React에서 먼저 찾기
- 없는 경우 custom SVG 작성
- 아이콘 크기: 대부분 `w-5 h-5` 또는 `w-6 h-6`
- 스트로크: `strokeWidth={2}` 기본

---

## 🔧 React Native 변환 가이드

### 그라데이션 변환
```tsx
import LinearGradient from 'react-native-linear-gradient';

// Web: bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
// React Native:
<LinearGradient
  colors={['#6366f1', '#a855f7', '#ec4899']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
>
  {/* 콘텐츠 */}
</LinearGradient>
```

### SVG 변환
```tsx
import Svg, { Path } from 'react-native-svg';

// lucide-react의 FileText와 동일
<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
  <Path
    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  {/* ... */}
</Svg>
```

---

## 📦 필수 패키지

### Web (현재 프로젝트)
- `lucide-react`: 아이콘
- `tailwindcss`: 스타일링
- `@tailwindcss/v4`: Tailwind CSS v4

### React Native (변환 시)
- `react-native-linear-gradient` 또는 `expo-linear-gradient`
- `react-native-svg`
- `@react-native-community/blur` 또는 `expo-blur`

---

## ✅ 체크리스트

새로운 컴포넌트를 만들 때 확인하세요:

- [ ] 배경 그라데이션이 기존 페이지들과 일관성 있는가?
- [ ] 버튼 그라데이션이 용도에 맞는 색상을 사용하는가?
- [ ] 아이콘은 lucide-react에서 가져왔는가?
- [ ] 글래스모피즘 효과 (`backdrop-blur`, 투명도)를 적용했는가?
- [ ] 호버/액티브 상태 애니메이션이 있는가?
- [ ] 그림자 효과가 적절한가?
- [ ] 반응형 디자인을 고려했는가?

---

이 디자인 시스템을 따라 개발하면 DDiNG 앱의 일관된 UI/UX를 유지할 수 있습니다.
