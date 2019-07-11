
const beetleSteve = document.querySelector("#beetle-steve");
let currentEnemies = document.querySelectorAll(".enemy");
const enemyStyles = [];
let roomsItemsData = [];
const tiles = document.querySelectorAll(".treeBarrier");
let roomsItems;
let speedX = 14;
let speedY = 14;
const carriedItems = [];

let xpos = 0;
let ypos = 0;


let currentlyHeldItems = 0;



setInterval(update,100);

//debug enemy check


window.addEventListener("keydown", checkDirection)

//happens at the start of page load
function awake(){
    for(let i = 0; i < 1; i++){
        let newItem = new Item(300 +(i*140),40,100,100)
        roomsItemsData.push(newItem)

        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.style.left = newItem.x + "px";
        newDiv.style.top = newItem.y + "px";
        newDiv.style.width = newItem.width;
        newDiv.style.height = newItem.height;
        document.body.appendChild(newDiv);


        beetleSteve.style.height = 150 + "px";
        beetleSteve.style.width = 130 + "px";


    }
    roomsItems = document.querySelectorAll(".item"); //keep track of items
    //creation of enemy
    
    // let enemyDiv = document.createElement("div");
    // let newEnemy = new Enemy(400,30,300,3000,enemyDiv);
    // enemyDiv.classList.add("enemy");
    // enemyDiv.style.top = newEnemy.y + "px";
    // enemyDiv.style.left = newEnemy.x + "px";
    // currentEnemies.push(newEnemy);

    // document.body.appendChild(enemyDiv);

    for(let i = 0; i < currentEnemies.length; i++){
        enemyStyles.push(window.getComputedStyle(currentEnemies[i]));
        console.log("Enemy width: "+ enemyStyles[i].getPropertyValue("width"));
    }



    //**Debug tile elements check */
     for(let i = 0; i<tiles.length;i++){
            //inititalizing the css properties here seems to be necessary in order to check the properties later
         tiles[i].style.width = 400 + "px";
         tiles[i].style.left = 0 + "px";
         tiles[i].style.height = 200 + "px";
         tiles[i].style.top = 200 + "px";


        console.log("tile x: " + tiles[i].style.left);
        console.log("tile width: " + tiles[i].style.width);
     }

     console.log("Beetle Steve height" + beetleSteve.style.height);
}
awake();


//happens every 1/10 second.
function update(){
    //**    ENEMY COLLISION CHECK      */
    
    for(let i = 0; i<currentEnemies.length;i++){
        // console.log(enemyStyles[i].getPropertyValue("left"));
        if (xpos < parseInt(enemyStyles[i].getPropertyValue("left")) + parseInt(enemyStyles[i].getPropertyValue("width")) &&
        xpos + parseInt(beetleSteve.style.width) > parseInt(enemyStyles[i].getPropertyValue("left")) &&
        ypos < parseInt(enemyStyles[i].getPropertyValue("top")) + parseInt(enemyStyles[i].getPropertyValue("height")) &&
        parseInt(beetleSteve.style.height) + ypos > parseInt(enemyStyles[i].getPropertyValue("top"))) {
            console.log("ENEMY Collision Happened!!!!!!! :D")

        }
      
    }

    //**        ITEM COLLISION CHECK        */
    for(let i = 0; i<roomsItems.length;i++){
  
    if (xpos < parseInt(roomsItems[i].style.left) + roomsItemsData[i].width &&
        xpos + parseInt(beetleSteve.style.width) > parseInt(roomsItems[i].style.left) &&
        ypos < parseInt(roomsItems[i].style.top) + roomsItemsData[i].height &&
        parseInt(beetleSteve.style.height) + ypos > parseInt(roomsItems[i].style.top)) {
        console.log("Collision Happened!!!!!!! :D")

        gatherItem(roomsItems[i]);
     }
     

     //tile collision
    //  for(let i = 0; i < tiles.length; i++){
    //     while (xpos  < parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width) &&
    //     xpos + beetleSteve.style.width > tiles[i].style.left &&
    //     ypos  < parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height) &&
    //     beetleSteve.style.height + ypos > tiles[i].style.top) {
    //     console.log("TILE Collision Happened!!!!!!! :D")
        
    //     if(xpos  < parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width)){
    //         xpos = parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width);
    //     }else if(xpos + beetleSteve.style.width > tiles[i].style.left){
    //         xpos = beetleSteve.style.width > tiles[i].style.left;
    //     }else if( ypos  < parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height)){
    //         ypos = parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height);
    //     }else if(beetleSteve.style.height + ypos > tiles[i].style.top){
    //         ypos = tiles[i].style.top - beetleSteve.style.height ;
    //     }

    //     beetleSteve.style.left = xpos  +"px";
    //     beetleSteve.style.top = ypos  +"px";
    //  }
    // }
     //else{
    //     console.log("-----------------------")
    //     console.log(xpos < parseInt(roomsItems[i].style.left) + roomsItemsData[i].width); 
    //     console.log(xpos + beetleSteve.style.width > roomsItems[i].style.left);
    //     console.log(ypos < parseInt(roomsItems[i].style.top) + roomsItemsData[i].height);
    //     console.log(beetleSteve.style.height + ypos > roomsItems[i].style.top);
    // }
  }
    
}









