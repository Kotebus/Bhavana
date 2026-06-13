# Dark Theme — Execution Progress

Source plan: `~/.claude/plans/task-task-description-shimmying-naur.md`

Update protocol: after finishing each step, tick its checkbox here,
write the commit hash + ISO date, then commit both code and this file together.

## Current State
- **Last completed step**: Step 9 — AppNavigator: themed contentStyle and iOS header
- **Last commit**: <this commit>
- **Next step**: Step 10 — Sweep: convert screens/components to useGlobalStyles
- **Blockers / deviations**:
  - Pre-existing TS errors in `MaterialScreen.tsx` (line 126, `textgroup` on ASTNode[]) and `MarkdownLoader.ts` (missing `expo-asset` types). Not introduced by this work; will be addressed only if blocking later steps.
  - **Step 2 deviation**: hooks `useGlobalStyles` and `useThemePalette` moved out of `global.ts` into a new file `components/styles/useThemedStyles.ts`. Reason: `global.ts` is imported by `SettingsContext.tsx` (for `FONT_SIZE_DEFAULT`), so importing `useSettings` back into `global.ts` would create a circular import (`global` → `SettingsContext` → `storage` → `theme`, and back via `FONT_SIZE_DEFAULT`) — Metro/CommonJS would return undefined for `FONT_SIZE_DEFAULT` at the moment `DEFAULT_SETTINGS` is initialized. Subsequent steps must import hooks from `@/components/styles/useThemedStyles` (not `global`).

## Step Checklist
- [x] Step 0  — Create progress file (this file)
- [x] Step 1  — Theme module + AppSettings field
- [x] Step 2  — Refactor global styles to factory + hooks
- [x] Step 3  — SettingsContext: system detection, migration, toggleTheme
- [x] Step 4  — ThemeToggle component
- [x] Step 5  — i18n key for "Theme"
- [x] Step 6  — LotusAnimated: image swap by theme
- [x] Step 7  — HomeScreen: integrate ThemeToggle
- [x] Step 8  — SettingsScreen: integrate ThemeToggle + theme local styles
- [x] Step 9  — AppNavigator: themed contentStyle and iOS header
- [ ] Step 10 — Sweep: convert screens/components to useGlobalStyles
- [ ] Step 11 — MaterialScreen: theme markdown styles + icon
- [ ] Step 12 — Sweep: replace hardcoded color literals
- [ ] Step 13 — Manual verification

## Step Log
<!-- One entry per completed step, newest at the bottom -->
<!-- Format:
### Step N — <title>
- Commit: <hash>
- Date: <ISO-8601>
- Notes: <anything that deviated from the plan, follow-ups, surprises>
-->

### Step 0 — Create progress file
- Commit: 62e18bf
- Date: 2026-06-13
- Notes: Initial scaffold of the progress tracker. Plan file lives at `~/.claude/plans/task-task-description-shimmying-naur.md`.

### Step 1 — Theme module + AppSettings field
- Commit: f9f962c
- Date: 2026-06-13
- Notes: Created `components/styles/theme.ts` with `Theme` type, `ThemePalette` interface, `lightTheme`, `darkTheme`, and `palettes` map. Added optional `theme?: Theme` to `AppSettings` in `components/storage/storage.ts`. `tsc --noEmit` shows only pre-existing errors unrelated to this work.

### Step 2 — Refactor global styles to factory + hooks
- Commit: 85c499b
- Date: 2026-06-13
- Notes: `global.ts` now exports `createGlobalStyles(palette)` factory and a legacy `globalStyles` (= light) for unconverted consumers. Hooks `useGlobalStyles` and `useThemePalette` live in a separate file `components/styles/useThemedStyles.ts` to avoid a circular import via `SettingsContext` → `global` → `FONT_SIZE_DEFAULT`. From Step 7 onwards, screens import hooks from `useThemedStyles`, not `global`.

### Step 3 — SettingsContext: system detection, migration, toggleTheme
- Commit: d364940
- Date: 2026-06-13
- Notes: Provider now reads `Appearance.getColorScheme()` once at startup, exposes `theme` and `toggleTheme` on the context, and migrates previously-persisted settings without a `theme` field by stamping the current system value. Also simplified `useThemedStyles` to read `theme` directly from the context (no fallback needed).

### Step 4 — ThemeToggle component
- Commit: 24f392c
- Date: 2026-06-13
- Notes: **Deviation from spec**: the task example used `AntDesign name="sun"`, but @expo/vector-icons@14.1.0 does not include `sun` in the AntDesign glyph set (verified against `AntDesign.json`). Used `Octicons name="sun"` instead — same family as the dark-theme `Octicons name="moon"`, keeps the icon style consistent. Easy one-line change if a different family is preferred.

### Step 5 — i18n key for "Theme"
- Commit: f5cab2f
- Date: 2026-06-13
- Notes: Added `Theme` label key to both EN ('Theme') and RU ('Тема') translations. Placed next to `Sound`/`Language` keys for consistency.

### Step 6 — LotusAnimated: image swap by theme
- Commit: 27f42a5
- Date: 2026-06-13
- Notes: Both lotus assets `require()`'d at module top — Metro bundles both, only the active one decodes. `assets/images/lotus_dark.png` added to the tree in this commit. TS info-level diagnostic suggesting `require → import` ignored: it's the standard RN pattern for static assets.

### Step 7 — HomeScreen: integrate ThemeToggle
- Commit: 6ebefa5
- Date: 2026-06-13
- Notes: Top bar now starts with `ThemeToggle` (size 28), then sound, then language. Switched from static `globalStyles` import to `useGlobalStyles()` hook so the icon button background tracks the theme. Note: the local `styles.title` is unused (the JSX uses `globalStyles.title`); left untouched to keep this step minimal.

### Step 8 — SettingsScreen: integrate ThemeToggle + theme local styles
- Commit: 6fe9dc9
- Date: 2026-06-13
- Notes: Added Theme row as the first row (above Language). Local `StyleSheet.create` extracted to `makeStyles(palette)` and memoized; `#ccc`/`#777`/`white`/`black`/`lightgrey` replaced with palette values. Picker `dropdownIconColor` and `selectionColor` (Android) now use palette. Row/Label moved inside the component to close over the themed `styles`.

### Step 9 — AppNavigator: themed contentStyle and iOS header
- Commit: <this commit>
- Date: 2026-06-13
- Notes: Navigator now reads palette inside the component and sets `contentStyle.backgroundColor`, `headerStyle.backgroundColor`, and `headerTintColor`. This carries dark theming into the iOS native headers used by the About sub-screens.
