'use strict';

//getting the elements from html
let firstImg = document.getElementById('left');
let secondImg = document.getElementById('mid');
let thirdImg = document.getElementById('right');

// creating an index for each img
let firstImgIndex;
let secondImgIndex;
let thirdImgIndex;
//creating a local vars to use them in rendering and generating values
let maxAttemps = 25;
let attempsCounter = 0;
let shows=0;

//creating a constrctor Function
function Choices(name, path) {
  (this.name = name),
  (this.path = path),
  (this.votes = 0),
  (this.shows = 0),
  Choices.allChoices.push(this);
}
//creating an array to push the proprties in
Choices.allChoices = [];
//creating instanses
new Choices('bag', 'imgs/bag.jpg');
new Choices('banana', 'imgs/banana.jpg');
new Choices('bathroom', 'imgs/bathroom.jpg');
new Choices('boots', 'imgs/boots.jpg');
new Choices('breakfast', 'imgs/breakfast.jpg');
new Choices('bubblegum', 'imgs/bubblegum.jpg');
new Choices('chair', 'imgs/chair.jpg');
new Choices('cthulhu', 'imgs/cthulhu.jpg');
new Choices('dog-duck', 'imgs/dog-duck.jpg');
new Choices('dragon', 'imgs/dragon.jpg');
new Choices('pen', 'imgs/pen.jpg');
new Choices('pet-sweep', 'imgs/pet-sweep.jpg');
new Choices('scissors', 'imgs/scissors.jpg');
new Choices('shark', 'imgs/shark.jpg');
new Choices('sweep', 'imgs/sweep.png');
new Choices('tauntaun', 'imgs/tauntaun.jpg');
new Choices('unicorn', 'imgs/unicorn.jpg');
new Choices('usb', 'imgs/usb.gif');
new Choices('water-can', 'imgs/water-can.jpg');
new Choices('wine-glass', 'imgs/wine-glass.jpg');

// console.log(Choices.allChoices);

//function to generateRandomIndex
function generateRandomIndex() {
  return Math.floor(Math.random() * Choices.allChoices.length);
}
// console.log(generateRandomIndex());

//rendering the imgs
function renderImages() {
  firstImgIndex = generateRandomIndex();
  secondImgIndex = generateRandomIndex();
  thirdImgIndex = generateRandomIndex();

  while (
    firstImgIndex === secondImgIndex ||
    firstImgIndex === thirdImgIndex ||
    secondImgIndex === thirdImgIndex
  ) {
    firstImgIndex = generateRandomIndex();
    thirdImgIndex = generateRandomIndex();
  }
  //   console.log(Choices.allChoices[firstImgIndex].path);
  //   console.log(Choices.allChoices[secondImgIndex].path);
  //   console.log(Choices.allChoices[thirdImgIndex].path);
  firstImg.src = Choices.allChoices[firstImgIndex].path;shows++;
  secondImg.src = Choices.allChoices[secondImgIndex].path;shows++;
  thirdImg.src = Choices.allChoices[thirdImgIndex].path;shows++;
}
renderImages();

//handle clicking using addEventListener
let mallImages=document.getElementById('mallImages');

mallImages.addEventListener('click',handleUserClick);

function handleUserClick(event){

  //   event.preventDefault();

  attempsCounter++;

     console.log(event.target.id);

  if (attempsCounter<=maxAttemps){

    if(event.target.id==='left'){

      Choices.allChoices[firstImgIndex].vote++;
    }else if

    (event.target.id==='mid'){
      Choices.allChoices[secondImgIndex].vote++;

    }else{


      Choices.allChoices[secondImgIndex].vote++;
    }


  }else{
    let list=document.getElementById('renderdList');

    let choicesResult;

    for (let i = 0; i < Choices.allChoices.length ; i++){

      choicesResult=document.createElement('li');

      list.appendChild(choicesResult);
      choicesResult.textContent=`${Choices.allChoices[i].name} had ${Choices.allChoices.votes} votes, and was seen ${shows} Times.`

    }

  }}