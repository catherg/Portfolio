const GENERATORS = {
  
  circle: {
    description: "circle makes circles.",
    sliders: ["size", "aspectRatio", "angle", "hue", "brightness"],
    landmarks: {
      golfball: [0.04, 0.38, 0.8, 0.06, 0.64],
      basketball: [0.27, 0.74, 0.04, 0.64, 0.35],
    },
    setup(p) {},

    drawBackground(p) {
      p.background(0, 50, 50);
    },

    draw(p, t, dna) {
      let x = 0;
      let y = 0;

      // How to access DNA
      let size = dna[0]; // 0-1
      size = size * 30 + 10;
      p.fill(100);
      p.circle(0, 0, size);
    },
  },
  
  
  
  ellipse_layers: {
    description: "a flower landscape where you can layer ellipses and make patterns",
    sliders: ["horizontal-ellipse", "inner-vertical-ellipse", "move-ellipse", "color", "brightness"],
    landmarks: {
      eyeball: [0.22, 0.11, 0.20, 0.51, 0.18],
      cross_ellipse: [0.60, 0.52, 1.00, 0.68, 0.18],
      flower_stem: [0.95, 0.24, 0.20, 0.32, 0.18],
      extended_petal: [0.95, 0.11, 0.20, 0.80, 0.38],
      red_eye: [0.40, 0.00, 0.20, 0.96, 0.00],
    },
    setup(p) {

      // Use the function to draw *many* flowers!
      function drawFlower(hue, count) {
        let petalLength = 100;
        let petalWidth = 40;
        let dTheta = (2 * Math.PI) / count;

        p.noStroke();

        // Draw a flower by rotating before drawing each petal
        for (let i = 0; i < count; i++) {
          p.push();
          p.rotate(i * dTheta);

          p.fill(hue, 100, 50);
          p.ellipse(petalLength * 0.5, 0, petalLength, petalWidth);

          // Petal highlight
          p.fill(hue, 100, 70);
          p.ellipse(petalLength * 0.4, 0, petalLength * 0.6, petalWidth * 0.6);

          p.pop();
        }

        p.fill(50, 100, 50);
        p.circle(0, 0, 40);
      }

      // Use the function to draw *many* flowers!
      let flowerCount = 20;
      for (let i = 0; i < flowerCount; i++) {
        p.push();

        // Draw from back to front, and make "closer" flowers bigger and lower down
        let x = Math.random() * p.width;
        let y = i * 10;
        let size = 0.1 + i * 0.03;

        p.translate(x, y);
        p.scale(size);
        let hue = (Math.random() * 120 + 200) % 360;
        let petalCount = Math.floor(Math.random() * 10 + 5);
        drawFlower(hue, petalCount);

        p.pop();
      }
    },
    
    drawBackground(p) {
      /*p.background("fuchsia");*/
  
       // let hue = (Math.random() * 120 + 100) % 60;
      
    },

    draw(p, t, dna) {
      let x = 0;
      let y = 0;
      let noiseScale = 0.01;
      let angle = dna[2] - 0.5;

      // How to access DNA
      let size = dna[0]; // 0-1
      let hue = dna[3] * 360;
      let aspectRatio = dna[1] + 0.6;
      let w = size * aspectRatio;
      let h = size * (aspectRatio) * 2;
      let brightness = dna[4] * 40 + 40;
      size = size * 50 + 10;
      p.push();
      p.rotate(angle);
      p.fill( hue % 360, brightness * 1.3, 50);
      p.ellipse(0, 0, w * 20, h * 40);

      p.pop();
    },
  },

  flower_creator: {
    description:
      "Control circles to make flowers and different shapes",
    sliders: ["size", "diagonal-up", "angle", "hue", "diagonal-down", "outside-size"],
    landmarks: {
      sun: [1.00, 1.00, 1.00, 0.20, 0.18, 1.00],
      flower: [0.76, 0.00, 1.00, 0.92, 0.00, 0.76],
      bubbles: [0.78, 0.11, 0.20, 0.51, 0.00, 0.18],
      big_flower: [0.78, 0.11, 0.20, 0.14, 0.00, 1.00],
      blue_heart: [0.38, 0.00, 1.00, 0.68, 0.00, 0.08],
    },
    setup(p) {},
    
    drawBackground(p, t) {
      p.background(0, 0, 0);
      
      for (var j = 0; j < 5; j++) {
        p.fill(250 + j * 10, 70, 70, 0.9);
        p.beginShape();
        let y = 100;
        p.vertex(0, 0);
        p.vertex(0, 0);
        p.vertex(0, y);
        // Ripply vertices
        let waveCount = 10;
        for (var i = 0; i < waveCount; i++) {
          let x = (i + 0.8) * (p.width / waveCount);
          let y2 = y + 100 * p.noise(i, t + j * 180);
          p.curveVertex(x, y2 * 1.4);
        }
        p.vertex(p.width * 2, y * 3);
        p.vertex(p.width, 0);
        p.vertex(p.width, 0);
        p.endShape();
      }
      
      for (var j = 0; j < 5; j++) {
        p.fill(20 + j * 10, 70, 70, 0.5);
        p.beginShape();
        let y = 100;
        p.vertex(0, 0);
        p.vertex(0, 0);
        p.vertex(0, y);
        // Ripply vertices
        let waveCount = 10;
        for (var i = 0; i < waveCount; i++) {
          let x = (i + 0.8) * (p.width / waveCount);
          let y2 = y + 100 * p.noise(i, t + j * 180);
          p.curveVertex(x, y2);
        }
        p.vertex(p.width * 2, y * 3);
        p.vertex(p.width, 0);
        p.vertex(p.width, 0);
        p.endShape();
      }
      
      for (var j = 0; j < 5; j++) {
        p.fill(140 + j * 10, 70, 70, 0.5);
        p.beginShape();
        let y = 100;
        p.vertex(0, 0);
        p.vertex(0, 0);
        p.vertex(0, y);
        // Ripply vertices
        let waveCount = 10;
        for (var i = 0; i < waveCount; i++) {
          let x = (i + 0.8) * (p.width / waveCount);
          let y2 = y + 100 * p.noise(i, t + j * 180);
          p.curveVertex(x, y2 * 0.5);
        }
        p.vertex(p.width, y);
        p.vertex(p.width, 0);
        p.vertex(p.width, 0);
        p.endShape();
      }
  
    },

    draw(p, t, dna) {
      let x = 0;
      let y = 0;

      //let size = dna[0] * 60 + 40;
      let translate = dna[1] * 20 + 20;
      let angle = dna[2] - 0.5;

      // How about a little bounce at least?
      // let bounce = Math.abs(Math.sin(t * 3));
      // aspectRatio += 0.2 + -0.5 * bounce;
      // let stickiness = 0.2;
      // let jumpHeight = 40;
      // y -= Math.max(
      //   0,
      //   jumpHeight * (Math.abs(Math.sin(t * 3 + 0.2)) - stickiness)
      // );
      // angle = p.lerp(0, angle, bounce);

      //let w = size * aspectRatio;
      //let h = size * (1 / aspectRatio);

      let hue = dna[3] * 360;
      let x_control = dna[4] * 60 + 40;
      let fishSize = dna[0] * 20 + 10;
      let outside = dna[5] * 20 + 5;

     // p.push();

      // move the rectangle
     // p.translate(x, y);
      p.rotate(angle);

    //  p.stroke(hue, 100, brightness + 30);
  
     // p.ellipse(-w / 2, 0, w /6, -h * 4);
      p.push();
      p.translate(-translate * 2, -translate * 3);
      p.fill(hue, 100, 80);
      p.circle(-x_control, 0, fishSize * 1.3);
      p.fill(hue, 100, 90);
      p.stroke(hue, 100,  30);
      p.fill(hue, 100, 70);
      p.circle(-x_control + 40, 0, fishSize * 0.5);
      p.circle(-x_control + 35, 20, outside);
      p.circle(-x_control + 30, 40, fishSize * 0.5);
      p.circle(-x_control + 10, 40, outside);
      p.circle(-x_control - 10, 10, fishSize * 0.5);
      p.circle(-x_control - 40, 5, outside);
      p.circle(-x_control - 40, 20, fishSize * 0.5);
      p.circle(-x_control - 30, 30, outside);
      p.circle(-x_control - 20, 40, fishSize * 0.5);
      p.circle(-x_control - 10, -10, outside);
      p.circle(-x_control, -40, fishSize * 0.5);
      p.circle(-x_control - 20, -25, outside);
      p.circle(-x_control - 40, -15, fishSize * 0.5);
      p.circle(-x_control + 20, -30, outside);
      p.circle(-x_control + 30, -30, fishSize * 0.5);
      p.fill(hue, 100, 50);
      p.circle(-x_control, 0, fishSize);
      p.fill(100);
      p.circle(0.5, -1.5, 2);
      
     

      p.pop();

      // Steal this eyecode!
      // eyes!
     // let eyeWidth = w * 0.3;
    //  let eyeHeight = h * 0.5;
    //  let eyeSize = 10;
     // let eyeColor = [hue, 100, brightness + 20];

      // Only two eyes....?
      // drawEye(p, {
      //   x: eyeWidth,
      //   y: -eyeHeight,
      //   eyeSize: eyeSize,
      //   innerColor: eyeColor,
      // });
      // drawEye(p, {
      //   x: -eyeWidth,
      //   y: -eyeHeight,
      //   eyeSize: eyeSize,
      //   innerColor: eyeColor,
      // });

      p.pop();
    },
  },
  /*

  fish: {
    description: "Fish made with polar coordinates",
    sliders: [
      "size",
      "complexity",
      "deformation",
      "hue",
      "hueOffset",
      "lumps",
      "streamline",
    ],
    landmarks: {
      durian: [1.0, 1.0, 0.04, 0.18, 0.35, 0.31, 0.34],
      pepita: [0.14, 0.68, 0.04, 0.38, 0.8, 0.06, 0.64],
      leaf: [0.68, 0.1, 1.0, 0.34, 0.8, 1.0, 0.0],
      cherry: [0.68, 0.23, 0.76, 0.01, 0.16, 0.18, 0.21],
    },
    setup(p) {},

    drawBackground(p, t) {
      p.background(240, 30, 60);

      p.noStroke();

      for (var j = 0; j < 5; j++) {
        p.fill(170 + j * 10, 70, 40, 0.3);
        p.beginShape();
        let y = 100;
        p.vertex(0, 0);
        p.vertex(0, 0);
        p.vertex(0, y);
        // Ripply vertices
        let waveCount = 10;
        for (var i = 0; i < waveCount; i++) {
          let x = (i + 0.5) * (p.width / waveCount);
          let y2 = y + 100 * p.noise(i, t + j * 10);
          p.curveVertex(x, y2);
        }
        p.vertex(p.width, y);
        p.vertex(p.width, 0);
        p.vertex(p.width, 0);
        p.endShape();
      }
    },

    draw(p, t, dna, index) {
      p.push();

      // Move the fish around a bit

      p.translate(0, -100 + 100 * p.noise(0.2 + t + index));
      p.rotate(1 * p.noise(0.3 * t + index) - 0.5);

      let fishSize = dna[0] * 20 + 10;

      let pointCount = dna[1] * 20 + 3;

      let deformation = dna[2];

      let hue = dna[3];
      let hueOffset = dna[4] - 0.5;
      let lumps = dna[5];
      let streamline = dna[6];

      // Make the point on the body
      let bodyPoint = (r, theta, index) => {
        // Make every other point lumpy

        r *= 1 + lumps * (index % 2);
        let bp = Vector2D.polar(r, theta);

        // Use noise to offset each point
        let defR = 0.2 * r * deformation;
        let scale = 0.1;
        let defTheta = 20 * p.noise((bp[0] * scale, bp[1] * scale + t * 0.3));

        // Sweep the body back
        bp[0] += 1.5 * streamline * Math.abs(bp[1]);
        bp.addPolar(defR, defTheta);
        return bp;
      };

      // Draw a blobby shape, actually draw 3 shapes on top of each other
      for (var i = 0; i < 3; i++) {
        let size = fishSize * (1 - i * 0.2);
        p.fill(((hue + 0.2 * i * hueOffset) % 1) * 360, 100, 50 - i * 10, 1);
        p.beginShape();
        for (var j = 0; j < pointCount + 2; j++) {
          // get the point on this body
          let theta = (j * Math.PI * 2) / pointCount;
          let bp = bodyPoint(size, theta, j);
          p.curveVertex(...bp);
        }

        p.endShape();
      }

      // Draw an eye
      p.push();
      p.translate(-fishSize * 0.5, -fishSize * 0.4);
      p.fill(0);
      p.circle(0, 0, 4);
      p.fill(80);
      p.circle(1, 1.8, 1);
      p.fill(100);
      p.circle(0.5, -1.5, 2);
      p.pop();

      p.pop();
    },
  },
  */
  /*
  //   EXPERIMENT IN MASKING, UNDER CONSTRUCTION - KATE
  planet: {
    description: "circle makes circles.",
    sliders: [
      "size",
      "saturation",
      "angle",
      "hue",
      "moonCount",
      "moonTuning",
      "moonHueOffset",
    ],
    landmarks: {
      jupiter: [0.95,0.11,0.20,0.00,0.54,0.78,0.73],
      saturn: [0.26,0.96,0.49,0.28,0.51,0.87,0.54],
      mercury: [0.00,0.74,0.46,0.80,0.00,0.09,0.27],
      rainbowPlanet: [0.00,1.00,0.20,0.46,1.00,0.78,1.00],
      earth: [0.16,0.70,0.20,0.36,0.10,0.78,0.00],
    },

    drawBackground(p) {
      p.background(240, 20, 30);
    },

    setup(p, dna) {
      // Give this dna (a normal array of floats)
      // also two p5 images that it can draw with

      const SUBIMAGE_SIZE = 128;
      dna.mask = p.createGraphics(SUBIMAGE_SIZE, SUBIMAGE_SIZE);
      dna.mask.circle(
        SUBIMAGE_SIZE * 0.5,
        SUBIMAGE_SIZE * 0.5,
        SUBIMAGE_SIZE * 0.95
      );

      dna.img = p.createGraphics(SUBIMAGE_SIZE, SUBIMAGE_SIZE);
      dna.img.colorMode(p.HSL, 360, 100, 100);
    },

    draw(p, t, dna) {
      const SUBIMAGE_SIZE = 128;
      let hue = (140 * p.noise(t * 0.2) + dna[3] * 360)
      let sat = (dna[1]*1.5)*100


      function drawMoons({ behind }) {
        let yScale = 0.3;
        let moonCount = Math.floor(dna[4] * 10);
        // Parametric equation for an ellipse

        let r = 70;

        function drawMoon(index) {
          // Different sized moons
          let moonRadius = 5 + 4 * Math.sin(index);
          let moonSpeed = 2 * p.noise(index + dna[5]) + 0.15;
          let moonHue = (hue + 100*dna[6]*Math.sin(index))%360;
          let theta = t * moonSpeed + index;
          let moonOrbit = r * (1 + index * 0.1);
          let x = moonOrbit * Math.cos(theta);
          let y = moonOrbit * Math.sin(theta) * yScale;

          p.noFill();
          p.stroke(100, 0, 100, 0.2);
          //         Draw the front or back half of the arc
          if (behind)
            p.arc(0, 0, moonOrbit, moonOrbit * yScale, Math.PI, 0, p.OPEN);
          else p.arc(0, 0, moonOrbit, moonOrbit * yScale, 0, Math.PI, p.OPEN);

          // Only draw the circle if we are on the
          // correct half of the cycle for this side
          if (behind === y < 0) {
            p.noStroke();
            p.fill(moonHue, 100, 50);
            p.circle(x, y, moonRadius);
            p.fill(moonHue, 100, 70);
            p.circle(x - 1, y - 1, moonRadius * 0.6);
          }
        }

        for (var i = 0; i < moonCount; i++) {
          drawMoon(i);
        }

        p.stroke(100);
        p.noFill();
      }

      function drawImage() {
        let img = dna.img;
        img.background(hue, sat, 20);

        img.fill(hue, 100, 80);
        img.circle(60, 60, 110);

        for (var i = 0; i < 40; i++) {
          let x = p.noise(i * 10 + t * 0.1) * 300 - 100;
          let y = p.noise(i * 30 + t * 0.1) * 300 - 100;
          img.noStroke();

          let hue2 = hue + 70 * p.noise(i);
          let pastel = 70 + 80 * p.noise(i * 10) - .6*sat;
          hue2 % -360;
          img.fill(hue2, sat + 20*Math.sin(i), pastel, 0.2);
          img.circle(x, y, 120);
        }
        return img.get();
      }

      let img = drawImage();

      let size = dna[0] * 0.7 + 0.5;
      let x = 0;
      let y = 0;

      p.push();
      p.translate(0, -100);
      p.rotate(dna[2] * 0.5 - 0.2);

      // //       Show the mask
      // p.image(dna.mask, 0, 0)
      //       // Show the original image
      //       p.image(img, 0, 0)

      // Use the mask to clip off unwanted parts of the image
      img.mask(dna.mask);

      // Draw the part of the moons and rings *behind* the planet
      drawMoons({ behind: true });

      // Draw the newly-masked image
      p.push();
      p.scale(size);
      p.image(img, -SUBIMAGE_SIZE / 2, -SUBIMAGE_SIZE / 2);
      p.pop();

      // Draw the part of the moons and rings *in front of* the planet
      drawMoons({ behind: false });

      p.pop();
    },
  },
  */
};