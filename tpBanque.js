class Titulaire {
    constructor(nom, prénom) {
        this.nom = nom;
        this.prénom = prénom;
        this.compte = null;
        this.compteEpargne = null;
    }
    createAccount(montant) {
        this.compte = new Compte(this, montant);
    }
    createEpargne() {
        this.compteEpargne = new CompteEpargne(this, 1, 2, 5);
    }
}

class Compte {
    constructor(Titulaire, montant) {
        this.Titulaire = Titulaire;
        this.montant = montant;
    }

    créditer(ajout) {
        this.montant += ajout;
    }

    débiter(retrait) {
        this.montant -= retrait;
    }

    afficherSolde() {
        console.log(this.Titulaire.nom + " " + this.Titulaire.prénom + " le solde de votre compte courant est de : " + this.montant);
    }
}

class CompteEpargne extends Compte {
    constructor(Titulaire, montant, taux, temps) {
        super(Titulaire, montant);
        this.taux = taux;
        this.temps = temps;
        setInterval(() => {
            this.montant += this.taux * this.montant;
            this.afficherSolde();
        }, this.temps * 1000);
        // setInterval(
        //     function () {
        //         this.montant += this.taux * this.montant
        //     }.bind(this), this.temps * 1000);
    }

    afficherSolde() {
        console.log(this.Titulaire.nom + " " + this.Titulaire.prénom + " votre épargne est de : " + this.montant);
    }
}

let tab = [new Titulaire("Vongsy", "Laura"), new Titulaire("Herbette", "Alban"), new Titulaire("Louchène", "Hiba"), new Titulaire("Della Rica", "Steven"), new Titulaire("Eymard", "Luc")];

function display(tab) {
    for (let person of tab) {
        person.createAccount(100);
        person.compte.afficherSolde();
        person.createEpargne();
        person.compteEpargne.afficherSolde();
    }

    for (let person of tab) {
        let ajout = prompt("Veuillez entrer le montant à ajouter pour " + person.prénom + " " + person.nom);
        ajout = parseInt(ajout);
        person.compte.créditer(ajout);
        person.compte.afficherSolde();
        person.compteEpargne.afficherSolde();
    }

    for (let person of tab) {
        let retrait = prompt("Veuillez entrer le montant à débiter pour " + person.prénom + " " + person.nom);
        retrait = parseInt(retrait);
        person.compte.débiter(retrait);
        person.compte.afficherSolde();
        person.compteEpargne.afficherSolde();
    }
}

display(tab);
