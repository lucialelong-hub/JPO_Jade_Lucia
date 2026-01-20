let cam;
let s=0;
let precision=4; //échantillonnage caméra
let augmentation = 0;

let mouvement;

let count = 0;

let color1;
let color2;
let color3;
let color4;
let color5;




let imgPrecedente;

function preload(){
}

function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER)
  textAlign(CENTER,CENTER)
textSize(20)

  //récupération de la vidéo
  cam = createCapture(VIDEO,{ flipped:true });

  imgPrecedente = cam.get();

  color1 = color(random(255),random(255),random(255))
                            color2 = color(random(255),random(255),random(255))
                            color3 = color(random(255),random(255),random(255))
                            color4 = color(random(255),random(255),random(255))
                            color5 = color(random(255),random(255),random(255))

    rectMode(CENTER)

  noStroke()

  cam.size(640, 480);
  cam.hide();
  pixelDensity(0.7)
}

function draw() {

if (count<=99){

    count++
} else {
    count = 0;
}
    background(0)
//background(102, 240, 255)

mouvement = mouvementDetect(cam,imgPrecedente,30,3)
augmentation += mouvement;

augmentation = constrain(augmentation, 0, 45);

print(augmentation);

cam.loadPixels();
let largeurVideo = cam.width;
let hauteurVideo = cam.height; 

     for (let x = 0; x < largeurVideo; x+=precision) {
        for (let y = 0; y < hauteurVideo; y+=precision-1) {
        


            let pixel =  getPixel(x,y,cam)
      
            
            //let c = getPixel(x,y,cam) ///réutilisation de la fonction
            //fill((frameCount+100)%360,80,50)
            

            let xConverti = map(x,0,largeurVideo,0,height)
            let yConverti = map(y,0,hauteurVideo,0,height)


            
            

            if (xConverti<width && yConverti<height && pixel[1]>200) {
                //fill(224, 76, 76);
                fill(color1)

            } else if (xConverti<width && yConverti<height && pixel[1]>150) {
                //fill(145, 38, 126)
                fill(color2)

            } else if (xConverti<width && yConverti<height && pixel[1]>100) {
                //fill(181, 207, 143)
                fill(color3)

            } else if (xConverti<width && yConverti<height && pixel[1]>50) {
                //fill(100, 123, 217)
                fill(color4)

            } else {
                //fill(57, 163, 75)
                fill(color5)
            }
            
            push()
            translate(xConverti,yConverti)
            
            if(pixel[1]<50){
              //stroke(255,0,255)
            rotate(augmentation)
            
            }

            square(0,0,18-augmentation*0.1)
            pop()

            if (xConverti<width && yConverti<height && pixel[1]>200 && pixel[1]<220 ) {
                //fill(224, 76, 76);
                fill(color2)
                text('*', xConverti, yConverti)

            } else if (xConverti<width && yConverti<height && pixel[1]>150 && pixel[1]<170) {
                //fill(145, 38, 126)
                fill(color3)
                text('*', xConverti, yConverti)

            } else if (xConverti<width && yConverti<height && pixel[1]>100 && pixel[1]<120) {
                //fill(181, 207, 143)
                fill(color4)
                text('*', xConverti, yConverti)

            } else if (xConverti<width && yConverti<height && pixel[1]>50 && pixel[1]<70) {
                //fill(100, 123, 217)
                fill(color5)
                text('*', xConverti, yConverti)

            }


            
            /*
            let opacity = map(c[1],255,0,20,300)
            let taille = map(c[1],255,0,25,-5)


            fill(200,augmentation,10,opacity)
            square(xConverti,yConverti+random(augmentation),taille)
            */
            

            
    }
    }
    /*
    fill(200,30,32)
    ellipse(width/2,height/2,augmentation)
    */


     imgPrecedente = cam.get();

     

            if (count==100) {
                            color1 = color(random(255),random(255),random(255))
                            color2 = color(random(255),random(255),random(255))
                            color3 = color(random(255),random(255),random(255))
                            color4 = color(random(255),random(255),random(255))
                            color5 = color(random(255),random(255),random(255))
            }

}


/////////////////////////////NE PAS TOUCHER !!!
function getPixel(x, y, img) {
  let i = 4 * (y * img.width + x);
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3]
  ];
}


function mouvementDetect(_cam,_previousFrame,threshold,vitesse){
    precisionAnalyse = 10
      _cam.loadPixels();//ajouter
  _previousFrame.loadPixels(); //ajouter
      let diffGlobale = 0;
    for (let y = 0; y < _cam.height; y += precisionAnalyse) {
    for (let x = 0; x < _cam.width; x += precisionAnalyse) {
     let pixel =  getPixel(x,y,_cam)
      let r1 = pixel[0];
      let g1 = pixel[1];
      let b1 = pixel[2];

    let pixel2 =  getPixel(x,y,_previousFrame)
      let r2 = pixel2[0];
      let g2 = pixel2[1];
      let b2 = pixel2[2];

      let diff = dist(r1, g1, b1, r2, g2, b2);

      if (diff > threshold) {
        diffGlobale += diff;
      }
    }
    
  }

  let aug = map(diffGlobale, 0, cam.width * cam.height/precisionAnalyse, -vitesse,vitesse);

 aug = constrain(aug,-vitesse,vitesse)
  return aug


}