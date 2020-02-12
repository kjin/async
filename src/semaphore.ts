export class Semaphore {
  private count: number;
  private readonly queue: Array<() => void> = [];

  constructor(count = 1) {
    this.count = count;
  }
  async acquire(): Promise<void> {
    if (this.count === 0) {
      await new Promise(res => {
        this.queue.push(res);
      });
    } else {
      this.count--;
    }
  }

  release() {
    if (this.queue.length > 0) {
      this.queue.shift()!();
    } else {
      this.count++;
    }
  }
}
