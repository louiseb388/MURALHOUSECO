# Mural House Co.

Marketing website for Mural House Co., a hand-painted wall mural business covering Surrey & West Sussex. Four pages (Landing, Process, FAQ, Contact) plus an instant-quote wizard that prices a mural live from wall dimensions.

Built with React, TypeScript, Vite and React Router.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # oxlint
npm run preview  # preview the production build locally
```

## Deployment

`npm run build` outputs a static site to `dist/`, deployable to any static host. Since this is a client-side-routed single-page app, the host needs to serve `index.html` for unknown paths (e.g. `/process`) rather than 404ing:

- **Netlify**: `public/_redirects` is already set up.
- **Vercel**: `vercel.json` is already set up.
- Other static hosts: configure an equivalent SPA fallback to `index.html`.

## Notes

- The wordmark uses Helvetica Neue/Arial (system fonts, no licensing to track). The hero photos (`src/assets/`) are the client-supplied placeholders from the design handoff — swap in final professional photography before production.
- The phone number in the header (`01234 567 890`) is a placeholder — replace with the real number.
