import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Palma from "./Palma";
import Cupol from "./Cupol";
import Kaktus from "./Kaktus";
import Koster from "./Koster";
import Kuvshinka from "./Kuvshinka";
import Poganka from "./Poganka";
import Bassein from "./Bassein";
import Kolokol from "./Kolokol"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.clock = new THREE.Clock()
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready',()=>{
            // Setup
            this.floor = new Floor()
            this.palma2 = new Palma()
            // this.cupol = new Cupol()
            this.kaktus = new Kaktus()
            this.koster = new Koster()
            this.kuvshinka = new Kuvshinka()
            this.poganka = new Poganka()
            this.bassein = new Bassein()
            this.kolokol = new Kolokol()
            this.environment = new Environment()
            this.scene.background = this.environment.resources.items.environmentMapTexture
        })

        // // Test mesh
        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshStandardMaterial()
        // )
        // this.scene.add(testMesh)
    }

    update(){
        if (this.koster){
            // Water
            this.koster.model.traverse((child)=> {
                if (child instanceof THREE.Mesh) {
                    if (child.name == "Fire") {
                        const elapsedTime = this.clock.getElapsedTime()
                            child.material.uniforms.uTime.value = 100 + elapsedTime/10
                    }
                }
            })
        }
        if (this.bassein){
            // Water
            this.bassein.model.traverse((child)=> {
                if (child instanceof THREE.Mesh) {
                    if (child.name == "water") {
                        const elapsedTime = this.clock.getElapsedTime()
                        child.material.uniforms.uTime.value = elapsedTime
                    }
                }
            })
        }
    }
}