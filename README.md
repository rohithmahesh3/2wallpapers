# Workspace Wallpaper GNOME Shell Extension

[![GNOME Version](https://img.shields.io/badge/GNOME-45%2B-blue.svg)](https://gnome.org/)
[![License](https://img.shields.io/badge/License-GPL%20v2%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

## Description

A GNOME Shell extension that sets different wallpapers for different workspaces. Perfect for visually distinguishing between your workspaces on GNOME Shell (works on Wayland).

## Features

- **Per-workspace wallpapers**: Configure up to 4 unique wallpapers
- **Smart fallback**: Workspaces beyond the 4th automatically use the first workspace's wallpaper
- **Instant switching**: Wallpaper changes only when you switch workspaces (not based on window visibility)
- **Clean UI**: Simple settings dialog with image preview
- **Supports GNOME 45-49**

## How It Works

- **Workspace 1**: Uses `workspace-1-wallpaper`
- **Workspace 2**: Uses `workspace-2-wallpaper`
- **Workspace 3**: Uses `workspace-3-wallpaper`
- **Workspace 4**: Uses `workspace-4-wallpaper`
- **Workspaces 5+**: Uses `workspace-1-wallpaper` (first workspace wallpaper as fallback)

The wallpaper changes only when you switch between workspaces, providing a consistent visual experience.

## Requirements

- GNOME Shell 45+
- Fedora 43 Wayland GNOME (tested)
- Standard GNOME libs (Gio, Gtk, Adw, Meta)

## Installation

### Manual Installation

1. **Create the extensions directory:**
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/workspace-wallpaper@rohithmahesh3
   ```

2. **Copy all files to the extension directory:**
   ```bash
   cp -r /home/rohithmahesh/Dev/2wallpapers/* ~/.local/share/gnome-shell/extensions/workspace-wallpaper@rohithmahesh3/
   ```

3. **Compile schemas:**
   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/workspace-wallpaper@rohithmahesh3/schemas/
   ```

4. **Restart GNOME Shell:**
   - On Wayland: Log out and log back in
   - On X11: Press `Alt+F2`, type `r`, and press Enter

5. **Enable the extension:**
   ```bash
   gnome-extensions enable workspace-wallpaper@rohithmahesh3
   ```
   Or use the GNOME Extensions app to enable it.

## Configuration

1. Open the **Extensions** app
2. Find **Workspace Wallpaper** extension
3. Click the **Settings** (gear) icon
4. Select a wallpaper for each of the 4 workspaces
5. Switch between workspaces to see the wallpaper change

## Troubleshooting

### Extension not showing in Extensions app

Make sure the extension is in the correct directory:
```bash
ls ~/.local/share/gnome-shell/extensions/workspace-wallpaper@rohithmahesh3/
```

You should see: `extension.js`, `metadata.json`, `prefs.js`, `schemas/`, etc.

### Reload extensions

If the extension doesn't appear after installation:
```bash
dbus-send --session --dest=org.gnome.Shell --type=method_call /org/gnome/Shell org.gnome.Shell.Extensions.ReloadExtensions
```

Then restart GNOME Shell.

## Development

Forked from [2wallpapers](https://github.com/dudumaroja/2wallpapers) by [@dudumaroja](https://github.com/dudumaroja).

Modified to support per-workspace wallpapers instead of window-based wallpaper switching.

## License

[GNU GPL v2.0 or later](LICENSE).

## Credits

- Original extension: [@dudumaroja](https://github.com/dudumaroja)
- Modified by: [@rohithmahesh3](https://github.com/rohithmahesh3)
