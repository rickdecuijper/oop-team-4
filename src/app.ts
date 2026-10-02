import TheCrazyDiamant from './TheCrazyDiamant.js';

const game: TheCrazyDiamant = new TheCrazyDiamant(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  game.start();
});
