'use strict';

//getting the elements from html
let mallImages = document.getElementById('mallImages');

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
//creating arrays to store the chart indexes
let namesArr = [];
let votesArr = [];
let shownArr = [];
//creating a constrctor Function
function Choices(name, path) {
  (this.name = name),
  (this.path = path),
  (this.votes = 0),
  (this.shows = 0),
  Choices.allChoices.push(this);
  
  //pushing the value of the names into the namesArr
  namesArr.push(this.name);
  //calling the storage updates function
  
}
//creating an array to push the proprties in
Choices.allChoices = [];
//creating instances
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

//creating an Arr to store the shown imgs to prevent them to show up on the first attempt right after it shown
let shownImgs = [];

//rendering the imgs
function renderImages() {
  firstImgIndex = generateRandomIndex();
  secondImgIndex = generateRandomIndex();
  thirdImgIndex = generateRandomIndex();

  while (
    firstImgIndex === secondImgIndex ||
    firstImgIndex === thirdImgIndex ||
    secondImgIndex === thirdImgIndex ||
    shownImgs.includes(firstImgIndex) ||
    shownImgs.includes(secondImgIndex) ||
    shownImgs.includes(thirdImgIndex)
    ) {
      firstImgIndex = generateRandomIndex();
    secondImgIndex = generateRandomIndex();
    thirdImgIndex = generateRandomIndex();
    
  }
  
  //storing the shown images into the array every time it loops (resets) the value and replace it with the new value
  shownImgs = [firstImgIndex, secondImgIndex, thirdImgIndex];
  
  //   console.log(Choices.allChoices[firstImgIndex].path);
  //   console.log(Choices.allChoices[secondImgIndex].path);
  //   console.log(Choices.allChoices[thirdImgIndex].path);
  firstImg.src = Choices.allChoices[firstImgIndex].path;
  Choices.allChoices[firstImgIndex].shows++;
  
  secondImg.src = Choices.allChoices[secondImgIndex].path;
  Choices.allChoices[secondImgIndex].shows++;
  
  thirdImg.src = Choices.allChoices[thirdImgIndex].path;
  Choices.allChoices[thirdImgIndex].shows++;
}
renderImages();

//creating the button out of the funcs
let button = document.createElement('button');
mallImages.appendChild(button);

//handle clicking using addEventListener

mallImages.addEventListener('click', handleUserClick);

function handleUserClick(event) {
  //   event.preventDefault();
  
  attempsCounter++;
  
  // console.log(event.target.id);
  //creating an if statment to control the renderd images and the repeats 
  if (attempsCounter <= maxAttemps) {
    if (event.target.id === 'left') {
      Choices.allChoices[firstImgIndex].votes++;
    } else if (event.target.id === 'mid') {
      Choices.allChoices[secondImgIndex].votes++;
    } else if (event.target.id === 'right') {
      Choices.allChoices[thirdImgIndex].votes++;
    } else {
      alert('only click on the images');
      attempsCounter--;
    }
    renderImages();
  } else {
    //naming the button after we creat it as locally 
    button.textContent = 'Result';
    button.hidden = true;
    //adding an event listener to the button to handle the show of the list
    button.addEventListener('click', showingList);
    button.hidden = false;
   // creating a for loop to loop over the votes and shows to store their values 
    for (let i = 0; i < Choices.allChoices.length; i++) {
      votesArr.push(Choices.allChoices[i].votes);
      shownArr.push(Choices.allChoices[i].shows);
      //calling the function to add the renderd data of the votes and shows to the local storage 
      updateStorage();
    }
    //console.log(votesArr);
    
    // CALL the chart
    chart();
    
    mallImages.removeEventListener('click', handleUserClick);
  }
}
function showingList() {
  let list = document.getElementById('renderdList');
  
  let choicesResult;
  
  for (let i = 0; i < Choices.allChoices.length; i++) {
    choicesResult = document.createElement('li');
    list.appendChild(choicesResult);
    choicesResult.textContent = `${Choices.allChoices[i].name} had ${Choices.allChoices[i].votes} votes, and was seen ${Choices.allChoices[i].shows} Times.`;
  }
  button.removeEventListener('click', showingList);
}

// creating a function to push the into local storage
function updateStorage(){
  let arrayShowsString=JSON.stringify(Choices.allChoices);
  
  // console.log('arr',arrayShowsString);
  localStorage.setItem('Choices',arrayShowsString);
}

function getChoices(){
  let stringData=localStorage.getItem('Choices');
  // console.log(newData);
  let revData=JSON.parse(stringData);
  
  if (revData !==null) {
    Choices.allChoices=revData;
  }
  renderImages();
}

// chart.js
function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  
  let chart = new Chart(ctx, {
    // what type is the chart
    type: 'bar',
    
    //  the data for showing
    data: {
      //  for the names
      labels: namesArr,
      
      datasets: [
        {
          label: 'imgs votes',
          data: votesArr,
          backgroundColor: ['rgb(251, 93, 76)'],
          
          borderWidth: 1,
        },
        
        {
          label: 'imgs shown',
          data: shownArr,
          backgroundColor: ['black'],
          
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });
}
//calling the function which rendering the local storage  data if its != null, means its not an initialization
   getChoices();
