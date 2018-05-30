# Read me - Important

This is my implimentation of the application for the code exercise stage of the paystack front end developer role as requested.

## About

This application is built with angularjs using babel transpiled ES6 syntax.

### note
The API secret key used in the application is stored in the .env file in the root of the application as API_KEY and its value is currently a none functional string for security reasons.
Replace string with the test secret key string.

### warning
Do not commit API secret key to repo, gitignore .evn file if need be.

## Install

```bash
# install all package node modules
npm install

# install all bower modules
bower install
```

## Usage

Create a .env file in the root directory of the application if there is none. Add the API secret key environment-specific variable in the form of API_KEY=VALUE to the .env file. For example:

```dosini
API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

## Run Application

```bash
# this runs npm install and bower install before running gulp serve
npm start

# gulp serve starts application
gulp serve
```
## License

MIT Licence
