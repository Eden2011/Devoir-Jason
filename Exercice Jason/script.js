"use strict";

/*
Jason est un tueur, il a 100PV
caractéristiques des personnages (class, constructor) avec proba de mourir, mettre des dégats et mourir+ mettre des dégats
5 survivants, noms aléatoires (math.random)
faire un tableau de prénoms et de caractéristiques qui seront générés aléatoirement
while PV de Jason sup à 0: il attaque, soit
        Jason tue un survivant,
        un survivant esquive et inflige 10PV à Jason,
        un survivant attaque, inflige 15PV à Jason mais meurt.
Affichage d'un message à chaque action: (exemple dans la consigne)
*/


class Tueur{//je prépare les caractéristiques du tueur qui seront utilisées
    constructor(pv, nom){//indication des composantes utiles pour le tueur
        this.hp=pv;
        this.name=nom;
    }
}

let cara=["Capitaine", "Epeiste", "Cuisinier", "Navigateur", "Tireur d'elite", "Docteur", "Charpentier", "Archéologue", "Barreur"];
//les différentes caractéristiques des survivants
let nomSurvivant=["Luffy", "Zoro", "Brook", "Sanji", "Nami", "Usopp", "Chopper", "Franky", "Robin", "Jinbei"];
//différents noms des survivants

class survivant{//mise en place de class pour les survivants
    constructor(){
        this.name=nomSurvivant[Math.floor(Math.random() * nomSurvivant.length)];//un nom sera choisi au hasard dans la liste de nomSurvivant
        this.caracteristique=cara[Math.floor(Math.random() * cara.length)];//pareil que les noms mais pour les caractéristiques
        this.probaMort=Math.floor(Math.random() * 10);//la probabilité de mort d'un survivant
        this.probaDmg=Math.floor(Math.random() * (10 - this.probaMort));//proba d'infliger des dégats au tueur
        this.probaDmgMort=10-this.probaMort-this.probaDmg;//proba que le tueur tue un survivant mais qu'avant de mourir celui-ci inflige des dégats au tueur
        this.proba = [];//mise en place des différentes actions possibles, les crochets prendront en compte l'un des 'for'
        for(let i=0;i<this.probaMort;i++){
            this.proba.push("Mort");//proba de mort
        }
        for(let i=0;i<this.probaDmg;i++){
            this.proba.push("Dégats");//proba de dégats
        }
        for(let i=0;i<this.probaDmgMort;i++){
            this.proba.push("Dégats+ Mort");//proba de dégats puis mort
        }
    }
}

let jason=new Tueur(100, "Jason");// je reprends ce qui a été fait dans class Tueur en remplaçant les valeurs

let survivant1=new survivant();//un nom est choisi aléatoirement dans la liste de noms
console.log(survivant1);
let survivant2=new survivant();//même chose pour les survivants 2,3,4,5.
console.log(survivant2);
let survivant3=new survivant();
console.log(survivant3);
let survivant4=new survivant();
console.log(survivant4);
let survivant5=new survivant();
console.log(survivant5); 

let listVivant=[survivant1, survivant2, survivant3, survivant4, survivant5];//la liste de survivants 
let listMort=[];//les personnages qui mourront apparaîtront dans cette liste

while(jason.hp>0 && listVivant.length>0){//tant que Jason ets en vie et qu'il reste des survivants, continuer
    let survivantRandom=listVivant[Math.floor(Math.random() * listVivant.length)];
    let action=survivantRandom.proba[Math.floor(Math.random() * survivantRandom.proba.length)];
    if(action=="Mort"){//si l'action Mort est choisie aléatoirement, le tueur attaquera quelqu'un
        listMort.push(survivantRandom.name);//un survivant est choisi de manière random
        listVivant.splice(listVivant.indexOf(survivantRandom),1);
        console.log("Jason a tué " + survivantRandom.name+ ".");
    }
    if(action=="Dégats"){//l'action Dégats est choisie aléatoirement, un survivant attaquera Jason
        jason.hp-=10;//le tueur perd 10pv
        console.log(survivantRandom.name + " a esquivé et inflige 10 dégats à Jason.");
        console.log("Plus que "+ jason.hp+ "PV !")
    }
    if(action=="Dégats+ Mort"){//l'action Dégats+ Mort est choisie aléatoirement, un survivant inflige des dégats à Jason puis sera tué
        listMort.push(survivantRandom.name);
        listVivant.splice(listVivant.indexOf(survivantRandom),1);//retrait du survivant tué de la liste des personnages vivants
        jason.hp-=15;//Jason perd 15pv
        console.log("Jason a tué " + survivantRandom.name + " mais celui-ci lui a infligé 15 dégats à Jason.");
        console.log("Plus que "+ jason.hp+ "PV !")
    }
}

if(jason.hp<=0){//si le tueur meurt, 2 messages s'affichent
    console.log("Jason s'est fait tué.");
    console.log("Les survivants ont gagné, cependant "+ listMort+ " peuvent reposer en paix.");
}else{//sinon, un message s'affiche avec le nom des personnes tuées
    console.log(listMort + " ont été tués.");
}
