# Simple Browser

A minimal Electron-based browser scaffold.

## Features
- Basic toolbar (back/forward/reload/go)
- Uses Electron webview for page rendering
- Minimal, easy to extend

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm start
   ```

## Packaging
This scaffold includes an example packaging script using electron-packager. Adjust platform/arch as needed.

## Security notes
- This is a demo. Do not load untrusted content with nodeIntegration enabled.
- The preload script uses contextIsolation and exposes a minimal API.

## License
MIT
