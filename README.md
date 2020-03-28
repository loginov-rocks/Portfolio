# Portfolio Firebase

![CI](https://github.com/loginov-rocks/Portfolio-Firebase/workflows/CI/badge.svg)
[![Build Status](https://travis-ci.com/loginov-rocks/Portfolio-Firebase.svg?branch=master)](https://travis-ci.com/loginov-rocks/Portfolio-Firebase)
[![Coverage Status](https://coveralls.io/repos/github/loginov-rocks/Portfolio-Firebase/badge.svg?branch=master)](https://coveralls.io/github/loginov-rocks/Portfolio-Firebase?branch=master)
[![dependencies Status](https://david-dm.org/loginov-rocks/Portfolio-Firebase/status.svg)](https://david-dm.org/loginov-rocks/Portfolio-Firebase)
[![devDependencies Status](https://david-dm.org/loginov-rocks/Portfolio-Firebase/dev-status.svg)](https://david-dm.org/loginov-rocks/Portfolio-Firebase?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/loginov-rocks/Portfolio-Firebase.svg)](https://greenkeeper.io/)

## 1. Solution Architecture

![Solution Architecture Diagram](https://raw.githubusercontent.com/loginov-rocks/Portfolio-Firebase/master/Solution-Architecture-Diagram.png)

### 1.1. Components

| Name | Type | Hosted | Description
| --- | --- | --- | --- |
| Portfolio | Web Page | Firebase Hosting | Single page application |
| Google Authentication | Application | Firebase Authentication | Authentication service |
| Cloud Firestore | Database | Firebase Database | NoSQL cloud database |
| getSymbols | Application | Firebase Functions | Node.js based cloud function |
| updateImages | Application | Firebase Functions | Node.js based cloud function |
| updateQuotes | Application | Firebase Functions | Node.js based cloud function |
| getSymbols | Application | Firebase Functions | Node.js based cloud function |
| Images Bucket | Storage | Firebase Storage | Cloud storage |
| Quotes Service | Application | ? | ? |
| IEX API | Application | IEX Cloud | Third-party service |

### 1.2. Interfaces

| ID | From | To | Description |
| --- | --- | --- | --- |
| INT01 | Portfolio | Google Authentication | **Portfolio** authorizes the **User** using **Google Authentication** |
| INT02 | Portfolio | Cloud Firestore | **Portfolio** publishes user data to the **Cloud Firestore** and subscribes for data |
| INT03 | Portfolio | Images Bucket | **Portfolio** shows images from the **Images Bucket** |
| INT04 | Quotes Service | getSymbols | **Quotes Service** gets symbols to fetch quotes from the **getSymbols** function |
| INT05 | Quotes Service | IEX API | **Quotes Service** fetches quotes and images from the **IEX API** |
| INT06 | Quotes Service | updateQuotes | **Quotes Service** sends quotes to the **updateQuotes** function |
| INT07 | Quotes Service | updateImages | **Quotes Service** sends images to the **updateImages** function |
| INT08 | getSymbols | Cloud Firestore | **getSymbols** gets symbols from the **Cloud Firestore** |
| INT09 | updateQuotes | Cloud Firestore | **updateQuotes** updates quotes in the **Cloud Firestore** |
| INT10 | updateImages | Images Bucket | **updateImages** sends images to the **Images Bucket** |
| INT11 | updateImages | Cloud Firestore | **updateImages** sends images metadata to the **Cloud Firestore** |
