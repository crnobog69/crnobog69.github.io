const scriptData = {
  kolo: {
    title: "kolo.sh",
    description:
      "Скрипта за претрагу Arch Linux репозиторијума (укључујући AUR)",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/kolo.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/kolo.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  entropy: {
    title: "entropy.sh",
    description: "Прилагођена скрипта за чишћење система",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/entropy.sh",
    github:
      "https://github.com/crnobog69/dotfiles/blob/main/scripts/entropy.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  crc: {
    title: "crc.sh",
    description: "Једноставна скрипта за компајлирање C програма.",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/crc.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/crc.sh",
    content: `Прилагођена скирпта за компајлирање програма написаних у C програмском језику уз помоћ gcc`,
  },
  zap: {
    title: "zap.sh",
    description: "Скрипта за ажурирање система, више система",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/zap.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/zap.sh",
    content: `Прилагођена скрипта за ажурирање система са подршком за више операцисних система`,
  },
  ftn: {
    title: "ftn.sh",
    description: "Скрипта за претрагу файлова",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/ftn.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/ftn.sh",
    content: `Прилагођена скрипта за ажурирање система са подршком за више операцисних система`,
  },
  pkg: {
    title: "pkg.sh",
    description:
      "Скрипта за инсталирање пакета/програма које користим, постоје две верзије - на српском језику и енглеском језику.",
    language: "Bash",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/pkg.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/pkg.sh",
    content: `Прилагођена скрипта за ажурирање система са подршком за више операцисних система`,
  },
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
};

export default scriptData;
