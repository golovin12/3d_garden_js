import * as THREE from "three";
import Experience from "../Experience";
import fireVertexShader from '../shaders/fire/vertex.glsl'
import fireFragmentShader from '../shaders/fire/fragment.glsl'
import ugolFragmentShader from '../shaders/ugol/fragment.glsl'
import ugolVertexShader from '../shaders/ugol/vertex.glsl'

export default class Koster{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.kosterModel

        this.setModel()

    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.position.set(-2, 0.11, -2)
        this.scene.add(this.model)

        this.model.traverse((child)=>{
            if (child instanceof THREE.Mesh){
                child.castShadow = true;
                // console.log(child)
                if (child.name == "Fire") {
                    child.material = new THREE.ShaderMaterial({
                        vertexShader: fireVertexShader,
                        fragmentShader: fireFragmentShader,
                        uniforms:
                            {
                                uTime: {value: 100},
                            }
                    });
                    child.material.transparent = true;
                }

                if (child.name == "Плоскость001") {
                    child.material.transparent = true;
                    child.textures = {}

                    child.textures.color = this.resources.items.kirpichColorTexture
                    child.textures.color.encoding = THREE.sRGBEncoding
                    child.textures.color.repeat.set(1.5, 1.5)
                    child.textures.color.wrapS = THREE.RepeatWrapping
                    child.textures.color.wrapT = THREE.RepeatWrapping

                    child.textures.normal = this.resources.items.kirpichNormalTexture
                    child.textures.normal.repeat.set(1.5, 1.5)
                    child.textures.normal.wrapS = THREE.RepeatWrapping
                    child.textures.normal.wrapT = THREE.RepeatWrapping

                    child.material.map = child.textures.color
                    child.material.normal = child.textures.normal
                }

                if (["Цилиндр", "Цилиндр001", "Цилиндр002", "Цилиндр003"].includes(child.name)) {
                    child.material = new THREE.ShaderMaterial({
                        vertexShader: ugolVertexShader,
                        fragmentShader: ugolFragmentShader,
                    });
                    // child.material.transparent = true;
                }

                child.material.side = THREE.DoubleSide;
                child.material.envMap = this.resources.items.environmentMapTexture
                child.material.envMapIntensity = 1
            }
        })

    }
}