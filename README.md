# Portfolio Firebase

![CI](https://github.com/loginov-rocks/Portfolio-Firebase/workflows/CI/badge.svg)
[![Build Status](https://travis-ci.com/loginov-rocks/Portfolio-Firebase.svg?branch=master)](https://travis-ci.com/loginov-rocks/Portfolio-Firebase)
[![Coverage Status](https://coveralls.io/repos/github/loginov-rocks/Portfolio-Firebase/badge.svg?branch=master)](https://coveralls.io/github/loginov-rocks/Portfolio-Firebase?branch=master)
[![dependencies Status](https://david-dm.org/loginov-rocks/Portfolio-Firebase/status.svg)](https://david-dm.org/loginov-rocks/Portfolio-Firebase)
[![devDependencies Status](https://david-dm.org/loginov-rocks/Portfolio-Firebase/dev-status.svg)](https://david-dm.org/loginov-rocks/Portfolio-Firebase?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/loginov-rocks/Portfolio-Firebase.svg)](https://greenkeeper.io/)

## Architecture

TBD: Architecture diagram.

### User

1. Uses the *App*
2. Authenticates using *Google Authentication*

### App

1. Authorizes the *User* using *Google Authentication*
2. Publishes user data and subscribes to the *Cloud Firestore*
3. Shows images from the *Images Bucket*

### Quotes Service

1. Gets symbols to fetch quotes from the *getSymbols* function
2. Fetches quotes and images from the *IEX API*
3. Sends quotes to the *updateQuotes* function
4. Sends images to the *updateImages* function

### getSymbols

1. Gets symbols from the *Cloud Firestore*

### updateQuotes

1. Updates quotes in the *Cloud Firestore*

### updateImages

1. Sends images to the *Images Bucket*
2. Sends images data to the *Cloud Firestore*
