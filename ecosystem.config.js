module.exports = {
  apps: [
    {
      name: "42 Bot Prod",
      script: "npm run prod",
      watch: ["./src"],
      ignore_watch: ["node_modules"],
    },
  ],
};
