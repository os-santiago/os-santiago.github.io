# Bug Report: GitHub avatars not loading on Members page

**Issue**: Avatars render as empty circles with border only, no image visible.

## Root Cause Analysis

In `app/[locale]/members/page.tsx` lines 40-47:

- Avatar URLs use `https://avatars.githubusercontent.com/u/{id}?v=4` (legacy format)
- GitHub deprecated `?v=4` parameter; modern format is `https://avatars.githubusercontent.com/u/{id}` or `https://github.com/{username}.png`
- No `onError` fallback for failed loads
- `loading="lazy"` may cause issues with external images
- No `crossOrigin` attribute for CORS

## Checklist (max 10 items)

- [ ] Update avatar URL format to modern GitHub format (remove `?v=4`)
- [ ] Add `onError` handler with fallback to `https://github.com/{username}.png`
- [ ] Add `crossOrigin="anonymous"` for CORS
- [ ] Remove `loading="lazy"` or change to `loading="eager"` for above-fold avatars
- [ ] Add `onLoad` handler to remove fallback state
- [ ] [opt] Preload first 4 avatars for faster render
- [ ] [opt] Add skeleton/placeholder while loading

## Solución viable

**Recomendación**: Cambiar `avatarUrl` en `data/members.ts` al formato moderno `https://avatars.githubusercontent.com/u/{id}` y agregar `onError` fallback en el componente a `https://github.com/{github}.png`. Es el cambio de menor esfuerzo/impacto: 1 línea en datos + 3 líneas en componente, elimina completamente el bug sin dependencias externas.
