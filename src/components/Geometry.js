import { ComponentManager } from '../core/ComponentManager.js';
import {
	BufferGeometry,
	BufferGeometryLoader,
	Mesh,
	BoxGeometry,
	CircleGeometry,
	ConeGeometry,
	CylinderGeometry,
	DodecahedronGeometry,
	IcosahedronGeometry,
	OctahedronGeometry,
	PlaneGeometry,
	RingGeometry,
	SphereGeometry,
	TetrahedronGeometry,
	TorusGeometry,
	TorusKnotGeometry,
} from '../lib/three.module.js';

const geometryLoader = new BufferGeometryLoader();

class Geometry {

	init( data ) {

		this.type = data.type;

		switch ( this.type ) {

			case 'asset':
				this.ref = typeof data.asset === 'object' ? data.asset : this.app.assets.get( data.asset );
				if ( this.ref === undefined )
					geometryLoader.load( data.asset, g => this.onLoad( data.asset, g ), p => this.onProgress( p ), e => this.onError( e ) );
				break;
			case 'box':
				this.ref = new BoxGeometry( data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments );
				break;
			case 'circle':
				this.ref = new CircleGeometry( data.radius, data.segments, data.thetaStart, data.thetaLength );
				break;
			case 'cone':
				this.ref = new ConeGeometry( data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength );
				break;
			case 'cylinder':
				this.ref = new CylinderGeometry( data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength );
				break;
			case 'dodecahedron':
				this.ref = new DodecahedronGeometry( data.radius, data.detail );
				break;
			case 'empty':
				this.ref = new BufferGeometry();
				break;
			case 'icosahedron':
				this.ref = new IcosahedronGeometry( data.radius, data.detail );
				break;
			case 'octahedron':
				this.ref = new OctahedronGeometry( data.radius, data.detail );
				break;
			case 'plane':
				this.ref = new PlaneGeometry( data.width, data.height, data.widthSegments, data.heightSegments );
				break;
			case 'ring':
				this.ref = new RingGeometry( data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength );
				break;
			case 'sphere':
				this.ref = new SphereGeometry( data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength );
				break;
			case 'tetrahedron':
				this.ref = new TetrahedronGeometry( data.radius, data.detail );
				break;
			case 'torus':
				this.ref = new TorusGeometry( data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc );
				break;
			case 'torusKnot':
				this.ref = new TorusKnotGeometry( data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q );
				break;
			default:
				console.error( 'Geometry: invalid geometry type ' + this.type );
				this.ref = undefined;

		}

		this.addEventListener( 'enable', this.onEnable );
		this.addEventListener( 'disable', this.onDisable );

	}

	onEnable() {

		const material = this.entity.getComponent( 'material' );

		if ( material !== undefined && material.enabled ) {

			const g = this.ref !== undefined ? this.ref : this.DefaultGeometry;
			const m = material.ref !== undefined ? material.ref : material.DefaultMaterial;

			material.mesh = this.mesh = new Mesh( g, m );
			this.mesh.castShadow = true;
			this.mesh.receiveShadow = true;
			this.entity.add( this.mesh );

		}

	}

	onDisable() {

		const material = this.entity.getComponent( 'material' );

		if ( material !== undefined && material.enabled ) {

			this.entity.remove( this.mesh );
			delete this.mesh;
			delete material.mesh;

		}

	}

	onLoad( key, geometry ) {

		this.app.assets.add( key, geometry );

		this.ref = geometry;
		if ( this.mesh !== undefined )
			this.mesh.geometry = geometry;

		this.dispatchEvent( { type: 'load', geometry } );

	}

	onProgress( event ) {

		this.dispatchEvent( { type: 'progress', event } );

	}

	onError( event ) {

		console.error( 'Geometry: failed retrieving asset' );
		this.dispatchEvent( { type: 'error', event } );

	}

}

