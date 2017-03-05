# Tic Tac Toe

## Summary
- This application is a Tic Tac Toe game. :video_game:
- The folder contains an index.html file, one css which includes a file called style.css, a js folder with 2 files: jquery.js and main.js, and an images folder with 7 images, one sound called 'zeldaSound', and a README.md file.
- This application was created by Diego Villanueva for Project 0 - WDi20 General Assembly

### Online version
An online version of the game can be accessed using this  [Link  :link:](https://diego2017.github.io/tictactoe/)

### Objective of the game:
- In the game, there are 2 players who take turns selecting a space in a 3×3 grid. Every time a player selects a space, the space changes to their selected image. In order to win, players should place three of their images in a horizontal, vertical, or diagonal row.

### Instructions of the game:
* Select whether you want to play:
  * Player against the computer :man: vs :computer:
  * Player against other player :man: vs :man:
* After this section, choose each player has to choose an image and input their name. The computer will choose its own image.
* Play the game by clicking on one square.
* To restart the game, click 'Start Again'

## Specifications:
For this application, the code has been written in 3 files: one html file (index.html), one javascript file (js/main.js), and one css file (css/style.css).

#### main.js
* Prepare the page to be shown to user. It hides sections not shown when the page is loaded.
* Declaration of variables
* Object window.game - Includes the board used to track players' movements, data of each player(player number, name, token to be used when images don't work, and the image that will be shown on the square selected by players), a findWinner function (reviews the board in game and checks if anybody has won), and a modifyBoard function that changes the board when the player number, and position on the board are provided.
* Board event listener, for the squared selected by players.
* Other functions. Includes resetGame (function used to clear the board inside the game object and the one displayed to players), youWon (function used to show celebration gifs).
* Event listeners for 4 buttons selected by players: playerPlayer (when the player vs player button is clicked), userOptions (for the players to select their image), startAgain (for reseting the game), and playerRobot (when the player vs robot button is clicked)
* AI section used when Robot vs Player is selected. There is one function to create positions on the board and a function to select the square.

## Comments on the project and its development:
* The game is working for 2 players and for player vs computer. The AI section is using conditionals based on a strategy to win. When there is no strategy to follow, the function created selects a random available square.
* During the development process I found that in the beginning I had an idea on how to create the application but once I had more code. My plan had to be adapted and I started adding other functions to achieve the result I wanted.
* The biggest problem I had was that after adding various functions and variables, I started getting confused with the functions and when I had bugs, it was hard to find the solution because many functions were linked and depended on each other.
