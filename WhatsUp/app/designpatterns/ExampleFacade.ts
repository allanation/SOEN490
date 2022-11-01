class Bed {
  makeTheBed() {
    console.log('The bed is ready');
  }
}

class AirFreshener {
  spray() {
    console.log('A nice smell spreads through the air');
  }
}

class TrashCan {
  takeOutTrash() {
    console.log('The trash is taken out');
  }
}

class Dishwasher {
  fill() {
    console.log('The dishwasher is filled');
  }
  wash() {
    console.log('The dishwasher is working');
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
  empty() {
    console.log('The dishwasher is empty');
  }
}

class HouseCleaningFacade {
  bed: Bed;
  trashCan: TrashCan;
  airFreshener: AirFreshener;
  dishwasher: Dishwasher;

  constructor(bed, trashCan, airFreshener, dishwasher) {
    this.bed = bed;
    this.trashCan = trashCan;
    this.airFreshener = airFreshener;
    this.dishwasher = dishwasher;
  }

  cleanTheHouse() {
    this.bed.makeTheBed();
    this.trashCan.takeOutTrash();
    this.airFreshener.spray();

    this.dishwasher.fill();
    this.dishwasher.wash().then(this.dishwasher.empty);
  }
}

/*
Example implementation:
const houseCleaning = new HouseCleaningFacade(
  new Bed(),
  new TrashCan(),
  new AirFreshener(),
  new Dishwasher()
);
 
houseCleaning.cleanTheHouse();
*/
