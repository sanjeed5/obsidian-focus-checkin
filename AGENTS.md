# Agent Instructions

## Deploy & Test

After every build, copy the plugin files to the local Obsidian vault and reload:

```bash
source .env
cp main.js manifest.json styles.css "$OBSIDIAN_VAULT_PLUGIN_PATH/"
obsidian vault=jarvis-obsidianvault eval code="app.plugins.disablePlugin('focus-checkin').then(() => app.plugins.enablePlugin('focus-checkin'))"
```

The vault path is stored in `.env` (gitignored). Always test changes by deploying to the local vault before considering them done.
