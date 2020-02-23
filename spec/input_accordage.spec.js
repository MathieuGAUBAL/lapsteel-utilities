const input = require('./../main2.js');

describe("conversion_accordage(input_v) : Cette fonction formate correctement l'input : accordage", () => {
    it("devrait retourner un tableau comme ['D','A','D','F#','A','D'] si la saisie est 'DADF#AD' en string", () => {
        const result = input.accordage('DADF#AD');
        expect(result).toEqual(['D','A','D','F#','A','D']);
    });

    it("devrait retourner un tableau comme ['D','A','D','D','A','D'] si la saisie est 'DADDAD' en string", () => {
        const result = input.accordage('DADDAD');
        expect(result).toEqual(['D','A','D','D','A','D']);
    });
});



describe("Verification_input(input_v) : cette fonction sert a savoir si la saisie est conforme ou pas", () => {
    it("Devrait retourner une chaine de caractere : 'saisie incorrecte' si l'entrée est une chaine de caratere vide", () => {
        const result = input.verification_accordage('');
        expect(result).toEqual(false);
    });

    it("Devrait retourner une chaine de caractere : 'saisie incorrecte' si la saisie possede uniquement des espaces", ()=>{
        const result = input.verification_accordage('   ');
        expect(result).toEqual(false);
    });

    it("Devrait retourner une chaine de caractere : 'saisie incorrecte si la saisie comporte au choses que [A-G-#]", () => {
        const result = input.verification_accordage(' D.AD#D12D');
        expect(result).toEqual(false);
    });

    it("Devrait retourner une chaine de caractere en MAJUSCULE si la saisie comporte au choses que [A-G-#] et si elle est en miniscule", () => {
        let result = input.verification_accordage('daddad');
        expect(result).toEqual('DADDAD');
        result = input.verification_accordage('dadf#ad');
        expect(result).toEqual('DADF#AD');
    });
});


describe("verification_input_tonique(input_t) : cette fonction permet de savoir si la saisie de la tonique est correcte", () => {
    it("Devrait retourner une chaine de caractere en MASJUSLE", () => {
        const result = input.verification_tonique('a');
        expect(result).toEqual('A');
        expect(result.length).toEqual(1);
    });

    it("Devrait retourner false si la chaine de charatere est != de [A-G-#]", () => {
        const result = input.verification_tonique('');
        expect(result).toEqual(false);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////
///////////
/////////// construction_gamme_tonique(input_g) et constructionGammeSaisie(index, notesLength)
///////////
///////////////////////////////////////////////////////////////////////////////////////////////
describe("construction_gamme_tonique : Cette fonction sert a générer une Note Tonique en gamme de 12 caracteres", () => {
    it("Devrait retourner un tableau qui comporte 12 elements de type string", ()=>{
        const result = input.construction_gamme_tonique('A');
        expect(result).toEqual(['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']);
        expect(result.length).toEqual(12);
    });
});




///////////////////////////////////////////////////////////////////////////////////////////////