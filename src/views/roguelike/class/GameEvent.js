class GameEvent {
  constructor() {
    this.listeners = {};
  }
  emit(eventName, eventParams) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((handle) => {
        handle(eventParams);
      });
    }
  }
  on(eventName, handle) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(handle);
  }
}

export default GameEvent;
