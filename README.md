# utily.tools

Production startup:

- Recommended Azure WebApp "Startup Command": `npm start`
- Direct SSR startup command: `node ./dist/server/server.mjs`

The production build writes the Angular browser output to `dist/browser` and the SSR server to
`dist/server/server.mjs`. A compatibility alias is also generated at
`dist/ferramentas/server/server.mjs` for older Azure startup commands. The GitHub Actions deploy
artifact includes `package.json`, so Azure can run `npm start` without requiring the source tree.
