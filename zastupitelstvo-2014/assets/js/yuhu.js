// funkce pro kopírování podobných polí
function kopirovatPole(zdroj) {
    var novePole = new Array();
    for (var i in zdroj){
        if (typeof zdroj[i] == "object") novePole[i] = kopirovatPole(zdroj[i]); // rekurze
        else novePole[i] = zdroj[i];
    }
    return novePole;
}

// generovane promenne
// var mandatu = 7;

var mandatu = 15
// nejdůležitější pole, kterým se řídí celá aplikace. Kandidát, který tu nebude, bude ignorován
// poleKandidatu[strana][kandidat], hodnotou je, zda získá hlas
// pokud některá strana nemá všechny kandidáty, bude to zahrnuto už v této inicializaci pole
var poleKandidatu = {
1: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false},
2: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false},
3: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false},
4: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false},
5: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false},
6: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false},
7: {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false}

}

// pole poleStran slouží jenom pro předání hodnot z formuláře ke kontrole a přepočtu poleKandidatu
// var poleStran = {1:false, 2: false, 3: false, 4: false, 5:false}; // TODO: konstruovat cyklem přes proměnnou stran
var poleStran = new Array();
for (var strana in poleKandidatu) poleStran[strana] = false;

// pole, do kterého se uloží výsledné hlasy stranám
var hlasyStranam = kopirovatPole(poleStran); // v tomto poli pak budou čísla

// naplnění pole jmen zástupnými hodnotami "kandidát sXkY" a "strana č. X"
// spouští se při načítání stránky
var jmenoKandidata = kopirovatPole(poleKandidatu); // inicializace pole zkopírováním může blbnout TODO: pochopit a zkontrolovat
var jmenoStrany = kopirovatPole(poleStran); //inicializace pole zkopírováním
for(var strana in poleKandidatu) {
    for(var kandidat in poleKandidatu[strana]) jmenoKandidata[strana][kandidat] = "kandidát s" + strana + "k" + kandidat;
    jmenoStrany[strana] = "strana č. " + strana; // naplnění generickými jmény
}
// ------- jména stran -------------
jmenoStrany[1] = "KSČM";
jmenoStrany[2] = "KDU-ČSL";
jmenoStrany[3] = "NEZÁVISLÍ PRO PŘIBYSLAV";
jmenoStrany[4] = "ODS";
jmenoStrany[5] = "ANO 2011";
jmenoStrany[6] = "PŘIBYSLAV 2014";
jmenoStrany[7] = "ČSSD";

// ------- konec jmen stran -------------

// ------- zde začíná oblast se jmény kandidátů -------

