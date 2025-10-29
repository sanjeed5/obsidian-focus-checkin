# Focus Check-in

A simple Obsidian plugin that helps you maintain focus by sending periodic reminders to check in on what you're working on. Perfect for time-tracking, productivity logging, and staying mindful of your work.

## Features

- 🔔 **System notifications** that appear even when Obsidian is in the background
- ⏰ **Customizable intervals** - Set check-ins from 1 minute to hours
- 📢 **Pre-alerts** - Get a warning before the main check-in notification
- 📝 **Optional daily note opening** - Choose whether to open your daily note when it's time to log
- 🎯 **Live countdown timer** - Status bar shows real-time countdown to next check-in
- 🔄 **Auto-start** - Automatically resumes check-ins when you reopen Obsidian (if previously enabled)
- ⚙️ **Easy controls** - Start/stop with a ribbon icon, keyboard commands, or settings

## How It Works

1. Enable the plugin and click the clock icon in the ribbon (or use the command palette)
2. The plugin will send you periodic reminders at your chosen interval
3. When a check-in notification appears:
   - System notifications appear even when Obsidian is in the background
   - Your daily note opens automatically (if enabled in settings)
   - The status bar shows a live countdown to the next check-in
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
  - **Note**: Currently expects notes organized as `Daily Notes/YYYY/YYYY-MM-DD.md` (e.g., `Daily Notes/2025/2025-10-08.md`)
  - Customizable date format coming in a future update (see Roadmap below)
- **Auto-open daily note** - Toggle whether today's note opens automatically (default: off)
- **Focus check-in status** - Start/stop button to control check-ins directly from settings

## Usage

### Starting Focus Check-ins

- Click the **clock icon** in the left ribbon
- Or use Command Palette: "Start focus check-in"
- Or use Command Palette: "Toggle focus check-in"
- Or use the **Start** button in Settings → Focus Check-in

### Stopping Focus Check-ins

- Click the **clock icon** again
- Or use Command Palette: "Stop focus check-in"
- Or use Command Palette: "Toggle focus check-in"
- Or use the **Stop** button in Settings → Focus Check-in

### Status

Check the status bar at the bottom of Obsidian:
- 🎯 **Focus: 29m 45s** - Live countdown to next check-in (updates every second)
- 🎯 **Focus: OFF** - Check-ins are stopped

## Tips

- **Start with short intervals** - Try 15-30 minutes and adjust based on your workflow
- **Test it first** - Set a 1-minute interval to verify notifications work on your system
- **Organize daily notes properly** - Keep notes in `Daily Notes/YYYY/YYYY-MM-DD.md` format for the plugin to find them
- **Use pre-alerts** - The 30-second warning helps you finish your current thought before logging
- **Watch the countdown** - The status bar updates every second to show exactly when your next check-in is coming

## Compatibility

- **Desktop**: ✅ macOS, Windows, Linux
- **Mobile**: ❌ Not supported (plugin uses desktop-only features)

## Privacy

This plugin:
- ✅ Runs entirely locally on your device
- ✅ Does not collect any data
- ✅ Does not make any network requests
- ✅ Only accesses your daily notes folder as configured

## Roadmap

Features planned for future releases:

- **Customizable daily note format** - Configure your own date format and folder structure for daily notes (currently expects `Daily Notes/YYYY/YYYY-MM-DD.md`)
- **Flexible note templates** - Support for different daily note organizational patterns
- **Custom notification sounds** - Choose your own notification sound
- **Check-in statistics** - Track your focus check-in completion rate over time

Have a feature request? [Open an issue](https://github.com/sanjeed5/obsidian-focus-checkin/issues) and let us know!

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
├── styles.css        # Plugin styles
├── package.json      # Node.js dependencies
├── tsconfig.json     # TypeScript configuration
├── esbuild.config.mjs # Build configuration
├── versions.json     # Version history
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

