var canvas = document.getElementById('canvas');
var canvas_infos = document.getElementById('canvas-infos');

var context = canvas.getContext('2d');



//image du manche de la guitare
let guitar_bg = new Image();
guitar_bg.src = '/neck_guitar.gif';
let mode = new Image();
mode.src = '/mode.png';

let isOk = false;

//images des numéros des frettes
let num_fret_3 = new Image();
let num_fret_5 = new Image();
let num_fret_7 = new Image();
let num_fret_9 = new Image();
let num_fret_12 = new Image();
let num_fret_15 = new Image();
let num_fret_17 = new Image();
let num_fret_19 = new Image();
let num_fret_21 = new Image();

num_fret_3.src = '/num_fret_3.gif';
num_fret_5.src = '/num_fret_5.gif';
num_fret_7.src = '/num_fret_7.gif';
num_fret_9.src = '/num_fret_9.gif';
num_fret_12.src = '/num_fret_12.gif';
num_fret_15.src = '/num_fret_15.gif';
num_fret_17.src = '/num_fret_17.gif';
num_fret_19.src = '/num_fret_19.gif';
num_fret_21.src = '/num_fret_21.gif';

//images des notes
let c = new Image();
let cd = new Image();
let d = new Image();
let dd = new Image();
let e = new Image();
let f = new Image();
let fd = new Image();
let g = new Image();
let gd = new Image();
let a = new Image();
let ad = new Image();
let b = new Image();
let vide = new Image();

c.src = 'C.gif';
cd.src = 'Cd.gif';
d.src = 'D.gif';
dd.src = 'Dd.gif';
e.src = 'E.gif';
f.src = 'F.gif';
fd.src = 'Fd.gif';
g.src = 'G.gif';
gd.src = 'Gd.gif';
a.src = 'A.gif';
ad.src = 'Ad.gif';
b.src = 'B.gif';
vide.src = 'vide.gif';

//images des notes accordage du manche
let c_manche = new Image();
let cd_manche = new Image();
let d_manche = new Image();
let dd_manche = new Image();
let e_manche = new Image();
let f_manche = new Image();
let fd_manche = new Image();
let g_manche = new Image();
let gd_manche = new Image();
let a_manche = new Image();
let ad_manche = new Image();
let b_manche = new Image();

c_manche.src = 'C_manche.gif';
cd_manche.src = 'Cd_manche.gif';
d_manche.src = 'D_manche.gif';
dd_manche.src = 'Dd_manche.gif';
e_manche.src = 'E_manche.gif';
f_manche.src = 'F_manche.gif';
fd_manche.src = 'Fd_manche.gif';
g_manche.src = 'G_manche.gif';
gd_manche.src = 'Gd_manche.gif';
a_manche.src = 'A_manche.gif';
ad_manche.src = 'Ad_manche.gif';
b_manche.src = 'B_manche.gif';


//images des notes toniques selectionnées
let c_tonique = new Image();
let cd_tonique = new Image();
let d_tonique = new Image();
let dd_tonique = new Image();
let e_tonique = new Image();
let f_tonique = new Image();
let fd_tonique = new Image();
let g_tonique = new Image();
let gd_tonique = new Image();
let a_tonique = new Image();
let ad_tonique = new Image();
let b_tonique = new Image();

c_tonique.src = 'C_tonique.gif';
cd_tonique.src = 'Cd_tonique.gif';
d_tonique.src = 'D_tonique.gif';
dd_tonique.src = 'Dd_tonique.gif';
e_tonique.src = 'E_tonique.gif';
f_tonique.src = 'F_tonique.gif';
fd_tonique.src = 'Fd_tonique.gif';
g_tonique.src = 'G_tonique.gif';
gd_tonique.src = 'Gd_tonique.gif';
a_tonique.src = 'A_tonique.gif';
ad_tonique.src = 'Ad_tonique.gif';
b_tonique.src = 'B_tonique.gif';


let nomAjoutMode = '';
let intervalAjoutMode = '';

let ajoutModeBouton = document.getElementById('ajouter-mode');
let supprimerModeBouton = document.getElementById('supprimer-mode');
let modifierModeBouton = document.getElementById('modifier-mode')

let selectIntervalMode = document.getElementById('input-interval-mode');
let selectIntervalModeListed = document.getElementById('interval-mode-list');
let selectIntervalModeListedModification = document.getElementById('interval-mode-list-modification');

