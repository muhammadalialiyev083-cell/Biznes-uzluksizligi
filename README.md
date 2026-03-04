# Biznes-uzluksizligi

Vite + React loyihasi Netlify orqali deploy qilishga tayyorlandi.

## Local ishga tushirish

```bash
npm install
npm run dev
```

## Build tekshiruvi

```bash
npm run build
```

## Netlify sozlama

Repo ichida `netlify.toml` mavjud:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* /index.html 200`

Netlify Dashboard'da faqat repository'ni ulash yetarli.
