// grab an element
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();

var loader = document.querySelector('#loading');

if( loader ){
    loader.animate({'opacity':1},1000);
    window.onload = function(){
        loader.style.display = 'none';
    }
}

function setAction(name,contact,message){
    window.location.href =`mailto:manuelfrancoesquivel@gmail.com?subject=${name} desde tu sitio web &body=${message}, contacto:${contact}.`;
    return false;
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var cookie = sessionStorage.getItem("idioma");

if( cookie ){
    var flagLanguage = true;
    idiom();
}else{
    var flagLanguage = false;
    idiom();
}


function idiom(){
    if( !flagLanguage ){
        //usage:
        readTextFile("./js/info_en.json", function(text){
            var data = JSON.parse(text);
            printData(data);
        });
    }else{
        readTextFile("./js/info_es.json", function(text){
            var data = JSON.parse(text);
            printData(data);
        });
    }
}

var changeLanguage = document.getElementById('changeLanguage');
changeLanguage.addEventListener('click', () => {
    flagLanguage = !flagLanguage;
    if( flagLanguage ){
        sessionStorage.setItem("idioma", true);
        idiom();
    }else{
        if( sessionStorage.getItem("idioma") ){
            sessionStorage.removeItem("idioma", true);
        }
        idiom();
    }
    
});

var navItems = document.getElementById('nav-items');
var titleHero = document.getElementById('title-hero');
var subtitleHero = document.getElementById('subtitle-hero');
var titleIam = document.getElementById('title-iam');
var subtitleIam = document.getElementById('subtitle-iam');
var cardsSkills = document.getElementById('cards-skills');
var titleProjects = document.getElementById('title-projects');
var subtitleProjects = document.getElementById('subtitle-projects');
var projects = document.getElementById('projects');
var webTab = document.getElementById('pills-web-tab');
var gameTab = document.getElementById('pills-games-tab');
var dektopTab = document.getElementById('pills-desktop-tab');
var webProjects = document.getElementById('pills-web-data');
var gameProjects = document.getElementById('pills-games-data');
var dektopProjects = document.getElementById('pills-desktop-data');
var titleCapacities = document.getElementById('title-capacities');
var listCapacities = document.getElementById('list-capacities');
var titleForm = document.getElementById('title-form');
var networksTitle = document.getElementById('networks-title');
var formName = document.getElementById('form-name');
var formEmail = document.getElementById('form-email');
var formMessage = document.getElementById('form-message');
var formButton = document.getElementById('form-button');
var uses = '';
var link = '';

function printData(data){
    if( navItems){
        let itemsNav = data.navigation;
        navItems.innerHTML = '';
        itemsNav.forEach( item => {
            navItems.innerHTML += `<li class="nav-item">
                                    <a class="nav-link" href="${item.url}">${item.title}</a>
                                  </li>`;
        });
    }
    if( titleHero ){
        titleHero.innerHTML = '';
        titleHero.innerText = data.titleHero;
    }
    if( subtitleHero ){
        subtitleHero,innerHTML = '';
        subtitleHero.innerText = data.subtitleHero;
    }
    if( titleIam ){
        titleIam.innerHTML = '';
        titleIam.innerText = data.titleWhoIAm;
    }
    if( subtitleIam ){
        subtitleIam.innerHTML = '';
        subtitleIam.innerText = data.textWhoIAm;
    }
    if( cardsSkills){
        let cards = data.services;
        cardsSkills.innerHTML = '';
        cards.forEach( card => {
            var listEXperience = '';
            var listTools = '';
            for( i of card.experience ){
                listEXperience += `<li>${i.title}</li>`;
            }
            for( j of card.tools ){
                listTools += `<li>${j.title}</li>`;
            }
            
            cardsSkills.innerHTML += `<div class="col-12 col-md-4 p-2">
                                        <div class="card" style="width: 100%;">
                                            <div class="card-body">
                                                <img src="${card.img}" class="mx-w-100" alt="Juan Manuel ${card.name}">
                                                <h5 class="card-title d-flex align-self-center pb-2">${card.name}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted pb-2">${card.text}</h6>
                                                <p class="card-text"><span class="badge bg-yellow">${card.titleExperience}</span></p>
                                                <ul class="card-text pb-2">
                                                    ${listEXperience}
                                                </ul>
                                                <p class="card-text"><span class="badge bg-yellow">${card.titleTools}</span></p>
                                                <ul class="card-text">
                                                    ${listTools}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>`;
        });
    }
    if( titleProjects ){
        titleProjects.innerHTML = '';
        titleProjects.innerText = data.projectsTitle;
    }
    if( subtitleProjects ){
        subtitleProjects.innerHTML = '';
        subtitleProjects.innerText = data.projectsSubtible;
    }
    if( projects ){

    }
    if( titleCapacities ){
        titleCapacities.innerHTML = '';
        titleCapacities.innerText = data.capacitiesText;
    }
    if( listCapacities ){
        listCapacities.innerHTML = '';
        data.capacitiesList.forEach( item => {
            listCapacities.innerHTML += `<li>${item.text}</li>`;
        });
    }
    if( titleForm ){
        titleForm.innerHTML = '';
        titleForm.innerText = data.formFields.title;
    }
    if( formName ){
        formName.innerHTML = '';
        formName.innerText = data.formFields.name;
    }
    if( formEmail ){
        formEmail.innerHTML = '';
        formEmail.innerText = data.formFields.contact;
    }
    if( formMessage ){
        formMessage.innerHTML = '';
        formMessage.innerText = data.formFields.message;
    }
    if( formButton ){
        formButton.innerHTML = '';
        formButton.innerText = data.formFields.button;
    }
    if( networksTitle ){
        networksTitle.innerHTML = '';
        networksTitle.innerText = data.networksTitle;
    }
    if( webTab ){
        webTab.innerHTML = '';
        webTab.innerText = data.projectsTabs[0].title;
    }
    if( webProjects ){
        webProjects.innerHTML = '';
        data.projects.forEach(element => {
            if(element.type == 'web'){
                for(let index = 0; index < element.uses.length; index++) {
                    uses += `<li class="list-group-item">${element.uses[index]}</li>`
                }
                if(element.hosting == 'true'){
                    link = `<li class="tex-white"><a href="${element.ref}" target="_blank"><i class="fa fa-github"></i></a></li>`;
                }else{
                    if( element.message == "En proceso" || element.message == 'In process' ){
                        link = `<li class="tex-white"><i class="fa fa-wrench "></i></li>`;
                    }else{
                        link = `<li class="tex-white"><a href="${element.ref}" target="_blank"><i class="fa fa-youtube"></i></a></li>`;
                    }
                }
                webProjects.innerHTML += `
                <div class="col-sm-12 col-md-6 col-xl-4 mb-2 mt-2">
                    <div class="card transition" style="border:0px solid #fff !important;">
                    <div class="card__collection clear-fix">

  <div class="cards cards--three">
    <img src="${element.img}" class="img-responsive" alt="">
    <span class="cards--three__rect-1">
      <span class="shadow-1"></span>
      <p class="text-white"><strong>${element.title}</strong></p>
    </span>
    <span class="cards--three__rect-2">
      <span class="shadow-2">
        <p>${element.description}</p>
      </span>
    </span>
    <span class="cards--three__circle"></span>
    <ul class="cards--three__list">
      ${link}
    </ul>
  </div>
</div>
                    </div>
                </div>
                `;
                uses = '';
                link = '';
            }
        });
    }
    if( gameTab ){
        gameTab.innerHTML = '';
        gameTab.innerText = data.projectsTabs[1].title;
    }
    if( gameProjects ){
        gameProjects.innerHTML = "";
        data.projects.forEach(element => {
            gameProjects.innerHTML = "";
            if(element.type == 'game'){
                for(let index = 0; index < element.uses.length; index++) {
                    uses += `<li class="list-group-item">${element.uses[index]}</li>`
                }
                if(element.hosting == 'true'){
                    link = `<a href="${element.ref}" class="btn btn-outline-dark" target="_blank"><i class="fa fa-github"></i> | ${element.message}</a>`
                }else{
                    link = `<a href="${element.ref}" class="btn btn-outline-danger" target="_blank"><i class="fa fa-youtube"></i> | ${element.message}</a>`
                }
                gameProjects.innerHTML += `
                <div class="col-sm-12 col-md-4 col-xl-3 mb-2 mt-2">
                    <div class="card h-100">
                        <img src="${element.img}" class="card-img-top" width="90%" alt="${element.title}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${element.title}
                            </h5>
                            <p class="card-text">
                                ${element.description}
                            </p>
                        </div>
                        <ul class="list-group list-group-flush">
                            ${uses}
                        </ul>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                ${link}
                            </div>
                        </div>
                    </div>
                </div>
                `;
                uses = '';
                link = '';
            }
        });
    }
    if( dektopTab ){
        dektopTab.innerHTML = '';
        dektopTab.innerText = data.projectsTabs[2].title;
    }
    if( dektopProjects ){
        dektopProjects.innerHTML = "";
        data.projects.forEach(element => {
            if(element.type == 'desktop'){
                for(let index = 0; index < element.uses.length; index++) {
                    uses += `<li class="list-group-item">${element.uses[index]}</li>`
                }
                if(element.hosting == 'true'){
                    link = `<a href="${element.ref}" class="btn btn-outline-dark" target="_blank"><i class="fa fa-github"></i> | ${element.message}</a>`
                }else{
                    link = `<a href="${element.ref}" class="btn btn-outline-danger" target="_blank"><i class="fa fa-youtube"></i> | ${element.message}</a>`
                }
                dektopProjects.innerHTML += `
                <div class="col-sm-12 col-md-4 col-xl-3 mb-2 mt-2">
                    <div class="card h-100">
                        <img src="${element.img}" class="card-img-top" width="90%" alt="${element.title}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${element.title}
                            </h5>
                            <p class="card-text">
                                ${element.description}
                            </p>
                        </div>
                        <ul class="list-group list-group-flush">
                            ${uses}
                        </ul>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                ${link}
                            </div>
                        </div>
                    </div>
                </div>
                `;
                uses = '';
                link = '';
            }
        });
    }
}
