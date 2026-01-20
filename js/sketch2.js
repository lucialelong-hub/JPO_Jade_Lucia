let cam;
let s=0;
let precision=5; //échantillonnage caméra
let augmentation = 0;
let mouvement;

let imgPrecedente;

function preload(){
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //récupération de la vidéo
  cam = createCapture(VIDEO,{ flipped:true });

  rectMode(CENTER)

  imgPrecedente = cam.get();

  cam.size(640, 480);
  cam.hide();
  pixelDensity(0.7)
}

function draw() {

background(58, 29, 74,70)

mouvement = mouvementDetect(cam,imgPrecedente,10,5)
augmentation += mouvement;
augmentation = constrain(augmentation, 0, 255);
//print(mouvement);

cam.loadPixels();
let largeurVideo = cam.width;
let hauteurVideo = cam.height; 

     for (let x = 0; x < largeurVideo; x+=precision) {
        for (let y = 0; y < hauteurVideo; y+=precision) {
        

            let pixel =  getPixel(x,y,cam)
            let r1 = pixel[0];
            let g1 = pixel[1];
            let b1 = pixel[2];

            let pixel2 =  getPixel(x,y,imgPrecedente)
            let r2 = pixel2[0];
            let g2 = pixel2[1];
            let b2 = pixel2[2];

            let diff = dist(r1, g1, b1, r2, g2, b2);
            print(diff)


            diff = constrain(diff, -10, 20);

            
            //let c = getPixel(x,y,cam) ///réutilisation de la fonction
            //fill((frameCount+100)%360,80,50)
            

            let xConverti =map(x,0,largeurVideo,0,height)
            let yConverti = map(y,0,hauteurVideo,0,height)

            let opacity = map(pixel[1],255,0,20,300)

            stroke(145, 57, 123,100)

            fill(101, 148, 101,opacity);


            if (diff > 0 && xConverti<width && yConverti<height) {
                square(xConverti,yConverti,diff)
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