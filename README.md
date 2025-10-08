# Focus Check-in

A simple Obsidian plugin that helps you maintain focus by sending periodic reminders to check in on what you're working on. Perfect for time-tracking, productivity logging, and staying mindful of your work.

## Features

- 🔔 **System notifications** that appear even when Obsidian is in the background
- ⏰ **Customizable intervals** - Set check-ins from 1 minute to hours
- 📢 **Pre-alerts** - Get a warning before the main check-in notification
- 📝 **Optional daily note opening** - Choose whether to open your daily note when it's time to log
- 🎯 **Status bar indicator** - See at a glance if focus check-ins are active
- ⚙️ **Easy controls** - Start/stop with a ribbon icon or keyboard commands

## How It Works

1. Enable the plugin and click the clock icon in the ribbon (or use the command palette)
2. The plugin will send you periodic reminders at your chosen interval
3. When a check-in notification appears, your daily note opens automatically
4. Log what you're working on, then get back to it!

## Installation

### From Obsidian Community Plugins (Recommended)

1. Open Settings → Community plugins
2. Browse community plugins and search for "Focus Check-in"
3. Install and enable the plugin

### Manual Installation

1. Download the latest release (`main.js`, `manifest.json`, `styles.css`)
2. Create a folder `<vault>/.obsidian/plugins/focus-checkin/`
3. Copy the downloaded files into this folder
4. Reload Obsidian and enable the plugin in Settings → Community plugins

## Configuration

Go to **Settings → Focus Check-in** to configure:

- **Check-in interval** - How often to remind you (default: 30 minutes)
- **Pre-alert time** - Warning notification before check-in (default: 30 seconds, set to 0 to disable)
- **Daily notes path** - Where your daily notes are stored (default: `Daily Notes`)
- **Auto-open daily note** - Toggle whether today's note opens automatically (default: off)

## Usage

### Starting Focus Check-ins

- Click the **clock icon** in the left ribbon
- Or use Command Palette: "Start focus check-in"
- Or use Command Palette: "Toggle focus check-in"

### Stopping Focus Check-ins

- Click the **clock icon** again
- Or use Command Palette: "Stop focus check-in"
- Or use Command Palette: "Toggle focus check-in"

### Status

Check the status bar at the bottom of Obsidian:
- 🎯 **Focus: ON (30m)** - Check-ins are active
- 🎯 **Focus: OFF** - Check-ins are stopped

## Tips

- **Start with short intervals** - Try 15-30 minutes and adjust based on your workflow
- **Test it first** - Set a 1-minute interval to make sure notifications work for you
- **Create daily notes ahead of time** - The plugin will warn you if it can't find today's note
- **Use pre-alerts** - The 30-second warning helps you finish your current thought before logging

## Compatibility

- **Desktop**: ✅ macOS, Windows, Linux
- **Mobile**: ✅ iOS, Android
- **Minimum Obsidian version**: 0.15.0

## Privacy

This plugin:
- ✅ Runs entirely locally on your device
- ✅ Does not collect any data
- ✅ Does not make any network requests
- ✅ Only accesses your daily notes folder as configured

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/obsidian-focus-checkin.git
cd obsidian-focus-checkin

# Install dependencies
pnpm install

# Build the plugin
pnpm run build

# Or run in development mode with auto-reload
pnpm run dev
```

### Project Structure

```
focus-checkin/
├── main.ts           # Plugin entry point and main logic
├── manifest.json     # Plugin metadata
├── package.json      # Node.js dependencies
├── tsconfig.json     # TypeScript configuration
├── esbuild.config.mjs # Build configuration
└── README.md         # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have suggestions:
- [Open an issue on GitHub](https://github.com/sanjeed5/obsidian-focus-checkin/issues)
- Check existing issues for solutions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Pomodoro Technique and mindful work practices
- Built with the [Obsidian API](https://docs.obsidian.md/)
- Thanks to the Obsidian community for feedback and support

---

Made with ❤️ for the Obsidian community

