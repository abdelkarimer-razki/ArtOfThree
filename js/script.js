const scene = new THREE.Scene()

//buding a red cube
const box = new THREE.BoxGeometry(1, 1, 1) //this method to build a box and the paramatere are width, height, depth
const materiel = new THREE.MeshBasicMaterial({ color: 0xff0000 })//this method to build a materiel and the paramatere are color
const mesh = new THREE.Mesh(box, materiel)//this method to build a mesh and the paramatere are geometry, materiel
scene.add(mesh)

//camera

const sizes = {
	width: 800,
	height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)//this method to build a camera and the paramatere are field of view, aspect ratio
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera)

//renderer
const canvas = document.querySelector('.webgl')
//console.log(canvas)
const render = new THREE.WebGLRenderer({
	canvas
})
render.setSize(sizes.width, sizes.height)
render.render(scene, camera)