/**
 * CircularBuffer — a fixed-capacity FIFO buffer that wraps around.
 * See README.md › CircularBuffer.
 */
export class BufferFullError extends Error {}

export class CircularBuffer {
  constructor(capacity, { overwrite = false } = {}) {
    throw new Error("TODO: implement CircularBuffer");
  }

  write(value) {}

  read() {}

  get size() {}

  isFull() {}
}
