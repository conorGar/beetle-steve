
const beetleSteve = document.querySelector('#beetle-steve');
const beetleSteveAni = document.querySelector('#beetle-steve-image');
const currentEnemies = document.querySelectorAll('.enemy');
const enemyStyles = [];

const roomsItemsData = [];
const tiles = document.querySelectorAll('.tile');
const tileStyles = [];
let roomsItems;
const speedX = 20;
const speedY = 20;
const carriedItems = [];
let recovering = false; // used after Beetle Steve is hit. Small window where Steve can't be hit again.
let xpos = 0;
let ypos = 0;

const roomArray = [];
let currentRoom;
let currentlyHeldItems = 0;


setInterval(update, 100);


window.addEventListener('keydown', checkDirection);
window.addEventListener('keyup', idleAniSwitch);


window.addEventListener('scroll', (e) => {
  e.preventDefault();
  window.scrollTo(currentRoom.x, currentRoom.y);
}, true);


// happens at the start of page load
function awake() {
  for (let i = 0; i < 1; i++) {
    // Room 0 items
    makeItems(200, 40);
    makeItems(1100, 40);
    makeItems(70, 530);
    makeItems(1170, 530);
    makeItems(650, 210);


    // Room 3 Items
    makeItems(496, 932);
    makeItems(725, 932);
    makeItems(60, 1280);


    beetleSteve.style.height = `${70}px`;
    beetleSteve.style.width = `${50}px`;
  }
  roomsItems = document.querySelectorAll('.item'); // keep track of items
  // creation of enemy

  //* *     Room Setup */
  const room1 = new Room(0, 60, 0);
  roomArray.push(room1);
  const room2 = new Room(1350, 60, 1);
  roomArray.push(room2);
  const room3 = new Room(0, 750, 2);
  roomArray.push(room3);
  const room4 = new Room(1350, 750, 3);
  roomArray.push(room4);

  currentRoom = roomArray[0]; // start in first room


  for (let i = 0; i < currentEnemies.length; i++) {
    enemyStyles.push(window.getComputedStyle(currentEnemies[i]));
    console.log(`Enemy width: ${enemyStyles[i].getPropertyValue('width')}`);
  }

  for (let i = 0; i < tiles.length; i++) {
    tileStyles.push(window.getComputedStyle(tiles[i]));
  }


  //* *Debug tile elements check */
  //  for(let i = 0; i<tiles.length;i++){
  //         //inititalizing the css properties here seems to be necessary in order to check the properties later
  //      tiles[i].style.width = 400 + "px";
  //      tiles[i].style.left = 0 + "px";
  //      tiles[i].style.height = 200 + "px";
  //      tiles[i].style.top = 200 + "px";

  //  }
}
awake();


// happens every 1/10 second.
function update() {
  //* *    ENEMY COLLISION CHECK      */

  for (let i = 0; i < currentEnemies.length; i++) {
    if (xpos < parseInt(enemyStyles[i].getPropertyValue('left')) + parseInt(enemyStyles[i].getPropertyValue('width'))
        && xpos + parseInt(beetleSteve.style.width) > parseInt(enemyStyles[i].getPropertyValue('left'))
        && ypos < parseInt(enemyStyles[i].getPropertyValue('top')) + parseInt(enemyStyles[i].getPropertyValue('height'))
        && parseInt(beetleSteve.style.height) + ypos > parseInt(enemyStyles[i].getPropertyValue('top'))) {
      enemyCollision();
    }
  }

  //* *        ITEM COLLISION CHECK        */
  for (let i = 0; i < roomsItems.length; i++) {
    if (xpos < parseInt(roomsItems[i].style.left) + roomsItemsData[i].width
        && xpos + parseInt(beetleSteve.style.width) > parseInt(roomsItems[i].style.left)
        && ypos < parseInt(roomsItems[i].style.top) + roomsItemsData[i].height
        && parseInt(beetleSteve.style.height) + ypos > parseInt(roomsItems[i].style.top)) {
      console.log('Collision Happened!!!!!!! :D');

      gatherItem(roomsItems[i]);
    }
  }
}


