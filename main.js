let textarea ='';
let nomAjoutMode = '';
let intervalAjoutMode = '';
let selectIntervalMode = document.getElementById('input-interval-mode');
let ajoutModeBouton = document.getElementById('ajouter-mode');
let SupprimerModeBouton = document.getElementById('supprimer-mode'); 
let input_accordage = '';


let mancheGuitare = {
    corde1:[],
    corde2:[],
    corde3:[],
    corde4:[],
    corde5:[],
    corde6:[]
} 

 

const gamme = {
    gamme:[],
    notes:['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    gammeMode : [],
    
    /* les méthodes gammeUtilisat() et constructionGammeSaisie() tavaillent ensemble :
       font en sorte que lorsque l'utilisateur saisie une note qui servira de tonique,
       on obtient une gamme de 12 notes à partir de la tonique
    */
    gammeUtilisat(){
        if(gamme.notes.includes(saisieUtilisateur.saisie)){
            let index = gamme.notes.indexOf(saisieUtilisateur.saisie);
            gamme.constructionGammeSaisie(index, gamme.notes.length);

            if(gamme.notes.length - index !== gamme.notes.length){
                gamme.constructionGammeSaisie(0, index);
            }
        }
    },

    constructionGammeSaisie(index, notesLength){
        for(let i = index; i < notesLength; i++){
            gamme.gamme.push(gamme.notes[i]);     
        }
    },


    /*  On boucle les 6 cordes 
        la méthode run().
        Elle sert a remplacer la note en parametre par une 
        chaine de caractere vide si elle ne se trouve pas
        dans le tableau gammeMode
    */
    run(){

        textarea = document.getElementById('resultat');
        textarea.value = '';

        textarea.value += `La tonique est : ${saisieUtilisateur.saisie}\n`;
        textarea.value += `L'intervalle utilisée est : ${selectIntervalMode.value}\n`;
        textarea.value += `La gamme utilisée est : ${gamme.gammeMode.join(' ')}\n\n\n`;
        let count = '';
        

        for(let i = 0; i <= 12; i++){
            if(i < 10){
                count += `${i}   `;
            }else{
                count += `${i}  `;
            }
        }

        textarea.value += count + '\n'; 
        let mancheGuitareReversed = [];
        for(let i in mancheGuitare){
            mancheGuitareReversed.push(mancheGuitare[i]);
            }
            mancheGuitareReversed.reverse();
        
        for(let corde in mancheGuitareReversed){
            const uniqueCorde = mancheGuitareReversed[corde].map((item) => {
                let sequence = '';
                if(!gamme.gammeMode.includes(item)){
                    return sequence += `${'  |'}`;
                }else{
                    if(item.endsWith('#')){
                        return sequence += `${item}|`;
                    }else{
                        return sequence += `${item} |`;
                    }
                } 
            })
        textarea.value += `${uniqueCorde.join(' ')} \n`;
        }

    },

    conversion_accordage(input_v){
        const input = input_v.split('');
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

        for(let i = 0; i < arr.length; i++){
            saisieUtilisateur.saisie = arr[i];
            gamme.gammeUtilisat();
            saisieUtilisateur.saisie = "";
        }
    },

    injection_cordes(){
        for(let j in mancheGuitare){
            for(let i = 0; i < gamme.gamme.length; i++){
                if(i <= 11){
                    mancheGuitare[j].push(gamme.gamme[i]);
                }
                if(i === 11){
                    gamme.gamme.splice(0,12);
                    break;
                }
            }
        }
    }
}
    
const mode = {
    mode:'',
    
    /* Sert a convertir les intervalles du mode en un tableau numérique */
    modeCompteur(){
        let modeTab = mode.mode.split(' ');
        mode.mode = modeTab.map(item => Number.parseFloat(item.substr(0, item.length - 1) * 2));
        //mode.mode.pop();
        }
    ,

    choixMode(){
        mode.modeCompteur();
        mode.constructionGammeMode();
        }
    ,

    /* On construit la gamme mode et ajoute les notes dans le tableau gammeMode */
    constructionGammeMode(){
        gamme.gammeMode.push(gamme.gamme[0]);
        let count = 0;
        for(let i = 0; i < mode.mode.length; i++){
          gamme.gammeMode.push(gamme.gamme[mode.mode[i] + count]);
          count += mode.mode[i];
        } 
    }

}

const saisieUtilisateur = {
    saisie:""
  }
  
let stockageMode = {}


function lancer(){
    effacer();
    input_accordage = document.getElementById('input-accordage').value;

    gamme.conversion_accordage(input_accordage);
    gamme.injection_cordes();
    gamme.gamme = [];
    saisieUtilisateur.saisie = document.getElementById('input-tonique-tonique').value;
    mode.mode  = document.getElementById('input-interval-mode').value;
    gamme.gammeUtilisat();
    mode.choixMode();
    gamme.run();
    

    console.log('gammeMode : ' + gamme.gammeMode);
    console.log('gamme : ' + gamme.gamme);
    console.log('mode.mode : ' + mode.mode);
    console.log(mancheGuitare);
    console.log('input accordage : ', input_accordage);
}

function effacer(){
    textarea = document.getElementById('resultat');
    textarea.value = '';
    gamme.gamme.splice(0,12);
    mode.mode = '';
    gamme.gammeMode = [];
    saisieUtilisateur.saisie = [];

    for(let i in mancheGuitare){
        mancheGuitare[i] = [];
    }
}


ajoutModeBouton.addEventListener('click', () => {
    nomAjoutMode = document.getElementById('nom-ajout-mode').value;
    intervalAjoutMode = document.getElementById('interval-ajout-mode').value;
    console.log('nomAjoutMode : ' + nomAjoutMode, 'intervalAjoutMode : ' + intervalAjoutMode );
    if(nomAjoutMode !== "" && intervalAjoutMode !== ""){
        selectIntervalMode.options[selectIntervalMode.options.length] = new Option(nomAjoutMode, intervalAjoutMode);
        stockageMode[`${nomAjoutMode}`] = intervalAjoutMode;
        window.localStorage.setItem('objetAjoutMode', JSON.stringify(stockageMode));
        $('input[name="nom-ajout-mode"]').val('');
        $('input[name="interval-ajout-mode"]').val('');
        console.log(stockageMode);
    }else{
        console.log('saisie incorrecte');
    }
})


    if(window.localStorage.getItem('objetAjoutMode')){
        stockageMode = JSON.parse(window.localStorage.getItem('objetAjoutMode'));
        for(let nomMode in stockageMode){
            selectIntervalMode.options[selectIntervalMode.options.length] = new Option(`${nomMode}`, `${stockageMode[nomMode]}`);
            console.log(`${nomMode} ${stockageMode[nomMode]}`);
        }
    }


