# Portfolio

[![Build Status](https://travis-ci.com/loginov-rocks/Portfolio.svg?branch=master)](https://travis-ci.com/loginov-rocks/Portfolio)
[![Coverage Status](https://coveralls.io/repos/github/loginov-rocks/Portfolio/badge.svg?branch=master)](https://coveralls.io/github/loginov-rocks/Portfolio?branch=master)
[![dependencies Status](https://david-dm.org/loginov-rocks/Portfolio/status.svg)](https://david-dm.org/loginov-rocks/Portfolio)
[![devDependencies Status](https://david-dm.org/loginov-rocks/Portfolio/dev-status.svg)](https://david-dm.org/loginov-rocks/Portfolio?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/loginov-rocks/Portfolio.svg)](https://greenkeeper.io/)

## 1. Solution Architecture

![Solution Architecture Diagram](https://raw.githubusercontent.com/loginov-rocks/Portfolio/master/diagrams/Solution-Architecture.png)

### 1.1. Components

| ID | Name | Type | Hosted | Description |
| --- | --- | --- | --- | --- |
| SYS01 | Portfolio | Web Page | Firebase Hosting | Single page application |
| SYS02 | Google Authentication | Application | Firebase Authentication | Authentication service |
| SYS03 | Cloud Firestore | Database | Firebase Database | NoSQL cloud database |
| SYS04 | Images Bucket | Storage | Firebase Storage | Cloud storage |
| SYS05 | getSymbols | Application | Firebase Functions | Node.js based cloud function |
| SYS06 | updateImages | Application | Firebase Functions | Node.js based cloud function |
| SYS07 | updateQuotes | Application | Firebase Functions | Node.js based cloud function |
| SYS08 | Stocks Service | Application | TODO | TODO |
| SYS09 | IEX API | Application | IEX Cloud | Third-party REST service providing financial data |

### 1.2. Interfaces

| ID | From | To | Description |
| --- | --- | --- | --- |
| INT01 | Portfolio | Google Authentication | **Portfolio** authorizes the **User** using **Google Authentication** |
| INT02 | Portfolio | Cloud Firestore | **Portfolio** publishes user data to the **Cloud Firestore** and subscribes for data |
| INT03 | Portfolio | Images Bucket | **Portfolio** shows stocks images from the **Images Bucket** |
| INT04 | Stocks Service | getSymbols | **Stocks Service** gets stocks symbols to fetch stocks quotes from the **getSymbols** function |
| INT05 | Stocks Service | IEX API | **Stocks Service** fetches stocks quotes and images from the **IEX API** |
| INT06 | Stocks Service | updateQuotes | **Stocks Service** sends stocks quotes to the **updateQuotes** function |
| INT07 | Stocks Service | updateImages | **Stocks Service** sends stocks images to the **updateImages** function |
| INT08 | getSymbols | Cloud Firestore | **getSymbols** gets stocks symbols from the **Cloud Firestore** |
| INT09 | updateQuotes | Cloud Firestore | **updateQuotes** updates stocks quotes in the **Cloud Firestore** |
| INT10 | updateImages | Images Bucket | **updateImages** sends stocks images to the **Images Bucket** |
| INT11 | updateImages | Cloud Firestore | **updateImages** sends stocks images metadata to the **Cloud Firestore** |

### 1.3. Use Cases

#### 1.3.1. Authentication

TODO

#### 1.3.2. Open Position

TODO

#### 1.3.3. Show Position

TODO

#### 1.3.4. Edit Position

TODO

#### 1.3.5. Close Position

TODO

#### 1.3.6. Delete Position

TODO

#### 1.3.7. Show Open Positions List

TODO

#### 1.3.8. Show Closed Positions List

TODO

#### 1.3.9. Show Portfolio Summary

TODO

#### 1.3.10. Update Quotes

TODO

#### 1.3.11. Update Images

TODO
