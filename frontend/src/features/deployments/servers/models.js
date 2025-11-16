class LocationModel {
  #data = { id: "", name: "" };

  constructor(initialData = {}) {
    Object.assign(this.#data, initialData);
  }

  // Getters
  get id()   { return this.#data.id; }
  get name() { return this.#data.name; }
  get region() { return this.#data.region; }
  get ip() { return this.#data.ip; }
  get email() { return this.#data.email; }
  get user() { return this.#data.user; }

  // Setters
  set id(v)   { this.#data.id = v; }
  set name(v) { this.#data.name = v; }

  // Serialización
  toJSON() {
    return { id: this.#data.id, name: this.#data.name };
  }
  toAddPayload() { return { name: this.#data.name }; }
  toEditPayload() {
    const p = {};
    if (this.#data.name) p.name = this.#data.name;
    return p;
  }

  // Helpers UI
  toOption() { return { value: this.#data.id, label: this.#data.name }; }

  // Factory desde API
  static fromAPI(obj = {}) {
    return new LocationModel({ id: obj.id ?? "", name: obj.name ?? "" });
  }
}

export { LocationModel };