jmenoKandidata[1][1] = 'Neumanová Zdena Mgr. (60)';
jmenoKandidata[1][2] = 'Havlíček Ondřej (29)';
jmenoKandidata[1][3] = 'Krčál Zdeněk (63)';
jmenoKandidata[1][4] = 'Rezničenko Luděk Ing. (53)';
jmenoKandidata[1][5] = 'Dobrý Zdeněk (38)';
jmenoKandidata[1][6] = 'Černá Božena (58)';
jmenoKandidata[1][7] = 'Křesťanová Jaroslava (59)';
jmenoKandidata[1][8] = 'Čermák Jaroslav (56)';
jmenoKandidata[1][9] = 'Neumann Zdeněk (67)';
jmenoKandidata[1][10] = 'Novotný Miloslav (65)';
jmenoKandidata[1][11] = 'Vaverka Josef (63)';
jmenoKandidata[1][12] = 'Pibyl Miloslav (63)';
jmenoKandidata[1][13] = 'Smejkal Ladislav (64)';
jmenoKandidata[1][14] = 'Dvořák Josef (65)';
jmenoKandidata[1][15] = 'Chmelík Jaroslav (61)';
jmenoKandidata[2][1] = 'Omes Michael (46)';
jmenoKandidata[2][2] = 'Henzl Václav (54)';
jmenoKandidata[2][3] = 'Jaroš Libor (37)';
jmenoKandidata[2][4] = 'Ledvinka Lubomír MUDr. (45)';
jmenoKandidata[2][5] = 'Miškovská Jana Mgr. (41)';
jmenoKandidata[2][6] = 'Málek Jan Mgr. et Mgr. (28)';
jmenoKandidata[2][7] = 'Pleslová Marie (55)';
jmenoKandidata[2][8] = 'Kasal Roman (42)';
jmenoKandidata[2][9] = 'Matoušek Jiří Mgr. (48)';
jmenoKandidata[2][10] = 'Močubová Anežka (24)';
jmenoKandidata[2][11] = 'Málek Petr (51)';
jmenoKandidata[2][12] = 'Bechyně Jan PhDr. (58)';
jmenoKandidata[2][13] = 'Jajtnerová Ludmila (66)';
jmenoKandidata[2][14] = 'Zrzavá Marie Mgr. (34)';
jmenoKandidata[2][15] = 'Horský Jaroslav (52)';
jmenoKandidata[3][1] = 'Křesťanová Marie Ing. (46)';
jmenoKandidata[3][2] = 'Thomayer Jan Ing. (35)';
jmenoKandidata[3][3] = 'Kachlík Milan Mgr. (40)';
jmenoKandidata[3][4] = 'Doubková Anna Mgr. (55)';
jmenoKandidata[3][5] = 'Vlček Jakub (28)';
jmenoKandidata[3][6] = 'Doubková Anna Mgr. Bc. (30)';
jmenoKandidata[3][7] = 'Křesťan Jiří (45)';
jmenoKandidata[3][8] = 'Henzl Josef (55)';
jmenoKandidata[3][9] = 'Vykoukalová Hana (32)';
jmenoKandidata[3][10] = 'Jajtner Petr Bc. (31)';
jmenoKandidata[3][11] = 'Fišer Luděk (30)';
jmenoKandidata[3][12] = 'Ležák Lukáš Bc. DiS. (24)';
jmenoKandidata[3][13] = 'Loužecká Kristýna (38)';
jmenoKandidata[3][14] = 'Bártová Petra Mgr. (39)';
jmenoKandidata[3][15] = 'Kalina František (71)';
jmenoKandidata[4][1] = 'Kamarád Martin (39)';
jmenoKandidata[4][2] = 'Benc Ota Mgr. (49)';
jmenoKandidata[4][3] = 'Šnýdlová Anna Mgr. (66)';
jmenoKandidata[4][4] = 'Hamerník Josef (66)';
jmenoKandidata[4][5] = 'Šnýdl Jakub (29)';
jmenoKandidata[4][6] = 'Adam Petr Mgr. (39)';
jmenoKandidata[4][7] = 'Stehno Vladislav RNDr. (38)';
jmenoKandidata[4][8] = 'Loužecká Ilona DiS. (36)';
jmenoKandidata[4][9] = 'Krejčí Jan (44)';
jmenoKandidata[4][10] = 'Žáková Jana (30)';
jmenoKandidata[4][11] = 'Musil Martin Ing. (35)';
jmenoKandidata[4][12] = 'Stolínová Marta (67)';
jmenoKandidata[4][13] = 'Pavlíček Petr (59)';
jmenoKandidata[4][14] = 'Veselík Michal (34)';
jmenoKandidata[4][15] = 'Peřina Tomáš (33)';
jmenoKandidata[5][1] = 'Štefáček Jan Mgr. Bc. (64)';
jmenoKandidata[5][2] = 'Hladík Ladislav Ing. (65)';
jmenoKandidata[5][3] = 'Němec Jiří Mgr. (51)';
jmenoKandidata[5][4] = 'Pejzl Jan (31)';
jmenoKandidata[5][5] = 'Štefanová Dagmar (36)';
jmenoKandidata[5][6] = 'Macek Jindřich Bc. (41)';
jmenoKandidata[5][7] = 'Šauerová Anna (57)';
jmenoKandidata[5][8] = 'Sobotková Lenka (40)';
jmenoKandidata[5][9] = 'Kulhánek Karel (65)';
jmenoKandidata[5][10] = 'Šimanovský Ivo (51)';
jmenoKandidata[5][11] = 'Pochop Stanislav (54)';
jmenoKandidata[5][12] = 'Smejkalová Naděžda Mgr. (53)';
jmenoKandidata[5][13] = 'Štáflová Marta (42)';
jmenoKandidata[5][14] = 'Mošťková Miroslava Ing. (57)';
jmenoKandidata[5][15] = 'Dolák Vladimír (68)';
jmenoKandidata[6][1] = 'Zábrana Václav Ing. (52)';
jmenoKandidata[6][2] = 'Pelikán Josef (65)';
jmenoKandidata[6][3] = 'Hintnaus Jiří (47)';
jmenoKandidata[6][4] = 'Pelikán Josef Ing. (38)';
jmenoKandidata[6][5] = 'Rosický František (43)';
jmenoKandidata[6][6] = 'Musil Radovan (51)';
jmenoKandidata[6][7] = 'Kocourek František (42)';
jmenoKandidata[6][8] = 'Hospodka Stanislav (40)';
jmenoKandidata[6][9] = 'Čejka Jan (61)';
jmenoKandidata[6][10] = 'Vomela Jakub (23)';
jmenoKandidata[6][11] = 'Števuljak Tomáš (44)';
jmenoKandidata[6][12] = 'Michl Pavel (39)';
jmenoKandidata[6][13] = 'Janáček František (66)';
jmenoKandidata[6][14] = 'Musil Jan (65)';
jmenoKandidata[6][15] = 'Vanický Jiří (61)';
jmenoKandidata[7][1] = 'Hyksová Hana Mgr. (42)';
jmenoKandidata[7][2] = 'Slezáková Jaroslava Ing. (62)';
jmenoKandidata[7][3] = 'Mach Ivo Mgr. (31)';
jmenoKandidata[7][4] = 'Orgoníková Lucie Ing. (37)';
jmenoKandidata[7][5] = 'Uhlíř František (60)';
jmenoKandidata[7][6] = 'Bártová Zdeňka (63)';
jmenoKandidata[7][7] = 'Kerbr Zdeněk (39)';
jmenoKandidata[7][8] = 'Rezničenková Irena Ing. (50)';
jmenoKandidata[7][9] = 'Holub Aleš (39)';
jmenoKandidata[7][10] = 'Joukl Libor Ing. (48)';
jmenoKandidata[7][11] = 'Veselá Emilie (65)';
jmenoKandidata[7][12] = 'Prnka Roman (56)';
jmenoKandidata[7][13] = 'Venzhöfer Vojtěch (52)';
jmenoKandidata[7][14] = 'Štěpán Miroslav (63)';
jmenoKandidata[7][15] = 'Hološ Zdeněk (59)';


