// IP geolocation and sending country info to Discord
fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    let country = data.country_name; // Земља
    let city = data.city || "Непознат град"; // Град
    sendToDiscord(country, city);
  });

function sendToDiscord(country, city) {
  const webhookUrl = "https://hkdk.events/58ftssvbt93mh6";

  const message = {
    content: `🎉 Посетилац из земље: ${country}, града: ${city}`,
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  }).then((response) => {
    if (response.ok) {
      console.log("Порука је успешно послата на Discord.");
    } else {
      console.error("Грешка при слaњу поруке на Discord.");
    }
  });
}
