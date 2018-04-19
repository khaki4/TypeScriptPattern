namespace Decorator {
  // simple example
  // const _log = console.log;
  // console.log = function () {
  //   let timestamp = `[${new Date().toTimeString()}]`
  //   return _log.apply(this, [timestamp, ...arguments]);
  // }
  //
  // console.log(7)
  
  const _log = console.log;
  console.log = function () {
    const timestamp = `[${new Date().toTimeString()}]`;
    return _log.apply(this, [timestamp, ...arguments]);
  }




  abstract class UIComponent {
    abstract draw(): void;
  }

  class Text {
    content: string;

    setColor(color: string): void { }
    setFont(font: string): void { }

    draw(): void { }
  }

  class TextComponent extends UIComponent {
    texts: Text[];

    draw(): void {
      for (let text of this.texts) {
        text.draw();
      }
    }
  }

  class Decorator extends UIComponent {
    constructor(
      public component: TextComponent
    ) {
      super();
    }

    get texts(): Text[] {
      return this.component.texts;
    }

    draw(): void {
      this.component.draw();
    }
  }

  class ColorDecorator extends Decorator {
    constructor(
      component: TextComponent,
      public color: string
    ) {
      super(component);
    }

    draw(): void {
      for (let text of this.texts) {
        text.setColor(this.color);
      }

      super.draw();
    }
  }

  class FontDecorator extends Decorator {
    constructor(
      component: TextComponent,
      public font: string
    ) {
      super(component);
    }

    draw(): void {
      for (let text of this.texts) {
        text.setFont(this.font);
      }

      super.draw();
    }
  }

  let decoratedComponent = new ColorDecorator(
    new FontDecorator(
      new TextComponent(),
      'sans-serif'
    ),
    'black'
  );


  // es next Decorator를 이용하는 방법.

  function prefix(
    taget: object,
    name: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    let method = descriptor.value as Function;

    if (typeof method != 'function') {
      throw new Error('Expectiong decorating a method');
    }

    return {
      value: function () {
        return '[prefix] ' + method.apply(this, arguments);
      },
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable
    };
  }

}

