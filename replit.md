# Inova — Login + Dashboard App

## Overview

A polished React Native + Expo app demonstrating the 60/30/10 UI color rule with a Login screen and Dashboard screen.

## Architecture

- **Frontend**: Expo Router (file-based routing), React Native
- **Backend**: Express.js (port 5000) — serves landing page and static Expo build
- **Dev server**: Metro Bundler (port 8081)
- **Auth**: Dummy frontend-only auth (test@mail.com / 1234)

## Color Theme (60/30/10 Rule)

- 60% — `#F6F7FB` base/background
- 30% — `#FFFFFF` cards/surfaces
- 10% — `#4F46E5` accent (indigo) — only on buttons, active borders, icons

## File Structure

```
app/
  _layout.tsx        # Root Stack layout, font loading, providers
  index.tsx          # Login screen
  dashboard.tsx      # Dashboard screen
components/
  Card.tsx           # Reusable white card with shadow
  AppInput.tsx       # Labeled input with focus/error states + show/hide toggle
  AppButton.tsx      # Animated button with loading state (primary/ghost variants)
  ErrorBoundary.tsx  # Error boundary
  ErrorFallback.tsx  # Error fallback UI
constants/
  colors.ts          # COLORS object with base/surface/accent/text/muted/border/danger
server/
  index.ts           # Express server setup
  routes.ts          # API routes
```

## Workflows

- `Start Backend` — `npm run server:dev` (port 5000)
- `Start Frontend` — `npm run expo:dev` (port 8081)

## Key Features

- Email format validation (live, on blur)
- Password min 4 char validation
- Show/hide password toggle
- Login button disabled until valid
- 700ms fake loading state with spinner
- Haptic feedback on buttons
- Animated press scale on button
- Dashboard: profile card, details card, action rows, logout
- Proper safe area insets on all screens
- Web platform insets handled