// ------- zde končí oblast se jmény kandidátů-------

function naplnitJmenaDoTabulky(){
    // procházím pole poleKandidatu
    for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana])
    // vezmu id jména z tabulky a naleju do něj jmenoKandidata přes innerHTML
    document.getElementById("js"+strana+"k"+kandidat).innerHTML = jmenoKandidata[strana][kandidat];
    // TODO: testování

    for(var strana in poleStran)
    document.getElementById("js"+strana).innerHTML = jmenoStrany[strana];

}
// a hned ji spustíme hned pod dokumentem



function sklonujHlasy(n){
    var zneni = "hlasů";
    if (n % 10 == 1 ) zneni = "hlas";
    if (n % 10 == 2 || n % 10 == 3 || n % 10 == 4) zneni = "hlasy";
    if (n == 11 || n == 12 || n == 13 || n == 14) zneni = "hlasů";
    return n + " " + zneni;
}

/////// --------- oblast výpočtu -------------------

// globalni promenne pouzite k vypoctu
var hlaseni = {"platnost":"", "strany":"", "kandidati":"", "vyuziti":"", "poznamka":"", "duvod":""};
var zaskrtnutoStran;
var zaskrtnutoKandidatu;
var zaskrtnutoKandidatuCizichStran;
var zaskrtnutaStrana;
var vyuzitoHlasu;
var jePlatny = true;


