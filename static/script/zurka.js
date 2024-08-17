/*
-------------------
----///////////----
-----/////////-----
------///////------
-------/////-------
--------///--------
---------/---------
-------------------
*/

document.addEventListener("DOMContentLoaded", function() {
    let colors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', 
        '#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#EE82EE', '#7FFF00', 
        '#ADFF2F', '#FF6347', '#BA55D3'
    ];

    let index = 0;

    setInterval(function() {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length;
    }, 50);
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
