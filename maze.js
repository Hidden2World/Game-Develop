// Disable scrolling
function disableScroll() {
  // Get the current scroll position
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // Save the current scroll position
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

// Enable scrolling
function enableScroll() { 
  window.onscroll = null;
}

// Call disableScroll() to disable scrolling
disableScroll();

function showMessage(message, duration) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.classList.remove('hidden');
  messageElement.style.display = 'block';

  setTimeout(function() {
    messageElement.classList.add('hidden');
    messageElement.style.display = 'none';
  }, duration);
}

//above this i did not write cause i would have no idea how too

const monsters = [];
const foods = [];
const wins = [];

const maze = document.getElementById('maze');
const player = document.getElementById('player');
let playerX = 12;
let playerY = 9;
let score = 0; // makes score = 0
const numberOfMonsters = 10; // Adjust the number of monsters as desired
let starter = 0;

let demonic = new Audio('got_you.mp3') //gets you
let monsterw = new Audio('demonic.mp3') //moves

map1();

// Generate the maze using a 2D array
function map1() {
  maze.innerHTML = '';
  updatePlayerPosition();
  


  let mazeArray1 = [     
    //the maze array is 46 long and 45 deep 2,070 tiles               
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // #FF0000
    [1, 0, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // #FF0000
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 3, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 3, 1, 0, 1, 1, 1, 1, 0, 1, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 3, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 3, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 3, 0, 1, 3, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 5, 5, 5, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];




  

  var startTime = 0; // to keep track of the start time
  var stopwatchInterval; // to keep track of the interval
  var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped
  var isrunning = false;
  
  
  
  function startStopwatch() {
    if (!stopwatchInterval) {
      elapsedPausedTime = 0; // set elapsed paused time to 0
      startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      stopwatchInterval = setInterval(updateStopwatch, 100); // update every 1 seconds
      isRunning = true;
      
    }
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval); // stop the interval
    elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
    isRunning = false;
    
  }

  function updateStopwatch() {
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
    var milliseconds = Math.trunc(elapsedTime % 1000).toString().charAt(0) ; // calculate seconds
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    
    var displayTime = seconds + "."  + milliseconds + "s"; // format display time
    var displayTime2 = minutes + "m" + ":" + seconds + "." + milliseconds + "s"; // format display time

    
    if (elapsedTime > 0) {
      if (elapsedTime < 59999){
        
        document.getElementById('stopwatch').innerHTML = displayTime;
        for (const win of wins) {
          const winX = parseInt(win.style.left) / 40;
          const winY = parseInt(win.style.top) / 40;
          if (playerX === winX && playerY === winY) {
            document.getElementById('winner').innerHTML = "You Win! Score: " + score +"<br>           " + "You took: " + displayTime;
            console.log('you win')
            
            stopStopwatch();
            
            
          }
        }
      }
    }
    if (elapsedTime > 59999) {
      
      document.getElementById('stopwatch').innerHTML = displayTime2;
      console.log(displayTime2);
      
    }

    document.addEventListener('keydown', (event) => {
      switch (event.key) {

        case '5':
        document.getElementById('winner').innerHTML = "You Win! Score: " + score +"<br>           " + "You took: " + displayTime2;
        console.log('you win')
        console.log(displayTime2);
        stopStopwatch();

    }

  });


    
    
    
    

    
    
    
  }
  
  

  
  

  
  
  
  //finds a random pos
  function getRandomPosition() {
    let x, y;
    do {
      x = Math.floor(Math.random() * mazeArray1[0].length); //makes sure it spawns within the 0's and not anything else like 1's or 2's
      y = Math.floor(Math.random() * mazeArray1.length);
    } while (mazeArray1[y][x] == 1 || mazeArray1[y][x] == 4 || mazeArray1[y][x] == 3 || mazeArray1[y][x] == 2); //so it cant go on 1, 4 or 3
    
    
    return { x, y };
    a
  }

  const initialPosition = getRandomPosition();
  playerX = initialPosition.x;
  playerY = initialPosition.y;

  updatePlayerPosition();


  function updatePlayerPosition() {
    
    player.style.left = `${playerX * 40}px`;
    player.style.top = `${playerY * 40}px`;

    // this makes it so follows the player
    const container = document.getElementById('maze_container'); // gets the id from the html
    container.style.left = `${-(playerX * 40) + (container.offsetWidth / 2.415) }px`; //when the player moves the camera will follow it by adding and taking away the player pos (idk how to word it)
    container.style.top = `${-(playerY * 40) + (container.offsetHeight / 1.5 ) }px`;

    
  

  for (const monster of monsters) {
    const monsterX = parseInt(monster.style.left) / 40; //parseint converts a string into a int (very useful stuff)
    const monsterY = parseInt(monster.style.top) / 40;

    const diffX = playerX - monsterX; //what the X difference between the player and monster is 
    const diffY = playerY - monsterY; //what the Y difference between the player and monster is 

    const moveX = Math.sign(diffX); //checks if its positive or negative
    const moveY = Math.sign(diffY);

    const nextX = monsterX + moveX; //where the monster will move next in the X axis
    const nextY = monsterY + moveY; //where the monster will move next in the Y axis

    if (mazeArray1[nextY][nextX] !== 1 && mazeArray1[nextY][nextX] !== 2 && mazeArray1[nextY][nextX] !== 3) { //makes it so the monster cant go on tile number 1 or 3
      setTimeout(function() { //just a timer function 
        monster.style.left = nextX * 40 + 'px'; //Moves the monster on the X axis
        monster.style.top = nextY * 40 + 'px'; //Moves the monster on the X axis
        monsterw.play()
        checkCollision();
      }, 500); //500 ms 0.5s
      
    }
    checkCollision();
  }
}

  //sees if the monster has got you
  function checkCollision() {
    for (const monster of monsters) { //for every monsters we have it creates a monster
      const monsterX = parseInt(monster.style.left) / 40;
      const monsterY = parseInt(monster.style.top) / 40; //parseInt means you make it into an int not just a string

      if (playerX === monsterX && playerY === monsterY) { //if the player is in the same place as the monster x or y then it plays this
        demonic.play()
        
        takescore();
        restart();
        return;
      }
    }



    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      const foodX = parseInt(food.style.left) / 40;
      const foodY = parseInt(food.style.top) / 40;
      
      if (playerX === foodX && playerY === foodY) {
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
        food.remove(); //removes
        foods.splice(i, 1); // Remove the food item from the array
        
      }
      
    }

  }

  function initializeMonsters() {
    
    for (let i = 0; i < numberOfMonsters; i++) {
      const position = getRandomPosition();
      const monster = document.createElement('div');
      monster.className = 'monster';
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
      maze.appendChild(monster);
      monsters.push(monster);
    }
    
  }
  let e = 0
  function takescore() {
    while(e < 1) {
      score--;
      e++;
    }
    
  }

  //this makes it so when you restart you restart
  function restart() {
    
    
    
    document.getElementById('score').innerHTML = "Score: " + score; 
    updatePlayerPosition();


    // Reset monster positions
    for (const monster of monsters) {
      const position = getRandomPosition(); 
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
    }
  }

  function reset() {
    stopStopwatch();
    playerX = initialPosition.x;
    playerY = initialPosition.y;
    
    document.getElementById('score').innerHTML = "Score: " + score; 
    updatePlayerPosition();


    // Reset monster positions
    for (const monster of monsters) {
      const position = getRandomPosition(); 
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
    }

  }

  // Draw the maze on the screen
  for (let i = 0; i < mazeArray1.length; i++) { //this is just math stuff
    for (let j = 0; j < mazeArray1[i].length; j++) {
      if (mazeArray1[i][j] === 1)  { // this is from the array 1
        const wall = document.createElement('div'); //this creates a html element called wall
        wall.style.width = '40px'; //sets the width of the wall
        wall.style.height = '40px'; //sets the height of the wall
        wall.style.backgroundImage = "url('images/tile1.png')"; //this is where gets the images from
        wall.style.position = 'absolute';
        wall.style.top = i * 40 + 'px';
        wall.style.left = j * 40 + 'px';
        maze.appendChild(wall); //append child means you can create an object model and the wall part is the child we want to add
      }
    }
  }

  // Draw the maze on the screen
  for (let i = 0; i < mazeArray1.length; i++) {
    for (let j = 0; j < mazeArray1[i].length; j++) {
      if (mazeArray1[i][j] === 0)  { // this is from the array 1
        const wall = document.createElement('div');
        wall.style.width = '40px';
        wall.style.height = '40px';
        wall.style.backgroundColor = 'teal';
        wall.style.position = 'absolute';
        wall.style.top = i * 40 + 'px';
        wall.style.left = j * 40 + 'px';
        maze.appendChild(wall);
      }
    }
  }
  // Draw the maze on the screen
  for (let i = 0; i < mazeArray1.length; i++) {
    for (let j = 0; j < mazeArray1[i].length; j++) {
      if (mazeArray1[i][j] === 2)  { // this is from the array 1
        const wall = document.createElement('div');
        wall.style.width = '40px';
        wall.style.height = '40px';
        wall.style.backgroundImage = "url('images/tile2.png')";
        wall.style.position = 'absolute';
        wall.style.top = i * 40 + 'px';
        wall.style.left = j * 40 + 'px';
        maze.appendChild(wall);
      }
    }
  }

  // Draw the maze on the screen
  for (let i = 0; i < mazeArray1.length; i++) {
    for (let j = 0; j < mazeArray1[i].length; j++) {
      if (mazeArray1[i][j] === 3)  { // this is from the array 1
        const wall = document.createElement('div');
        wall.style.width = '40px';
        wall.style.height = '40px';
        wall.style.backgroundImage = "url('images/tile3.png')";
        wall.style.position = 'absolute';
        wall.style.top = i * 40 + 'px';
        wall.style.left = j * 40 + 'px';
        maze.appendChild(wall);
      }
    }
  }

  for (let i = 0; i < mazeArray1.length; i++) {
    for (let j = 0; j < mazeArray1[i].length; j++) {
      if (mazeArray1[i][j] === 5) { // this is from the array 1
        const win = document.createElement('div');
        win.style.width = '40px';
        win.style.height = '40px';
        win.style.backgroundColor = 'green';
        win.style.position = 'absolute';
        win.style.top = i * 40 + 'px';
        win.style.left = j * 40 + 'px';
        maze.appendChild(win);
        wins.push(win);
      }
    }
  }

  //food 
  let nbfood = 50; //how much food there is
  for(i = 0; i < nbfood; i++) { // if i less than nbfood then it adds 1 of this
      
        score * 0 + 1; //times the score by 0 then adds 1 because the score starts off at number of monsters (this just solves mutliple problems)
        const position = getRandomPosition();
        const food = document.createElement('img'); //legit just creates a element in the html
        food.src = '/images/idk.png'; 
        food.style.width = '40px';
        food.style.height = '40px';
        food.style.position = 'absolute';
        food.style.top = position.y * 40 + 'px';
        food.style.left = position.x * 40 + 'px';
        maze.appendChild(food); //adds food to the wall
        foods.push(food); //puts it on the screen
      
  }


  let pressedKeys = ''; // String to keep track of pressed keys
  const cheat1 = 'cheat1';
  const cheat2 = 'cheat2';
  const cheat3 = 'cheat3';
  const cheat4 = 'cheat4';

  document.addEventListener('keydown', (event) => {
    const pressedKey = event.key;

      // Add the pressed key to the string
      pressedKeys += pressedKey;
    
      // Check if the pressed keys contain the desired sequence
    if (pressedKeys.includes(cheat1)) {
      score += 1;
      document.getElementById('score').innerHTML = "Score: " + score;
      // Clear the string for the next sequence
      pressedKeys = '';
    }

    if (pressedKeys.includes(cheat2)) {
      score += 10;
      document.getElementById('score').innerHTML = "Score: " + score;
      // Clear the string for the next sequence
      pressedKeys = '';
    }

    if (pressedKeys.includes(cheat3)) {
      score += 50;
      document.getElementById('score').innerHTML = "Score: " + score;
      // Clear the string for the next sequence
      pressedKeys = '';
    }

    if (pressedKeys.includes(cheat4)) {
      score += 100;
      document.getElementById('score').innerHTML = "Score: " + score;
      // Clear the string for the next sequence
      pressedKeys = '';
    }

    switch (event.key) {
      case 'i':
        playerY--;
          updatePlayerPosition();
      break;

      case 'k':
        playerY++;
          updatePlayerPosition();
      break;

      case 'j':
        playerX--;
          updatePlayerPosition();
      break;

      case 'l':
        playerX++;
          updatePlayerPosition();
      break;


    }

    
});

  initializeMonsters(); 
  

  // Move the player using keys that I chose
  document.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'w':
        if (mazeArray1[playerY - 1][playerX] !== 1 && mazeArray1[playerY - 1][playerX] !== 3 && mazeArray1[playerY - 1][playerX] !== 2) {
          playerY--;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }
          updatePlayerPosition();
        }
        e = 0;
        break;
      case 's':
        if (mazeArray1[playerY + 1][playerX] !== 1 && mazeArray1[playerY + 1][playerX] !== 3 && mazeArray1[playerY + 1][playerX] !== 2) {
          playerY++;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }
          updatePlayerPosition();
        }
        e = 0;
        break;
      case 'a':
        if (mazeArray1[playerY][playerX - 1] !== 1 && mazeArray1[playerY][playerX - 1] !== 3 && mazeArray1[playerY][playerX - 1] !== 2) {
          
          playerX--;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }

          updatePlayerPosition();
          
        }
        e = 0;
        break;
      case 'd':
        if (mazeArray1[playerY][playerX + 1] !== 1 && mazeArray1[playerY][playerX + 1] !== 3 && mazeArray1[playerY][playerX + 1] !== 2) {
          playerX++;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }
          updatePlayerPosition();
        }
        e = 0;
        
        break; 


        case 'ArrowUp':
        if (mazeArray1[playerY - 1][playerX] !== 1 && mazeArray1[playerY - 1][playerX] !== 3 && mazeArray1[playerY - 1][playerX] !== 2) {
          playerY--;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }
          updatePlayerPosition();
        }
        e = 0;
        break;
      case 'ArrowDown':
        if (mazeArray1[playerY + 1][playerX] !== 1 && mazeArray1[playerY + 1][playerX] !== 3 && mazeArray1[playerY + 1][playerX] !== 2) {
          playerY++;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }
          updatePlayerPosition();
        }
        e = 0;
        break;
      case 'ArrowLeft':
        if (starter == 0) {
          starter++;
          startStopwatch();
          console.log(starter);
        }
        if (mazeArray1[playerY][playerX - 1] !== 1 && mazeArray1[playerY][playerX - 1] !== 3 && mazeArray1[playerY][playerX - 1] !== 2) {
          
          playerX--;
          if (starter == 0) {
            starter++;
            
            startStopwatch();
            console.log(starter);
          }

          updatePlayerPosition();
          
        }
        e = 0;
        break;
      case 'ArrowRight':
        if (mazeArray1[playerY][playerX + 1] !== 1 && mazeArray1[playerY][playerX + 1] !== 3 && mazeArray1[playerY][playerX + 1] !== 2) {
          playerX++;
          if (starter == 0) {
            starter++;
            startStopwatch();
            console.log(starter);
          }
          updatePlayerPosition();
        }
        e = 0;
        
        break; 


        case 'r':
          reset();
          break;


      
    }

  });
}




document.getElementById('button2').addEventListener("click",changeMap);
document.getElementById('button').addEventListener("click",map1);



