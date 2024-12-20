const scriptData = {
  kolo: {
    title: "kolo.sh",
    description:
      "Скрипта за претрагу Arch Linux репозиторијума (укључујући AUR)",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/kolo.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/kolo.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  entropy: {
    title: "entropy.sh",
    description: "Прилагођена скрипта за чишћење система",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/entropy.sh",
    github:
      "https://github.com/crnobog69/dotfiles/blob/main/scripts/entropy.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  crc: {
    title: "crc.sh",
    description: "Једноставна скрипта за компајлирање C програма.",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/crc.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/crc.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  zap: {
    title: "zap.sh",
    description: "Скрипта за ажурирање система, више система",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/zap.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/zap.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  trash: {
    title: "trash.sh",
    description: "Прилагођена скрипта за чишћење канте",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/trash.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/trash.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  catbox: {
    title: "catbox.sh",
    description: "Прилагођена скрипта за коришћење `catbox.moe`",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/catbox.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/catbox.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  litterbox: {
    title: "litterbox.sh",
    description: "Прилагођена скрипта за коришћење `litterbox.moe`",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/litterbox.sh",
    github:
      "https://github.com/crnobog69/dotfiles/blob/main/scripts/litterbox.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  cgit: {
    title: "cgit.sh",
    description: "Персонализована скрипта за `git`",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/cgit.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/cgit.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  desktopify: {
    title: "desktopify.sh",
    description:
      "Персонализована скрипта за креирање `.desktop` датотеке за AppImage апликације",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/desktopify.sh",
    github:
      "https://github.com/crnobog69/dotfiles/blob/main/scripts/desktopify.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  papirus: {
    title: "papirus.sh",
    description:
      "Персонализована скрипта за прилагођавање Papirus теме за иконице",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/papirus.sh",
    github:
      "https://github.com/crnobog69/dotfiles/blob/main/scripts/papirus.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  ftn: {
    title: "ftn.sh",
    description:
      "Прилагођена скрипта која приказује да ли је недеља парна или непарна",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/ftn.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/ftn.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  pkg: {
    title: "pkg.sh",
    description:
      "Скрипта за инсталирање пакета/програма које користим, постоје две верзије - на српском језику и енглеском језику.",
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/dotfiles/refs/heads/main/scripts/pkg.sh",
    github: "https://github.com/crnobog69/dotfiles/blob/main/scripts/pkg.sh",
    content: `Скрипта је превише дугачка за приказ. Посетите GitHub страницу за детаље.`,
  },
  backup: {
    title: "backup.sh",
    description:
      "Једноставна скрипта која прави дневне резервне копије важних директоријума.",
    language: "Shell",
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
    language: "Shell",
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
    language: "Shell",
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
    language: "Shell",
    url: "https://raw.githubusercontent.com/crnobog69/scripts/refs/heads/main/echo.sh",
    github: "https://github.com/crnobog69/scripts/blob/main/echo.sh",
    content: `#!/bin/bash
echo "Велики поздрав за свет!"`,
  },
};

export default scriptData;
