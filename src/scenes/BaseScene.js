import { TextDisplay } from '../utils/TextDisplay.js'
import { getNextScene } from '../config/sceneOrder.js'

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key })
        this.textDisplay = null
        this.music = null
        this.image = null
    }

    // Automatically advances to the next scene based on scene order
    advanceToNextScene() {
        // Complete any ongoing typewriter animation and hide text
        if (this.textDisplay) {
            this.textDisplay.completeTypewriter()
            this.textDisplay.hide(false)
        }
        
        // Fade out current image
        if (this.image) {
            this.tweens.add({
                targets: this.image,
                alpha: 0,
                duration: 1500,
                ease: 'Power2',
                onComplete: () => {
                    const nextScene = getNextScene(this.scene.key)
                    if (nextScene) {
                        this.scene.start(nextScene, { music: this.music })
                    }
                }
            })
        }
    }

    // Jump to a specific scene (for future interactions)
    jumpToScene(sceneKey) {
        // Complete any ongoing typewriter animation and hide text
        if (this.textDisplay) {
            this.textDisplay.completeTypewriter()
            this.textDisplay.hide(false)
        }
        
        // Fade out current image
        if (this.image) {
            this.tweens.add({
                targets: this.image,
                alpha: 0,
                duration: 1500,
                ease: 'Power2',
                onComplete: () => {
                    this.scene.start(sceneKey, { music: this.music })
                }
            })
        }
    }

    // Setup click-to-advance functionality
    setupClickToAdvance() {
        this.input.on('pointerdown', () => {
            this.advanceToNextScene()
        })
        
        this.input.keyboard.on('keydown', () => {
            this.advanceToNextScene()
        })
    }

    // Common cleanup
    cleanupScene() {
        if (this.image) {
            this.image.destroy()
        }
        
        if (this.textDisplay) {
            this.textDisplay.destroy()
        }
    }
}
