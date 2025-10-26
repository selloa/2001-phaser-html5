<!-- f6c245e0-1a26-482b-be2c-3974f416f455 cb9f7f47-b632-47f8-97d7-8516ae711fa7 -->
# Add Text Display System

## Overview

Create a reusable text display system for scenes with flexible configuration options. The system should support different text types with consistent defaults while allowing customization.

## Requirements

- One text at a time per scene
- Stay on screen until user clicks (then advances scene)
- Simple retro/console font styling
- Flexible positioning (configurable per call)
- No background panels for now

## Implementation

### Step 1: Create TextDisplay Utility Class

**File**: `src/utils/TextDisplay.js`

Create a reusable class that handles:

- Text rendering with configurable position
- Typewriter/console font styling
- Flexible positioning options (bottom, center, top, custom)
- Fade in/out effects
- Easy integration with existing scenes
```javascript
export class TextDisplay {
    constructor(scene) {
        this.scene = scene
        this.textObject = null
    }

    show(text, options = {}) {
        // Default options
        const config = {
            position: options.position || 'bottom', // 'top', 'center', 'bottom', 'custom'
            x: options.x || null,
            y: options.y || null,
            fontSize: options.fontSize || '20px',
            fontFamily: options.fontFamily || 'Courier New, monospace',
            color: options.color || '#ffffff',
            fadeIn: options.fadeIn !== false,
            duration: options.duration || 1000
        }

        // Calculate position based on config
        const { width, height } = this.scene.cameras.main
        let x = config.x || width / 2
        let y = config.y

        if (!y) {
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
        this.textObject = this.scene.add.text(x, y, text, {
            fontSize: config.fontSize,
            fontFamily: config.fontFamily,
            color: config.color,
            align: 'center',
            wordWrap: { width: width * 0.9 }
        }).setOrigin(0.5)

        // Fade in if requested
        if (config.fadeIn) {
            this.textObject.setAlpha(0)
            this.scene.tweens.add({
                targets: this.textObject,
                alpha: 1,
                duration: config.duration,
                ease: 'Power2'
            })
        }
    }

    hide(fadeOut = true, duration = 500) {
        if (!this.textObject) return

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
        if (this.textObject) {
            this.textObject.destroy()
            this.textObject = null
        }
    }
}
```


### Step 2: Integrate TextDisplay into Scene Template

Update all scene files to support text display:

Add to each scene's constructor:

```javascript
constructor() {
    super({ key: 'SceneXXX' })
    this.textDisplay = null
}
```

Add to each scene's create method:

```javascript
create(data) {
    // ... existing code ...
    
    // Initialize text display
    this.textDisplay = new TextDisplay(this)
    
    // Display text if specified (example)
    if (this.sceneText) {
        this.textDisplay.show(this.sceneText, { position: 'bottom' })
    }
}
```

Add to each scene's shutdown method:

```javascript
shutdown() {
    // ... existing cleanup ...
    
    // Clean up text display
    if (this.textDisplay) {
        this.textDisplay.destroy()
    }
}
```

### Step 3: Test with Scene001

**File**: `src/scenes/Scene001.js`

Add test text to Scene001:

```javascript
create(data) {
    // ... existing code ...
    
    // Initialize text display
    this.textDisplay = new TextDisplay(this)
    
    // Display test text
    this.textDisplay.show('Bowman: This is unusual.', {
        position: 'bottom',
        fontSize: '22px',
        fadeIn: true
    })
}
```

### Step 4: Update Scene Transitions

Modify advanceToNextScene to hide text before transitioning:

```javascript
advanceToNextScene() {
    // Hide text if present
    if (this.textDisplay) {
        this.textDisplay.hide(false) // No fade, instant hide
    }
    
    // Fade out current image
    this.tweens.add({
        targets: this.image,
        alpha: 0,
        duration: 1500,
        ease: 'Power2',
        onComplete: () => {
            this.scene.start('Scene002', { music: this.music })
        }
    })
}
```

## Future Enhancements (not in this implementation)

- Multiple text items with pagination
- Character name styling
- Background panels/boxes
- Typewriter effect (character-by-character reveal)
- Text presets (dialogue, narration, system message)

## Files to Create/Modify

- **Create**: `src/utils/TextDisplay.js` - Text display utility class
- **Modify**: `src/scenes/Scene001.js` - Add test text
- **Modify** (later): Other scene files as needed

## Expected Result

When Scene001 loads, "Bowman: This is unusual." will appear at the bottom of the screen in a retro console font. Clicking will hide the text and advance to Scene002 as normal.

### To-dos

- [ ] Create master scene configuration with scene order array
- [ ] Create SceneAudioManager for smart audio continuation
- [ ] Update SceneLoader to use scene order and remove API dependencies
- [ ] Refactor GameScene to use dynamic scene loading system
- [ ] Rename existing scene JSON files to numbered format
- [ ] Create scene template and update documentation