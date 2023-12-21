const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const axios = require('axios');

const bot = new TelegramBot('6582714818:AAG1r6biFoJjkzN_dsDesuIh1TalDXFX6gk', { polling: true });

const chatId = '1225183560';

const numberWithCommas = (number) => {
  const formattedNumber = Number(number).toLocaleString('en-US');
  return `${formattedNumber} đ`;
};

console.log('Start ...')

const sendScheduledMessage = async () => {
  try {
    const headers = {
      'authority': 'www.traveloka.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.7',
      'content-type': 'application/json',
      'cookie': 'tv-repeat-visit=true; selectedLocale=vi_VN; hotelSearchLoginModalLastShown=1674808369865; tv_user={"authorizationLevel":100,"id":null}; aws-waf-token=88c7d731-08ab-461d-a746-d365b82dbba6:BgoArEENzv0BAAAA:qvogp/qT0p+6Ewl3ssLRs0FQXJ2r1DOfvdeY0XvzjDa4mxhju/UTWM+nw5dw9U8ZmvX3mmHpTVyeMFm7+EF722e883VSu4v90P43JJT0CLXHHt7Mt2ziyTEo/eJOypQ7LEk9fl5m0nmZNuQqGPI49ElhQroMsCPLuOJXm7BZDz6j/hScUi5Xwkh12yKmLnGhVpXUxVH2Uz6BXg==; tvl=RXUWGqRt/Vbv47ilVNJ5m4XHco10F1I6dYJaZgFhHW8Tj6ojz8bueIpv6yx6MNilMglstPvNJdxKxGhgTWmD+2B9jUPNIj+0GSzg2KXRYTbxxteRFb5A11osShf9AlPyM0SeOqjAiEhX2eAfFK0NIBbuwK9xbfPlVcRmD7Ow9aoXbu9vobYotwefWKZKg2H6smtjbEjtXxIOVaPgxJCDy9wNWTReZHpSvG/v7mB75ufRYUHjAi6h75F+GXR559cw6rn39Sv3WU4DbtLZSykTxO6cOMWG4q6kOR/qOZrmbQn8hXam6X2jl4wwGoF39bRyNYzQoRc4SNVEC6cEXtuihbgLqrjAPSc8HiVYs2EbhUxSGXo=~djAy; tvs=Q8FQ08LLITzx0uYZk5Vx/VXe22tPFIrXqZuYvyi3OtLUWwJiNasij2J7KaQIOkPYZCUlEG2jVbw8MElLgxK9hkXwfDVtTjRi6aArLp0aVDWrJ/hm8Z15mF89N9+NwOuaFPLAdzlASaGLBRotgIpFkH/RXi/pYL0gIFY38r6C03fIcJf8HwgX2W0CmUvsYhZf1NHEvGUc6UKOGqJBs6MYZFlviWrLugJCtK+njQ6OsPNZcXN4ynrFkhWVTz5TcmcEuBaMsMfdLOqnq6UYhxwMLTabB8zsPoh+Khc=~djAy; _dd_s=rum=0&expire=1703125032411&logs=1&id=4079e83c-4292-47cc-a0e7-30cd8f81fbaa&created=1703124107156',  // Include your full cookie value here
      'origin': 'https://www.traveloka.com',
      'referer': 'https://www.traveloka.com/vi-vn',
      'x-domain': 'flight',
      'x-route-prefix': 'vi-vn',
    };
    const requestBody = {
      fields: [],
      clientInterface: 'desktop',
      data: {
        roundTripSourceType: 'ALL',
        routeType: 'ONEWAY',
        timeType: 'MONTHLY',
        routeSearchSpec: {
          clientInterface: 'desktop',
          currency: 'VND',
          locale: 'vi_VN',
          sourceAirportOrArea: 'SGN',
          destinationAirportOrArea: 'THD',
          numSeats: {
            numAdults: 1,
            numChildren: 0,
            numInfants: 0
          },
          flightDate: {
            month: 2,
            day: 1,
            year: 2024
          },
          returnFlightDate: null,
          seatPublishedClass: 'ECONOMY',
          utmId: null,
          utmSource: null
        }
      }
    };
    const response = await axios.post('https://www.traveloka.com/api/v2/flight/summary', requestBody, { headers });

    const cheapeatT5 =response?.data?.data?.summaries?.['1']?.cheapestFare?.amount
    const cheapeatT6 =response?.data?.data?.summaries?.['2']?.cheapestFare?.amount

    bot.sendMessage(chatId, `Rẻ nhất T5(22 âm): ${JSON.stringify(numberWithCommas(cheapeatT5))}`);
    bot.sendMessage(chatId, `Rẻ nhất T6(23 âm): ${JSON.stringify(numberWithCommas(cheapeatT6))}`);
  } catch (error) {
    console.error('Error making POST request:', error.message);
  }
};

sendScheduledMessage()

cron.schedule('*/59 * * * *', () => {
  console.log('Sending scheduled message...');
  sendScheduledMessage();
});

bot.on('message', (msg) => {
  const messageText = msg.text;
  console.log(`Received message: ${messageText}`);
});
