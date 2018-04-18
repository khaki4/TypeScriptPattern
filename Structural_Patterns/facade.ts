import { EventEmitter } from 'events';

namespace Facade {
    class Robot {
        leftLegMotion: MotionController;
        rightLegMotion: MotionController;

        leftFootFeedback: FeedbackController;
        rightFootFeedback: FeedbackController;

        walk(steps: number): void { }
        jump(strength: number): void { }
    }


    class Leg {
        thigh = new Thigh();
        shank = new Shank();
        foot = new Foot();

        mothinController: MotionController;
        feedbackController: FeedbackController;

        constructor() {
            this.mothinController = new MotionController(this);
            this.feedbackController = new FeedbackController(this.foot);

            this.feedbackController.on('touch', () => {
                //...
            });
        }
    }

    class MotionController {
        constructor(
            public leg: Leg
        ) { }

        setAngle(angle: number): void {
            let {
                thigh,
                shank,
                foot
            } = this.leg;
    
            // ...
        }
    }

    class FeedbackController extends EventEmitter {
        constructor(
            public foot: Foot
        ) { 
            super();
        }
    }

    class Thigh {

    }
    
    class Shank {
    
    }
    
    class Foot {
    
    }
}