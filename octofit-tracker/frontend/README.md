# OctoFit Tracker frontend

This React 19 presentation tier uses Vite, React Router, and Bootstrap.

## Configure the API URL

The frontend reads `VITE_CODESPACE_NAME` from Vite's environment:

- In GitHub Codespaces, define `VITE_CODESPACE_NAME` as the Codespace name so
  requests use `https://<codespace-name>-8000.app.github.dev`.
- For local development outside Codespaces, leave it unset; requests use
  `http://localhost:8000`.

For local configuration, create `octofit-tracker/frontend/.env.local` with:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart the Vite development server after changing environment variables. Vite
exposes these values to browser code, so only put non-secret configuration in
`VITE_*` variables.

Run the frontend from the repository root with:

```bash
npm run dev --prefix octofit-tracker/frontend
```
