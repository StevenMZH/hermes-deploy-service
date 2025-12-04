// ServerModel.js
class ServerModel {
  #data = {
    id: "",
    name: "",
    ip: "",
    email: "",
    project: "",
    region: "",
    setup_cmd: "",
    // status: "",  // si luego usas ServerStatus
  };

  constructor(initialData = {}) {
    if (initialData.id !== undefined) {
      this.#data.id = initialData.id;
    }
    this.#data.name = initialData.name ?? this.#data.name;
    this.#data.ip = initialData.ip ?? this.#data.ip;
    this.#data.email = initialData.email ?? this.#data.email;
    this.#data.project = initialData.project ?? this.#data.project;
    this.#data.region = initialData.region ?? this.#data.region;
    this.#data.setup_cmd = initialData.setup_cmd ?? this.#data.setup_cmd;
  }
  // Getters
  get id() { return this.#data.id; }
  get name() { return this.#data.name; }
  get ip() { return this.#data.ip; }
  get email() { return this.#data.email; }
  get project() { return this.#data.project; }
  get region() { return this.#data.region; }
  get setup_cmd() { return this.#data.setup_cmd; }

  // Setters
  set id(v) { this.#data.id = v; }
  set name(v) { this.#data.name = v; }
  set ip(v) { this.#data.ip = v; }
  set email(v) { this.#data.email = v; }
  set project(v) { this.#data.project = v; }
  set region(v) { this.#data.region = v; }
  set setup_cmd(v) { this.#data.setup_cmd = v; }

  // Serialización
  toJSON() {
    return {
      id: this.#data.id,
      name: this.#data.name,
      ip: this.#data.ip,
      email: this.#data.email,
      project: this.#data.project,
      region: this.#data.region,
      // setup_cmd: this.#data.setup_cmd,
    };
  }

  toAddPayload() {
    return {
      name: this.#data.name,
      ip: this.#data.ip,
      email: this.#data.email,
      project: this.#data.project,
      region: this.#data.region,
      setup_cmd: this.#data.setup_cmd,
    };
  }

  toEditPayload() {
    const p = {};
    if (this.#data.name) p.name = this.#data.name;
    if (this.#data.ip) p.ip = this.#data.ip;
    if (this.#data.email) p.email = this.#data.email;
    if (this.#data.project) p.project = this.#data.project;
    if (this.#data.region) p.region = this.#data.region;
    if (this.#data.setup_cmd) p.setup_cmd = this.#data.setup_cmd;
    return p;
  }

  // Helpers UI
  toOption() {
    return {
      value: this.#data.id,
      label: this.#data.name || this.#data.ip,
    };
  }

  // Factory desde API
  static fromAPI(obj = {}) {
    return new ServerModel({
      id: obj.id ?? "",
      name: obj.name ?? "",
      ip: obj.ip ?? "",
      email: obj.email ?? "",
      project: obj.project ?? "",
      region: obj.region ?? "",
      setup_cmd: obj.setup_cmd ?? "",
    });
  }
}

export { ServerModel };
