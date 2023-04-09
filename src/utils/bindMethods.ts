export default (instance: any): void => {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
    .filter((prop) => typeof instance[prop] === "function")
    .filter((prop) => prop !== "constructor");

  methods.forEach((method) => {
    instance[method] = instance[method].bind(instance);
  });
};
