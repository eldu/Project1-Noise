
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var gui = framework.gui;
  var stats = framework.stats;

  // LOOK: the line below is synyatic sugar for the code above. Optional, but I sort of recommend it.
  // var {scene, camera, renderer, gui, stats} = framework; 

  // initialize a simple box and material
  // var box = new THREE.BoxGeometry(1, 1, 1);

  // var adamMaterial = new THREE.ShaderMaterial({
  //   uniforms: {
  //     image: { // Check the Three.JS documentation for the different allowed types and values
  //       type: "t", 
  //       value: THREE.ImageUtils.loadTexture('./adam.jpg')
  //     }
  //   },
  //   vertexShader: require('./shaders/adam-vert.glsl'),
  //   fragmentShader: require('./shaders/adam-frag.glsl')
  // });
  // var adamCube = new THREE.Mesh(box, adamMaterial);

  var icosahedron = new THREE.IcosahedronGeometry(1, 0);
  var ellenMaterial = new THREE.ShaderMaterial({
     uniforms: {
    //   image: { // Check the Three.JS documentation for the different allows types and values
    //     type: "t",
    //     value: THREE.ImageUtils.loadTexture('./cloud_texture.jpg')
    //   }
     },
    // color: 0xff0000,
    vertexShader: require('./shaders/ellen-vert.glsl'),
    fragmentShader: require('./shaders/ellen-frag.glsl')
  });
  var ellenIcosahedron = new THREE.Mesh(icosahedron, ellenMaterial);

  // set camera position
  camera.position.set(1, 1, 2);
  camera.lookAt(new THREE.Vector3(0,0,0));

  // scene.add(adamCube);
  scene.add(ellenIcosahedron);

  // edit params and listen to changes like this
  // more information here: https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
  gui.add(camera, 'fov', 0, 180).onChange(function(newVal) {
    camera.updateProjectionMatrix();
  });
}

// called on frame updates
function onUpdate(framework) {
  // console.log(`the time is ${new Date()}`);
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);