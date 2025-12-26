import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Pango from 'gi://Pango';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class TwoWallpapersPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: 'Workspace Wallpaper Settings' });
        page.add(group);

        // Filter for images
        const imageFilter = new Gtk.FileFilter();
        imageFilter.add_pixbuf_formats();

        // Helper function to create wallpaper chooser button
        const createChooserButton = (key, title, subtitle = '') => {
            const row = new Adw.ActionRow({
                title,
                subtitle,
            });

            const button = new Gtk.Button({
                label: 'Select image',
                hexpand: false,
                halign: Gtk.Align.END,
            });

            // Set fixed width
            button.set_size_request(200, -1);

            // Apply truncation to the button's internal label
            const label = button.get_child();
            if (label && label instanceof Gtk.Label) {
                label.set_ellipsize(Pango.EllipsizeMode.END);
                label.set_max_width_chars(20);
            }

            // Load current wallpaper if set
            const currentUri = settings.get_string(key);
            if (currentUri) {
                const file = Gio.File.new_for_uri(currentUri);
                const basename = file.get_basename() || 'Select image';
                button.set_label(basename);
                button.set_tooltip_text(basename);
            }

            button.connect('clicked', () => {
                const dialog = new Gtk.FileChooserNative({
                    title: `Select wallpaper for ${title}`,
                    action: Gtk.FileChooserAction.OPEN,
                    transient_for: window,
                    modal: true,
                });
                dialog.add_filter(imageFilter);

                dialog.connect('response', (dlg, response) => {
                    if (response === Gtk.ResponseType.ACCEPT) {
                        const uri = dlg.get_file().get_uri();
                        settings.set_string(key, uri || '');
                        const basename = dlg.get_file().get_basename() || 'Select image';
                        button.set_label(basename);
                        button.set_tooltip_text(basename);
                    }
                    dlg.destroy();
                });

                dialog.show();
            });

            row.add_suffix(button);
            group.add(row);
        };

        // Workspace 1 wallpaper
        createChooserButton('workspace-1-wallpaper', 'Workspace 1', 'Wallpaper for the first workspace (also used for workspaces 5+)');

        // Workspace 2 wallpaper
        createChooserButton('workspace-2-wallpaper', 'Workspace 2', 'Wallpaper for the second workspace');

        // Workspace 3 wallpaper
        createChooserButton('workspace-3-wallpaper', 'Workspace 3', 'Wallpaper for the third workspace');

        // Workspace 4 wallpaper
        createChooserButton('workspace-4-wallpaper', 'Workspace 4', 'Wallpaper for the fourth workspace');

        window.add(page);
    }
}
