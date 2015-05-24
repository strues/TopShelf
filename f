{
  "libs": [
    "browser",
    "ecma5",
    "ecma6"
  ],
  "loadEagerly": [
    "src/client/**/*.js"
  ],
  "dontLoad": [
    "bower_components/**/*.js",
    "node_modules/**/*.js"
  ],
  "plugins": {
    "complete_strings": {},
    "node": "load",
    "lint": {"false"},
    "angular": "angular",
    "doc_comment": {
      "fullDocs": "true"
    }
  }
}
