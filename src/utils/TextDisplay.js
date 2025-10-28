import { getTextPreset } from './TextPresets.js'

export class TextDisplay {
    constructor(scene) {
        this.scene = scene
        this.textObject = null
    }

    // Show text using a preset style
    showPreset(text, presetName, customOptions = {}) {
        const preset = getTextPreset(presetName, customOptions)
        this.show(text, preset)
    }

    show(text, options = {}) {
        // Default options
        const config = {
            position: options.position || 'bottom', // 'top', 'center', 'bottom', 'custom'
            x: options.x || null,
            y: options.y || null,
            fontSize: options.fontSize || '20px',
            fontFamily: options.fontFamily || 'Futura Now Inline, Courier New, monospace',
            color: options.color || '#ffffff',
            fadeIn: options.fadeIn !== false,
            duration: options.duration || 1000,
            typewriter: options.typewriter !== false, // Enable typewriter effect by default
            typewriterSpeed: options.typewriterSpeed || 50, // Milliseconds per character
            splitCharacterName: options.splitCharacterName || false, // Character name split feature
            onComplete: options.onComplete || null // Callback when typewriter completes
        }

        // Calculate position based on config
        const { width, height } = this.scene.cameras.main
        let x = config.x || width / 2
        let y = config.y

        if (config.position === 'custom') {
            // Use provided x and y values directly
            x = config.x || width / 2
            y = config.y || height / 2
        } else if (!y) {
            switch (config.position) {
                case 'top':
                    y = height * 0.15
                    break
                case 'center':
                    y = height / 2
                    break
                case 'bottom':
                default:
                    y = height * 0.85
                    break
            }
        }

        // Create text object
        this.textObject = this.scene.add.text(x, y, '', {
            fontSize: config.fontSize,
            fontFamily: config.fontFamily,
            color: config.color,
            align: 'center',
            wordWrap: { width: width * 0.9 }
        }).setOrigin(0.5)

        // Start with invisible text
        this.textObject.setAlpha(0)

        // Typewriter effect
        if (config.typewriter) {
            this.startTypewriterEffect(text, config)
        } else {
            // Regular fade in
            this.textObject.setText(text)
            if (config.fadeIn) {
                this.scene.tweens.add({
                    targets: this.textObject,
                    alpha: 1,
                    duration: config.duration,
                    ease: 'Power2'
                })
            } else {
                this.textObject.setAlpha(1)
            }
        }
    }

    startTypewriterEffect(text, config) {
        let currentIndex = 0
        this.fullText = text // Store the full text for immediate completion
        
        // Check for character name split if enabled
        if (config.splitCharacterName) {
            const colonMatch = text.match(/^([^:]+:)\s*(.*)/)
            if (colonMatch) {
                const characterName = colonMatch[1]  // "Bowman:"
                const dialogue = colonMatch[2]       // "This is unusual."
                
                // Set initial text to character name and make it visible instantly
                this.textObject.setText(characterName)
                this.textObject.setAlpha(1)
                
                // Start typewriter effect on dialogue portion only
                this.typewriterTimer = this.scene.time.addEvent({
                    delay: config.typewriterSpeed,
                    callback: () => {
                        if (currentIndex < dialogue.length) {
                            this.textObject.setText(characterName + ' ' + dialogue.substring(0, currentIndex + 1))
                            currentIndex++
                        } else {
                            // Typewriter effect complete
                            this.typewriterTimer.destroy()
                            this.typewriterTimer = null
                            if (config.onComplete) {
                                config.onComplete()
                            }
                        }
                    },
                    loop: true
                })
                return // Exit early, we've handled the split case
            }
        }
        
        // Original typewriter logic for non-split text
        // Fade in the text object first
        this.scene.tweens.add({
            targets: this.textObject,
            alpha: 1,
            duration: 200,
            ease: 'Power2'
        })

        // Typewriter timer
        this.typewriterTimer = this.scene.time.addEvent({
            delay: config.typewriterSpeed,
            callback: () => {
                if (currentIndex < this.fullText.length) {
                    this.textObject.setText(this.fullText.substring(0, currentIndex + 1))
                    currentIndex++
                } else {
                    // Typewriter effect complete
                    this.typewriterTimer.destroy()
                    this.typewriterTimer = null
                    if (config.onComplete) {
                        config.onComplete()
                    }
                }
            },
            loop: true
        })
    }

    completeTypewriter() {
        // Immediately complete the typewriter animation
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy()
            this.typewriterTimer = null
        }
        
        // Show the full text immediately
        if (this.textObject && this.fullText) {
            this.textObject.setText(this.fullText)
        }
    }

    hide(fadeOut = true, duration = 500) {
        if (!this.textObject) return

        // Stop any ongoing typewriter animation
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy()
            this.typewriterTimer = null
        }

        if (fadeOut) {
            this.scene.tweens.add({
                targets: this.textObject,
                alpha: 0,
                duration: duration,
                ease: 'Power2',
                onComplete: () => {
                    this.textObject.destroy()
                    this.textObject = null
                }
            })
        } else {
            this.textObject.destroy()
            this.textObject = null
        }
    }

    destroy() {
        // Clean up typewriter timer
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy()
            this.typewriterTimer = null
        }
        
        // Clean up text object
        if (this.textObject) {
            this.textObject.destroy()
            this.textObject = null
        }
    }
}
