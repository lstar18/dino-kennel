const dinos = [{
    id: 'dino1',
    name: 'Lori',
    type: 'T Rex',
    age: 30,
    owner: 'Zoe',
    adventures: [],
    health: 99,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
  },
  {
    id: 'dino2',
    name: 'Simon',
    type: 'Velociraptor',
    age: 10,
    owner: 'Zoe',
    adventures: [],
    health: 1,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
  },
  {
    id: 'dino3',
    name: 'Lev',
    type: 'Stegosaurous',
    age: 50,
    owner: 'Luke',
    adventures: [],
    health: 45,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61fC04pumjL._AC_SL1001_.jpg'
  }];
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const closeSingleViewEvent = () => {
    printToDom('single-view', '');
    printDinos(dinos);
}
//printing a single card
const viewSingleDino = (e) => {
    const dinoId = e.target.closest('.card').id;
    const selectedDino = dinos.find((x) => dinoId === x.id);
    let domString = '';
    domString += '<button class="btn btn-outline-dark single-dino" id="close-single-view"><i class="far fa-times-circle"></i></button>'
    domString += '<div class="container">';
        domString += '<div class="row">';
        domString += '<div class="col-6">';
        domString += `<img class="img-fluid" src="${selectedDino.imageUrl}" alt="">`;
        domString += '</div>';
        domString += '<div class="col-6">';
        domString +=    `<h2>${selectedDino.name} </h2>`;
        domString +=    `<p>${selectedDino.type} </p>`;
        domString +=    `<p>${selectedDino.age} </p>`;
        domString +=    `<p>${selectedDino.owner} </p>`;
        domString += '<div class="progress">'
        domString += `<div class="progress-bar bg-danger" role="progressbar" style="width:${selectedDino.health}%" aria-valuenow="${selectedDino.health}" aria-valuemin="0" aria-valuemax="100"></div>`
        domString += '</div>'
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';

    printToDom('kennel', '');
    printToDom('single-view', domString);
document.getElementById('close-single-view').addEventListener('click',closeSingleViewEvent);
}
//adding single view button
const singleDinoAddEvents = () => {
    const dinoViewButtons = document.getElementsByClassName('single-dino');
    for (let i = 0; i < dinoViewButtons.length; i++)
        dinoViewButtons[i].addEventListener('click',viewSingleDino);
};
//Targeting dino in array using findIndex to increase health value by 1
const dinoHealth = (e) => {
    const dinoId = e.target.closest('.card').id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
    if(dinos[dinoPosition].health < 100) {
        dinos[dinoPosition].health += 1;
        printDinos(dinos);
    };
};
//adding mouseleave to image
const petEvents = () => {
    const dinoPetButtons = document.getElementsByClassName('dino-photo');
    for (let i = 0; i < dinoPetButtons.length; i++)
        dinoPetButtons[i].addEventListener('mouseleave', dinoHealth);
};
const deleteDinoEvent = (e) => {
    const dinoId = e.target.closest('.card').id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
   dinos.splice(dinoPosition, 1);
   printDinos(dinos);
}
//grabbing all delete buttons and added a click event
const deleteEvents = () => {
    const dinoDeleteButtons = document.getElementsByClassName('delete-dino');
    for (let i = 0; i < dinoDeleteButtons.length; i++){
        dinoDeleteButtons[i].addEventListener('click', deleteDinoEvent);
    };
};
const feedMe = (e) => {
    const dinoId = e.target.closest('.card').id;
    const dinoPosition = dinos.findIndex((p) => p.id === dinoId);
    if(dinos[dinoPosition].health < 90) {
        dinos[dinoPosition].health += 10;
        printDinos(dinos);
}
    if(dinos[dinoPosition].health > 89 && dinos[dinoPosition].health < 100) {
        dinos[dinoPosition].health = 100;
        printDinos(dinos);
}
printDinos(dinos);
}
const feedEvents = () => {
    const dinoFeedButtons = document.getElementsByClassName('feed-button');
    for (let i = 0; i < dinoFeedButtons.length; i++) {
        dinoFeedButtons[i].addEventListener('click', feedMe);
    };
};
//printing dino cards from form input values
const printDinos = (dinoArray) => {
    let domString = '';
    for (let i=0; i < dinoArray.length; i++) {
        domString += `<div class="col-4">`
        domString += `<div id="${dinoArray[i].id}" class="card">`
        domString += `<img src="${dinoArray[i].imageUrl}" class="card-img-top dino-photo" alt="Card image cap">`
        domString += `<div class="card-body">`
        domString += ` <h5 class="card-title">${dinoArray[i].name} </h5>`
        domString += '<div class="progress">'
        domString += `<div class="progress-bar bg-danger" role="progressbar" style="width:${dinoArray[i].health}%" aria-valuenow="${dinoArray[i].health}" aria-valuemin="0" aria-valuemax="100"></div>`
        domString += '</div>'
        domString += '<button class="btn btn-outline-dark feed-button"> <i class="fas fa-drumstick-bite"></i></button>'
        domString += '<button class="btn btn-outline-dark single-dino"><i class="far fa-eye"></i></button>'
        domString += '<button class="btn btn-outline-danger delete-dino"><i class="fas fa-trash-alt"></i></button>'
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
    }
    printToDom('kennel', domString)
    singleDinoAddEvents();
    petEvents();
    deleteEvents();
    feedEvents();
};
//creates bew dino from form by getting the elements by their ids and creating a new object in the array
const newDino = (e) => {
    e.preventDefault();
    const brandNewDino = {
    id: `dino${dinos.length + 1}`,
    name: document.getElementById('dino-name').value,
    type: document.getElementById('dino-type').value,
    age: document.getElementById('dino-age').value,
    owner: document.getElementById('dino-owner').value,
    adventures: [],
    health: 100,
    imageUrl: document.getElementById('dino-image').value
    };
dinos.push(brandNewDino);
document.getElementById('new-dino-form').reset();
document.getElementById('collapseOne').classList.remove('show');
printDinos(dinos);
};

const init = () => {
    document.getElementById('submit-new-dino').addEventListener('click', newDino);
    printDinos(dinos);
};

init();