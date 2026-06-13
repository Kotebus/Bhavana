# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the App

Bhāvanā is a React Native (Expo SDK 56) meditation app for Theravāda Buddhist practice. It provides a timed meditation session with optional Pali recitations, plus a library of Buddhist teachings (sermons) as Markdown files in Russian and English.

## Commands

```bash
# Start Expo dev server
npm start

# Run on iOS (requires Xcode)
npm run ios

# Run on Android (requires Android Studio / connected device)
npm run android

# Lint
npm run lint

# Build Android release AAB
npm run build-android-release
```

No test suite is configured in this project.

### Local Android dev-build prerequisites (macOS)

The Android Gradle build requires Java 17 and a valid SDK path. Set both for the current shell (or persist in `~/.zshrc`):

```shell
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

After adding or upgrading any native module, run `npx expo prebuild --clean` before `npx expo run:android`. Expo Go is **not** supported — the project ships several native modules.

## Architecture

### Entry point & providers

`app/_layout.tsx` is the Expo Router entry. It wraps the app in three providers (outermost first), then renders a single themed `<Stack/>` from `expo-router`:

1. **`AudioProvider`** (`components/contexts/AudioContext.tsx`) — pre-loads all audio players (gong + recitations by two teachers) at startup using `expo-audio`. Exposes players and `stopAllPlayers()` via `useAudio()`.
2. **`SettingsProvider`** (`components/contexts/SettingsContext.tsx`) — loads/saves `AppSettings` from AsyncStorage (key `bhavana_app_settings_v4`). Detects device locale to set the default language and reads `Appearance.getColorScheme()` once at startup to seed the initial theme. Exposes `settings`, `setSettings`, `toggleLanguage`, `theme`, `toggleTheme`, and `inited` via `useSettings()`. Migrates legacy settings without a `theme` field by stamping the current system value once.
3. **`I18nextProvider`** — wraps `i18n` configured in `components/i18n/index.ts`.

On Android, the root layout additionally wraps everything in `<SafeAreaView>`; on iOS the `AppContainer` is rendered directly.

### Navigation

Routing is **file-based via `expo-router`** — there is no manual stack navigator. Each entry under `app/` is a thin re-export from the implementation in `components/screens/`. Screens read URL parameters with `useLocalSearchParams()` and navigate with `router.push(...)` / `router.back()` from `expo-router`.

The `<Stack/>` in `app/_layout.tsx` configures per-screen options (theme-driven `contentStyle` / `headerStyle` / `headerTintColor`, plus iOS-only native headers for the About sub-screens with `t(...)` titles).

### Screens

| Route                | File in `app/`              | Implementation                                              | Purpose |
|----------------------|-----------------------------|-------------------------------------------------------------|---------|
| `/`                  | `app/index.tsx`             | `components/screens/HomeScreen.tsx`                         | Landing: navigate to Meditation, Materials, Settings, About |
| `/meditation`        | `app/meditation.tsx`        | `components/screens/MeditationScreen.tsx`                   | Timed session with countdown timer; plays recitations or gong based on settings (`?h=&m=` query) |
| `/settings`          | `app/settings.tsx`          | `components/screens/SettingsScreen.tsx`                     | Toggle theme, language, sound, recitations, font size, recitation source |
| `/materials`         | `app/materials.tsx`         | `components/screens/MaterialsListScreen.tsx`                | Lists sermons or recitations (`?type=sermons|recitations`) |
| `/material/:key`     | `app/material/[key].tsx`    | `components/screens/MaterialScreen.tsx`                     | Renders a `.md` file via `react-native-nitro-markdown` |
| `/about-project`     | `app/about-project.tsx`     | `components/screens/AboutProjectScreen.tsx`                 | Hub for About sub-screens |
| `/about`             | `app/about/index.tsx`       | `components/screens/about/AboutScreen.tsx`                  | App overview + sermon shortcuts |
| `/about/teacher`     | `app/about/teacher.tsx`     | `components/screens/about/AboutTeacherScreen.tsx`           | Info about Ven. Rakwane Gnanaseeha |
| `/about/sermons`     | `app/about/sermons.tsx`     | `components/screens/about/AboutSermonsScreen.tsx`           | Info about sermons content |
| `/about/monastery`   | `app/about/monastery.tsx`   | `components/screens/about/AboutMonasteryScreen.tsx`         | Info about Chittaviveka monastery |
| `/about/links`       | `app/about/links.tsx`       | `components/screens/about/LinksListScreen.tsx`              | External links |

Adding a new screen: create the implementation under `components/screens/`, add a route file in `app/` that re-exports it (`export {default} from '@/components/screens/MyScreen'`), and optionally register custom options on `<Stack.Screen name="…" options={…}/>` inside `RootStack` in `app/_layout.tsx`.

### Content system

Buddhist teaching content lives in `components/screens/materials/content/`:
- `sermons/` — Markdown files in `*Ru.md` / `*En.md` pairs
- `recitations/` — same structure
- `images/` — images referenced by `src` name in Markdown (custom renderer in `MaterialScreen`)

`MaterialScreen` resolves Markdown by `materialKey` (URL segment) + `settings.language` via a static map (`materialsListMap`). Images in Markdown use filenames without extensions as `src`; the `renderers.image` callback passed to `<Markdown />` maps these to `require()` calls via `imgSources`.

`MaterialKey` is derived from the keys of the EN translation object in `components/i18n/index.ts` — adding a new material requires updating translations, `SermonsRoutingList.ts`, `materialsListMap`, and the Markdown files.

### Theming

The app supports light and dark themes selectable from a `ThemeToggle` icon (`components/common/ThemeToggle.tsx`) shown both in `HomeScreen`'s top bar and as a `SettingsScreen` row.

- Palettes live in `components/styles/theme.ts` (`lightTheme`, `darkTheme`, exported under `palettes`). Adding a new themable color = add a key to `ThemePalette` and provide a value in each palette.
- `components/styles/global.ts` exposes a `createGlobalStyles(palette)` factory plus a legacy static `globalStyles` (= light) export kept for any unconverted call sites.
- `components/styles/useThemedStyles.ts` exposes the consumer hooks:
    - `useThemePalette()` — returns the active `ThemePalette`.
    - `useGlobalStyles()` — returns memoized themed global styles built from the active palette.
- For per-screen local stylesheets that depend on theme colors, follow the `makeStyles(palette)` factory + `React.useMemo(() => makeStyles(palette), [palette])` pattern (see `SettingsScreen.tsx`, `TimePicker.tsx`, `MeditationScreen.tsx`, etc.).
- The Markdown engine in `MaterialScreen.tsx` is themed via `react-native-nitro-markdown`'s `theme.colors` (`text`, `heading`, `blockquote`, `surfaceLight`, `code`, `link`, etc.) — all driven from the active palette.

> `components/styles/global.ts` must **not** import from `SettingsContext` — `SettingsContext` already imports `FONT_SIZE_DEFAULT` from `global.ts`, and the circular path would leave `FONT_SIZE_DEFAULT` undefined at the moment `DEFAULT_SETTINGS` is initialized. That's why the hooks live in `useThemedStyles.ts`.

### Vector icons

The app uses the **modular** `@react-native-vector-icons/*` packages (`ionicons`, `octicons`, `fontawesome6`) — not `@expo/vector-icons` (deprecated). They integrate with `expo-font` directly and avoid the legacy `expo-asset → AppDirectories` chain.

If you ever see every icon glyph render as empty / invisible, the likely cause is missing `expo-asset` or `expo-file-system` packages (or that the dev client wasn't rebuilt after adding them).

### Key constants

`components/constatnts.ts` (note: intentional typo in filename) defines session behavior:
- `MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES = 10` — sessions shorter than this use gong only
- `DELAY_BEFORE_START_SESSION_SECONDS = 2` — timer starts after this delay
- Recitation source constants used in both `SettingsContext` and `AudioContext`
- Language constants (`RU_LANGUAGE`, `EN_LANGUAGE`)

### Styling

`components/styles/global.ts` exports `createGlobalStyles(palette)`, a legacy static `globalStyles`, and font size constants (`FONT_SIZE_DEFAULT = 16`, `FONT_SIZE_HEADER = 24`). User-adjustable font size is stored in `AppSettings.fontSize` and applied per-screen (notably in `MaterialScreen`).

### Path alias

`@/` maps to the project root (configured in `tsconfig.json`).

### iOS vs Android differences

Several components branch on `Platform.OS === 'ios'` for header visibility and `SafeAreaView` handling. The root layout wraps in `SafeAreaView` only on Android. About sub-screens use native iOS headers (configured per `<Stack.Screen>`) but render their own `<TitleText/>` on Android.
