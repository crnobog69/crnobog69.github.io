const scriptData = {
  backup: {
    title: "backup.sh",
    description:
      "Једноставна скрипта која прави дневне резервне копије важних директоријума.",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/scripts/refs/heads/main/backup.sh",
    github: "https://github.com/crnobog69/scripts/blob/main/backup.sh",
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

echo "Backup completed: $backup_dir"`,
  },
  update: {
    title: "update.sh",
    description:
      "Скрипта за ажурирање система на Arch Linux-у. Ажурира пакете и чисти кеш пакета",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/scripts/refs/heads/main/update.sh",
    github: "https://github.com/crnobog69/scripts/blob/main/update.sh",
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

echo "Update complete!"`,
  },
  clean: {
    title: "clean.sh",
    description:
      "Скрипта за чишћење система која брише некоришћене пакете и одржава систем.",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/scripts/refs/heads/main/clean.sh",
    github: "https://github.com/crnobog69/scripts/blob/main/clean.sh",
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

echo "Cleanup complete!"`,
  },
  echo: {
    title: "echo.sh",
    description: "Скрипта која исписује текст на екран.",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/scripts/refs/heads/main/echo.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/echo.sh",
    content: `#!/bin/bash
echo "Велики поздрав за свет!"`,
  },
  crc: {
    title: "crc.sh",
    description: "Једноставна скрипта за компајлирање C програма.",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/crc.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/crc.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
};

export default scriptData;
