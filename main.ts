import { Notice, Plugin, PluginSettingTab, Setting, moment, TFile } from 'obsidian';

interface FocusCheckinSettings {
	intervalMinutes: number;
	preAlertSeconds: number;
	enabled: boolean;
	dailyNotesPath: string;
	autoOpenDailyNote: boolean;
}

const DEFAULT_SETTINGS: FocusCheckinSettings = {
	intervalMinutes: 30,
	preAlertSeconds: 30,
	enabled: false,
	dailyNotesPath: 'Daily Notes',
	autoOpenDailyNote: false
}

export default class FocusCheckinPlugin extends Plugin {
	settings: FocusCheckinSettings;
	private preAlertTimeoutId: number | null = null;
	private checkinTimeoutId: number | null = null;
	private statusRefreshIntervalId: number | null = null;
	private nextCheckinAt: number | null = null;
	private statusBarItem: HTMLElement;

	// Send a system notification using Electron
	private sendSystemNotification(title: string, body: string) {
		if (typeof Notification !== 'undefined') {
			if (Notification.permission === 'granted') {
				new Notification(title, {
					body: body,
					silent: false,
					requireInteraction: false
				});
			} else if (Notification.permission !== 'denied') {
				Notification.requestPermission().then(permission => {
					if (permission === 'granted') {
						new Notification(title, { body: body });
					}
				});
			}
		} else {
			// Fallback to in-app notification
			new Notice(`${title}: ${body}`, 5000);
		}
	}

	async onload() {
		await this.loadSettings();

		// Add status bar item
		this.statusBarItem = this.addStatusBarItem();
		this.updateStatusBar();

		// Add ribbon icon to start/stop
		this.addRibbonIcon('clock', 'Toggle Focus Check-in', () => {
			this.toggleFocusCheckin();
		});

		// Add commands
		this.addCommand({
			id: 'start-focus-checkin',
			name: 'Start focus check-in',
			callback: () => this.startFocusCheckin()
		});

		this.addCommand({
			id: 'stop-focus-checkin',
			name: 'Stop focus check-in',
			callback: () => this.stopFocusCheckin()
		});

		this.addCommand({
			id: 'toggle-focus-checkin',
			name: 'Toggle focus check-in',
			callback: () => this.toggleFocusCheckin()
		});

		// Add test commands
		this.addCommand({
			id: 'test-system-notification',
			name: 'Test system notification',
			callback: () => {
				new Notice('Sending test system notification...', 3000);
				this.sendSystemNotification('Focus Check-in', '🎯 Test notification!');
			}
		});

		// Add settings tab
		this.addSettingTab(new FocusCheckinSettingTab(this.app, this));

		// Auto-start if enabled
		if (this.settings.enabled) {
			this.startFocusCheckin();
		}
	}

	onunload() {
		this.stopFocusCheckin();
	}

	toggleFocusCheckin() {
		if (this.settings.enabled) {
			this.stopFocusCheckin();
		} else {
			this.startFocusCheckin();
		}
	}

	startFocusCheckin() {
		if (this.settings.enabled) {
			new Notice('Focus check-in is already running');
			return;
		}

		this.settings.enabled = true;
		this.saveSettings();
		this.updateStatusBar();

		new Notice(`🎯 Focus check-in started (every ${this.settings.intervalMinutes} min)`);
		this.sendSystemNotification('Focus Check-in Started', `Check-ins every ${this.settings.intervalMinutes} minutes`);
		
		this.scheduleFocusCheckin();
	}

	stopFocusCheckin() {
		if (!this.settings.enabled) {
			new Notice('Focus check-in is not running');
			return;
		}

		this.settings.enabled = false;
		this.saveSettings();
		this.updateStatusBar();

		this.clearTimers();
		this.nextCheckinAt = null;

		new Notice('Focus check-in stopped');
		this.sendSystemNotification('Focus Check-in Stopped', 'No more reminders');
	}

	private scheduleFocusCheckin() {
		this.clearTimers();

		const intervalMs = this.settings.intervalMinutes * 60 * 1000;
		const preAlertMs = Math.max(0, this.settings.preAlertSeconds * 1000);

		const runCycle = () => {
			if (!this.settings.enabled) {
				return;
			}

			const now = Date.now();
			this.nextCheckinAt = now + intervalMs;
			this.ensureStatusRefresh();

			if (preAlertMs > 0 && preAlertMs < intervalMs) {
				this.preAlertTimeoutId = window.setTimeout(() => {
					new Notice(`Focus check-in coming up in ${this.settings.preAlertSeconds}s`, 5000);
					this.sendSystemNotification('Focus Prep', `Check-in coming up in ${this.settings.preAlertSeconds} seconds`);
					this.preAlertTimeoutId = null;
				}, intervalMs - preAlertMs);
			}

			this.checkinTimeoutId = window.setTimeout(async () => {
				this.checkinTimeoutId = null;
				await this.performCheckin();
				runCycle();
			}, intervalMs);
		};

		runCycle();

		this.register(() => this.clearTimers());
	}

	private clearTimers() {
		if (this.preAlertTimeoutId !== null) {
			window.clearTimeout(this.preAlertTimeoutId);
			this.preAlertTimeoutId = null;
		}
		if (this.checkinTimeoutId !== null) {
			window.clearTimeout(this.checkinTimeoutId);
			this.checkinTimeoutId = null;
		}
		if (this.statusRefreshIntervalId !== null) {
			window.clearInterval(this.statusRefreshIntervalId);
			this.statusRefreshIntervalId = null;
		}
	}

