document.addEventListener('DOMContentLoaded', function () {
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        const subfolder = folder.nextElementSibling;
        if (subfolder && subfolder.classList.contains('subfolder')) {
            subfolder.style.display = 'none';
        }
    });
});

function toggleFolder(element) {
    const isOpen = element.classList.contains("open");
    const subfolder = element.nextElementSibling;

    if (isOpen) {
        element.classList.remove("open");
        subfolder.style.maxHeight = '0';
        subfolder.style.opacity = '0';
        setTimeout(() => {
            subfolder.style.display = 'none';
        }, 300);
    } else {
        element.classList.add("open");
        subfolder.style.display = 'block';
        setTimeout(() => {
            subfolder.style.maxHeight = '200px';
            subfolder.style.opacity = '1';
        }, 10);
    }
}
function updateDateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const formattedDate = `${day}.${month}.${year}.`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').textContent = `Време | ${formattedDate} ${formattedTime}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.addEventListener('DOMContentLoaded', function () {
    const navButtons = document.querySelectorAll('.nav-item');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = this.id;
            switch (id) {
                case 'home-button':
                    window.location.href = '../index.html'; 
                    break;
                case 'projects-button':
                    window.location.href = 'projekti-odabir.html';
                    break;
                case 'others-button':
                    window.location.href = 'ostalo.html';
                    break;
            }
        });
    });
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Онемогућава контекстно мени
});

document.addEventListener('keydown', function(e) {
    // Проверите да ли је притиснут F12, Ctrl+Shift+I или Ctrl+U
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        window.location.href = './404.html'; // Промените пут до ваше 404 странице
    }
});