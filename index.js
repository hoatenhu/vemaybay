const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const axios = require("axios");

const bot = new TelegramBot("6582714818:AAG1r6biFoJjkzN_dsDesuIh1TalDXFX6gk", {
  polling: true,
});

const chatId = "-4052460721";

const numberWithCommas = (number) => {
  const formattedNumber = Number(number).toLocaleString("en-US");
  return `${formattedNumber} đ`;
};

console.log("Start ...");

const sendScheduledMessage = async () => {
  try {
    const headers = {
      authority: "www.traveloka.com",
      accept: "*/*",
      "accept-language": "en-US,en;q=0.7",
      "content-type": "application/json",
      cookie:
        "tvl=cOUeanx34kpeNZ/EjJK4JLXwDEIMkRFmKfDwVPvQjGJTwYNzHSpMn8WQjJRkzsaUH/AOQxZZTuLtz38f1ZHrnHKYbLACyTw0fE2otQkvgqEDthOaIh6gO9kdSFosJkF/2XuYl/QzbWTfyxVKCT0JhKGUzSwYcKFmkdY2d43H5Ga5D0SyWgULNFsCoMj5H2gNyYFG/TlvCpHbOzfv2K57kmeon+olUCqdRFf7IruxvboKvMWIVhjFRwloQouOscJYdBggTvQKcr1gEbsnKT5VUfGd2s9aan0aeflqcEeV5iDVdTDMYofMg6S5sNACs2Rm/jL8uaoQJfwZ5A40C8E5L7+FGUs6GZrFQYYmb8ecdw3hMry68IlEbKmFQ9csIQVOTbYgJg==~djAy; tvs=CSmBwll94N71JRye/sr7FF7qzQG4GxqIcT5TPY0FihMHeG0jYxFv8nh9LRq+AvA/TTtpN8zQNrY3uuS28exBKip+O/v0L/1yTQZsnxwXzqBcLjFCwoWNufq+IjOegC8JTjEZK4sJ+szWhB8azQASC/bcPuf0lZ08pKI7AXF8Y5EfEW1tD7u58HZv6AAFUcF/AVfOIMnqF6kaLgy6f7ThtjRxXUxlW5P7giWFf0dBaWqUcvpTdItbwHz9ujYXoDfyE1yS7E4pV5wlHzUETnQUryt8ZsJqNCriT0o=~djAy", // Include your full cookie value here
      origin: "https://www.traveloka.com",
      referer: "https://www.traveloka.com/vi-vn",
      "x-domain": "flight",
      "x-route-prefix": "vi-vn",
    };
    const requestBody = {
      fields: [],
      clientInterface: "desktop",
      data: {
        roundTripSourceType: "ALL",
        routeType: "ONEWAY",
        timeType: "MONTHLY",
        routeSearchSpec: {
          clientInterface: "desktop",
          currency: "VND",
          locale: "vi_VN",
          sourceAirportOrArea: "THD",
          destinationAirportOrArea: "SGN",
          numSeats: {
            numAdults: 2,
            numChildren: 0,
            numInfants: 0,
          },
          flightDate: {
            month: 2,
            day: 1,
            year: 2024,
          },
          returnFlightDate: null,
          seatPublishedClass: "ECONOMY",
          utmId: null,
          utmSource: null,
        },
      },
    };
    const response = await axios.post(
      "https://www.traveloka.com/api/v2/flight/summary",
      requestBody,
      { headers }
    );

    const cheapest1802 =
      response?.data?.data?.summaries?.["18"]?.cheapestFare?.amount;

    bot.sendMessage(chatId, `Rẻ nhất 18/2: ${cheapest1802}`);
    console.log("Update price done!");
  } catch (error) {
    console.error("Error making POST request:", error.message);
  }
};

// sendScheduledMessage();

cron.schedule('*/59 * * * *', () => {
  console.log('Sending scheduled message...');
  sendScheduledMessage();
});

bot.on("message", (msg) => {
  const messageText = msg.text;
  console.log(`Received message: ${messageText}`);
});