function move(x, y) {
  const canMove = true;
  if (!beetleSteveAni.classList.contains('hurt') && !beetleSteveAni.classList.contains('beetleSteveDeathImage')) {
    beetleSteveAni.className = 'beetleSteveWalk';
  }


  //* * Tile Collision check */
  for (let i = 0; i < tiles.length; i++) {
    // if (xpos + x < parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width) &&
    // xpos + x + parseInt(beetleSteve.style.width) > parseInt(tiles[i].style.left) &&
    // ypos + y < parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height) &&
    // parseInt(beetleSteve.style.height) + ypos + y> parseInt(tiles[i].style.top)) {
    if (xpos + x < parseInt(tileStyles[i].getPropertyValue('left')) + parseInt(tileStyles[i].getPropertyValue('width'))
        && xpos + x + parseInt(beetleSteve.style.width) > parseInt(tileStyles[i].getPropertyValue('left'))
        && ypos + y < parseInt(tileStyles[i].getPropertyValue('top')) + parseInt(tileStyles[i].getPropertyValue('height'))
        && parseInt(beetleSteve.style.height) + ypos + y > parseInt(tileStyles[i].getPropertyValue('top'))) {
      console.log('TILE Collision Happened!!!!!!! :D');
      // canMove = false;
      getOutOfTileBounds(x, y, tileStyles[i]);
    }
    //  }else{
    //      console.log("-------");
    //      console.log(xpos + x < parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width));
    //      console.log(xpos + x + parseInt(beetleSteve.style.width) > parseInt(tiles[i].style.left));
    //      console.log(ypos + y < parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height));
    //      console.log(parseInt(beetleSteve.style.height) + ypos + y> parseInt(tiles[i].style.top));
    //  }
  }
  if (x > 0) {
    beetleSteve.classList.add('right');
    beetleSteve.classList.remove('left');
  } else if (x < 0) {
    beetleSteve.classList.add('left');
    beetleSteve.classList.remove('right');
  }
  if (canMove) {
    xpos += x;
    ypos += y;
    beetleSteve.style.left = `${xpos}px`;
    beetleSteve.style.top = `${ypos}px`;

    checkRoomBounds();
  }
}
function checkRoomBounds() {
  console.log(`${currentRoom.x + currentRoom.width}..cureentRoomX || xPos: ${xpos}rNmbr:${currentRoom.roomNum}`);
  if (xpos + 50 > currentRoom.x + currentRoom.width) {
    console.log('Move to right screen');
    if (currentRoom.roomNum === 0 || currentRoom.roomNum === 2) {
      currentRoom = roomArray[currentRoom.roomNum + 1];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  } else if (xpos + 50 < currentRoom.x) {
    console.log('****Move to left room');
    if (currentRoom.roomNum === 1 || currentRoom.roomNum === 3) {
      currentRoom = roomArray[currentRoom.roomNum - 1];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  } else if (ypos + 130 > currentRoom.y + currentRoom.height) {
    console.log('******Move to bottom screen');
    if (currentRoom.roomNum < 2) {
      currentRoom = roomArray[currentRoom.roomNum + 2];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  } else if (ypos < currentRoom.y) {
    console.log('Move to top screen');
    if (currentRoom.roomNum > 2) {
      currentRoom = roomArray[currentRoom.roomNum - 2];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  }
}

function idleAniSwitch() {
  if (!beetleSteveAni.classList.contains('hurt') && !beetleSteveAni.classList.contains('beetleSteveDeathImage')) {
    beetleSteveAni.className = 'beetleSteveIdle';
  }
}
function getOutOfTileBounds(x, y, tile) {
  console.log(Math.abs(parseInt(beetleSteve.style.height) + ypos - parseInt(tile.getPropertyValue('top'))));
  // console.log(ypos  - (parseInt(tile.top) + parseInt(tile.height)));
  // console.log(xpos + parseInt(beetleSteve.style.width) - parseInt(tile.left));
  // console.log(xpos - (parseInt(tile.left) + parseInt(tile.width)));
  if (Math.abs(parseInt(beetleSteve.style.height) + ypos - parseInt(tile.getPropertyValue('top'))) < 20) { // check if beetle steve is above
    console.log('got here push back check');
    while (Math.abs(parseInt(beetleSteve.style.height) + ypos - parseInt(tile.getPropertyValue('top'))) < 20) {
      console.log('top push back is happening...');
      ypos -= 5;
    }
  } else if (Math.abs(ypos - (parseInt(tile.getPropertyValue('top')) + parseInt(tile.getPropertyValue('height')))) < 20) {
    while (Math.abs(ypos - (parseInt(tile.getPropertyValue('top')) + parseInt(tile.getPropertyValue('height')))) < 20) {
      ypos += 5;
    }
  } else if (Math.abs(xpos + parseInt(beetleSteve.style.width) - parseInt(tile.getPropertyValue('left'))) < 20) {
    while (Math.abs(xpos + parseInt(beetleSteve.style.width) - parseInt(tile.getPropertyValue('left'))) < 20) {
      xpos -= 5;
    }
  } else if (Math.abs(xpos - (parseInt(tile.getPropertyValue('left')) + parseInt(tile.getPropertyValue('width')))) < 20) {
    while (Math.abs(xpos - (parseInt(tile.getPropertyValue('left')) + parseInt(tile.getPropertyValue('width')))) < 20) {
      xpos += 5;
    }
  }


  beetleSteve.style.left = `${xpos}px`;
  beetleSteve.style.top = `${ypos}px`;

  console.log('getOutOfTileBOundns() ended.....');
}

// determine given arrow key direction, and adjust the values called to 'move' function accordingly
function checkDirection(element) {
  console.log(`check direction activate:${element.keyCode}`);
  element.preventDefault(); // prevent user from scrolling the page using arrow keys
  if (element.keyCode === 39) { // right arrow
    move(speedX, 0);
  } else if (element.keyCode === 37) { // left arrow
    move(speedX * (-1), 0);
  } else if (element.keyCode === 40) { // down arrow
    move(0, speedY);
  } else if (element.keyCode === 38) { // up arrow
    move(0, (speedY * -1));
  }
}


// Activated when collided with item. Adds item to heldItems and 'attatches' new item to beetleSteve div.
function gatherItem(item) {
  console.log('gatherItem() called!  ---');
  currentlyHeldItems++;
  carriedItems.push(item);
  item.style.top = `${20 - (25 * carriedItems.length)}px`; // items pile on each other
  item.style.left = `${-47}px`;
  beetleSteve.appendChild(item);
}


function enemyCollision() {
  if (!recovering) {
    if (carriedItems.length > 0) {
      recovering = true;
      const delay = setInterval(recoveryPeriod, 1000);
      carriedItems[carriedItems.length - 1].style.display = 'none'; // hides the top most item collected
      carriedItems.pop();
      beetleSteveAni.classList.add('hurt');
      function recoveryPeriod() {
        console.log('recovery period function called');

        recovering = false;
        beetleSteveAni.classList.remove('hurt');
        clearInterval(delay);
      }
    } else {
      recovering = true;
      death();
    }
  }
}


function death() {
  console.log('Death is called');
  // alert("You Died!");

  beetleSteveAni.className = 'beetleSteveDeathImage';
  const blackFader = document.querySelector('.blackFader');
  blackFader.className = 'deathEffectBoxActive';
  beetleSteve.style.zIndex = 10;
  setInterval(restartPage, 2000);
}

function restartPage() {
  window.location.href = 'area1.html';
}

function Item(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

function Room(x, y, roomNum) {
  this.x = x;
  this.y = y;
  this.width = x + 1350;
  this.height = y + 690;
  this.roomNum = roomNum;
}
function makeItems(itemX, itemY) {
  const newItem = new Item(itemX, itemY, 100, 100);
  roomsItemsData.push(newItem);

  const newDiv = document.createElement('div');
  newDiv.classList.add('item');
  newDiv.style.left = `${newItem.x}px`;
  newDiv.style.top = `${newItem.y}px`;
  newDiv.style.width = newItem.width;
  newDiv.style.height = newItem.height;
  document.body.appendChild(newDiv);
}
