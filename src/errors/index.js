export default class extends Error {
  constructor(message = 'Unspecified error', name = 'App', data = {}, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message, ...params);
    const errorName = `${name}Error`;
    this.name = errorName;
    // Custom debugging information
    this.timestamp = new Date();
    this.data = {
      name: this.name,
      ...data,
      timestamp: this.timestamp,
    };
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, errorName);
    }
  }
}
