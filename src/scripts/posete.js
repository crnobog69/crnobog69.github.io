fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    let country = data.country_name;
    let city = data.city || "Непознат град";
    sendToDiscord(country, city);
  })
  .catch((error) => console.error("Error fetching location:", error));

function sendToDiscord(country, city) {
  const webhookUrl =
    "https://discord.com/api/webhooks/1271469291157585941/g1E0T1jKbWoDJvG_OT0BJNFKyyJ_zcKGTCOglgL_P2LpqhjP4rjeU50rBjXmD23ouk_o";

  const message = {
    content: `🎉 Посетилац из земље: ${country}, града: ${city}`,
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Порука је успешно послата на Discord.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((error) => console.error("Error sending to Discord:", error));
}