function vynulovatVse(){
    // vynulovat všechna hlášení
    for(var item in hlaseni) hlaseni[item]="";

    for(var strana in poleKandidatu){
        document.getElementById("ps"+strana).innerHTML = "celkem " + sklonujHlasy(0);
    }
}

function naplnitPole() {

    // pole kandidátů se vynuluje // thx nox@djpw
    for(var strana in poleKandidatu)
    for(var kandidat in poleKandidatu[strana])
    poleKandidatu[strana][kandidat] = false; // vlastní vynulování

    // pole se naplní podle aktuálních checkboxů kandidátů
    // naplnění se dělá procházením postaveného js pole, nikoli procházením html tabulky
    for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana]){
        var idecko = "s" + strana + "k" + kandidat;// sestavil se nazev idecka v dokumentu
        // TODO: tady by to chtělo zkontrolovat, zda checkboxy v dokumentu existují
        // vezmou se data z checkboxů
        poleKandidatu[strana][kandidat] = window.document.getElementById(idecko).checked;
    }

    // pole stran se vynuluje
    for(var strana in poleStran)
    poleStran[strana] = false;

    // pole se naplní podle aktuálních checkboxů stran
    for(var strana in poleStran){
        var idecko = "s" + strana;
        poleStran[strana] = window.document.getElementById(idecko).checked;
    }
}

function zkontrolovat() {
    var vPohode = true; // výsledná pravdivostní hodnota funkce
    var sporne = false; // sporná platnost
    var mocmandatu = false;

    // průchod polem stran a kontrola, zda je checknutá nejvýše jedna
    // pokud víc, tak return false s hlášením
    // vrati promennou zaskrtnutoStran
    zaskrtnutoStran=0;
    for(var strana in poleStran) if (poleStran[strana]) zaskrtnutoStran ++;
    if (zaskrtnutoStran > 1) {
        hlaseni.duvod += "Příliš mnoho zaškrtnutých stran (smí být nejvýše 1). §41 (2) b)";
        vPohode &= false;
    }

    // průchod polem kandidátů a kontrola, kdo je checknutý
    // pokud jich je víc checknutých než mandátů, return false s hlášením
    // vrati promennou zaskrtnutoKandidatu
    zaskrtnutoKandidatu=0;
    for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana]) if(poleKandidatu[strana][kandidat]) zaskrtnutoKandidatu++;
    if (zaskrtnutoKandidatu > mandatu) {
        // TODO: sporná platnost
        mocmandatu = true;
        if (zaskrtnutoStran == 1){
            zaskrtnutoKandidatuCizichStran=0;
            for(var stranax in poleKandidatu) if(!poleStran[stranax]) for(var kandidatx in poleKandidatu[stranax]) if(poleKandidatu[stranax][kandidatx]) zaskrtnutoKandidatuCizichStran++;
            if (zaskrtnutoKandidatuCizichStran <= mandatu){
                sporne = true;
            }
        }
    }
    if(mocmandatu && !sporne){
        vPohode &= false;
        hlaseni.duvod += "Je příliš mnoho vykřížkovaných kandidátů. Smí jich být tolik, kolik se volí členů zastupitelstva, v tomto případě tedy " + mandatu + ". Křížků u kandidátů je nyní ale " + zaskrtnutoKandidatu + ". §41 (2) c)";
    }
    if(mocmandatu && sporne){
        vPohode &= true;
        hlaseni.duvod += "Je příliš mnoho křížků u kandidátů, ale část jich je v zakřížkované straně. V tomto případě záleží na rozhodnutí volební komise (§41 odst. 5), v jakém pořadí vyhodnocuje platnost lístku. Pokud dříve vyhodnotí odst. 3, je lístek platný. Pokud dříve vyhodnotí odst. 2 c), bude lístek neplatný. Povolený počet křížků je " + mandatu + ". Křížků u kandidátů je nyní " + zaskrtnutoKandidatu + ". Křížků u nezaškrtnutých stran je " + zaskrtnutoKandidatuCizichStran + ". ";
    }
    // kontrola, jestli je vůbec něco checknuté
    // pokud ne, tak return false s hlášením
    if (zaskrtnutoKandidatu == 0 && zaskrtnutoStran == 0){
        hlaseni.duvod += "K platnosti lístku je potřeba aspoň jeden křížek straně nebo kandidátovi. §41 (2) a)";
        vPohode &= false;
    }

    if (vPohode) hlaseni.platnost += "Hlasovací lístek je platný. "
    if (vPohode && sporne) hlaseni.platnost += "<b>Záleží ale na rozhodnutí volební komise</b> (viz níže). "
    if (!vPohode) hlaseni.platnost += "Hlasovací lístek <b>je neplatný</b>.";

    return vPohode;
}

