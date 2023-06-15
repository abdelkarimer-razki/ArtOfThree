import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


	//BUILDING THE SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x212129 );

	//HTML TAG WHERE WE WORK ON THE SCENE
const canvas = document.querySelector('.webgl')

	//DETECTING MOUSE CORDINATE
const cursor = 
{
	x : 0,
	y : 0
}
canvas.addEventListener('mousemove', (event)=>
{
	cursor.x = (event.clientX - canvas.offsetLeft) / sizes.width - 0.5;
	cursor.y = -((event.clientY - canvas.offsetTop) / sizes.height - 0.5);
})

	//CREATING OUR OWN GEO USING BUFFERGEO
const vertexes = new Float32Array([
	1,1,1,
	1,2,1,
	2,1,1,
	2,2,1
])
const buffer = new THREE.BufferAttribute(vertexes, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', buffer)
const boxBuffer = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true}))
const indices = [
	0, 1, 2,
	1, 2, 3
  ];
  
geometry.setIndex(indices);
scene.add(boxBuffer)

//ADDING TEXTURE
const image = new Image()
const texture = new THREE.Texture(image)
image.onload = () =>
{
texture.needsUpdate = true
console.log("image loaded")
}
image.src = "/door.jpg"

	//BUILDING A REDCUBE USING BOXGEO
const box = new THREE.BoxGeometry(1, 1, 1,10 ,10 ,10) //this method to build a box and the paramatere are width, height, depth
const materiel = new THREE.MeshBasicMaterial({ map: texture})//this method to build a materiel and the paramatere are color
const mesh = new THREE.Mesh(box, materiel)//this method to build a mesh and the paramatere are geometry, materiel
scene.add(mesh)
mesh.position.x = 1
mesh.position.y = 0
mesh.position.z = 1
mesh.rotation.reorder('YXZ')

/*====this reorder funciton solves 
a problem that is called a gimbal 
lock which simple the rotation isn't 
being done as you imagine =====*/
//mesh.scale.set(): using the scale propertie is simply changing the scale of the mesh
//mesh.position.set(0.7, -0.6, -9):this change the position coordinations of the mesh

	//BUILDING A GREENCUBE USING BOXGEO
/*const boxGreen = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 3), new THREE.MeshBasicMaterial({color: 0x00ff00}))
scene.add(boxGreen)*/

	//BUILDING A GROUP
/*const firstGroup = new THREE.Group()
firstGroup.add(mesh)
scene.add(firstGroup)
firstGroup.position.x = -8*/

  	//CONTROLLING SCREEN SIZE
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

	//BUILDING THE CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)//this method to build a camera and the paramatere are field of view, aspect ratio
camera.position.z = 7
camera.position.x = 0
camera.position.y = 0
camera.lookAt(mesh.position)//this function makes the camera look at the group positon
scene.add(camera)
//console.log(mesh.position.length()):distance between the center of the scene and our object
//console.log(mesh.position.distanceTo(camera.position)):distance between camera and cube

	//BUILDING AXESHELPER
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)


	//RENDERING
const render = new THREE.WebGLRenderer({
	canvas
})
render.setSize(sizes.width, sizes.height)

/*we used orbit controls:controls are so cool they make it easy 
	navigate and control the element on the scene they can make it
	easy for you all you have to do is read the docummentation.
	when to use custom or bulttin controls? it depends on you
	if the bulttin control have all the features u need use it*/

	//ORBITCONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.target = mesh.position //THIS ONE REPLACE THE CAMERA.LOOKAT FUNCTION
controls.maxPolarAngle = Math.PI / 2

	//RENDERING THE FRAMES ON THE WINDOW
const oldCursor =
{
	x : 0,
	x1 : 0
}
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
	camera.position.y = cursor.y * 5*/
	camera.lookAt(mesh.position)
	controls.update()
	render.render(scene, camera)
	window.requestAnimationFrame(anime)
}
anime()