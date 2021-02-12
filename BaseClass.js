class BaseClass{
  constructor(x, y, width, height, angle, color) {
      var options = {
          'isStatic':true,
          'restitution':0.8,
          'friction':1.0,
          'density':1.0
      }
      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.color = color
      //this.image = loadImage("sprites/base.png");
      World.add(world, this.body);
    }
    display(){
      var pos =this.body.position;
      var angle = this.body.angle;
      push();
      //translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      rectMode(CENTER);
      fill(this.color);
      rect(pos.x, pos.y, this.width, this.height);
      //imageMode(CENTER);
      //image(this.image, 0, 0, this.width, this.height);
      pop();
    }
}