// get the green button
const greenButton = document.querySelector('.green');
// get the blue shape
const blueShape = document.querySelector('.blue');
// add an event listener to the green button
greenButton.addEventListener('click', () => {
  // toggle the show class on the blue shape
  blueShape.classList.toggle('show');
  });