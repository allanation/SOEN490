// export type TemperatureObserver = (temperature: Number) => void;

// class WeatherSubject {
//   private observers: TemperatureObserver[] = [];
//   private intervalId = null;

//   public attach(observer: TemperatureObserver) {
//     this.observers.push(observer);
//   }

//   public detach(observer: TemperatureObserver) {
//     this.observers = this.observers.filter(
//       (observer) => observerToRemove != observer
//     );
//   }

//   public updateWeather() {
//     this.intervalId = setInterval(() => {
//       const weather = this.fetchWeather();
//       this.notify(weather.temperature);
//     }, 1000);
//   }

//   public cleanUpdates() {
//     if (this.intervalId) {
//       clearInterval(this.intervalId);
//       this.intervalId = null;
//     }
//   }

//   private fetchWeather() {
//     //dude
//   }

//   private notify(temperature: Number) {
//     this.observers.forEach((observer) => observer(temperature));
//   }
// }

// const weatherSubject = new WeatherSubject();

// export default weatherSubject;
import Observer from './Observer';

export default class Subject {
  observers = new Set<Observer>();

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(message) {
    for (const n of this.observers) {
      n.update(message);
    }
  }
}

/*
  const subject = new Subject();

  subject.subscribe(new Observer());
  subject.subscribe(new Observer());

  subject.notify('Hello world!');
*/
