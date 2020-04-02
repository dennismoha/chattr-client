# Fantasy Foragers

## Description
Fantasy Foragers is a text based, turn based, real time, multiplayer online role playing game where you can create your own character and have them face off with other characters created by your peers.

## Wireframe & ERD
![link] (https://imgur.com/a/O4DZs88)

## Technologies used
-   socket.io
-   react.js
-   bootstrap

## User Stories:
-   As a user, I want to be able to create a new character
-   As a user, I want to be able to fight other characters
-   As a user, I want to be able to modify my characters i created
-   As a user, I want to be able to see the stats of my characters
-   As a user, I want to be able to find assign skills to my characters
-   As a user, I want to be able play with other people
-   As a user, I want to be able to see the history and logs of the fight

## Screenshot
![link] (https://imgur.com/a/eo56CB8)

## Set up
-   [Front End Template](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
-   `npm install`
-   `npm install --socket.io-client`

## Links
-   [Fantasy Foragers deployed api] (https://sleepy-harbor-73832.herokuapp.com/)


## Unsolved Problems
-   Prevent one of the players from seeing the opposing players buttons
-   Allow one of the players to only be able to select their own character
-   Integrate animated sprites to the pages

## Process
**Day 1**
-   On the first day, I created the application using the react-auth-template and also created the crud functionality for the foragers resource.

**Day 2**
-   On the second day, I implemented the attack game logic in order for the basic attack button to function properly as well as implement the ability functionality in the basic fight file path.

**Day 3**
-   On the Third day, I implemented the useAbility functionality in the fight file path as well as modify the crudding functionality for the skills.
**Day 4**
-   On the fourth day, I created the multifight file path as well as implemented multiplayer in that file via socket.io.
