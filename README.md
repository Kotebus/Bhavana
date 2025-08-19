# About app

This is a meditation app from the [Chittaviveka Monastery (Sri Lanka)](http://samatha-vipassana.com/en).

The purpose of this application is to provide an introduction to meditation in the context of orthodox Buddhism of the
Theravada tradition, as part of religious practice.

The Pali word "bhāvanā" means "development of the mind" or "purification of the mind". It is this term that is most
often translated as "meditation".

All information in this application is based on the Tipitaka (Pali Canon) and the sermons of [Venerable Rakwane Gnanaseeha](https://samatha-vipassana.com/en/teacher/), the abbot of the Chittaviveka Buddhist Forest Monastery (Sri Lanka), and is available on the monastery's (
official website)[http://samatha-vipassana.com/en], as well as in the book "[Bhāvanā - The Art of the Mind](http://samatha-vipassana.com/en/books)".

FThe application contains a timer for meditation with the ability to listen to recitations, as well as information for
studying the Word of Buddha, dedicated to both samatha and vipassana in particular, and the practice of Theravada
Buddhism in general.

# Структура приложения

Главная страница приложения - `/components/screens/HomeScreen.tsx`.

Страница медитационной сессии с таймером - `components/screens/MeditationScreen.tsx`.

Страница настроек - `components/screens/SettingsScreen.tsx`.

Страница проповедей и славословий - `components/screens/MaterialsListScreen.tsx`. За это отвечает один контрол, 
вызываемый с `HomeScreen` с разным параметром списка материалов (`materialsList`).

Страница отображения конкретного материала (промоведи или славословия) - `components/screens/MaterialScreen.tsx`. Все 
материалы приложения (файлы формата `.md`) находятся в директории `components/screens/materials/content`).
Материалы рендерятся из файлов формата `.md` с помощью `react-native-markdown-display`.

Страница информации о проекте - `components/screens/AboutProjectScreen.tsx`, содержит набор кнопок, навигирующих на
экраны разных секций информации о приложении (о самом приложении, об учителе, о проповедях, о монастыре, доп. ссылки).
Все эти экраны расположены в папке `components/screens/about`.

## Настройки приложения

Страница настроек - `components/screens/SettingsScreen.tsx`.

Настройки приложения сохраняются на девайсе пользователя через `@react-native-async-storage/async-storage`, за это 
отвечают `components/storage/storage.ts` и контекст `components/contexts/SettingsContext.tsx`.
При изменении контракта настроек (`AppSettings`) может возникнуть баг на iOS, связанный с конфликтом уже записанных в памяти настроек: 
они перезаписывают обновлённые настройки. Чтобы этого избежать необходимо обновлять название ключа `SETTINGS_KEY` в 
`storage.ts`.

Есть возможность: 
* переключать язык приложения (русский/английский); 
* глобально выключать звук приложения;
* выключать звук славословий (тогда в начале и конце сессии медитации будет играть только звук гонга);
* выбирать какое аудио славословий будет проигрываться (кто читает славословия: бхиккху Ракване Ньянасиха или бхиккху Руссиява Асанкхата).

Аудиофайлы славословий уже содержат в себе звук гонга, поэтому отдельно проигрывать звуковой файл с записью гонга не надо.

Также есть возможность выбирать размер шрифта (`TextSizeControl`) для отображения всех материалов приложения (файлы 
формата `.md`, в директории `components/screens/materials/content`), но эта настройка находится не на экране настроек, 
а непосредственно на экране отображения материала (`components/screens/MaterialScreen.tsx`). Это сделано для того, чтобы
пользователь мог сразу увидеть результат изменения размера шрифта непосредственно на тексте, который он собирается 
читать, и мог настроить это под себя при каждом чтении, не покидая экран материала.

# Release new version

Build and submit iOS production

```shell
eas build --platform ios --profile production
eas submit --platform ios
```

Build Android production

```shell
eas build -p android --profile production
```

Create new release in [Google Play Console](https://play.google.com/console/developers/app/tracks/production)