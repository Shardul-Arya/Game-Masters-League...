class Hoop extends BaseClass{
    constructor(x,y, width,height,angle, color){
      super(x,y,width,height,angle, color);
      //this.image = loadImage("sprites/wood2.png");
      Matter.Body.setAngle(this.body, angle);
    }
  }