

window.addEventListener('keydown', startGame);

function startGame(element) {
  if (element.keyCode === 39 || element.keyCode === 37 || element.keyCode === 38 || element.keyCode === 40) {
    window.location.href = 'area1.html';
  }
}
