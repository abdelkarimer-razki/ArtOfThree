import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

//buding a red cube
const box = new THREE.BoxGeometry(1, 1, 1) //this method to build a box and the paramatere are width, height, depth
const materiel = new THREE.MeshBasicMaterial({ color: 0xff0000 })//this method to build a materiel and the paramatere are color
const mesh = new THREE.Mesh(box, materiel)//this method to build a mesh and the paramatere are geometry, materiel

mesh.position.x = 2
mesh.position.y = 1
mesh.position.z = -5


//mesh.scale.set(): using the scale propertie is simply changing the scale of the mesh
scene.add(mesh)

/*the difference between mesh positioning and camera position is that the first is us trying to place the object
we want to draw wherever we want but the second is us trying to place the camera wherever we want*/

//camera

const sizes = {
	width: 800,
	height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)//this method to build a camera and the paramatere are field of view, aspect ratio
console.log(mesh.position.length())//distance between the center of the scene and our object
console.log(mesh.position.distanceTo(camera.position))//distance between camera and cube
//mesh.position.set(0.7, -0.6, -9)//this change the position coordinations of the mesh
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)
camera.position.z = 5
scene.add(camera)

//renderer
const canvas = document.querySelector('.webgl')
const render = new THREE.WebGLRenderer({
	canvas
})

render.setSize(sizes.width, sizes.height)
render.render(scene, camera)

/*properties to transform objects are 
	-position
	-scale
	-rotation
	-quaternion
every class that inherits from object3D has there properties ex:Mesh-PerspectiveCamera
*/
