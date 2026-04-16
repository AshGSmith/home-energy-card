# Home Energy Card

A Home Assistant Lovelace custom card for home energy monitoring.

## Installation

### HACS

1. Add this repository to HACS as a custom repository (Lovelace category).
2. Install **Home Energy Card** from HACS.
3. Add the resource in your Lovelace dashboard or let HACS manage it automatically.

### Manual

1. Copy `dist/home-energy-card.js` to `<config>/www/home-energy-card.js`.
2. Add a Lovelace resource:
   ```yaml
   url: /local/home-energy-card.js
   type: module
   ```

## Usage

```yaml
type: custom:home-energy-card
title: My Energy
```

## Development

```bash
npm install
npm run build   # one-off build → dist/home-energy-card.js
npm run dev     # watch mode
```
