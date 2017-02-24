
module.exports = {
  environment : 'development',
  development: {
    port : "3010",
    twitter: {
      clientID: "dsrB8pme8nw8iBiKmWIzmv3wB",
      clientSecret: "tc8zWa09yjymCBM34f0vzYJeaa0d07tPGL25n7HGA2r8ZwrBKe",
      callbackURL: "http://localhost:3010/auth/twitter/callback"
    }
  },
  staging: {
    port : "80",
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "CALLBACKURL"
    }
  },
  production: {
    port : "80",
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "CALLBACKURL"
    }
  }
}