	private async performCheckin() {
		new Notice('⏰ Time to log your focus!', 5000);
		this.sendSystemNotification('Focus Check-in', '⏰ Time to log your focus!');
		
		if (this.settings.autoOpenDailyNote) {
			await this.openTodaysDailyNote();
		}
	}

	private async openTodaysDailyNote() {
		const date = moment().format('YYYY-MM-DD');
		const year = moment().format('YYYY');
		
		// Try to find the daily note
		const dailyNotePath = `${this.settings.dailyNotesPath}/${year}/${date}.md`;
		const file = this.app.vault.getAbstractFileByPath(dailyNotePath);
		const obsidianUrl = this.buildObsidianUrl([this.settings.dailyNotesPath, year, date]);
		
		if (!file || !(file instanceof TFile)) {
			await this.openObsidianUrl(obsidianUrl);
			return;
		}
		
		// Open the file
		await this.app.workspace.getLeaf(true).openFile(file);
		await this.openObsidianUrl(obsidianUrl);
	}

	private buildObsidianUrl(segments: string[]): string {
		const vaultName = encodeURIComponent(this.app.vault.getName());
		const encodedSegments = segments
			.map(segment => segment.split('/').map(part => encodeURIComponent(part)).join('%2F'))
			.join('%2F');
		return `obsidian://open?vault=${vaultName}&file=${encodedSegments}`;
	}

	private async openObsidianUrl(url: string) {
		const openWithDefaultApp = (this.app as any).openWithDefaultApp;
		if (typeof openWithDefaultApp === 'function') {
			await openWithDefaultApp.call(this.app, url);
		} else {
			window.open(url);
		}
	}

	private updateStatusBar() {
		if (!this.settings.enabled) {
			this.statusBarItem.setText('🎯 Focus: OFF');
			return;
		}

		if (this.nextCheckinAt) {
			const remainingMs = Math.max(0, this.nextCheckinAt - Date.now());
			const totalSeconds = Math.ceil(remainingMs / 1000);
			const minutes = Math.floor(totalSeconds / 60);
			const seconds = totalSeconds % 60;
			const formatted = minutes > 0 ? `${minutes}m ${seconds.toString().padStart(2, '0')}s` : `${seconds}s`;
			this.statusBarItem.setText(`🎯 Focus: ${formatted}`);
		} else {
			this.statusBarItem.setText(`🎯 Focus: ON (${this.settings.intervalMinutes}m)`);
		}
	}

	private ensureStatusRefresh() {
		if (!this.statusRefreshIntervalId) {
			this.statusRefreshIntervalId = window.setInterval(() => {
				if (!this.settings.enabled) {
					return;
				}
				this.updateStatusBar();
			}, 1000);
		}
		this.updateStatusBar();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class FocusCheckinSettingTab extends PluginSettingTab {
	plugin: FocusCheckinPlugin;

	constructor(app: any, plugin: FocusCheckinPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('h2', {text: 'Focus Check-in Settings'});

		containerEl.createEl('p', {
			text: 'Get periodic reminders to check in on your focus and log it in your daily note.',
			cls: 'setting-item-description'
		});

		new Setting(containerEl)
			.setName('Check-in interval (minutes)')
			.setDesc('How often to remind you to check in on your focus')
			.addText(text => text
				.setPlaceholder('30')
				.setValue(String(this.plugin.settings.intervalMinutes))
				.onChange(async (value) => {
					const num = Number(value);
					if (!isNaN(num) && num > 0) {
						this.plugin.settings.intervalMinutes = num;
						await this.plugin.saveSettings();
						
						// Restart if currently running
						if (this.plugin.settings.enabled) {
							this.plugin.stopFocusCheckin();
							this.plugin.startFocusCheckin();
						}
					}
				}));

		new Setting(containerEl)
			.setName('Pre-alert time (seconds)')
			.setDesc('How many seconds before the check-in to show a warning notification (0 to disable)')
			.addText(text => text
				.setPlaceholder('30')
				.setValue(String(this.plugin.settings.preAlertSeconds))
				.onChange(async (value) => {
					const num = Number(value);
					if (!isNaN(num) && num >= 0) {
						this.plugin.settings.preAlertSeconds = num;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Daily notes path')
			.setDesc('Path to your daily notes folder (relative to vault root)')
			.addText(text => text
				.setPlaceholder('Daily Notes')
				.setValue(this.plugin.settings.dailyNotesPath)
				.onChange(async (value) => {
					this.plugin.settings.dailyNotesPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Auto-open daily note')
			.setDesc('Automatically open today\'s daily note when it\'s time to check in')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoOpenDailyNote)
				.onChange(async (value) => {
					this.plugin.settings.autoOpenDailyNote = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', {text: 'Control'});

		new Setting(containerEl)
			.setName('Focus check-in status')
			.setDesc(this.plugin.settings.enabled ? 
				`Currently running (every ${this.plugin.settings.intervalMinutes} minutes)` : 
				'Currently stopped')
			.addButton(button => button
				.setButtonText(this.plugin.settings.enabled ? 'Stop' : 'Start')
				.setCta()
				.onClick(() => {
					this.plugin.toggleFocusCheckin();
					this.display(); // Refresh the settings display
				}));
	}
}
