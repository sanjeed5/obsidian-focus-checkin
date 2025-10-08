# Publishing Focus Check-in Plugin

This guide explains how to publish the Focus Check-in plugin to the Obsidian Community Plugins directory.

## Pre-Publishing Checklist

✅ All required files are present:
- `main.js` (compiled plugin code)
- `manifest.json` (plugin metadata)
- `styles.css` (CSS styles)
- `versions.json` (version compatibility map)
- `README.md` (documentation)
- `LICENSE` (MIT license)
- `.gitignore` (version control)

✅ Plugin is tested and working locally

## Step 1: Create GitHub Repository

1. **Create a new repository** on GitHub:
   - Name: `obsidian-focus-checkin` (or similar)
   - Description: "Periodic reminders to check in on your focus and log it in your daily note"
   - Public repository
   - Don't initialize with README (we already have one)

2. **Update URLs** in your files:
   - Edit `manifest.json`: Replace `https://github.com/yourusername` with your actual GitHub username
   - Edit `README.md`: Replace all instances of `yourusername` with your actual username
   - (Optional) Update `fundingUrl` in `manifest.json` with your actual donation link or remove it

3. **Push your code**:
   ```bash
   cd /Users/sanjeed/Documents/obsidian-vault/jarvis-obsidianvault/.obsidian/plugins/focus-checkin
   
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial release v1.0.0"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR-USERNAME/obsidian-focus-checkin.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

## Step 2: Create First Release

1. **On GitHub**, go to your repository
2. Click **Releases** → **Create a new release**
3. Fill in the release details:
   - **Tag**: `1.0.0` (must match version in manifest.json, no "v" prefix)
   - **Release title**: `1.0.0 - Initial Release`
   - **Description**: 
     ```markdown
     ## Features
     - System notifications that work outside Obsidian
     - Customizable check-in intervals
     - Pre-alert notifications
     - Auto-opens daily notes
     - Status bar indicator
     - Easy start/stop controls
     
     ## Installation
     Manual installation instructions in README.md
     ```

4. **Upload release assets**: Attach these three files as binary attachments:
   - `main.js`
   - `manifest.json`
   - `styles.css`

5. Click **Publish release**

## Step 3: Test the Release

Before submitting to Obsidian, test that users can install from your release:

1. Download the release assets from GitHub
2. Extract to a test vault: `<vault>/.obsidian/plugins/focus-checkin/`
3. Verify the plugin loads and works correctly

## Step 4: Submit to Obsidian Community Plugins

1. **Fork the obsidian-releases repository**:
   - Go to https://github.com/obsidianmd/obsidian-releases
   - Click **Fork**

2. **Edit `community-plugins.json`**:
   - In your fork, edit the file `community-plugins.json`
   - Add your plugin entry (alphabetically by ID):
     ```json
     {
       "id": "focus-checkin",
       "name": "Focus Check-in",
       "author": "Sanjeed",
       "description": "Periodic reminders to check in on your focus and log it in your daily note.",
       "repo": "YOUR-USERNAME/obsidian-focus-checkin"
     }
     ```

3. **Create Pull Request**:
   - Commit your changes
   - Create a pull request to the main repository
   - Fill out the PR template:
     - ✅ I have read the guidelines for plugin submission
     - ✅ My plugin follows the plugin guidelines
     - ✅ My plugin respects user privacy
     - ✅ I have tested my plugin
   - Add any relevant notes about your plugin

4. **Wait for review**:
   - The Obsidian team will review your submission
   - They may ask for changes or clarifications
   - Once approved, your plugin will appear in the Community Plugins list

## Step 5: Future Updates

When releasing updates:

1. Update `version` in `manifest.json` (e.g., `1.1.0`)
2. Update `versions.json` if minimum Obsidian version changed
3. Commit and push changes
4. Create a new GitHub release with the new version tag
5. Attach the updated `main.js`, `manifest.json`, and `styles.css`
6. Users will automatically be notified of the update in Obsidian

## Important Notes

- **Never change the plugin ID** (`focus-checkin`) after submission
- **Follow semantic versioning**: MAJOR.MINOR.PATCH
- **Test thoroughly** before each release
- **Keep README updated** with new features and changes
- **Respond to user issues** on GitHub

## Resources

- [Obsidian Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- [Submit Your Plugin](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)
- [Developer Policies](https://docs.obsidian.md/Developer+policies)
- [Plugin Review Checklist](https://docs.obsidian.md/oo/plugin)

## Need Help?

- Check the [Obsidian Discord](https://discord.gg/obsidianmd) #plugin-dev channel
- Review other plugins' repositories for examples
- Read the [Obsidian API documentation](https://docs.obsidian.md/)

Good luck with your plugin submission! 🚀

