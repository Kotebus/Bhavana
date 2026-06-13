# About app

This is a meditation app from the [Chittaviveka Monastery (Sri Lanka)](http://samatha-vipassana.com/en).

The purpose of this application is to provide an introduction to meditation in the context of orthodox Buddhism of the
Theravada tradition, as part of religious practice.

This app available on [Google Play](https://play.google.com/store/apps/details?id=com.kotebus.bhavana) and
[AppStore](https://apps.apple.com/app/bhavana-art-of-the-mind/id6751196206).

The Pali word "bhāvanā" means "development of the mind" or "purification of the mind". It is this term that is most
often translated as "meditation".

All information in this application is based on the Tipitaka (Pali Canon) and the sermons of [Venerable Rakwane
Gnanaseeha](https://samatha-vipassana.com/en/teacher/), the abbot of the Chittaviveka Buddhist Forest Monastery (Sri
Lanka), and is available on the monastery's [official website](http://samatha-vipassana.com/en), as well as in the book
"[Bhāvanā - The Art of the Mind](http://samatha-vipassana.com/en/books)".

The application contains a timer for meditation with the ability to listen to recitations, as well as information for
studying the Word of Buddha, dedicated to both samatha and vipassana in particular, and the practice of Theravada
Buddhism in general.

# Application Structure

Routing is file-based, powered by **`expo-router`**. Each entry under `app/` is a thin re-export from the corresponding
screen implementation in `components/screens/`:

| Route                      | File in `app/`              | Implementation                                              |
|---------------------------|-----------------------------|-------------------------------------------------------------|
| `/`                        | `app/index.tsx`             | `components/screens/HomeScreen.tsx`                         |
| `/meditation?h=&m=`        | `app/meditation.tsx`        | `components/screens/MeditationScreen.tsx`                   |
| `/settings`                | `app/settings.tsx`          | `components/screens/SettingsScreen.tsx`                     |
| `/materials?type=…`        | `app/materials.tsx`         | `components/screens/MaterialsListScreen.tsx`                |
| `/material/:key`           | `app/material/[key].tsx`    | `components/screens/MaterialScreen.tsx`                     |
| `/about-project`           | `app/about-project.tsx`     | `components/screens/AboutProjectScreen.tsx`                 |
| `/about`                   | `app/about/index.tsx`       | `components/screens/about/AboutScreen.tsx`                  |
| `/about/teacher`           | `app/about/teacher.tsx`     | `components/screens/about/AboutTeacherScreen.tsx`           |
| `/about/sermons`           | `app/about/sermons.tsx`     | `components/screens/about/AboutSermonsScreen.tsx`           |
| `/about/monastery`         | `app/about/monastery.tsx`   | `components/screens/about/AboutMonasteryScreen.tsx`         |
| `/about/links`             | `app/about/links.tsx`       | `components/screens/about/LinksListScreen.tsx`              |

The root `app/_layout.tsx` wires up the global providers (Audio, Settings, i18n) and configures a single themed
`<Stack/>` for all routes. Screens read URL parameters with `useLocalSearchParams()` and navigate with `router.push(...)` /
`router.back()` from `expo-router`.

The **individual material screen** renders `.md` files from `components/screens/materials/content` using
[`react-native-nitro-markdown`](https://www.npmjs.com/package/react-native-nitro-markdown) — a Nitro-modules-powered
native parser.

The **About Project screen** is the navigation hub for `About app`, `About teacher`, `About sermons`,
`About monastery`, and `Additional links`. All of those implementations live in `components/screens/about/`.

## Application Contexts

Application contexts are located in the `components/contexts` folder.

### AudioContext

Loads audio files using `expo-audio`.
We need to do this via a context in order to avoid race conditions.
At the start of a meditation session (in `components/screens/MeditationScreen.tsx`), audio must be played.
If this is not handled through a context, the audio may not always be loaded and processed in time.

### SettingsContext

This is where we load and update the application settings.
The default settings are stored in the `DEFAULT_SETTINGS` constant.

Settings are managed via `AsyncStorage` (`@react-native-async-storage/async-storage`).
The actual interaction with `AsyncStorage` takes place in `components/storage/storage.ts`.

On first launch, the provider seeds the initial theme from `Appearance.getColorScheme()` (the device's system color
scheme). After that, the user's explicit choice in the UI is persisted and the system value is no longer tracked.

## Application Settings

Settings page: `components/screens/SettingsScreen.tsx`.

Application settings are stored locally on the user's device using `@react-native-async-storage/async-storage`.
This functionality is handled by `components/storage/storage.ts` and the context `components/contexts/SettingsContext.tsx`.

⚠️ **Important:** When changing the settings contract (`AppSettings`), a bug may occur on iOS due to conflicts with already saved settings: previously stored values can override the updated settings.
To prevent this, you must update the key name `SETTINGS_KEY` in `storage.ts`.

### Available Options
* Switch the **application theme** (light / dark) — also exposed as an icon on the home screen
* Switch the application language (Russian / English)
* Globally disable all application sounds
* Disable recitations (in this case, only the gong will be played at the beginning and end of a meditation session)
* Choose which recitation audio is used (who is chanting: Bhikkhu Rakwane Gnanaseeha or Bhikkhu Russiava Asankhata)

Recitation audio files already include the gong sound, so there is no need to play a separate gong audio file.

Additionally, users can adjust the **text size** (`TextSizeControl`) for all application materials (Markdown `.md` files located in `components/screens/materials/content`).
This setting is **not** on the Settings screen but directly on the material display screen: `components/screens/MaterialScreen.tsx`.
This design allows the user to immediately see the effect of changing the text size on the material they are reading, and fine-tune it without leaving the screen.

---

## Theming

The application supports light and dark themes.

- Theme palettes live in `components/styles/theme.ts` (`lightTheme`, `darkTheme`, exported under `palettes`). Adding a
  new themable color means adding a key to `ThemePalette` and providing a value in each palette.
- `components/styles/global.ts` exposes a `createGlobalStyles(palette)` factory plus a legacy `globalStyles` (= light)
  export kept for any unconverted call sites.
- `components/styles/useThemedStyles.ts` exposes the consumer hooks:
    - `useThemePalette()` — returns the active `ThemePalette`.
    - `useGlobalStyles()` — returns memoized themed global styles built from the active palette.
- The toggle component itself is `components/common/ThemeToggle.tsx`. It is shown in the top bar on `HomeScreen` and as
  a row on `SettingsScreen`.
- The Markdown engine in `MaterialScreen.tsx` is themed via `react-native-nitro-markdown`'s `theme.colors` (text,
  heading, blockquote bar, surface, code, link, etc.) — all driven from the active `palette`.

Per-screen local stylesheets that depend on theme colors follow the same pattern: a `makeStyles(palette)` factory
function plus `React.useMemo(() => makeStyles(palette), [palette])` inside the component.

## Localization

Localization is implemented using `react-i18next`.
All translations are located in: `components/i18n/index.ts`.

## Vector icons

The app uses the modular [`@react-native-vector-icons`](https://github.com/react-native-vector-icons/react-native-vector-icons)
packages (`@react-native-vector-icons/ionicons`, `@react-native-vector-icons/octicons`,
`@react-native-vector-icons/fontawesome6`). These integrate with `expo-font` directly and avoid the broken legacy
`expo-asset → AppDirectories` chain that affected `@expo/vector-icons` on this project's setup.

## Screens routing

Routing is file-based via `expo-router`. To add a new screen:

1. Create the implementation under `components/screens/…`.
2. Add a route file under `app/` that re-exports it:
   ```tsx
   export {default} from '@/components/screens/MyNewScreen';
   ```
   For dynamic params use a bracketed file name (`app/section/[id].tsx`) and read params with
   `useLocalSearchParams()`.
3. If you need a special header / no header / custom title, add a corresponding `<Stack.Screen name="…" options={…}/>`
   inside `RootStack` in `app/_layout.tsx`.
4. Navigate to it from anywhere with `router.push('/your-route')` (or `router.push({pathname, params})`).

## Adding new material (aka sermon or anything rendered from markdown - .md)

Add it to localisation file (`materialsEn` and `materialsRu` accordingly): `components/i18n/index.ts`.

After adding new localisation keys it will be available via `MaterialKey` in routing list, so you should add it there as
well: `components/screens/materials/SermonsRoutingList.ts`.

Then you should support it in `components/screens/MaterialScreen.tsx`.

Add new material data to `materialsListMap` in `MaterialScreen.tsx`.

The format is following: MaterialKey, require with path to russian md file, require with path to english md file.

Example:
```typescript
    'SantaSukha': [require('@/components/screens/materials/content/sermons/SantaSukhaRu.md'), require('@/components/screens/materials/content/sermons/SantaSukhaEn.md')],
```

If you have images in new materials you should support it in `imgSources` in `MaterialScreen.tsx`. Image lookup happens
inside the `renderers.image` callback passed to `<Markdown />` — the markdown `![](src-without-ext)` is matched against
the `imgSources` keys.

If it's by Venerable Rakwane Gnanaseeka then add key to `SERMONS_MATERIALS_LIST`, based on that we render his name in
the beginning of the page.

# Release new version

### Versioning
First you need to up version in version `app.json` and `package.json`. This version should match the new version in
appstoreconnect.

For example: `"version": "1.2.0"` (`app.json` and `package.json`) and `iOS App Version 1.1.0 - Waiting for review` (in
appstoreconnect).

## Scripts

### Build and submit iOS production

```shell
eas build --platform ios --profile production
eas submit --platform ios
```

### Build Android production

```shell
eas build -p android --profile production
```

Then create new release in [Google Play Console](https://play.google.com/console/developers/app/tracks/production) and
submit `aab` file there.

## Local build

Same could be [done locally](https://docs.expo.dev/guides/local-app-production/).

For android don't forget to delete `signingConfig signingConfigs.debug` line from `android/app/build.gradle` in
`android/app/build.gradle`: there should be only `signingConfig signingConfigs.release`.

Also for android `versionCode` should be incremented in `android/app/build.gradle`.

### Local dev build prerequisites (macOS)

Android Gradle build needs Java 17 and a valid Android SDK path. Set both for the current shell (or persist in
`~/.zshrc`):

```shell
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then run the standard Expo dev-build commands:

```shell
npx expo prebuild --clean     # regenerate android/ and ios/ after native-module changes
npx expo run:android --device  # build & install on the connected USB device
```

Expo Go is **not** supported — the project ships several native modules (`react-native-nitro-modules`,
`react-native-nitro-markdown`, `expo-audio`, modular vector icons, etc.). Always use a dev build.

# Possible problems

### Cannot find native module 'ExpoLocalization' occurs on simulator
If on Android simulator you've got `Cannot find native module 'ExpoLocalization'` then build solution with
```shell
npx expo run:android
```

### No new fields in AppSettings on iOS after changing the contract

When changing the settings contract (`AppSettings`), a bug may occur on iOS due to conflicts with already saved settings: previously stored values can override the updated settings.
To prevent this, you must update the key name `SETTINGS_KEY` in `storage.ts`.

### Vector-icons render as invisible / empty glyphs

Make sure `expo-asset` and `expo-file-system` are installed and that the dev client was rebuilt after adding them.
`expo-font` resolves its font assets through `expo-asset`, which in turn needs the `AppDirectories` interface from
`expo-file-system`'s native side. Missing either of those causes `Font.loadAsync` to fail silently and every icon
glyph to render as empty.

### "Unmatched route" on app start

This used to appear under the old setup that mixed `@react-navigation/native-stack` with `expo-router`. The project
now uses `expo-router`'s file-based routing exclusively — see [Screens routing](#screens-routing).
