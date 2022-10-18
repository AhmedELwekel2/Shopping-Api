module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended","prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint","prettier"
    ],
    "rules": {
        // "prettier/prettier": 1
        '@typescript-eslint/no-var-requires': 0,
        "no-fallthrough":0,
        "no-sparse-arrays":0,
        "no-unreachable":0,
        "no-undef":0,
        "@typescript-eslint/no-unused-vars":0,
        "no-useless-catch":0,
        "@typescript-eslint/no-empty-function":0,
        "no-empty":0

    }
}