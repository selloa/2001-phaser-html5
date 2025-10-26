// Audio is now handled directly in each scene
import { getNextScene } from '../config/sceneOrder.js'

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' })
    }

    preload() {
        // Load the 2001 logo image
        this.load.image('2001-logo', 'assets/final/ui/2001.png')
        
        // Load the title music for smooth transition
        this.load.audio('title-music', 'assets/final/audio/01.mp3')
        
        // Handle loading events
        this.load.on('filecomplete-image-2001-logo', () => {
            console.log('2001 logo loaded successfully')
        })
        
        this.load.on('filecomplete-audio-title-music', () => {
            console.log('Title music loaded successfully')
        })
        
        this.load.on('loaderror', (file) => {
            if (file.key === '2001-logo') {
                console.log('2001 logo image not found, continuing without image')
            } else if (file.key === 'title-music') {
                console.log('Title music not found, continuing without music')
            }
        })
    }

    create() {
        const { width, height } = this.cameras.main

        // Start with black background
        this.cameras.main.setBackgroundColor('#000000')

        // Create the 2001 logo image
        this.logo = this.add.image(width / 2, height / 2, '2001-logo')
        
        // Scale the image to fit the screen while maintaining aspect ratio
        const scaleX = width / this.logo.width
        const scaleY = height / this.logo.height
        const scale = Math.min(scaleX, scaleY) // Use min to ensure image fits on screen
        this.logo.setScale(scale)
        
        // Center the image
        this.logo.setOrigin(0.5, 0.5)
        
        // Start with the image invisible
        this.logo.setAlpha(0)

        // Initialize title music with high volume for compression
        try {
            this.titleMusic = this.sound.add('title-music', {
                loop: true,
                volume: 1.0  // Start at full volume, compression will handle dynamics
            })
            console.log('Title music initialized in IntroScene with high volume')
        } catch (error) {
            console.log('Audio initialization failed in IntroScene:', error)
            this.titleMusic = null
        }

        // Music is handled directly in this scene

        // Start the intro sequence
        this.startIntro()
    }

    startIntro() {
        // Fade in the 2001 logo image
        this.tweens.add({
            targets: this.logo,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        })

        // Make the entire screen clickable to advance
        this.input.on('pointerdown', () => {
            this.advanceToTitle()
        })

        // Also allow keyboard input to advance
        this.input.keyboard.on('keydown', () => {
            this.advanceToTitle()
        })
    }

    advanceToTitle() {
        // Start the title music before fade out begins
        if (this.titleMusic) {
            try {
                this.titleMusic.play()
                console.log('Title music started playing from IntroScene')
                
                // Add event listeners to debug audio state
                this.titleMusic.on('play', () => {
                    console.log('Title music is now playing from IntroScene')
                })
                
                this.titleMusic.on('pause', () => {
                    console.log('Title music paused from IntroScene')
                })
                
                this.titleMusic.on('stop', () => {
                    console.log('Title music stopped from IntroScene')
                })
                
            } catch (error) {
                console.log('Audio play failed in IntroScene:', error)
                // Continue without music if audio fails
            }
        } else {
            console.log('No audio available in IntroScene')
        }

        // Fade out the logo
        this.tweens.add({
            targets: this.logo,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                // Get next scene from centralized order
                const nextScene = getNextScene('IntroScene')
                // Pass the music reference to the next scene
                this.scene.start(nextScene, { titleMusic: this.titleMusic })
            }
        })
    }

    shutdown() {
        // Stop music when scene is destroyed
        if (this.titleMusic && this.titleMusic.isPlaying) {
            this.titleMusic.stop()
            console.log('IntroScene: Music stopped on shutdown')
        }
    }

    resize(width, height) {
        console.log(`IntroScene resizing to: ${width}x${height}`)
        
        // Update camera dimensions
        this.cameras.main.setViewport(0, 0, width, height)
        
        // Resize logo image
        if (this.logo) {
            const scaleX = width / this.logo.width
            const scaleY = height / this.logo.height
            const scale = Math.min(scaleX, scaleY)
            this.logo.setScale(scale)
            this.logo.setPosition(width / 2, height / 2)
        }
    }
}
