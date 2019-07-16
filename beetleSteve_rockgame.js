

const beetleSteve = document.querySelector('#beetle-steve');
const beetleSteveAni = document.querySelector('#beetle-steve-image');
const currentEnemies = document.querySelectorAll('.enemy');
const gateTrigger = window.getComputedStyle(document.querySelector('#gateTrigger'));
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
let ypos = 40;

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
    makeItems(780, 290);


    // Room 3 Items
    makeItems(496, 932);
    makeItems(725, 932);
    makeItems(60, 1280);

    makeItems(1470, 802);
    makeItems(2334, 1230);


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
  const bossRoom = new Room(2700, 750, 4);
  roomArray.push(bossRoom);

  currentRoom = roomArray[0]; // start in first room
  window.scrollTo(currentRoom.x, currentRoom.y);

  for (let i = 0; i < currentEnemies.length; i++) {
    enemyStyles.push(window.getComputedStyle(currentEnemies[i]));
  }

  for (let i = 0; i < tiles.length; i++) {
    tileStyles.push(window.getComputedStyle(tiles[i]));
  }
}
awake();


// happens every 1/10 second.
function update() {
  //* *    ENEMY COLLISION CHECK      */

  for (let i = 0; i < currentEnemies.length; i++) {
    if (xpos < parseInt(enemyStyles[i].getPropertyValue('left'), 10) + parseInt(enemyStyles[i].getPropertyValue('width'), 10)
        && xpos + parseInt(beetleSteve.style.width, 10) > parseInt(enemyStyles[i].getPropertyValue('left'), 10)
        && ypos < parseInt(enemyStyles[i].getPropertyValue('top'), 10) + parseInt(enemyStyles[i].getPropertyValue('height'), 10)
        && parseInt(beetleSteve.style.height, 10) + ypos > parseInt(enemyStyles[i].getPropertyValue('top'), 10)) {
      enemyCollision();
    }
  }

  //* *        ITEM COLLISION CHECK        */
  for (let i = 0; i < roomsItems.length; i++) {
    if (xpos < parseInt(roomsItems[i].style.left, 10) + roomsItemsData[i].width
        && xpos + parseInt(beetleSteve.style.width, 10) > parseInt(roomsItems[i].style.left, 10)
        && ypos < parseInt(roomsItems[i].style.top, 10) + roomsItemsData[i].height
        && parseInt(beetleSteve.style.height, 10) + ypos > parseInt(roomsItems[i].style.top, 10)) {

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
    if (xpos + x < parseInt(tileStyles[i].getPropertyValue('left'), 10) + parseInt(tileStyles[i].getPropertyValue('width'), 10)
        && xpos + x + parseInt(beetleSteve.style.width, 10) > parseInt(tileStyles[i].getPropertyValue('left'), 10)
        && ypos + y < parseInt(tileStyles[i].getPropertyValue('top'), 10) + parseInt(tileStyles[i].getPropertyValue('height'), 10)
        && parseInt(beetleSteve.style.height, 10) + ypos + y > parseInt(tileStyles[i].getPropertyValue('top'), 10)) {
      getOutOfTileBounds(x, y, tileStyles[i]);
    }
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
    checkOpenGate();
  }
}
function checkRoomBounds() {
  if (xpos + 50 > currentRoom.x + currentRoom.width) {
    if (currentRoom.roomNum === 0 || currentRoom.roomNum === 2) {
      currentRoom = roomArray[currentRoom.roomNum + 1];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  } else if (xpos + 50 < currentRoom.x) {
    if (currentRoom.roomNum === 1 || currentRoom.roomNum === 3) {
      currentRoom = roomArray[currentRoom.roomNum - 1];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  } else if (ypos + 130 > currentRoom.y + currentRoom.height) {
    if (currentRoom.roomNum < 2) {
      currentRoom = roomArray[currentRoom.roomNum + 2];
      window.scrollTo(currentRoom.x, currentRoom.y);
    }
  } else if (ypos + 20 < currentRoom.y) {
    if (currentRoom.roomNum >= 2) {
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
 
  if (Math.abs(parseInt(beetleSteve.style.height, 10) + ypos - parseInt(tile.getPropertyValue('top'), 10)) < 20) { // check if beetle steve is above
    while (Math.abs(parseInt(beetleSteve.style.height, 10) + ypos - parseInt(tile.getPropertyValue('top'), 10)) < 20) {
      ypos -= 5;
    }
  } else if (Math.abs(ypos - (parseInt(tile.getPropertyValue('top'), 10) + parseInt(tile.getPropertyValue('height'), 10))) < 20) {
    while (Math.abs(ypos - (parseInt(tile.getPropertyValue('top'), 10) + parseInt(tile.getPropertyValue('height'), 10))) < 20) {
      ypos += 5;
    }
  } else if (Math.abs(xpos + parseInt(beetleSteve.style.width, 10) - parseInt(tile.getPropertyValue('left'), 10)) < 20) {
    while (Math.abs(xpos + parseInt(beetleSteve.style.width, 10) - parseInt(tile.getPropertyValue('left'), 10)) < 20) {
      xpos -= 5;
    }
  } else if (Math.abs(xpos - (parseInt(tile.getPropertyValue('left'), 10) + parseInt(tile.getPropertyValue('width'), 10))) < 20) {
    while (Math.abs(xpos - (parseInt(tile.getPropertyValue('left'), 10) + parseInt(tile.getPropertyValue('width'), 10))) < 20) {
      xpos += 5;
    }
  }


  beetleSteve.style.left = `${xpos}px`;
  beetleSteve.style.top = `${ypos}px`;

}

// determine given arrow key direction, and adjust the values called to 'move' function accordingly
function checkDirection(element) {
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

function checkOpenGate() {
  if (xpos < parseInt(gateTrigger.getPropertyValue('left'), 10) + parseInt(gateTrigger.getPropertyValue('width'), 10)
    && xpos + parseInt(beetleSteve.style.width, 10) > parseInt(gateTrigger.getPropertyValue('left'), 10)
    && ypos < parseInt(gateTrigger.getPropertyValue('top'), 10) + parseInt(gateTrigger.getPropertyValue('height'), 10)
    && parseInt(beetleSteve.style.height, 10) + ypos > parseInt(gateTrigger.getPropertyValue('top'), 10)) {
    if (carriedItems.length > 2) {
      currentRoom = roomArray[4]; // boss room
      window.scrollTo(currentRoom.x, currentRoom.y);
      const endingText = document.querySelector('#endText');
      endingText.innerHTML = `Beetle Steve brought ${carriedItems.length} rocks to a better place.`;
    }
  }
}
