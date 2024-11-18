const scriptData = {
    backup: {
        title: 'backup.sh',
        description: 'Једноставна скрипта која прави дневне резервне копије важних директоријума.',
        language: 'Bash',
        url: 'https://raw.githubusercontent.com/crnobog69/scripts/main/backup.sh',
        github: 'https://github.com/crnobog69/scripts/blob/main/backup.sh',
        content: `#!/bin/bash
# Backup script for important files

backup_dir="$HOME/backups/$(date +%Y-%m-%d)"
mkdir -p "$backup_dir"

# Add your backup commands here
cp -r "$HOME/.config" "$backup_dir"
cp -r "$HOME/Documents" "$backup_dir"

echo "Backup completed: $backup_dir"`,
        raw: `#!/bin/bash
# Backup script for important files

backup_dir="$HOME/backups/$(date +%Y-%m-%d)"
mkdir -p "$backup_dir"

# Add your backup commands here
cp -r "$HOME/.config" "$backup_dir"
cp -r "$HOME/Documents" "$backup_dir"

echo "Backup completed: $backup_dir"`
    },
    update: {
        title: 'update.sh',
        description: 'Скрипта за ажурирање система на Arch Linux-у. Ажурира пакете и чисти кеш пакета',
        language: 'Bash',
        url: 'https://raw.githubusercontent.com/crnobog69/scripts/main/update.sh',
        github: 'https://github.com/crnobog69/scripts/blob/main/update.sh',
        content: `#!/bin/bash
# System update script

echo "Updating system..."
sudo pacman -Syu

echo "Cleaning package cache..."
sudo pacman -Sc

echo "Update complete!"`,
        raw: `#!/bin/bash
# System update script

echo "Updating system..."
sudo pacman -Syu

echo "Cleaning package cache..."
sudo pacman -Sc

echo "Update complete!"`
    },
    clean: {
        title: 'clean.sh',
        description: 'Скрипта за чишћење система која брише некоришћене пакете и одржава систем.',
        language: 'Bash',
        url: 'https://raw.githubusercontent.com/crnobog69/dotfiles/main/clean.sh',
        github: 'https://github.com/crnobog69/dotfiles/blob/main/clean.sh',
        content: `#!/bin/bash
# System cleanup script

echo "Cleaning package cache..."
sudo pacman -Sc

echo "Removing orphaned packages..."
sudo pacman -Rns $(pacman -Qtdq)

echo "Clearing systemd journal..."
sudo journalctl --vacuum-time=7d

echo "Cleanup complete!"`,
        raw: `#!/bin/bash
# System cleanup script

echo "Cleaning package cache..."
sudo pacman -Sc

echo "Removing orphaned packages..."
sudo pacman -Rns $(pacman -Qtdq)

echo "Clearing systemd journal..."
sudo journalctl --vacuum-time=7d

echo "Cleanup complete!"`
    }
};

export default scriptData; 