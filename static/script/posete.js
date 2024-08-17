    // IP geolocation and sending country info to Discord
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        let country = data.country_name; // Држава
        let city = data.city || 'Непознат град'; // Град
        sendToDiscord(country, city);
    });

function sendToDiscord(country, city) {
    const webhookUrl = "https://hkdk.events/vjdlqpmyp5lqyu";

    const message = {
        content: `🎉 - | - 🐙 Посетилац из земље: ${country}, града: ${city}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    .then(response => {
        if (response.ok) {
            console.log("Порука је успешно послата на Discord.");
        } else {
            console.error("Грешка при слaњу поруке на Discord.");
        }
    });
}

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