function vypocitatKandidaty(){
    // volá se pouze při platnosti funkce zkontrolovat()

    // případ, kdy je potřeba řešit křížek u strany
    if (zaskrtnutoStran == 1) {
        // zjištění, která strana je zaškrtnutá, měla by být jenom jedna
        for(var strana in poleStran) if(poleStran[strana]) zaskrtnutaStrana = strana;

        // průchod kandidáty zaškrtnuté strany a zrušení jejich křížků
        for(var kandidat in poleKandidatu[zaskrtnutaStrana]) {
            if(poleKandidatu[zaskrtnutaStrana][kandidat])
                hlaseni.poznamka += "Protože " + jmenoStrany[zaskrtnutaStrana] + " je strana zaškrtnutá nahoře, nebere se na křížek u kandidáta " + jmenoKandidata[zaskrtnutaStrana][kandidat] + " žádný ohled. § 41 (3)<br>";
            poleKandidatu[zaskrtnutaStrana][kandidat] = false;
        }

        // spočítání kandidátů cizích stran (křížky u kandidátů zašktrnuté strany už zmizely v minulém kroku)
        zaskrtnutoKandidatuCizichStran=0;
        for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana]) if(poleKandidatu[strana][kandidat]) zaskrtnutoKandidatuCizichStran++;
        // hlaseni.poznamka += "zaškrtnuto kandidátů cizích stran: " + zaskrtnutoKandidatuCizichStran;

        // výpočet křížků k udělení kandidátům zaškrtnuté straně
        var rozdelitKrizku = mandatu - zaskrtnutoKandidatuCizichStran;
        // hlaseni.poznamka += "křížků k rozdělení: " + rozdelitKrizku + ". Zašrktnutá strana: " + zaskrtnutaStrana;

        // průchod kandidáty strany do počtu rozdělovaných křížků - kandidatuCizichStran a jejich křížkování (pokud existují)
        // že kandidáti existují, se zaručí tím, že se prochází polem (a nebere se ohled, zda křížky k rozdělení zbyly)
        for(kandidat in poleKandidatu[zaskrtnutaStrana]) {
            if (rozdelitKrizku > 0){
                poleKandidatu[zaskrtnutaStrana][kandidat] = true;
                rozdelitKrizku --;
            }
        }
        if (zaskrtnutoStran == 0){
            // nic se nedělá
        }

    }

    if (zaskrtnutoStran > 1 || zaskrtnutoStran < 0) hlaseni.poznamka += "Nastala podivuhodná chyba výpočtu.";

    hlaseni.kandidati += " Kandidáti s obdrženým hlasem jsou zvýraznění a jsou to: <br>";
    for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana]) if (poleKandidatu[strana][kandidat]) hlaseni.kandidati += jmenoKandidata[strana][kandidat] + ", ";
    hlaseni.kandidati += "<br> Tyto hlasy u kandidátů nemají přímý vliv na rozdělení mandátů stranám. Mandáty se počítají podle hlasů pro strany (uvedené výše).";
}
function vypocitatStrany(){
    // budeme si hrát s polem hlasyStranam a proměnnou vyuzitoHlasu
    // vynulovani
    for(var strana in hlasyStranam) hlasyStranam[strana] = 0;
    vyuzitoHlasu = 0;

    // pruchod stranami
    for(var strana in poleKandidatu){
        for (var kandidat in poleKandidatu[strana])
        if (poleKandidatu[strana][kandidat]){
            hlasyStranam[strana]++;
            vyuzitoHlasu++;
        }
    }

    // vypsani zisku stran
    hlaseni.strany += "Z následujících čísel se počítá zisk mandátů pro strany. Jednotlivé strany dostaly tento počet hlasů: <br>";
    for(var strana in hlasyStranam) if (hlasyStranam[strana]>0) hlaseni.strany += jmenoStrany[strana] + ": " + sklonujHlasy(hlasyStranam[strana]) + ", ";

    // využití hlasů
    hlaseni.vyuziti += "Volič využil "+ sklonujHlasy(vyuzitoHlasu) + ", tedy " + Math.floor(100*vyuzitoHlasu/mandatu) + " % svých hlasů. ";

    // vyplnění volebního zisku do spodního řádku tabulky celkemHlasu
    for(var strana in hlasyStranam){
        document.getElementById("ps"+strana).innerHTML = "celkem " + sklonujHlasy(hlasyStranam[strana]);
    }

}
function vypsatVysledek(){
    // vypsani hlaseni
    document.getElementById("vysledkyPlatnost").innerHTML = hlaseni.platnost;
    document.getElementById("vysledkyStrany").innerHTML = hlaseni.strany;
    document.getElementById("vysledkyKandidati").innerHTML = hlaseni.kandidati;
    document.getElementById("vysledkyVyuziti").innerHTML = hlaseni.vyuziti;
    document.getElementById("vysledkyPoznamka").innerHTML = hlaseni.poznamka;
    document.getElementById("vysledkyDuvod").innerHTML = hlaseni.duvod;


    document.getElementById("vysledkyPlatnost").className = jePlatny ? "alert alert-success" : "alert alert-danger";
    document.getElementById("vysledkyStrany").className = hlaseni.strany ? "alert alert-info" : "";
    document.getElementById("vysledkyKandidati").className = hlaseni.kandidati ? "alert alert-info" : "";
    document.getElementById("vysledkyVyuziti").className = hlaseni.vyuziti ? vyuzitoHlasu == mandatu ? "alert alert-success" : "alert alert-warning" : "";
    document.getElementById("vysledkyPoznamka").className = hlaseni.poznamka ? "alert alert-warning" : "";
    document.getElementById("vysledkyDuvod").className = hlaseni.duvod ? "alert alert-warning" : "";

    // odbarveni vseho
    for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana]){
        prvek = document.getElementById("i"+"s"+strana+"k"+kandidat).parentElement;
        prvek.className = "kandidat";
    }

    if (jePlatny){
        document.getElementById("tabulkaListku").className = "";
        // obarveni kandidatu
        for(var strana in poleKandidatu) for(var kandidat in poleKandidatu[strana]){
            prvek = document.getElementById("i"+"s"+strana+"k"+kandidat).parentElement;
            if(poleKandidatu[strana][kandidat]) prvek.className = "kandidat dostalHlas";
        }
    }
    if(!jePlatny){
        document.getElementById("tabulkaListku").className = "neplatnyListek";
    }
}


///// hlavní funkce
function prepocitat(){
    vynulovatVse();
    naplnitPole()
    jePlatny = zkontrolovat()
    if(jePlatny){
        vypocitatKandidaty();
        vypocitatStrany();
    }
    vypsatVysledek();

}

// naplnění jmen
naplnitJmenaDoTabulky();