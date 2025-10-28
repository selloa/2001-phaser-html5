import BaseScene from './BaseScene.js'
import { TextDisplay } from '../utils/TextDisplay.js'

export default class Scene002 extends BaseScene {
    constructor() {
        super('PooleEjected')
    }

    preload() {
        // Load the scene image
        this.load.image('pooleejected', './scenes/pooleejected.png')
    }

    create(data) {
        const { width, height } = this.cameras.main

        // Start with black background
        this.cameras.main.setBackgroundColor('#000000')

        // Handle music from previous scene
        if (data && data.music) {
            this.music = data.music
        }

        // Initialize text display
        this.textDisplay = new TextDisplay(this)

        // Create and setup image
        this.image = this.add.image(width / 2, height / 2, 'pooleejected')
        const scaleX = width / this.image.width
        const scaleY = height / this.image.height
        const scale = Math.max(scaleX, scaleY)
        this.image.setScale(scale).setOrigin(0.5, 0.5).setAlpha(0)

        // Fade in the image
        this.tweens.add({
            targets: this.image,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        })

        // Display text with typewriter effect
        this.time.delayedCall(1000, () => {
            this.textDisplay.showPreset('HAL?! No!', 'speech')
        })

        // Setup click-to-advance (uses BaseScene method)
        this.setupClickToAdvance()
    }


    resize(width, height) {
        this.cameras.main.setViewport(0, 0, width, height)
        
        if (this.image) {
            const scaleX = width / this.image.width
            const scaleY = height / this.image.height
            const scale = Math.max(scaleX, scaleY)
            this.image.setScale(scale).setPosition(width / 2, height / 2)
        }
    }

    shutdown() {
        this.cleanupScene()
    }
}
