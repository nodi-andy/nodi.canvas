import * as THREE from 'three';

export default class NodiLayer extends THREE.Object3D{

	constructor( game, name, z ) {
		super();
		this.name = name;
		//this.viewPort = new THREE.Box( 4 );
		this.pointerevents_method = 'mouse';
		this.position.z = z;
	    this.game = game;
		//this.game.view.scene.add(this)
	}

	init (game) {

	}

	render(currentFrame) {
		
	}

	add(object) {
		this.game.view.scene.add( object );
		object.position.z = this.position.z;
	}
/*
	attachView( view ) {

		this.view = view;
		this.updateViewPort();

	}

	updateViewPort() {
		if (this.canvas == null) return
		if ( this.view ) {
			var left = this.tx - ( this.view.tx + this.view.dx );
			var top = this.ty - ( this.view.ty + this.view.dy );

			this.viewPort.x = left;
			this.viewPort.y = top;
			this.viewPort.width = this.view.canvas.width * this.scale / this.view.scale;
			this.viewPort.height = this.view.canvas.height * this.scale / this.view.scale;
		} else {
			this.viewPort.x = 0;
			this.viewPort.y = 0;
			this.viewPort.width = this.canvas.width
			this.viewPort.height = this.canvas.height

		}

	}

	fillText( t, pos ) {

		this.view.ctx.fillText( t, ( pos.x + 0.5 ), ( pos.y + 0.75 ) );

	}*/

}
