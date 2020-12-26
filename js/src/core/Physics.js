import { Quaternion, Vector3, Matrix4 } from "../engine.js";
import { OIMO } from "../lib/oimo.js";

const vector = new Vector3();
const vector2 = new Vector3();
const quat = new Quaternion();
const quat2 = new Quaternion();
const matrix = new Matrix4();
const broadphaseCallback = {
	process: function (shape) {
		console.log(shape.getLocalTransform().getPosition());
	},
};

export class Physics {
	constructor() {
		this._accumulator = 0;
		this._gravity = new Vector3(0, -9.80665, 0);

		this._triggers = [];

		this._world;
		this.rigidbodies;
	}
	get gravity() {
		return this._gravity;
	}
	set gravity(gravity) {
		this._world.setGravity(gravity);
		this._gravity = gravity;
	}
	raycast(begin, end, callback) {
		// callback parameters: collider, fraction, normal, position
		this._world.rayCast(begin, end, {
			process(shape, hit) {
				callback(
					shape.collider,
					hit.fraction,
					new Vector3().copy(hit.normal),
					new Vector3().copy(hit.position)
				);
			},
		});
	}
	_update(deltaTime, fixedTimestep) {
		this._accumulator += deltaTime;

		if (this._accumulator >= fixedTimestep) {
			// trigger collision
			const triggers = this._triggers;
			for (let i = 0, len = triggers.length; i < len; i++) {
				const transform = triggers[i].getTransform();
				transform.setPosition(triggers[i].entity.position);
				transform.setOrientation(triggers[i].entity.quaternion);
				triggers[i].setLocalTransform(transform);
				this._world.aabbTest(triggers[i].getAabb(), broadphaseCallback);
			}

			// time step
			while (this._accumulator >= fixedTimestep) {
				this._world.step(fixedTimestep);
				for (let i = 0, len = this.rigidbodies.length; i < len; i++) {
					let rigidbody = this.rigidbodies[i];
					if (!rigidbody._ref.isSleeping()) {
						const entity = rigidbody.entity;

						const ePos = entity.position;
						const pos = rigidbody._ref.getPosition();
						ePos._x = pos.x;
						ePos._y = pos.y;
						ePos._z = pos.z;

						const eQuat = entity.quaternion;
						const rot = rigidbody._ref.getOrientation();
						eQuat._x = rot.x;
						eQuat._y = rot.y;
						eQuat._z = rot.z;
						eQuat._w = rot.w;

						if (entity.parent !== entity.scene) {
							vector
								.copy(ePos)
								.applyMatrix4(
									matrix
										.copy(entity.parent.matrixWorld)
										.invert()
								);
							ePos._x = vector.x;
							ePos._y = vector.y;
							ePos._z = vector.z;

							quat.copy(eQuat).premultiply(
								entity.parent.getWorldQuaternion(quat2).invert()
							);
							eQuat._x = quat.x;
							eQuat._y = quat.y;
							eQuat._z = quat.z;
							eQuat._w = quat.w;
						}
					}
				}
				this._accumulator -= fixedTimestep;
			}
			// console.log("finish");
		}
	}
}
