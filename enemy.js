function Enemy(xPos, yPos, maxWalkDistance, changeInterval, divElement) {
  this.xpos = xPos;
  this.ypos = yPos;
  this.maxWalkDistance = maxWalkDistance;
  this.changeInterval = changeInterval;
  this.movingLeft = false;
  this.divElement = divElement;
  speed = 14;

  console.log(this.divElement.style);
  // setInterval(moveLeftRight,100);
  // setInterval(changeDirection,this.changeInterval)

  function changeDirection() {
    if (this.movingLeft) {
      this.movingLeft = false;
    } else {
      this.movingLeft = true;
    }
  }

  // function moveLeftRight(){
  //     console.log("moveLeftRight() activated!")
  //     let targetPos = this.xpos + this.maxWalkDistance;
  //     if(this.movingLeft){
  //         if(this.xpos > this.targetPos){//reached targest destination
  //             this.targetPos = this.xpos-this.maxWalkDistance;
  //             this.movingLeft = true;
  //         }else{
  //             this.xpos-= this.speed;
  //         }
  //         console.log("moving left..." + divElement);
  //         this.divElement.style.left = this.xpos + "px";
  //     }
  //     else{
  //         if(this.xpos > this.targetPos){//reached targest destination
  //             this.targetPos = this.xpos-this.maxWalkDistance;
  //             this.movingLeft = true;
  //         }else{
  //             this.xpos+= this.speed;
  //         }
  //         console.log("moving right..." + divElement);

  //         this.divElement.style.left = this.xpos + "px";
  //     }
  // }
}