let resultatModeSelection = document.getElementById('resultat-mode-selection');
let displayMode = document.getElementById('display-mode');

let selectionModifierModeBouton = document.getElementById('selection-modifier-mode');



let arr_note_gif = [];



let data = {
    accordage:[],
    tonique:"",
    gammeTonique : [],
    notes:['C','C#','D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    mancheGuitare : [],
    modeNum:[],
    gammeMode : [],
    notesFinales:[],
    localStorageArray:[]
}


function verification_input_accordage(input_v){
    let regex =  /([A-G]|[ACDFG]#)([A-G]|[ACDFG]#){4}([A-G]|[ACDFG]#)$/;
    let input = input_v.split(' ').join('').trim().toUpperCase().match(regex);
    if(input === null){
      return false;
    }else{
    return input[0];
    }
  }

function conversion_accordage(input_v){
    const input = input_v.trim().split('');
    let arr = [];
    for(let i = 0; i < input.length; i++){
        if(input[i+1] === '#'){
            arr.push(input[i] + input[i+1]);
        
        }else if(input[i] === '#'){
            continue;
    
        }else{
            arr.push(input[i]);
        }
    }

    return arr.reverse();
}

function verification_input_tonique(input_t){
    let regex =  /([A-G]|[ACDFG]#)$/;
    let input = input_t.trim().toUpperCase().match(regex);
    if(input === null){
      return false;
    }else{
    return input[0];
    }
}

function construction_gamme_tonique(input_g){
    let arr = [];
    if(data.notes.includes(input_g)){
        let index = data.notes.indexOf(input_g);
        for(let i = index; i < data.notes.length; i++){
          arr.push(data.notes[i]);     
        }
        
        if(data.notes.length - index !== data.notes.length){
          for(let i = 0; i < index; i++){
            arr.push(data.notes[i]);     
          }
        }
    }
    return arr.join(',').split(',');
  }

const modeCompteur = (mode) => { 
  return mode
    .replace(/\s/g, '').split('T').join('T ').trim()
    .split(' ')
    .map(item => Number.parseFloat(item.substr(0, item.length - 1) * 2))
  }
  
function constructionGammeMode(modeNum, gammeTonique){
  let arr = [];
  arr.push(gammeTonique[0]);
  let count = 0;
  for(let i = 0; i < modeNum.length - 1; i++){
    arr.push(gammeTonique[modeNum[i] + count]);
    count += modeNum[i];
  }
  return arr;
}

function constructionNotesFinales(mancheGuitare,gammeMode){
  
  let mancheGuitareFinale = [];

  for(let i = 0; i < mancheGuitare.length; i++){
    let arr = [];
    for(let j = 0; j < mancheGuitare[i].length; j++){

    gammeMode.includes(mancheGuitare[i][j]) ? arr.push(mancheGuitare[i][j]) : arr.push("");
    }
    mancheGuitareFinale.push(arr.slice(1,-1));
  }
  return mancheGuitareFinale;
}


$('.alert').hide();
function lancer(){

  data.mancheGuitare = [];
  data.notesFinales = [];

  let inputIsVerified_accordage = "";
  let inputIsVerified_tonique = "";

  let input_accordage = document.getElementById('input-accordage').value;
  let saisieTonique = document.getElementById('input-tonique-tonique').value;
  let mode  = document.getElementById('input-interval-mode').value;

  inputIsVerified_accordage = verification_input_accordage(input_accordage);
  inputIsVerified_tonique = verification_input_tonique(saisieTonique);

  if(inputIsVerified_accordage !== false && inputIsVerified_tonique !== false){
      data.accordage = conversion_accordage(inputIsVerified_accordage); 
      data.tonique = inputIsVerified_tonique;
      data.modeNum = modeCompteur(mode);
      data.gammeTonique = construction_gamme_tonique(data.tonique);
      data.gammeMode = constructionGammeMode(data.modeNum, data.gammeTonique);
      // alimente l'objet data.accordage
      const accordage = data.accordage.map((item) => construction_gamme_tonique(item));
      // alimente l'objet data.mancheGuitare
      accordage.map((arr) => data.mancheGuitare.push(arr));
      data.notesFinales  = constructionNotesFinales(data.mancheGuitare, data.gammeMode);
      arr_note_gif = [];

      let line = [];
      for(let i = 0; i < data.notesFinales.length; i++){
          for(let j = 0; j < data.notesFinales[i].length; j++){
                  if(data.notesFinales[i][j] === 'C'){
                    if(data.tonique ==='C'){
                      line.push(c_tonique);
                    }else{
                      line.push(c);
                    }
                  }else if(data.notesFinales[i][j] === 'C#'){
                    if(data.tonique ==='C#'){
                      line.push(cd_tonique);
                    }else{
                      line.push(cd);
                    }
                  }else if(data.notesFinales[i][j] === 'D'){
                    if(data.tonique ==='D'){
                      line.push(d_tonique);
                    }else{
                      line.push(d);
                    }
                  }else if(data.notesFinales[i][j] === 'D#'){
                    if(data.tonique ==='D#'){
                      line.push(dd_tonique);
                    }else{
                      line.push(dd);
                    }
                  }else if(data.notesFinales[i][j] === 'E'){
                    if(data.tonique ==='E'){
                      line.push(e_tonique);
                    }else{
                      line.push(e);
                    }
                  }else if(data.notesFinales[i][j] === 'F'){
                    if(data.tonique ==='F'){
                      line.push(f_tonique);
                    }else{
                      line.push(f);
                    }
                  }else if(data.notesFinales[i][j] === 'F#'){
                    if(data.tonique ==='F#'){
                      line.push(fd_tonique);
                    }else{
                      line.push(fd);
                    }
                  }else if(data.notesFinales[i][j] === 'G'){
                    if(data.tonique ==='G'){
                      line.push(g_tonique);
                    }else{
                      line.push(g);
                    }
                  }else if(data.notesFinales[i][j] === 'G#'){
                    if(data.tonique ==='G#'){
                      line.push(gd_tonique);
                    }else{
                      line.push(gd);
                    }
                  }else if(data.notesFinales[i][j] === 'A'){
                    if(data.tonique ==='A'){
                      line.push(a_tonique);
                    }else{
                      line.push(a);
                    }
                  }else if(data.notesFinales[i][j] === 'A#'){
                    if(data.tonique ==='A#'){
                      line.push(ad_tonique);
                    }else{
                      line.push(ad);
                    }
                  }else if(data.notesFinales[i][j] === 'B'){
                    if(data.tonique ==='B'){
                      line.push(b_tonique);
                    }else{
                      line.push(b);
                    }
                  }else if(data.notesFinales[i][j] === ''){
                      line.push(vide);
                  }
    
              if(j >= 21){
                  arr_note_gif.push(line);
                  line = [];
              }
          }
      }
      let regex = /[,]/gi;
     displayMode.innerHTML = "Gamme : " + data.gammeMode.join(' ').replace(regex," ");
     
     init();
  }else{
    $('.alert').show();
    setTimeout( () => {
      $('.alert').hide();
    },2000); 
  }


}

function reload(){
  setTimeout( () => {
    location.reload();
  },1500);

}

//Ajout d'un mode en ouvrant une MODAL
ajoutModeBouton.addEventListener('click', () => {

  nomAjoutMode = document.getElementById('nom-ajout-mode').value.trim();
  intervalAjoutMode = document.getElementById('input-interval-mode-added').value.toUpperCase();

  let sameName = false;

  if(nomAjoutMode != "" && intervalAjoutMode != ""){
    if(hasDataInLocalStorage().length > 0){
      for(let i = 0; i < data.localStorageArray.length; i++){
        if(data.localStorageArray[i].hasOwnProperty(nomAjoutMode)){
          for(let j in data.localStorageArray){
            if(j == i){
              sameName = true;
            }
          }
        }
      }

      if(!sameName){
        data.localStorageArray = JSON.parse(window.localStorage.getItem('objetAjoutMode'));
        data.localStorageArray.push({[`${nomAjoutMode}`]:intervalAjoutMode});
        window.localStorage.setItem('objetAjoutMode', JSON.stringify([...data.localStorageArray]));

        $('.alert-modeAjout-mode').show();
        setTimeout( () => {
          $('.alert-modeAjout-mode').hide();
        },2000);

      }else{
        $('.alert-doublon-modeAjout-mode').show();
        setTimeout( () => {
          $('.alert-doublon-modeAjout-mode').hide();
        },2000); 
      }
      
    }else{
      data.localStorageArray.push({[`${nomAjoutMode}`]:intervalAjoutMode});
      window.localStorage.setItem('objetAjoutMode', JSON.stringify([...data.localStorageArray]));

      $('.alert-modeAjout-mode').show();
      setTimeout( () => {
        $('.alert-modeAjout-mode').hide();
      },2000);
    }

  }else{
    $('.alert-ajout-mode').show();
    setTimeout( () => {
      $('.alert-ajout-mode').hide();
    },2000); 
  }

})    


//Suppression d'un mode en ouvrant une MODAL
supprimerModeBouton.addEventListener('click', () => {

  if(hasDataInLocalStorage().length > 0){
    let modeSelection = document.getElementById('interval-mode-list');
    let modeSelectionIndex = modeSelection.options[modeSelection.selectedIndex];
  
    let newObj = [];
    for(let i = 0; i < data.localStorageArray.length; i++){
      if(data.localStorageArray[i].hasOwnProperty(modeSelectionIndex.text)){
        for(let j in data.localStorageArray){
          if(j != i){
            newObj.push(data.localStorageArray[j]);
          }
        }
      }
    }
  
    data.localStorageArray = newObj;
    
    window.localStorage.setItem('objetAjoutMode', JSON.stringify([...newObj]));

    $('.alert-suppression-mode').show();
    setTimeout( () => {
      $('.alert-suppression-mode').hide();
    },2000);  

  }else{

    $('.alert-error-suppression-mode').show();
    setTimeout( () => {
      $('.alert-error-suppression-mode').hide();
    },2000); 

  }
})

//Modification d'un mode en ouvrant une MODAL
modifierModeBouton.addEventListener('click', () => {

  // array qui servira a accueillir le local storage
  let localStorageArray = [];
  let sameName = false;

  nomModificationMode = document.getElementById('nom-modification-mode').value.trim();
  intervalModificationMode = document.getElementById('interval-modification-mode').value.toUpperCase();

  let modeSelection = document.getElementById('interval-mode-list-modification');
  let modeSelectionIndex = modeSelection.options[modeSelection.selectedIndex];
  
 
  //boucle qui servira a savoir s'il exite des doublons avec nomModificationMode et le data.localStorageArray
  //si true alors pas de modification du nom
  for(let i = 0; i < data.localStorageArray.length; i++){
    if(data.localStorageArray[i].hasOwnProperty(nomModificationMode)){
      for(let j in data.localStorageArray){
        if(j == i){
          sameName = true;
        }
      }
    }
  }

  if(!sameName){
    if(modeSelection.length > 0 && nomModificationMode != "" && intervalModificationMode != ""){
      for(let i = 0; i < data.localStorageArray.length; i++){
        if(data.localStorageArray[i].hasOwnProperty(modeSelectionIndex.text)){
          data.localStorageArray[i][modeSelectionIndex.text] = intervalModificationMode;
          str = JSON.stringify(data.localStorageArray[i]);
          str = str.replace(modeSelectionIndex.text, nomModificationMode);
          parsed = JSON.parse(str);
          localStorageArray.push(parsed);
        }else{
          localStorageArray.push(data.localStorageArray[i]);
        }
      }
  
      data.localStorageArray = localStorageArray;
      window.localStorage.setItem('objetAjoutMode', JSON.stringify([...localStorageArray]));
  
      $('.alert-rename-modeAjout-mode').show();
      setTimeout( () => {
        $('.alert-rename-modeAjout-mode').hide();
      },2000);

    }else{
      $('.alert-error-rename-modeAjout-mode').show();
      setTimeout( () => {
        $('.alert-error-rename-modeAjout-mode').hide();
      },2000);
    }

  }else{
    $('.alert-doublon-modeAjout-mode').show();
    setTimeout( () => {
      $('.alert-doublon-modeAjout-mode').hide();
    },2000);
  }

  
})

// Selection du mode a modifier
// sert a afficher le mode selectionner, il apparaitra l'objet en cours
selectionModifierModeBouton.addEventListener('click', () => {
  if(data.localStorageArray.length > 0){
 
    let modeSelection = document.getElementById('interval-mode-list-modification');
    let modeSelectionIndex = modeSelection.options[modeSelection.selectedIndex];
    const regex = /[{}"]/gi;
    for(let i = 0; i < data.localStorageArray.length; i++){
      if(data.localStorageArray[i].hasOwnProperty(modeSelectionIndex.text)){
        resultatModeSelection.innerHTML = JSON.stringify(data.localStorageArray[i]).replace(regex,"");
      }
    }

  }else{
    console.log('rien à selectionner');
  }

})


function hasDataInLocalStorage(){

  let obj = JSON.parse(window.localStorage.getItem('objetAjoutMode'));

  let count = [];
  for(let i in obj){
    count.push(i);
  }
  if(count.length === 0){
    console.log("Le local Storage est vide");
  }
  return count;
}


if(hasDataInLocalStorage().length > 0){
  let name="";
 
  data.localStorageArray = JSON.parse(window.localStorage.getItem('objetAjoutMode'));

  for(let property in data.localStorageArray){
    name = Object.keys(data.localStorageArray[property]).join('');
    interval = Object.values(data.localStorageArray[property]).join('');
    selectIntervalMode.options[selectIntervalMode.options.length] = new Option(`${name}`, `${interval}`);
    selectIntervalModeListed.options[selectIntervalModeListed.options.length] = new Option(`${name}`, `${interval}`);
    selectIntervalModeListedModification.options[selectIntervalModeListedModification.options.length] = new Option(`${name}`, `${interval}`);
  }

}else{
  console.log("Local Storage vide");
}




// cordes en y           1  2   3   4   5   6              
let alignement_note_y = [38,68,100,130,161,194];
// numeros case note     1    2   3   4   5   6   7   8   9   10  11  12  13   14   15    16   17   18   19    20    
let alignement_note_x = [100,177,252,330,407,485,560,635,713,789,865,940, 1015, 1092,1164,1240,1316,1395, 1468,1544];

let alignement_frette_y = 0;
//                          3   5   7   9   12  15   17   19   21
let alignement_frette_x = [255,405,560,710,935,1165,1318,1470,1610];
let arr_num_frette = [num_fret_3,num_fret_5,num_fret_7,num_fret_9,
                      num_fret_12,num_fret_15,num_fret_17,num_fret_19,
                      num_fret_21];

let alignement_mode_x = [104,180,256,332,408,484,560,636,712];


guitar_bg.onload = () => {
  canvas.width = guitar_bg.naturalWidth
  canvas.height = guitar_bg.naturalHeight
  context.drawImage(guitar_bg,0,0);


}



function init(){


  //canvas
  // affiche la guitare
  context.drawImage(guitar_bg,0,0);


    //affiche les images frettes
    for(let j = 0; j < alignement_frette_x.length; j++){
      context.drawImage(arr_num_frette[j],alignement_frette_x[j], alignement_frette_y);
    }


    //affiche les notes 
    for(let i = 0; i < 21; i++){
      for(let j = 0; j < alignement_note_y.length; j++){
        if(arr_note_gif[j] != undefined){
           context.drawImage(arr_note_gif[j][i],alignement_note_x[i], alignement_note_y[j]);
          } 
      }
  }

  // affichage de l'accordage sur le manche
  let alignement_note_manche_x = 5;
  for(let i = 0; i < data.accordage.length; i++){
    if(data.accordage[i] === 'C'){
      context.drawImage(c_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'C#'){
      context.drawImage(cd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'D'){  
      context.drawImage(d_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'D#'){
      context.drawImage(dd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'E'){
      context.drawImage(e_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'F'){
      context.drawImage(f_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'F#'){
      context.drawImage(fd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'G'){
      context.drawImage(g_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'G#'){
      context.drawImage(Gd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'A'){
      context.drawImage(a_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'A#'){
      context.drawImage(ad_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'B'){
      context.drawImage(b_manche,alignement_note_manche_x, alignement_note_y[i]);
    }
  }

  //canvas_infos
  //console.log(data.gammeMode);
/*    context_infos.font ="50px Arial";
   context_infos.fillStyle = "#282828";
   context_infos.fillText("gamme du mode : ",10, 45);
  for(let i = 0; i < data.gammeMode.length; i++){
    context_infos.fillText(data.gammeMode[i],alignement_mode_x[i]+350, 45);
  }   */
}

init();
