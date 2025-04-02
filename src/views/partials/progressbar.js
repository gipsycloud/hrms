import ProgressBar from 'progress';

export function progressBar() {
  var bar = new ProgressBar(':bar :rate/bps :percent :etas', { total: 10 });
  var timer = setInterval(function () {
    bar.tick();
    if (bar.complete) {
      clearInterval(timer);
    }
  }, 100);
}