require("dotenv").config();
const Discord = require("discord.js");
const axios = require("axios");
const prefix = "!";
let args = "";
let data = "";
const req = [];
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.on("ready", () => {
  console.log(`${client.user.tag}has logged in`);
});
client.on("message", (message) => {
  console.log(`[${message.author.tag}]:${message.content}`);
  if (message.content.charAt(0) === "!") {
    args = message.content.substring(prefix.length).split(" ");
    console.log(args);
    switch (args[0]) {
      case "news":
        if (!args[1]) {
          message.channel.send("you need to provide a category");
        } else {
          run = async () => {
            const [a, ...b] = args;
            args = "";
            let search = b.reduce((res, item) => (res = res + " " + item));
            console.log(search);
            //   switch()
            axios
              .get(
                `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.API}`
              )
              .then((res) => {
                let n = res.data.articles.length;
                let index = getRandomIntInclusive(0, n - 1);
                console.log(index);
                data = res.data.articles[index].url;
                message.channel.send(
                  `Here is the news You're looking for...${data}`
                );
                data = "";
              })
              .catch((err) => {
                console.log(err.response.status);
                message.channel.send("OOps! can't find a news");
              });
          };
          run();
        }
    }
  }
});
client.login(process.env.TOKEN);
