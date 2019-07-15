

// spawn initial clouds
for (let i = 0; i < 5; i++) {
  spawnCloud();
}


function spawnCloud() {
  const newCloud = document.createElement('div');
  newCloud.classList.add('cloud');
  document.body.appendChild(newCloud);

  newCloud.style.left = `${Math.random() * window.innerWidth}px`;
  newCloud.style.top = `${Math.random() * window.innerHeight}px`;

  // set random cloud size
  newCloud.style.width = `${Math.random() * 100}%`;
}

setInterval(spawnCloud, 1000);
