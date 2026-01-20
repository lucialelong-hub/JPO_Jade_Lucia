let video;
let precision = 6
let ascii = ['iii','✿','KAWAI','●','<3','!','♡','♫','☺︎','☆' ]

function setup() {
    createCanvas(windowWidth,windowHeight)
    video = createCapture(VIDEO)
    video.hide()

    //noStroke()
    
    background(255)
    textSize(20)
    //textAlign(CENTER,CENTER)
}

function mousePressed() {
    video.loadPixels()
    let x = getPixel(mouseX, mouseY, video)
    print(x)
}

function draw() {
    
    //image(video,0,0)
    video.loadPixels()
    
    let largeurVideo = video.width
    let hauteurVideo = video.height
    //background(255,192,203, 30)
    //background(232, 165, 176,30)
    //background(255)
    background(0,20)
    for (let x = 0; x< largeurVideo ; x+= precision) {
        for (let y = 0; y < hauteurVideo; y+= precision) {
            let c = getPixel(x,y,video)
            
            fill(0)
            stroke(color(c))
            

            let r = c[0]
            let g = c[1]
            let b = c[2]

            //let aleatoire = random(2)
            let xConverti = map(x,0,largeurVideo,0,width)
            let yConverti = map(y,0,hauteurVideo,0,height)
            
            
            let s = map(r,0,255,50,0)
            ellipse(xConverti,yConverti,s)
            


            /*
            push()
            translate(xConverti,yConverti)
            rotate(frameCount*0.5)
            rectMode(CENTER)
            square(0,0,40)
            pop()
            */

            /*
            let decalage = map(r,0,255,40,0)
            //ellipse(xConverti + decalage,yConverti + decalage, 20)
            textSize(decalage)
            let l = map(r,0,255,0,100)
            fill(l,l,190)
            text('WORD', xConverti,yConverti)
            */

            /*
            let decalage = map(r,0,255,30,0)
            
            textSize(decalage)
            
            let l = map(r,0,255,135,255)
            
            fill(l,225,235)
            
            if (l<200 && l>180 ) {
                fill(255,255,100)
            }

            let taille = map(r,0,255,0,ascii.length-1)
            taille = int(taille)
            text(ascii[taille],xConverti,yConverti)
            */


            /*
            let decalage = map(r,0,255,30,0)

            push()
            translate(xConverti,yConverti)
            rotate(decalage)
            line(0,0,20,20)
            pop()
            */


            /*
           let decalage = map(r,0,255,0,2)

            push()
            translate(xConverti,yConverti)
            rotate(decalage)
            line(0,0,100,100)
            pop()
            */

        }
    }

}

function getPixel(x, y, img) {
  let i = 4 * (y * img.width + x);
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3]
  ];
}