import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.151.3/examples/jsm/controls/OrbitControls.js';

export default class NodiInput {

	constructor( game ) {

		this.game = game;
		this.control = new OrbitControls(game.view.camera, game.view.renderer.domElement);
		this.control.mouseButtons.LEFT = game.view.three.MOUSE.PAN
		this.control.mouseButtons.RIGHT = game.view.three.MOUSE.ROTATE
		this.control.touches = {
		  ONE: game.view.three.TOUCH.PAN,
		  TWO: game.view.three.TOUCH.DOLLY_PAN
		}
		this.control.minDistance = 0.1;
		this.control.maxDistance = 100;
		this.raycaster = new THREE.Raycaster()
		this.mouse = new THREE.Vector2()
		this.intersects = []
		this.hovered = {}

		this._mousedown_callback = this.onMouseDown.bind( this );
		this._mousewheel_callback = this.onMouseWheel.bind( this );
		
		this._mousemove_callback = this.onMouseMove.bind( this );
		this._mouseup_callback = this.onMouseUp.bind( this );
		
		this._keydown_callback = this.onKeyDown.bind( this );
		this._keyup_callback = this.onKeyUp.bind( this );

	}

	update() {
		this.control.update();
    }


	init( ) {

		if ( this.game == null) {
			this.removeEvents()
			return
		}
		
		this.canvas = this.game.canvas;
		this.addEvents();
	}


	addEvents() {
		if (this.canvas == null) return
		this.removeEvents()
		
		this.canvas.addEventListener( 'wheel', this._mousewheel_callback, false )
		this.canvas.addEventListener( 'pointerdown', this._mousedown_callback, false )
		this.canvas.addEventListener( 'pointerup', this._mouseup_callback, false )
		this.canvas.addEventListener( 'mousemove', this._mousemove_callback, false )
		this.canvas.addEventListener( 'pointermove', this._mousemove_callback, false )
		this.canvas.addEventListener( 'touchmove', this._mousemove_callback, false )
		this.canvas.addEventListener( 'DOMMouseScroll', this._mousewheel_callback, false )
		document.addEventListener( 'keydown', this._keydown_callback, false)
		document.addEventListener( 'keyup', this._keyup_callback, false)

		this._events_binded = true;
	}

	removeEvents() {
		if (this.canvas == null) return
    	this.canvas.removeEventListener( 'wheel', this._mousewheel_callback )
		this.canvas.removeEventListener( 'pointerdown', this._mousedown_callback )
		this.canvas.removeEventListener( 'pointerup', this._mouseup_callback )
		this.canvas.removeEventListener( 'mousemove', this._mousemove_callback )
		this.canvas.removeEventListener( 'pointermove', this._mousemove_callback )
		this.canvas.removeEventListener( 'touchmove', this._mousemove_callback )
		this.canvas.removeEventListener( 'DOMMouseScroll', this._mousewheel_callback )
		document.removeEventListener( 'keydown', this._keydown_callback)
		document.removeEventListener( 'keyup', this._keyup_callback)

		this._events_binded = false;
	}

	onKeyDown( e ) {
		for ( const layerName in this.game.layers ) {
			let layer = this.game.layers[layerName];
			if (layer?.onKeyDown) layer.onKeyDown(e)
		}
	}

	onKeyUp( e ) {
		for ( const layerName in this.game.layers ) {
			let layer = this.game.layers[layerName];
			if (layer?.onKeyUp) layer.onKeyUp(e)
		}
	}

	onMouseDown( e ) {

		let hit = false;
		let layers = Object.keys(this.game.layers).reverse();
		for ( const layerName of layers ) {
			const layer = this.game.layers[ layerName ];
			//layer.extendMouseData( e );
			if (layer?.onMouseDown) {
				hit = hit || layer.onMouseDown( e, hit );
			}

		}

	}

	onMouseMove( e ) {

		// raycaster
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

			pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;

			
		
			raycaster.setFromCamera(pointer, this.game.view.camera);

			const intersects = raycaster.intersectObjects(this.game.view.scene.children, true);

			for (let i = 0; i < intersects.length; i ++) {
				intersects[i].object.material.color.set(0xff0000);
			}

		// If a previously hovered item is not among the hits we must call onPointerOut
		Object.keys(this.hovered).forEach((key) => {
		  const hit = intersects.find((hit) => hit.object.uuid === key)
		  if (hit === undefined) {
			const hoveredItem = this.hovered[key]
			if (hoveredItem.object.onPointerOut) hoveredItem.object.onPointerOut(hoveredItem)
			delete this.hovered[key]
		  }
		})
	    
		intersects.forEach((hit) => {

		  // If a hit has not been flagged as hovered we must call onPointerOver
		  if (!this.hovered[hit.object.uuid]) {
			this.hovered[hit.object.uuid] = hit
			if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
		  }
		  // Call onPointerMove
		  if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
		})

		e.preventDefault();
		return false;

	}

	onMouseUp( e ) {

		e.stopPropagation();
		e.preventDefault();
		let hit = false;

		let layers = Object.keys(this.game.layers).reverse();
		for ( const layerName of layers ) {
			const layer = this.game.layers[layerName];
			//layer.extendMouseData( e );
			layer.mouseCurrentCanvas = new THREE.Vector2(e.canvasX, e.canvasY);
			var delta = layer.mouseCurrentCanvas.subtract( this.mouseStartCanvas );
			if (layer?.onMouseUp) {
				hit = hit || layer.onMouseUp( e, hit );
			  }
			if ( delta.length() < 0.1 && layer.onMouseClick) layer.onMouseClick( e );

		}


		return false;

	}

	onMouseWheel( e ) {

		var delta = e.wheelDeltaY != null ? e.wheelDeltaY : e.detail * - 60;

		//this.extendMouseData( e );



		e.preventDefault();

		return false;

	}

}
