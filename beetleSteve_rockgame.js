
const beetleSteve = document.querySelector("#beetle-steve");
let currentEnemies = [];//document.querySelectorAll(".enemy");
let roomsItems = [];
let speedX = 14;
let speedY = 14;

let xpos = 0;
let ypos = 0;


let currentlyHeldItems = 0;



setInterval(update,100);

//debug enemy check


window.addEventListener("keydown", checkDirection)

//happens at the start of page load
function awake(){
    /*for(let i = 0; i < 40; i++){
        let newItem = new Item(30 +(i*20),400,100,100)
        roomsItems.push(newItem)

        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.style.left = newItem.x + "px";
        newDiv.style.top = newItem.y + "px";

        document.body.appendChild(newDiv);

    }*/
    
    //creation of enemy
    
    let enemyDiv = document.createElement("div");
    let newEnemy = new Enemy(400,30,300,3000,enemyDiv);
    enemyDiv.classList.add("enemy");
    enemyDiv.style.top = newEnemy.y + "px";
    enemyDiv.style.left = newEnemy.x + "px";
    currentEnemies.push(newEnemy);

    document.body.appendChild(enemyDiv);
}
awake();


//happens every 1/10 second.
function update(){

    // for(let i = 0; i<currentEnemies.length;i++){
    //       console.log("enemy x:" + currentEnemies[i].style.left);
    //     if (beetleSteve.style.left < currentEnemies[i].style.left + currentEnemies[i].style.width &&
    //         beetleSteve.style.left + beetleSteve.style.width > currentEnemies[i].style.left &&
    //         beetleSteve.style.top < currentEnemies[i].style.top + currentEnemies[i].style.height &&
    //         beetleSteve.style.height + beetleSteve.style.top > currentEnemies[i].y) {
    //             console.log("Collision Happened!!!!!!! :D")
    //     }else{
    //         // console.log("no collision :(" + element.style.left +" "+ beetleSteve.style.left + " ");
    //     }
    // }
    for(let i = 0; i<roomsItems.length;i++){
        console.log("item x:" + roomsItems[i].x);
      if (xpos < roomsItems[i].x + roomsItems[i].width &&
          xpos + beetleSteve.style.width > roomsItems[i].x &&
          ypos < roomsItems[i].y + roomsItems[i].height &&
          beetleSteve.style.height + ypos > roomsItems[i].y) {
              console.log("Collision Happened!!!!!!! :D")
      }else{
          console.log("--------------------")
          console.log(xpos < roomsItems[i].x + roomsItems[i].width );
          console.log( xpos + beetleSteve.style.width > roomsItems[i].x );
          console.log( ypos < roomsItems[i].y + roomsItems[i].height );
          console.log(beetleSteve.style.height + ypos > roomsItems[i].y);
          // console.log("no collision :(" + element.style.left +" "+ beetleSteve.style.left + " ");
      }
  }
    
}









function move(x,y){
    xpos += x;
    ypos += y;
    beetleSteve.style.left = xpos  +"px";
    beetleSteve.style.top = ypos  +"px";
    console.log(beetleSteve.style.left);
    /*for(let i = 0; i < currentEnemies.length;i++){
         console.log("enemy:" +currentEnemies[i].style.left);
    }*/
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
    currentlyHeldItems++;
    item.style.top = beetleSteve.style.top;
    item.style.left = beetleSteve.style.left;
    beetleSteve.appendChild(item);
    
}


function Item(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}