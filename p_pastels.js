/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Basic particles with an attraction force
 */

class PastelSystem extends ParticleSystem {
  
  static label = "🍭"; // Ignore the Glitch parse error
  static desc = "chaotic pastels jumping around the screen"; // Ignore the Glitch parse error
  
  
  constructor() {
    // Make what particle, and how many?
    // Try different numbers of particles
    super(BasicParticle, 200);
   
  }
  
  draw(p) {
    // A little bit of trails!
    p.background(0, 0, 50, 1)
    
    // The "super-class" draws the particles
     super.draw(p)
   
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class BasicParticle extends Particle {
  constructor(ps, index) {
    // ps: the particle system this particle belongs to
    // index: of all the particles in that system, this one's index
    super(ps, index);
    
    
    // Where should these particles start?
    // Lets use a polar coordinate to start them in a spiral
    // (and move them to the center)
    let r = 10 + index*2
    let theta = index*.3
    this.pos.setToPolar(r, theta).add(p.width/4, p.height/4)
    
    
    // We can also store other information about a particle, like its size or color
    this.hue = (index*50)%360
    this.radius = 30
    
    // Here's a new Vector2D we can store a force in so we can visualize it later
    this.attractionForce = new Vector2D()

  }

  calculateForces(p, dt) {
    
    // What forces do we want to apply to this particle?
   // We can attract it to the center
   // let center = new Vector2D(p.width/4, p.height/2)
    // this.attractionForce = this.pos.getForceTowardsPoint(center, 1, { falloff:1 } )
    
    // We can also make it attracted to the mouse
    let mouse = new Vector2D(p.mouseX, p.mouseY)
    // // What happens if I change the falloff? 1 is linear, 2 is quadratic
    this.attractionForce = this.pos.getForceTowardsPoint(mouse, .1, { falloff:1.8 } )
   this.v.mult(.99)
    
    // Whatever force we use, we won't see anything unless it is 
    // added to the particle's main force, which gets added to the velocity
    this.f.add(this.attractionForce)

  }


  draw(p, drawDebug = false) {
  
    let t = p.millis() * 0.001;
    
    p.noStroke()
    p.fill(this.hue, 200, 90)
    p.rect(...this.pos, this.radius * 2, this.radius)
    p.fill(this.hue, 170, 80)
    p.rect(...this.pos, this.radius * 2, this.radius*.7)
    
    if (drawDebug) {
      this.pos.drawArrow(p, this.attractionForce, {m: 1})
    }
    
  }
}
