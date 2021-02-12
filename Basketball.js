class Basketball{
  constructor(x, y) {
      var options = {
          restitution:0.8,
          friction:1.0,
          density:1.0
      }
      this.body = Bodies.circle(x, y, 15, options);
      this.radius = 15
      World.add(world, this.body);
    }
    display(){
      var pos =this.body.position;
      //var angle = this.body.angle;
      push();
      //translate(pos.x, pos.y);
      //rotate(angle);
      ellipseMode(CENTER);
      fill("orange");
      ellipse(pos.x, pos.y, 30);
      pop();
    }
}