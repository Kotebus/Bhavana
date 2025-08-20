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

FThe application contains a timer for meditation with the ability to listen to recitations, as well as information for
studying the Word of Buddha, dedicated to both samatha and vipassana in particular, and the practice of Theravada
Buddhism in general.

# Application Structure

- The **main screen** of the app: `/components/screens/HomeScreen.tsx`.

- The **meditation session screen with a timer**: `components/screens/MeditationScreen.tsx`.

- The **settings screen**: `components/screens/SettingsScreen.tsx`.

- The **teachings and recitations screen**: `components/screens/MaterialsListScreen.tsx`.  
  This is handled by a single control, invoked from `HomeScreen` with a different `materialsList` parameter.

- The **individual material screen** (teaching or recitation): `components/screens/MaterialScreen.tsx`.  
  All materials (Markdown files, `.md`) are located in the directory:  
  `components/screens/materials/content`.  
  Materials are rendered from `.md` files using `react-native-markdown-display`.

- The **About Project screen**: `components/screens/AboutProjectScreen.tsx`.  
  It contains a set of buttons navigating to different sections of information about the app:
    - About the app
    - About the teacher
    - About the teachings
    - About the monastery
    - Additional links

  All these screens are located in the folder:  
  `components/screens/about`.

[//]: # (# Структура приложения)

[//]: # ()
[//]: # (Главная страница приложения - `/components/screens/HomeScreen.tsx`.)

[//]: # ()
[//]: # (Страница медитационной сессии с таймером - `components/screens/MeditationScreen.tsx`.)

[//]: # ()
[//]: # (Страница настроек - `components/screens/SettingsScreen.tsx`.)

[//]: # ()
[//]: # (Страница проповедей и славословий - `components/screens/MaterialsListScreen.tsx`. За это отвечает один контрол, )

[//]: # (вызываемый с `HomeScreen` с разным параметром списка материалов &#40;`materialsList`&#41;.)

[//]: # ()
[//]: # (Страница отображения конкретного материала &#40;промоведи или славословия&#41; - `components/screens/MaterialScreen.tsx`. Все )

[//]: # (материалы приложения &#40;файлы формата `.md`&#41; находятся в директории `components/screens/materials/content`&#41;.)

[//]: # (Материалы рендерятся из файлов формата `.md` с помощью `react-native-markdown-display`.)

[//]: # ()
[//]: # (Страница информации о проекте - `components/screens/AboutProjectScreen.tsx`, содержит набор кнопок, навигирующих на)

[//]: # (экраны разных секций информации о приложении &#40;о самом приложении, об учителе, о проповедях, о монастыре, доп. ссылки&#41;.)

[//]: # (Все эти экраны расположены в папке `components/screens/about`.)

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

[//]: # (## Контексты приложения)

[//]: # ()
[//]: # (Контексты приложения находятся в папке `components/contexts`.)

[//]: # ()
[//]: # (### AudioContext)

[//]: # ()
[//]: # (Загружает аудио файлы используя `expo-audio`. Нам нужно делать это с помощью контекста, чтобы избежать race conditions.)

[//]: # (В начале сессии медитации &#40;в `components/screens/MeditationScreen.tsx`&#41; нужно проигрывать аудио, и аудио не всегда )

[//]: # (успевает прогрузиться и обработаться, если делать это не через контекст.)

[//]: # ()
[//]: # (### SettingsContext)

[//]: # ()
[//]: # (Здесь мы загружаем и обновляем настройки приложения. Настройки по умолчанию записаны в константу `DEFAULT_SETTINGS`.)

[//]: # ()
[//]: # (Настройки работают через `AsyncStorage` &#40;`@react-native-async-storage/async-storage`&#41;, сама работа с `AsyncStorage`)

[//]: # (происходит в `components/storage/storage.ts`.)

## Application Settings

Settings page: `components/screens/SettingsScreen.tsx`.

Application settings are stored locally on the user’s device using `@react-native-async-storage/async-storage`.  
This functionality is handled by `components/storage/storage.ts` and the context `components/contexts/SettingsContext.tsx`.

⚠️ **Important:** When changing the settings contract (`AppSettings`), a bug may occur on iOS due to conflicts with already saved settings: previously stored values can override the updated settings.  
To prevent this, you must update the key name `SETTINGS_KEY` in `storage.ts`.

### Available Options
* Switch the application language (Russian / English)
* Globally disable all application sounds
* Disable recitations (in this case, only the gong will be played at the beginning and end of a meditation session)
* Choose which recitation audio is used (who is chanting: Bhikkhu Rakwane Gnanaseeha or Bhikkhu Russiava Asankhata)

Recitation audio files already include the gong sound, so there is no need to play a separate gong audio file.

Additionally, users can adjust the **text size** (`TextSizeControl`) for all application materials (Markdown `.md` files located in `components/screens/materials/content`).  
This setting is **not** on the Settings screen but directly on the material display screen: `components/screens/MaterialScreen.tsx`.  
This design allows the user to immediately see the effect of changing the text size on the material they are reading, and fine-tune it without leaving the screen.

---

## Localization

Localization is implemented using `react-i18next`.  
All translations are located in: `components/i18n/index.ts`.  

[//]: # (## Настройки приложения)

[//]: # ()
[//]: # (Страница настроек - `components/screens/SettingsScreen.tsx`.)

[//]: # ()
[//]: # (Настройки приложения сохраняются на девайсе пользователя через `@react-native-async-storage/async-storage`, за это )

[//]: # (отвечают `components/storage/storage.ts` и контекст `components/contexts/SettingsContext.tsx`.)

[//]: # (При изменении контракта настроек &#40;`AppSettings`&#41; может возникнуть баг на iOS, связанный с конфликтом уже записанных в памяти настроек: )

[//]: # (они перезаписывают обновлённые настройки. Чтобы этого избежать необходимо обновлять название ключа `SETTINGS_KEY` в )

[//]: # (`storage.ts`.)

[//]: # ()
[//]: # (Есть возможность: )

[//]: # (* переключать язык приложения &#40;русский/английский&#41;; )

[//]: # (* глобально выключать звук приложения;)

[//]: # (* выключать звук славословий &#40;тогда в начале и конце сессии медитации будет играть только звук гонга&#41;;)

[//]: # (* выбирать какое аудио славословий будет проигрываться &#40;кто читает славословия: бхиккху Ракване Ньянасиха или бхиккху Руссиява Асанкхата&#41;.)

[//]: # ()
[//]: # (Аудиофайлы славословий уже содержат в себе звук гонга, поэтому отдельно проигрывать звуковой файл с записью гонга не надо.)

[//]: # ()
[//]: # (Также есть возможность выбирать размер шрифта &#40;`TextSizeControl`&#41; для отображения всех материалов приложения &#40;файлы )

[//]: # (формата `.md`, в директории `components/screens/materials/content`&#41;, но эта настройка находится не на экране настроек, )

[//]: # (а непосредственно на экране отображения материала &#40;`components/screens/MaterialScreen.tsx`&#41;. Это сделано для того, чтобы)

[//]: # (пользователь мог сразу увидеть результат изменения размера шрифта непосредственно на тексте, который он собирается )

[//]: # (читать, и мог настроить это под себя при каждом чтении, не покидая экран материала.)

[//]: # ()
[//]: # (## Локализация)

[//]: # ()
[//]: # (Локализация сделана через `react-i18next`, все переводы находятся в `components/i18n/index.ts`.)

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

# Possible problems

### Cannot find native module 'ExpoLocalization' occurs on simulator
If on Android simulator you've got `Cannot find native module 'ExpoLocalization'` then build solution with
```shell
npx expo run:android
```

### No new fields in AppSettings on iOS after changing the contract

When changing the settings contract (`AppSettings`), a bug may occur on iOS due to conflicts with already saved settings: previously stored values can override the updated settings.  
To prevent this, you must update the key name `SETTINGS_KEY` in `storage.ts`.