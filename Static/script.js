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

function typeTextWithNewLines(text, parent, callback) {
  let i = 0;
  const intervalId = setInterval(() => {
    if (text[i] === "\n") {
      const breakLine = document.createElement("br");
      parent.appendChild(breakLine);
    } else {
      const textNode = document.createTextNode(text[i]);
      parent.appendChild(textNode);
    }
    i++;
    if (i >= text.length) {
      clearInterval(intervalId);
      if (callback) callback();
    }
  }, 100);
}
document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById("input");
  const outputElement = document.getElementById("output");

  function typeText(text, parent, callback) {
    let i = 0;
    const intervalId = setInterval(() => {
      const textNode = document.createTextNode(text[i]);
      parent.appendChild(textNode);
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
        if (callback) callback();
      }
    }, 0);
  }

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const command = inputElement.value.trim();
      const commandLine = document.createElement("div");
      commandLine.textContent = `$> ${command}`;
      outputElement.appendChild(commandLine);

      const responseLine = document.createElement("div");
      outputElement.appendChild(responseLine);

      let link;
      if (command === "cb dotfiles") {
        link = document.createElement("a");
        link.href = "Stranice/dotfiles";
        link.textContent = "dotfiles.html";
        typeText("Отварање секције 'dotfiles'... --> ", responseLine, () => {
          responseLine.appendChild(link);
        });
      } else if (command === "cb kontakt") {
        link = document.createElement("a");
        link.href = "Stranice/kontakt";
        link.textContent = "kontakt.html";
        typeText("Отварање секције 'Контакт'... --> ", responseLine, () => {
          responseLine.appendChild(link);
        });
      } else if (command === "cb galerija") {
        link = document.createElement("a");
        link.href = "Stranice/galerija";
        link.textContent = "galerija.html";
        typeText("Отварање секције 'Галерија'... --> ", responseLine, () => {
          responseLine.appendChild(link);
        });
      } else if (command === "cb zurka") {
        link = document.createElement("a");
        link.href = "Stranice/zurka/zurka.html";
        link.textContent = "КЛИКНИ ЗА СЕКС";
        typeText("СЕКС ЖУРКА... --> ", responseLine, () => {
          responseLine.appendChild(link);
        });
      } else if (command === "clear") {
        outputElement.innerHTML = ""; // Чисти екран
        typeText("", responseLine);
      } else if (command === "cb home") {
        link = document.createElement("a");
        link.href = "../index.html";
        link.textContent = "index.html";
        typeText("Отварање секције 'Кућа'... --> ", responseLine, () => {
          responseLine.appendChild(link);
        });
    } else if (command === "cb crnobog") {
        const asciiArt = `
-------------------
----///////////----
-----/////////-----
------///////------
-------/////-------
--------///--------
---------/---------
-------------------
        `;
        typeTextWithNewLines(asciiArt, responseLine);
      } else if (command === "cb preuzimanja") {
        link = document.createElement("a");
        link.href = "Stranice/preuzimanja";
        link.textContent = "preuzimanja.html";
        typeText(
          "Отварање секције 'Преузимања'... --> ",
          responseLine,
          () => {
            responseLine.appendChild(link);
          }
        );
      } else if (command === "cb vreme") {
  const now = new Date();
  
  // Добијање сати, минута и секунди
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Форматирање датума
  const datum = now.toLocaleDateString('sr-RS');

  // Састављање времена у 24-часовном формату
  const vreme = `${hours}:${minutes}:${seconds}`;
  
  typeText(`Тренутно време је ${vreme}, датум је ${datum}`, responseLine);
} else if (command === "help") {
          typeText("Доступне команде:", responseLine, () => {
          const breakLine = document.createElement("br");
          responseLine.appendChild(breakLine);

          const extraText = document.createTextNode("//Crnobog//2023//");
          responseLine.appendChild(extraText);
          const extraBreakLine = document.createElement("br");
          responseLine.appendChild(extraBreakLine);

          const commandsList = [
            "- cb home",
            "- cb vreme",
            "- cb dotfiles",
            "- cb preuzimanja",
            "- cb kontakt",
            "- cb galerija",
            "- clear",
          ];
          commandsList.forEach((cmd) => {
            const cmdText = document.createTextNode(cmd);
            const breakLine = document.createElement("br");
            responseLine.appendChild(cmdText);
            responseLine.appendChild(breakLine);
          });
        });
      } else {
        typeText(`Непозната команда: ${command}`, responseLine);
      }

      outputElement.scrollTop = outputElement.scrollHeight;
      inputElement.value = "";
    }
  });
});
// kurac
