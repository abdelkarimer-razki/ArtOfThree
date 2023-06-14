import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

//buding a red cube
const box = new THREE.BoxGeometry(1, 1, 1) //this method to build a box and the paramatere are width, height, depth
const materiel = new THREE.MeshBasicMaterial({ color: 0xff0000 })//this method to build a materiel and the paramatere are color
const mesh = new THREE.Mesh(box, materiel)//this method to build a mesh and the paramatere are geometry, materiel

//building a green cube
const boxGreen = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 3), new THREE.MeshBasicMaterial({color: 0x00ff00}))

//bulding a group
const firstGroup = new THREE.Group()
firstGroup.add(boxGreen, mesh)
scene.add(firstGroup)

//positioning the group
firstGroup.position.x = -8

//positioning the red box
mesh.position.x = 0
mesh.position.y = 0
mesh.position.z = -3


//mesh.scale.set(): using the scale propertie is simply changing the scale of the mesh

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

//axesHelper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

//changing camera position
camera.position.z = 9
camera.position.x = 9
camera.position.y = 9

camera.lookAt(firstGroup.position)//this function makes the camera look at the group positon
scene.add(camera)

//rotating the red box

mesh.rotation.reorder('YXZ')/*this reorder funciton solves a problem that is called 
a gimbal lock which simple the rotation isn't being done as you imagine */
mesh.rotation.x = 2
mesh.rotation.y = 3

//renderer
const canvas = document.querySelector('.webgl')
const render = new THREE.WebGLRenderer({
	canvas
})

render.setSize(sizes.width, sizes.height)

const anime = () =>
{
	firstGroup.rotation.x += 0.01
	window.requestAnimationFrame(anime)
	render.render(scene, camera)
}
anime()
/*properties to transform objects are 
	-position
	-scale:scale is for the x,y,z scale 
	-rotation
	-quaternion
every class that inherits from object3D has there properties ex:Mesh-PerspectiveCamera
*/
