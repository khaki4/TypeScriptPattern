namespace ChainOfResponsibility {
  let objectA = {
    scope: 'user.installation.package'
  };

  let objectB = {
    scope: 'user.installation'
  };

  type RequestType = 'help' | 'feedback';

  interface Request {
    type: RequestType;
  }

  class Handler {
    private successor: Handler;

    handler(request: Request): void {
      if (this. successor) {
        this.successor.handler(request);
      }
    }
  }

  class HelpHandler extends Handler {
    handle(request: Request): void {
      if (request.type === 'help') {
        // show some infomation.
      } else {
        super.handler(request);
      }
    }
  }

  class FeedbackHandler extends Handler {
    handle(request: Request): void {
      if(request.type === 'feedback') {
        // Prompt for beedback.
      } else {
        super.handler(request);
      }
    }
  }
}