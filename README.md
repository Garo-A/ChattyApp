Lighthouse Labs Chatty-App!
===========================

## Description

ChattyApp is an application who's primary use is to chat with your friends! It's a single page application that is rendered using ReactJS and uses WebSockets to broadcast information to all the clients at once.

## Getting Started

Clone the repo onto your local disk (`git clone`) and then install all dependencies using `npm install`. To run the application, use `npm start`. **NOTE** You will need two terminal to correctly start the application;
1. `npm start` in the main application folder.
2. `npm start` in "chatty_server" folder.

App will run on: `localhost:3000`.

## How to use

Input a username in the username field. This step is optional, should you decide not to use one, it will default to Anonymous. You can then start typing inside the message and press `enter` to send.

## Extras!

*User Colors*

Every time a new instance of the app is opened, a random color from 4 possible ones ones will be chosen as the user color.

*Images*

The app is designed to render images and gifs as well. Should the user input a URL that ends with .png, .gif, or .jpg, the image will render on the page.

*Giphy!*

Giphy API is built into the app. In order the use type: `/giphy` and a search query (cat is a popular one) to generate a random gif from Giphy!
