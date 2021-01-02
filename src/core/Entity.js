import { Group } from "../lib/three.js";
import { Scene } from "./Scene.js";
import { Application } from "./Application.js";
import { ComponentManager } from "./ComponentManager.js";

export class Entity extends Group {

	constructor( name, scene ) {

		super();

		this.tags = [];
		this.components = [];
		this._enabled = true;

		if ( name !== undefined ) {

			if ( name instanceof Scene ) {

				name.add( this );

			} else {

				this.name = name;

			}

		}

		if ( scene instanceof Scene ) {

			scene.add( this );

		} else if ( Application.currentApp !== undefined && Application.currentApp.currentScene !== undefined ) {

			Application.currentApp.currentScene.add( this );

		}

	}

	getComponent( type ) {

		const components = this.components;
		for ( let i = 0, len = components.length; i < len; i ++ ) {

			if ( components[ i ].componentType === type ) return components[ i ];

		}

	}

	getComponents( type ) {

		const list = [];
		const components = this.components;

		for ( let i = 0, len = components.length; i < len; i ++ ) {

			if ( components[ i ].componentType === type ) list.push( components[ i ] );

		}

		return list;

	}

	addComponent( type, data = {} ) {

		const componentData = ComponentManager._components[ type ];
		let component;

		if ( type === "Renderable" ) {

			ComponentManager.prototype.componentType.value = "Renderable";
			component = Object.create( data, ComponentManager.prototype );
			component.addEventListener( "enable", renderableOnEnable );
			component.addEventListener( "disable", renderableOnDisable );

		} else {

			const options = componentData.options;

			if (
				options.allowMultiple === false &&
			this.getComponent( type ) !== undefined
			) {

				return console.warn( "TARO.Entity: allowMultiple Attribute is false" );

			}

			if ( "requireComponents" in options ) {

				const required = options.requireComponents;
				for ( let i = 0, len = required.length; i < len; i ++ )
					if ( this.getComponent( required[ i ] ) === undefined )
						this.addComponent( required[ i ] );

			}

			component = new componentData.constructor();

		}

		if ( ! ( type in this.scene._containers ) )
			this.scene._containers[ type ] = [];

		this.scene._containers[ type ].push( component );

		this.components.push( component );

		Object.defineProperty( component, "entity", {
			value: this,
		} );

		if ( component.start !== undefined )
			component.start( data );

		component.dispatchEvent( { type: "enable" } );

		return component;

	}

	add( obj ) {

		if ( obj instanceof Entity && obj.scene !== this.scene ) {

			this.scene.add( obj );

		}

		return super.add( obj );

	}

	remove( obj ) {

		if ( obj instanceof Entity ) {

			this.scene.add( obj );

		} else {

			super.remove( obj );

		}

		return obj;

	}

	destroy() {

		this.enabled = false;
		const children = this.getChildren();
		for ( let i = 0, len = children.length; i < len; i ++ )
			children[ i ].destroy();
		this.scene.remove( this );

	}

	get enabled() {

		return this._enabled;

	}

	set enabled( value ) {

		if ( value != this._enabled ) {

			if ( value && ! this.parent._enabled )
				return console.warn(
					"TARO.Entity: Can't enable if an ancestor is disabled"
				);
			this._enabled = value;

			const components = this.components;
			for ( let i = 0, len = components.length; i < len; i ++ )
				components[ i ].enabled = value;

			const children = this.getChildren();
			for ( let i = 0, len = children.length; i < len; i ++ )
				children[ i ].enabled = value;

			this.dispatchEvent( { type: value ? "enable" : "disable" } );

		}

	}

	getChildren() {

		const filteredChildren = [];
		const children = this.children;
		for ( let i = 0, len = children.length; i < len; i ++ ) {

			if ( children[ i ] instanceof Entity )
				filteredChildren.push( children[ i ] );

		}

		return filteredChildren;

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

	get app() {

		return this.scene.app;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		const object = data.object;

		object.isEntity = true;
		if ( this.tags.length !== 0 ) object.tags = this.tags;
		object.enabled = this._enabled;

		if ( this.components.length !== 0 ) {

			object.components = [];

			for ( let i = 0, len = this.components.length; i < len; i ++ ) {

				const component = this.components[ i ];

				if ( component.isObject3D ) {

					continue;

				}

				const type = component.componentType;
				const meta = { type, data: {} };


				if ( "toJSON" in component ) {

					meta.data = component.toJSON();

				} else {

					meta.data = Object.assign( {}, component );
					delete meta.data._listeners;

				}

				meta.enabled = component._enabled;

				object.components.push( meta );

			}

			this.components;

		}

		return data;

	}

}

function renderableOnEnable() {

	this.entity.add( this );

}

function renderableOnDisable() {

	this.entity.remove( this );

}
