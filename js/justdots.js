let cam;
let s=0;
let precision=4; //échantillonnage caméra


function preload(){
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //récupération de la vidéo
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
}

function draw() {

background(255)

cam.loadPixels();
let largeurVideo = cam.width;
let hauteurVideo = cam.height; 

     for (let x = 0; x < largeurVideo; x+=precision) {
        for (let y = 0; y < hauteurVideo; y+=precision) {
        
            let c = getPixel(x,y,cam) ///réutilisation de la fonction
            fill(0)
            noStroke()
            let xConverti =map(x,0,largeurVideo,0,width)
            let yConverti = map(y,0,hauteurVideo,0,height)
           
            let taille = map(c[1],255,0,0,20)
            
            ellipse(xConverti,yConverti,taille)
    }
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