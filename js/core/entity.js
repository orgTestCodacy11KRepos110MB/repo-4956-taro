import Component from "./component.js";

class Entity {
	constructor(data = {}) {
		this.components = {};
		this.id =
			(+new Date()).toString(16) +
			(Math.random() * 100000000 || 0).toString(16);

		Entity.entities[this.id] = this;
		this.addComponent("Transform", data);
	}

	addComponent(type, data = {}) {
		this.components[type] = Component.components[type][
			this.id
		] = new Component[type](this.id, data);
		return this;
	}

	removeComponent(type) {
		delete Component.components[type][this.id];
		delete this.components[type];
		return this;
	}
}

Entity.entities = {};

export default Entity;
