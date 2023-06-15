import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


	//html tag where we work on the scene
const canvas = document.querySelector('.webgl')
	//detecting mouse coordinates
const cursor = 
{
	x : 0,
	y : 0
}
canvas.addEventListener('mousemove', (event)=>
{
	cursor.x = (event.clientX - canvas.offsetLeft) / sizes.width - 0.5;
	cursor.y = -((event.clientY - canvas.offsetTop) / sizes.height - 0.5);
	//console.log("x:",cursor.x,"|y:",cursor.y)
})

const scene = new THREE.Scene()

	//buding a red cube
const box = new THREE.BoxGeometry(1, 1, 1) //this method to build a box and the paramatere are width, height, depth
const materiel = new THREE.MeshBasicMaterial({ color: 0xff0000 })//this method to build a materiel and the paramatere are color
const mesh = new THREE.Mesh(box, materiel)//this method to build a mesh and the paramatere are geometry, materiel
scene.add(mesh)
	//building a green cube
const boxGreen = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 3), new THREE.MeshBasicMaterial({color: 0x00ff00}))

	//bulding a group
const firstGroup = new THREE.Group()
//firstGroup.add(mesh)
//scene.add(firstGroup)

	//positioning the group
//firstGroup.position.x = -8

	//positioning the red box
mesh.position.x = 0
mesh.position.y = 0
mesh.position.z = 0


//mesh.scale.set(): using the scale propertie is simply changing the scale of the mesh

/*the difference between mesh positioning and camera position
 is that the first is us trying to place the object we want
 to draw wherever we want but the second is us trying to place
 the camera wherever we want*/

//camera

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', ()=>{
	sizes.height = window.innerHeight
	sizes.width = window.innerWidth
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	render.setSize(sizes.width, sizes.height)
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)//this method to build a camera and the paramatere are field of view, aspect ratio
console.log(mesh.position.length())//distance between the center of the scene and our object
console.log(mesh.position.distanceTo(camera.position))//distance between camera and cube
//mesh.position.set(0.7, -0.6, -9)//this change the position coordinations of the mesh

	//axesHelper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

	//changing camera position
camera.position.z = 2
camera.position.x = 0
camera.position.y = 0

camera.lookAt(mesh.position)//this function makes the camera look at the group positon
scene.add(camera)

	//rotating the red box

mesh.rotation.reorder('YXZ')/*this reorder funciton solves a problem that is called 
a gimbal lock which simple the rotation isn't being done as you imagine */
/*mesh.rotation.x = 2
mesh.rotation.y = 3*/

	//renderer
const render = new THREE.WebGLRenderer({
	canvas
})

render.setSize(sizes.width, sizes.height)

const oldCursor =
{
	x : 0,
	x1 : 0
}

	/*we used orbit controls:controls are so cool they make it easy 
	navigate and control the element on the scene they can make it
	easy for you all you have to do is read the docummentation.
	when to use custom or bulttin controls? it depends on you
	if the bulttin control have all the features u need use it*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.maxPolarAngle = Math.PI / 2


const anime = () =>
{
	//firstGroup.rotation.x += 0.01
	/*if (oldCursor.x != cursor.x)
	{
		camera.position.x = Math.sin(cursor.x * (Math.PI * 2)) * 3
		camera.position.z = Math.cos(cursor.x * (Math.PI * 2)) * 3
		oldCursor.x = cursor.x
		oldCursor.x1 = cursor.x
	}
	else
	{
		oldCursor.x1 += 0.001
		camera.position.x = Math.sin(oldCursor.x1 * (Math.PI * 2)) * 3
		camera.position.z = Math.cos(oldCursor.x1 * (Math.PI * 2)) * 3
	}
	camera.position.y = cursor.y * 5
	camera.lookAt(mesh.position)*/
	controls.update()
	render.render(scene, camera)
	window.requestAnimationFrame(anime)
}
anime()
/*properties to transform objects are 
	-position
	-scale:scale is for the x,y,z scale 
	-rotation
	-quaternion
every class that inherits from object3D
has there properties ex:Mesh-PerspectiveCamera
*/
