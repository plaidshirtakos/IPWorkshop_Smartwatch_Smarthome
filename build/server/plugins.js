module.exports = [
  {
    "folder": "",
    "name": "application",
    "id": "application",
    "main": "server.ts",
    "consumes": [
      "webserver"
    ],
    "provides": []
  },
  {
    "folder": "",
    "name": "image-display",
    "id": "image-display",
    "main": "server/server.ts",
    "consumes": [
      "webserver"
    ],
    "provides": [
      "image_display"
    ]
  },
  {
    "folder": "",
    "name": "webserver",
    "id": "webserver",
    "main": "server.ts",
    "consumes": [],
    "provides": [
      "webserver"
    ]
  }
];