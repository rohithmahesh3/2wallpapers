import Meta from 'gi://Meta';
import Gio from 'gi://Gio';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

/**
 * Workspace Wallpaper Extension - Per-Workspace Wallpaper Support
 *
 * This extension sets different wallpapers for different workspaces.
 * - Workspace 1: Uses 'workspace-1-wallpaper'
 * - Workspace 2: Uses 'workspace-2-wallpaper'
 * - Workspace 3: Uses 'workspace-3-wallpaper'
 * - Workspace 4: Uses 'workspace-4-wallpaper'
 * - Workspaces 5+: Uses 'workspace-1-wallpaper' (first workspace wallpaper)
 *
 * Wallpaper changes only when switching workspaces, not based on window visibility.
 */
export default class TwoWallpapersExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        // Extension settings containing wallpaper URIs
        this._settings = null;
        // GNOME workspace manager reference
        this._wm = global.workspace_manager;
        // Signal ID for workspace switching events
        this._wsSwitchedId = null;
    }

    /**
     * Updates the desktop background based on the current workspace index.
     * Maps workspace index to the appropriate wallpaper setting.
     */
    _updateBackground() {
        const activeWorkspace = this._wm.get_active_workspace();
        const workspaceIndex = activeWorkspace.index();

        // Determine which wallpaper key to use based on workspace index
        // Workspaces are 0-indexed, so:
        // - Index 0 -> workspace-1-wallpaper
        // - Index 1 -> workspace-2-wallpaper
        // - Index 2 -> workspace-3-wallpaper
        // - Index 3 -> workspace-4-wallpaper
        // - Index 4+ -> workspace-1-wallpaper (fallback to first workspace)
        let wallpaperKey;
        if (workspaceIndex === 0) {
            wallpaperKey = 'workspace-1-wallpaper';
        } else if (workspaceIndex === 1) {
            wallpaperKey = 'workspace-2-wallpaper';
        } else if (workspaceIndex === 2) {
            wallpaperKey = 'workspace-3-wallpaper';
        } else if (workspaceIndex === 3) {
            wallpaperKey = 'workspace-4-wallpaper';
        } else {
            // For workspaces beyond the 4th, use the first workspace's wallpaper
            wallpaperKey = 'workspace-1-wallpaper';
        }

        // Get the wallpaper URI from settings
        const uri = this._settings.get_string(wallpaperKey);

        // Apply wallpaper to both light and dark modes
        if (uri) {
            this._backgroundSettings.set_string('picture-uri', uri);
            this._backgroundSettings.set_string('picture-uri-dark', uri);
        }
    }

    /**
     * Called when the extension is enabled.
     * Initializes settings, connects workspace switching signal, and sets initial wallpaper.
     */
    enable() {
        // Access GNOME's background settings
        this._backgroundSettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.background' });
        // Load extension's custom settings
        this._settings = this.getSettings();

        // Apply initial wallpaper for the current workspace
        this._updateBackground();

        // Handle workspace switching
        this._wsSwitchedId = this._wm.connect('workspace-switched', () => {
            // Update wallpaper for the new workspace
            this._updateBackground();
        });
    }

    /**
     * Called when the extension is disabled.
     * Disconnects all signals and cleans up references to prevent memory leaks.
     */
    disable() {
        // Disconnect workspace switching listener
        if (this._wsSwitchedId) {
            this._wm.disconnect(this._wsSwitchedId);
            this._wsSwitchedId = null;
        }

        // Clear references
        this._settings = null;
        this._backgroundSettings = null;
    }
}
