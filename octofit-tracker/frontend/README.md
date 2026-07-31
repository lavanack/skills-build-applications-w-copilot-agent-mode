# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend calls the backend at:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api` so local development avoids `https://undefined-8000...` URLs.
