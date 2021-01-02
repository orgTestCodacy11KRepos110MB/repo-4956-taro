import { Scene as TS } from "../lib/three.js";
import { OIMO } from "../lib/oimo.js";
import { Entity } from "./Entity.js";
import { ComponentManager } from "./ComponentManager.js";

export class Scene extends TS {

	constructor() {

		super();
		this._cameras = [];
		this._containers = {};

		for ( const type in ComponentManager._components ) {

			this._containers[ type ] = [];

		}

		this._physicsWorld = new OIMO.World( 2 );

	}

	_addComponents( components ) {

		for ( let i = 0, len = components.length; i < len; i ++ ) {

			const component = components[ i ];
			if ( component._enabled ) {

				const type = component.componentType;
				const container = entity.scene._containers[ type ];
				container.splice( container.indexOf( component ), 1 );

				if ( ! ( type in this._containers ) )
					this._containers[ type ] = [];
				this._containers[ type ].push( component );

			}

		}

	}

	add( entity ) {

		if ( entity.scene !== this ) {

			this._addComponents( entity.components );

			entity.dispatchEvent( {
				type: "scenechange",
				oldScene: entity.scene,
				newScene: this,
			} );

		}

		entity.scene = this;
		super.add( entity );
		return entity;

	}

	remove( entity ) {

		entity.enabled = false;
		const components = entity.getChildren();
		for ( let i = 0, len = components.length; i < len; i ++ )
			components[ i ].enabled = false;

		super.remove( obj );

		return this;

	}

	find( name ) {

		return this.getObjectByName( name );

	}

	findByTag( tag ) {

		const matches = [];
		this.traverse( ( child ) => {

			if ( child instanceof Entity && child.tags.includes( tag ) ) {

				matches.push( child );

			}

		} );
		return matches;

	}

	findById( id ) {

		return this.getObjectById( id );

	}

	findByProperty( name, value ) {

		return this.getObjectByProperty( name, value );

	}

}