Geometry.config = {
	schema: {
		type: { type: 'select', default: 'box', select: [ 'asset', 'box', 'circle', 'cone', 'cylinder', 'dodecahedron', 'empty', 'icosahedron', 'octahedron', 'plane', 'ring', 'sphere', 'tetrahedron', 'torus', 'torusKnot' ] },

		depth: { default: 1, min: 0, if: { type: [ 'box' ] } },
		height: { default: 1, min: 0, if: { type: [ 'box', 'cone', 'cylinder', 'plane' ] } },
		width: { default: 1, min: 0, if: { type: [ 'box', 'plane' ] } },
		heightSegments: [ { default: 1, min: 1, max: 20, type: 'int', if: { type: [ 'box', 'plane' ] } },
						 { default: 18, min: 1, type: 'int', if: { type: [ 'cone', 'cylinder' ] } },
						 { default: 16, min: 2, type: 'int', if: { type: [ 'sphere' ] } } ],
		widthSegments: [ { default: 1, min: 1, max: 20, type: 'int', if: { type: [ 'box', 'plane' ] } },
						 { default: 32, min: 3, type: 'int', if: { type: [ 'sphere' ] } } ],
		depthSegments: { default: 1, min: 1, max: 20, type: 'int', if: { type: [ 'box' ] } },

		radius: { default: 1, min: 0, if: { type: [ 'circle', 'cone', 'dodecahedron', 'icosahedron', 'octahedron', 'sphere', 'tetrahedron', 'torus', 'torusKnot' ] } },
		radiusTop: { default: 1, min: 0, if: { type: [ 'cylinder' ] } },
		radiusBottom: { default: 1, min: 0, if: { type: [ 'cylinder' ] } },
		segments: { default: 32, min: 3, type: 'int', if: { type: [ 'circle' ] } },
		thetaLength: [ { default: 2 * Math.PI, min: 0, angle: 'deg', if: { type: [ 'circle', 'cone', 'cylinder', 'ring' ] } },
					  { default: Math.PI, min: 0, angle: 'deg', if: { type: [ 'sphere' ] } } ],
		thetaStart: { default: 0, angle: 'deg', if: { type: [ 'circle', 'cone', 'cylinder', 'ring', 'sphere' ] } },

		openEnded: { default: false, if: { type: [ 'cone', 'cylinder' ] } },
		radialSegments: [ { default: 36, min: 3, type: 'int', if: { type: [ 'cone', 'cylinder' ] } },
						 { default: 36, min: 2, type: 'int', if: { type: [ 'torus' ] } },
						 { default: 8, min: 3, type: 'int', if: { type: [ 'torusKnot' ] } } ],

		detail: { default: 0, min: 0, max: 5, type: 'int', if: { type: [ 'dodecahedron', 'icosahedron', 'octahedron', 'tetrahedron' ] } },

		innerRadius: { default: 0.8, min: 0, if: { type: [ 'ring' ] } },
		outerRadius: { default: 1.2, min: 0, if: { type: [ 'ring' ] } },
		phiSegments: { default: 10, min: 1, type: 'int', if: { type: [ 'ring' ] } },
		thetaSegments: { default: 32, min: 3, type: 'int', if: { type: [ 'ring' ] } },

		phiLength: { default: 2 * Math.PI, angle: 'deg', if: { type: [ 'sphere' ] } },
		phiStart: { default: 0, min: 0, angle: 'deg', if: { type: [ 'sphere' ] } },

		tube: { default: 0.2, min: 0, if: { type: [ 'torus', 'torusKnot' ] } },
		tubularSegments: [ { default: 32, min: 3, type: 'int', if: { type: [ 'torus' ] } },
						  { default: 64, min: 3, type: 'int', if: { type: [ 'torusKnot' ] } } ],
		arc: { default: Math.PI, angle: 'deg', if: { type: [ 'torus' ] } },

		p: { default: 2, min: 1, if: { type: [ 'torusKnot' ] } },
		q: { default: 3, min: 1, if: { type: [ 'torusKnot' ] } },

		asset: { type: 'asset', if: { type: [ 'asset' ] } },
	}
};

Geometry.prototype.DefaultGeometry = new BufferGeometry();

ComponentManager.registerComponent( 'geometry', Geometry );
