class Viewport {
    constructor() {
        this.scene = new THREE.Scene();

        //  Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        //  Render
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            canvas: document.querySelector("#viewport")
        });
      
        this.renderer.gammaOutput = true; // fix gltf dark
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        //  Lights
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10);
        const ambient = new THREE.AmbientLight(0x707070); // soft white light

        this.scene.add(light);
        this.scene.add(ambient);
        
        //Cube
        const material = new THREE.MeshPhongMaterial({ color: 0x00aaff });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
        this.camera.position.z = 2;

        // Animate Cube
        gsap.to(this.cube.rotation, {
            duration: 10,
            y: THREE.Math.degToRad(360),
            x: THREE.Math.degToRad(360),
            ease:'none',
            repeat:-1
        })

        // Render
        gsap.ticker.fps(60);
        gsap.ticker.add(()=>this.render());
        
        // Events
        window.addEventListener( 'resize', ()=>{this.onWindowResize()}, false );
    }
    
    onWindowResize(){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
  
    render() {
        this.renderer.render(this.scene, this.camera);  
    }
}

window.onload = function () {new Viewport()};