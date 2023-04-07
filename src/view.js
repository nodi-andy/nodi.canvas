import * as THREE from 'three';

export default class NodiView {

	constructor(game) {
		this.game = game;
		this.three = THREE;
		
		this.canvas = this.game.canvas;
		this.renderer = new this.three.WebGLRenderer({ canvas: this.canvas });
		this.renderer.setClearColor(0xdddddd, 1.0);
		//this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.scene = new this.three.Scene();
    
		this.camera = new this.three.OrthographicCamera( window.innerWidth / - 200, window.innerWidth / 200, window.innerHeight / 200, window.innerHeight / - 200 );
		this.camera.position.set(0, 0, 100);
		this.camera.lookAt(0,0,0);
		this.camera.updateProjectionMatrix();
/*
		// light
		const light = new THREE.AmbientLight(0xffffff, 0.5);
		light.castShadow = true;
		this.scene.add(light);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(0, 32, 64)
		this.scene.add(directionalLight);

		// function to add shapes
		const addNewMesh = (x, y, z) => {
			const sphereGeometry = new THREE.SphereGeometry(0.8, 16, 16);
			const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xfafafa,});
			const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
			sphereMesh.position.set(x, y, z);
			this.scene.add(sphereMesh);
		};
		
		// top rows
		addNewMesh(0, 2, 0);
		addNewMesh(2, 2, 0);
		addNewMesh(-2, 2, 0);
		addNewMesh(0, 2, -2);
		addNewMesh(2, 2, -2);
		addNewMesh(-2, 2, -2);
		addNewMesh(0, 2, 2);
		addNewMesh(2, 2, 2);
		addNewMesh(-2, 2, 2);

		// middle rows
		addNewMesh(0, 0, 0);
		addNewMesh(2, 0, 0);
		addNewMesh(-2, 0, 0);
		addNewMesh(0, 0, -2);
		addNewMesh(2, 0, -2);
		addNewMesh(-2, 0, -2);
		addNewMesh(0, 0, 2);
		addNewMesh(2, 0, 2);
		addNewMesh(-2, 0, 2);

		// bottom rows
		addNewMesh(0, -2, 0);
		addNewMesh(2, -2, 0);
		addNewMesh(-2, -2, 0);
		addNewMesh(0, -2, -2);
		addNewMesh(2, -2, -2);
		addNewMesh(-2, -2, -2);
		addNewMesh(0, -2, 2);
		addNewMesh(2, -2, 2);
		addNewMesh(-2, -2, 2);
		*/

		// redraw after resize event
        window.addEventListener("resize", this.resize.bind(this) );

        this.resize();
	}
/*
	setCanvas( canvas ) {
		if (canvas) {
			this.startRendering();
			this.input.addEvents();
			this.canvas = canvas;
		} else {
			this.stopRendering()
			this.input.removeEvents();
			this.canvas = null
		}

		this.ctx = this.canvas?.getContext( '2d' );

	}

	getCanvasWindow() {

		if ( ! this.canvas ) {

			return window;

		}

		var doc = this.canvas.ownerDocument;
		return doc.defaultView || doc.parentWindow;

	}

	startRendering() {

		if ( this.isRendering ) return; //already rendering

		this.isRendering = true;
		renderFrame.call( this );

		function renderFrame() {

			this.render();

			var window = this.getCanvasWindow();
			if ( this.isRendering ) {

				window.requestAnimationFrame( renderFrame.bind( this ) );

			}

		}

	}

	stopRendering() {

		this.isRendering = false;

	}


	addLayer( newLayer ) {

		if ( newLayer ) {

			newLayer.attachView( this );
			this.layers[ newLayer.name ] = newLayer;
			this.layerOrder.push(newLayer.name);

		}

		// refresh completely
		this.resize();

	}

	newLayer( name, gridSize, tileSize, lineWidth ) {

		const layer = new NodiGrid( name, gridSize, tileSize, lineWidth );
		layer.view = this;
		this.addLayer( layer );
		return layer;

	}

	render() {

		if ( this.canvas?.width == 0 || this.canvas?.height == 0 || this.ctx == null) {

			return;

		}

		this.ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.ctx.fillStyle = 'lightgray';
		this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// transform camera
		this.ctx.setTransform(
			this.sx,
			0,
			0,
			this.sy,
			this.tx + this.dx,
			this.ty + this.dy
		);

		for ( const layerName of this.layerOrder ) {

			const layer = this.layers[ layerName ];
			// transform camera
			this.ctx.setTransform(
				this.sx,
				0,
				0,
				this.sy,
				this.tx + this.dx,
				this.ty + this.dy
			);

			//transform layer
			this.ctx.transform( layer.sx, 0, 0, layer.sy, layer.tx, layer.ty );

			// draw layer
			if ( layer.gridVisible ) layer.renderGrid( this );
			if ( layer.visible ) layer.render( this );

		}

	}
	*/

	init () {
		//const axesHelper = new this.three.AxesHelper( 5 );
        //this.game.view.scene.add( axesHelper );
		const gridHelper = new this.three.GridHelper( 8, 8 );
		gridHelper.geometry.rotateX(Math.PI * 0.5);
		
		this.scene.add( gridHelper );

        this.game.view.renderer.setAnimationLoop(() => {
            const time = performance.now();
			this.game.view.scene.traverse( function( object ) {
				if (object.render) object.render(time);			
			} );
            this.game.view.renderer.render(this.game.view.scene, this.game.view.camera);
        });
	}

	resize( width, height ) {

		if (this.canvas == null) return

        this.canvas.width  = this.canvas.parentNode.clientWidth;
        this.canvas.height = this.canvas.parentNode.clientHeight;
        this.canvas.style.left  = "0px";
        this.canvas.style.top  = "0px";
        this.canvas.style.width  = "";
        this.canvas.style.height  = "";
		//this.camera.aspect = this.canvas.width / this.canvas.height
		//this.camera.updateProjectionMatrix()
		//this.renderer.setSize(this.canvas.width, this.canvas.height)
	
		//this.focusOn();

		//this.focusOn();
	}
/*
	screenToWorld (p) {
		return { x: (p.x - this.tx ) / this.sx , y: (p.y - this.ty) / this.sy  }
	  }
	  
	setScale( s ) {

		this.sx = s;
		this.sy = s;
		super.setScale( s );

	}

	setTranslate( x, y ) {

		this.tx = x;
		this.ty = y;

	}

	focusOn() {

		if (this.canvas == null) return
		
		var halfScreenSize = Vec2.divide(new Vec2(this.canvas.width, this.canvas.height), 2);

		const delta = Vec2.subtract(Vec2.multiply(this.center, this.sx), halfScreenSize) //Vec2.subtract( halfScreenSize, this.center );

		this.tx = -delta.x;
		this.ty = -delta.y;

	}

	setCenter( x, y ) {

		this.center.x = x;
		this.center.y = y;

	}

	updateViewRect() {

		for ( const layerName in this.layers ) {

			const layer = this.layers[ layerName ];
			layer.updateViewPort();

		}

	}*/

}