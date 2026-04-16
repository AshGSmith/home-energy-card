# Power Flow Card Modern

A modern [Home Assistant](https://www.home-assistant.io/) Lovelace custom card for visualising home energy flow — solar, grid, battery, and home consumption at a glance.

## Installation

### HACS (recommended)

1. Open HACS in your Home Assistant instance.
2. Go to **Frontend** → click the menu (⋮) → **Custom repositories**.
3. Add `https://github.com/AshGSmith/home-energy-card` with category **Dashboard**.
4. Search for *Power Flow Card Modern* and install.
5. Add the resource to your Lovelace dashboard or reload the browser.

### Manual

1. Download `power-flow-card-modern.js` from the [latest release](https://github.com/AshGSmith/home-energy-card/releases/latest).
2. Copy it to `<config>/www/`.
3. Add it as a Lovelace resource: `/local/power-flow-card-modern.js`.

## Usage

```yaml
type: custom:home-energy-card
title: Home Energy
```

## Development

```bash
npm install
npm run build   # outputs to dist/
```

## License

MIT