function move(x,y){
    let canMove = true;
    
    

    for(let i = 0; i < tiles.length; i++){
        if (xpos + x < parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width) &&
        xpos + x + parseInt(beetleSteve.style.width) > parseInt(tiles[i].style.left) &&
        ypos + y < parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height) &&
        parseInt(beetleSteve.style.height) + ypos + y> parseInt(tiles[i].style.top)) {
        console.log("TILE Collision Happened!!!!!!! :D")
        // canMove = false;
        getOutOfTileBounds(x,y,tiles[i].style);   
        }
        //  }else{
    //      console.log("-------");
    //      console.log(xpos + x < parseInt(tiles[i].style.left) + parseInt(tiles[i].style.width));
    //      console.log(xpos + x + parseInt(beetleSteve.style.width) > parseInt(tiles[i].style.left));
    //      console.log(ypos + y < parseInt(tiles[i].style.top) + parseInt(tiles[i].style.height));
    //      console.log(parseInt(beetleSteve.style.height) + ypos + y> parseInt(tiles[i].style.top));
    //  }
    }

    if(canMove){
        xpos += x;
        ypos += y;
        beetleSteve.style.left = xpos  +"px";
        beetleSteve.style.top = ypos  +"px";
        console.log(beetleSteve.style.left);
    }
}

function getOutOfTileBounds(x,y,tile){
    // while (xpos < parseInt(tile.left) + parseInt(tile.width)){
    //     xpos += 5;
    // } 
    // while(xpos + beetleSteve.style.width > parseInt(tile.left)){
    //         xpos -= 5;
    // }while(ypos  < parseInt(tile.top) + parseInt(tile.height)){
    //         ypos +=5;
    // } 
    console.log(parseInt(beetleSteve.style.height) + ypos - parseInt(tile.top));
    console.log(ypos  - (parseInt(tile.top) + parseInt(tile.height)));
    console.log(xpos + parseInt(beetleSteve.style.width) - parseInt(tile.left));
    console.log(xpos - (parseInt(tile.left) + parseInt(tile.width)));
    if(Math.abs(parseInt(beetleSteve.style.height) + ypos - parseInt(tile.top)) < 20){ //check if beetle steve is above
        while(parseInt(beetleSteve.style.height) + ypos > parseInt(tile.top)){
                ypos -=5;
        }
    }else if(Math.abs(ypos  - (parseInt(tile.top) + parseInt(tile.height))) < 20){
        while(ypos  < parseInt(tile.top) + parseInt(tile.height)){
                    ypos +=5;
        }
    }else if(Math.abs(xpos + parseInt(beetleSteve.style.width) - parseInt(tile.left)) < 20){
        while(xpos + parseInt(beetleSteve.style.width) > parseInt(tile.left)){
                    xpos -= 5;
            }
    } else if(Math.abs(xpos - (parseInt(tile.left) + parseInt(tile.width))) < 20){
        while (xpos < parseInt(tile.left) + parseInt(tile.width)){
                xpos += 5;
            } 
    }
      

        beetleSteve.style.left = xpos  +"px";
        beetleSteve.style.top = ypos  +"px";
     
     console.log("getOutOfTileBOundns() ended.....")
}

//determine given arrow key direction, and adjust the values called to 'move' function accordingly
function checkDirection(element){
    console.log("check direction activate:" + element.keyCode)
    element.preventDefault(); //prevent user from scrolling the page using arrow keys
    if(element.keyCode === 39){//right arrow
        move(speedX,0);
    }else if(element.keyCode === 37){//left arrow
        move(speedX*(-1),0);
    }else if(element.keyCode === 40){//down arrow
        move(0,speedY)
    }else if(element.keyCode === 38){//up arrow
        move(0,(speedY*-1));
    }
}


//Activated when collided with item. Adds item to heldItems and 'attatches' new item to beetleSteve div.
function gatherItem(item){
    console.log("gatherItem() called!  ---")
    currentlyHeldItems++;
    item.style.top = 30 +(30*carriedItems.length); //items pile on each other
    item.style.left = 0;
    beetleSteve.appendChild(item);
    carriedItems.push(item);
}


function Item(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}