module.exports = {
  "servers": {
    "online": {
      "domain": "//static.online.com"
    },
    "beta": {
      "domain": "//static.beta.com"
    },
    "dev": {
      "host": "1.1.1.1",
      "domain": "//static.dev.com",
      "port": 22,
      "local": "./",
      "path": "/usr/local/nginx/fet-iview-temp",
      "sudo": false,
      "include": [
        "dev"
      ]
    }
  }
}
