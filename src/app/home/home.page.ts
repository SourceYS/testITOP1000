import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{
  value$ = new Observable<number>(subscriber => {
    subscriber.next(0);
  });
  isActive = false;
  interval: any;
  taps = 0;

  constructor() {}

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCountdown() {
    this.isActive = true;
    this.interval = setInterval(() => {
      this.value$ = this.value$.pipe(
          map(value => value + 1000)
      );
    }, 1000);
  }

  stopCountdown() {
    this.isActive = false;
    this.value$ = this.value$.pipe(
        map(() => 0)
    );
    clearInterval(this.interval);
  }

  resetCountdown() {
    this.stopCountdown();
    this.startCountdown();
  }

  waitCountdown() {
    this.taps++;
    setTimeout(() => {
      if (this.taps === 1) { this.taps = 0; }
      else {
        this.taps = 0;
        this.isActive = false;
        clearInterval(this.interval);
      }
    }, 300);
  }

}






/*




app.filter('hhmmss', function () {
  return function (time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
  }
});

 */
