// Audio is now handled directly in each scene
import BaseScene from './BaseScene.js'
import { TextDisplay } from '../utils/TextDisplay.js'
import { getNextScene } from '../config/sceneOrder.js'

export default class TitleScene extends BaseScene {
    constructor() {
        super('TitleScene')
    }

    preload() {
        // Load the crescent moon image
        this.load.image('crescent-moon', './ui/crescent-moon2.png')
        
        // Load the first audio track
        this.load.audio('title-music', './audio/01.mp3')
        
        // Handle audio loading events
        this.load.on('filecomplete-audio-title-music', () => {
            console.log('Title music loaded successfully')
        })
        
        this.load.on('loaderror', (file) => {
            if (file.key === 'title-music') {
                console.log('Audio file not found, continuing without music')
            }
        })
    }

    create(data) {
        const { width, height } = this.cameras.main

        // Start with black background
        this.cameras.main.setBackgroundColor('#000000')

        // Create the crescent moon background image
        this.crescentMoon = this.add.image(width / 2, height / 2, 'crescent-moon')
        
        // Scale the image to fill the screen while maintaining aspect ratio
        const scaleX = width / this.crescentMoon.width
        const scaleY = height / this.crescentMoon.height
        const scale = Math.max(scaleX, scaleY)
        this.crescentMoon.setScale(scale)
        
        // Center the image
        this.crescentMoon.setOrigin(0.5, 0.5)
        
        // Start with the image invisible
        this.crescentMoon.setAlpha(0)

        // Store the image reference for BaseScene compatibility
        this.image = this.crescentMoon

        // Initialize text display (required by BaseScene)
        this.textDisplay = new TextDisplay(this)
        
        // Initialize credit text display
        this.creditTextDisplay = new TextDisplay(this)

        // Use music from IntroScene if available, otherwise initialize new music
        if (data && data.titleMusic) {
            this.titleMusic = data.titleMusic
            console.log('Using music from IntroScene')
        } else {
            // Initialize music if not passed from IntroScene
            try {
                this.titleMusic = this.sound.add('title-music', {
                    loop: true,
                    volume: 1.0  // Start at full volume, compression will handle dynamics
                })
                console.log('Title music initialized in TitleScene with high volume')
            } catch (error) {
                console.log('Audio initialization failed:', error)
                this.titleMusic = null
            }
        }

        // Music is handled directly in this scene

        // Start the experience immediately
        this.startExperience()
    }

    startExperience() {
        // Capture width and height for use in delayed callbacks
        const { width, height } = this.cameras.main
        
        // Only start playing music if it's not already playing (from IntroScene)
        if (this.titleMusic && !this.titleMusic.isPlaying) {
            try {
                this.titleMusic.play()
                console.log('Title music started playing in TitleScene')
                
                // Add event listeners to debug audio state
                this.titleMusic.on('play', () => {
                    console.log('Title music is now playing in TitleScene')
                })
                
                this.titleMusic.on('pause', () => {
                    console.log('Title music paused in TitleScene')
                })
                
                this.titleMusic.on('stop', () => {
                    console.log('Title music stopped in TitleScene')
                })
                
            } catch (error) {
                console.log('Audio play failed in TitleScene:', error)
                // Continue without music if audio fails
            }
        } else if (this.titleMusic && this.titleMusic.isPlaying) {
            console.log('Title music already playing from IntroScene')
        } else {
            console.log('No audio available in TitleScene')
        }

        // Wait a moment for music to start, then fade in the crescent moon image and text
        this.time.delayedCall(500, () => {
            this.tweens.add({
                targets: this.crescentMoon,
                alpha: 1,
                duration: 3000,
                ease: 'Power2'
            })
            
            // Show title text with a slight delay
            this.time.delayedCall(1000, () => {
                console.log('Showing title text...')
                this.textDisplay.showPreset('2001: A Space Odyssey', 'title', {
                    x: width / 2,
                    y: height * 0.3 - (48 * 1.5), // Move 1.5 times text height north
                    onComplete: () => {
                        // Show credit text while keeping title text visible
                        console.log('Title typewriter complete, showing credit text...')
                        this.creditTextDisplay.showPreset('created by\nArthur C. Clarke & Stanley Kubrick', 'caption', {
                            x: width / 2,
                            y: height * 0.7 + 100,
                            fontSize: '30px'  // 3px smaller than caption preset's 36px
                        })
                        console.log('Credit text display created:', this.creditTextDisplay.textObject)
                    }
                })
                console.log('Title text display created:', this.textDisplay.textObject)
            })
        })

        // Use BaseScene's built-in click-to-advance functionality
        this.setupClickToAdvance()
    }

    advanceToNextScene() {
        // Complete any ongoing typewriter animation and hide text for both displays
        if (this.textDisplay) {
            this.textDisplay.completeTypewriter()
            this.textDisplay.hide(false)
        }
        if (this.creditTextDisplay) {
            this.creditTextDisplay.completeTypewriter()
            this.creditTextDisplay.hide(false)
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
                        this.scene.start(nextScene, { music: this.titleMusic })
                    }
                }
            })
        } else {
            // No image to fade, go directly to next scene
            const nextScene = getNextScene(this.scene.key)
            if (nextScene) {
                this.scene.start(nextScene, { music: this.titleMusic })
            }
        }
    }


    shutdown() {
        // Stop music when scene is destroyed
        if (this.titleMusic && this.titleMusic.isPlaying) {
            this.titleMusic.stop()
            console.log('TitleScene: Music stopped on shutdown')
        }
        
        
        // Use BaseScene's cleanup
        this.cleanupScene()
    }

    resize(width, height) {
        console.log(`TitleScene resizing to: ${width}x${height}`)
        
        // Update camera dimensions
        this.cameras.main.setViewport(0, 0, width, height)
        
        // Resize crescent moon image
        if (this.crescentMoon) {
            const scaleX = width / this.crescentMoon.width
            const scaleY = height / this.crescentMoon.height
            const scale = Math.max(scaleX, scaleY)
            this.crescentMoon.setScale(scale)
            this.crescentMoon.setPosition(width / 2, height / 2)
        }
        
        // Text displays handle their own positioning through the TextDisplay utility
        // No manual repositioning needed as they use percentage-based positioning
    }
}
