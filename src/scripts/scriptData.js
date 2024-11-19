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
    content: `#!/bin/bash

# Боје
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
PEACH='\033[38;2;250;183;135m'
LAVANDER='\033[38;2;180;191;254m'
RESET='\033[0m'

# Функција за проверу грешака
check_error() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}Грешка: $1${NC}"
        return 1
    fi
    return 0
}

# Проверимо да ли је аргумент прослеђен
if [ -z "$1" ]; then
    echo -e "${RED}Унесите име датотеке са .c на крају!${RESET}"
    echo "Пример коришћења: ./crc.sh program.c -lm"
    echo -e "${YELLOW}За помоћ укуцати ./crc.sh --help${RESET}"
    exit 1
fi

# Ако је корисник унео --help, приказујемо помоћ
if [ "$1" == "--help" ]; then
    echo "==================================================================="
    echo
    echo -e "${RED} Алат за једноставно компајлирање програма написаних у 'C'.${RESET}"
    echo
    echo -e "${CYAN} 'crc.sh'${RESET} ${RED}Скрипта | Помоћ${RESET} ${CYAN}(Compile, Run, C)${RESET}"
    echo
    echo "==================================================================="    
    echo
    echo -e "${YELLOW} Коришћење:${RESET}"
    echo
    echo -e "${CYAN}   ./crc.sh${RESET} ${LAVANDER}ime_datoteke.c${RESET} ${PEACH}додатне_опције${RESET}"
    echo
    echo -e "${YELLOW} Опис:${RESET}"
    echo
    echo "  Овај алат компајлира програме написане у C и поседује опцију"
    echo "  додавања библиотеке ако је потребно."
    echo
    echo -e "${RED}  Пример 1:${RESET} ${CYAN}./crc.sh${RESET} ${LAVANDER}program.c${RESET}"
    echo -e "${RED}  Пример 2:${RESET} ${CYAN}./crc.sh${RESET} ${LAVANDER}program.c${RESET} ${PEACH}-lm -lncurses${RESET}"
    echo -e "${RED}  Пример 3:${RESET} ${CYAN}./crc.sh${RESET} ${LAVANDER}program.c${RESET} ${PEACH}-lm${RESET}"
    echo
    echo "==================================================================="
    echo
    echo -e "${YELLOW} Додатне опције:${RESET}"
    echo
    echo -e "  ${PEACH}--help${RESET}        Приказује ову помоћ."
    echo -e "  ${PEACH}-lm${RESET}           Додаје математичку библиотеку."
    echo -e "  ${PEACH}-lncurses${RESET}     Додаје библиотеку за рад са терминалом."
    echo -e "  ${PEACH}-lpthread${RESET}     Додаје библиотеку за рад са нитима."
    echo
    echo -e "  Или нека друга библиотека, исто као ${RED}'gcc'${RESET} компајлер."
    echo
    echo "==================================================================="
    exit 0
fi

# Име датотеке са екстензијом
FILE=$1

# Проверимо да ли датотека има .c екстензију
if [[ "$FILE" != *.c ]]; then
    echo -e "${RED}Унесите име датотеке са .c на крају!${RESET}"
    echo -e "${YELLOW}За помоћ укуцати ./crc.sh --help${RESET}"
    exit 1
fi

# Уклонити .c екстензију да добијемо име извршне датотеке
FILENAME=${FILE%.c}

# Додатне библиотеке (ако постоје)
shift # Уклонити први аргумент (име фајла)
LIBRARIES=$@

# Компилација са додатним библиотекама
echo -e "${CYAN}Компајлирање...${RESET}"
gcc "$FILE" -o "$FILENAME" $LIBRARIES
if [ $? -ne 0 ]; then
    echo -e "${RED}Грешка приликом компајлирања!${RESET}"
    echo -e "${YELLOW}За помоћ укуцати ./crc.sh --help${RESET}"
    exit 1
fi

# Покретање извршне датотеке
echo -e "${GREEN}Покретање извршне датотеке: ./${FILENAME}${RESET}"
echo "--------------------------" 
echo
./"$FILENAME"`,
  },
};

export default scriptData;
