class Payload {
  weight: number;
}

class Engine {
  thrust: number;
}

class Stage {
  engine: Engine[];
}

/**
 * 1> new 연산자가 있는 생성자
 */
function Rocket() {
  this.paylaod = {
    name: 'cargo ship'
  };
  this.stage = [
    {
      engines: [
        // ...
      ]
    }
  ];
}
var rocket = new Rocket();

/**
 * 2> factory 함수
 */
function buildRocket() {
  var rocket = {};
  rocket.payload = {
    name: 'cargo ship'
  };
  rocket.stage = [
    {
      thrusters: [
        //...
      ]
    }
  ];
  return rocket;
}

var rocket2 = buildRocket();

/**
 * 1, 2 로켓을 모듈식 조립할 수 있는 유연성을 제공하지 못한다.
 * 이것을 생성 디자인 패턴을 통해 해결해보자.
 */

namespace FactoryMethod {
  class Rocket {
    payload: Payload;
    stage: Stage[];
  }

  class Payload {
    constructor(
      public weight: number
    ) { }
  }

  class Engine {
    constructor(
      public thrust: number
    ) { }
  }

  class Stage {
    constructor(
      public engine: Engine[]
    ) { }
  }

  class RocketFactory {
    buildRocket(): Rocket {
      let rocket = this.createRocket();
      let payload = this.createPayload();
      let stages = this.createStages();
      rocket.payload = payload;
      rocket.stage = stages;
      return rocket;
    }

    createRocket(): Rocket {
      return new Rocket();
    }

    createPayload(): Payload {
      return new Payload(0);
    }

    createStages(): Stage[] {
      let engine = new Engine(1000);
      let stage = new Stage([engine]);
      return [stage];
    }
  }
  let rocketFatory = new RocketFactory();
  export let rocket = rocketFatory.buildRocket();

  class Satellite extends Payload {
    constructor(
      public id: number
    ) {
      super(200);
    }
  }

  class FirstStage extends Stage {
    constructor() {
      super([
        new Engine(1000),
        new Engine(1000),
        new Engine(1000),
        new Engine(1000)
      ])
    }
  }

  class SecondStage extends Stage {
    constructor() {
      super([
        new Engine(1000)
      ]);
    }
  }

  type FrightRocketStage = [FirstStage, SecondStage]; // Tuple, not Array

  class FrightRocketFactory extends RocketFactory {
    nextSatelliteId = 0;
    createPayload(): Satellite {
      return new Satellite(this.nextSatelliteId++);
    }
    createStages(): FrightRocketStage {
      return [
        new FirstStage(),
        new SecondStage()
      ]
    }
  }

  let frightRocketFactory = new FrightRocketFactory();
  frightRocketFactory.createPayload();
  frightRocketFactory.createStages();
  export let rocket2 = frightRocketFactory.buildRocket();
}

console.log(rocket2)
