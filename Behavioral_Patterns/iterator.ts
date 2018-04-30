namespace IteratorPattern {
  export interface Iterator<T> {
    first(): void;
    next(): void;
    end: boolean;
    item: T;
    index: number;
  }

  class ArrayIterator<T> implements Iterator<T>{
    index = 0;

    constructor(
      public array: T[]
    ) { }

    first(): void {
      this.index = 0;
    }

    next(): void {
      this.index++;
    }

    get end(): boolean {
      return this.index >= this.array.length;
    }

    get item(): T {
      return this.array[this.index];
    }
  }

  Object.defineProperty(Array.prototype, 'iterator', {
    get() {
      return new ArrayIterator(this);
    }
  });
}

interface Array<T> {
  iterator: IteratorPattern.Iterator<T>;
}