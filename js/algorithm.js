const counts = {
  game:0,
  music:0,
  animal:0,
  exercise:0
};

function increaseInterest(type){

  counts[type]++;

  updateBars();

}

function updateBars(){

  const total =
    counts.game +
    counts.music +
    counts.animal +
    counts.exercise;

  if(total === 0) return;

  const gamePercent =
  (counts.game / total) * 100;

  const musicPercent =
  (counts.music / total) * 100;

  const animalPercent =
  (counts.animal / total) * 100;

  const exercisePercent =
  (counts.exercise / total) * 100;

  document.getElementById(
    'gameFill'
  ).style.width = `${gamePercent}%`;

  document.getElementById(
    'musicFill'
  ).style.width = `${musicPercent}%`;

  document.getElementById(
    'animalFill'
  ).style.width = `${animalPercent}%`;

  document.getElementById(
    'exerciseFill'
  ).style.width = `${exercisePercent}%`;

}