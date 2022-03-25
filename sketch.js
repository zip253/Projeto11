
//Criando Variáveis
var torre;
  var imgtorre;
var fantasma;
  var imgfantasma;
var invpe;
  var invpd;
var janela;
  var imgjanela;
var cerca;
  var imgcerca;
var estado="JOGAR";
  var inv;
var pontos=0;
  var imgfantasmapulo;
var cercaG;
  var janelaG;
var invG;

function preload(){
  imgtorre=loadImage("tower.png");
    imgfantasma=loadImage("ghost-standing.png");
  imgjanela=loadImage("door.png");
    imgcerca=loadImage("climber.png");
  imgfantasmapulo=loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600,600);
  
    //Torre
    torre=createSprite(300,300);
      torre.addImage(imgtorre);
    torre.velocityY=3;
      
      //Fantasma
      fantasma=createSprite(200,200,50,50);
        fantasma.addImage(imgfantasma);
      fantasma.scale=0.35;

        //Paredes invisíveis
        invpd=createSprite(570,0,50,1200);
          invpe=createSprite(30,0,50,1200);
        invpd.visible=false;
          invpe.visible=false; 
          
          //Criando grupos
          cercaG= new Group();
          janelaG= new Group();
          invG= new Group();
}

function draw() {
  background(0);

  //====================================ESTADOS=======================================

  //JOGAR

    if (estado=="JOGAR"){

    //Torre infinita
    if (torre.y>400){
  torre.y=height/2;
    }
      //Fantasma pulando e mexendo
      if (keyDown("space")){
      fantasma.velocityY=-5;
      }
      if (keyDown(LEFT_ARROW)|| keyDown("a")){
      fantasma.x=fantasma.x-5;
      }
      if (keyDown(RIGHT_ARROW)|| keyDown("d")){
      fantasma.x=fantasma.x+5;
      }
        //Gravidade
        fantasma.velocityY=fantasma.velocityY+0.5;

          //Pontos
          pontos=pontos+Math.round(getFrameRate()/60);


          tudo();


            //Perder
            if (invG.isTouching(fantasma)||fantasma.y>620){
             estado="FIM"
              }



              drawSprites();
    }
        //FIM

        else if (estado=="FIM"){
        cercaG.destroyEach();
        janelaG.destroyEach();
        invG.destroyEach();
        fantasma.destroy();
        torre.velocityY=0;
        text("FIM DE JOGO",250,300);
        
        }
    

          


  //Colisões
  fantasma.collide(invpd);
    fantasma.collide(invpe);
  fantasma.collide(cercaG);


 
  ;
  text("Pontos: "+pontos,500,50);

}

//==========================Funções personalizadas========================

function tudo(){
  if (frameCount%240==0){

    //Criando Sprites
    janela=createSprite(200,-50);
      cerca=createSprite(200,10);
    inv=createSprite(200,15);
      inv.shapeColor="red"

    //Largura e altura do bloco invisível
    inv.width=cerca.width;
      inv.height=2;

    //Posição x
    janela.x=Math.round(random(120,400))
    cerca.x=janela.x
      inv.x=janela.x
    
    //Adicionado imagens
    janela.addImage(imgjanela);
      cerca.addImage(imgcerca);

    //Adicionando velocidades
    janela.velocityY=3;
      cerca.velocityY=3;
    inv.velocityY=3;

    //Alterando profundidade
      fantasma.depth=janela.depth;
    fantasma.depth=fantasma.depth+1;
    
    //Tempo de vida
      janela.lifetime=290;
    cerca.lifetime=290;
      inv.lifetime=290;

    //Adicionado aos grupos
    janelaG.add(janela);
      cercaG.add(cerca);
    invG.add(inv);



  }
}



