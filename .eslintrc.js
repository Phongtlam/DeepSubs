module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "no-underscore-dangle": [2, { "allowAfterThis": true }],
      "no-param-reassign": [2, {"props": false}]
    }
};
