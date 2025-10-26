# Developer Guide - 2001 Space Odyssey Game

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser to `http://localhost:5173`**

3. **You'll see:**
   - Title screen with animated starry sky and "2001" logo
   - Click or press any key to enter the game scene
   - Game scene shows scenes in linear order with interactive options

## Scene System Overview

The game uses a linear scene progression system that's easy to manage and scale to 100+ scenes:

- **Scene Order**: Defined in `src/data/sceneConfig.js` as a simple array
- **Scene Files**: Individual JSON files in `data/scenes/` (e.g., `scene-001.json`)
- **Audio Continuation**: Music continues between scenes unless explicitly changed
- **Easy Reordering**: Just move scene IDs in the order array

## Adding New Scenes

### Step 1: Create Your Art
- Use **Aseprite** or **Pixellab AI** to create pixel art from movie stills
- Export as PNG files (recommended: 800x600 or similar aspect ratio)
- Save with descriptive names like `moon-discovery.png`

### Step 2: Add Scene File
1. Copy `data/scenes/scene-template.json` to create a new scene
2. Rename to `scene-XXX.json` (e.g., `scene-006.json`)
3. Update the scene data with your content

### Step 3: Add to Scene Order
Edit `src/data/sceneConfig.js` and add your scene ID to the `SCENE_ORDER` array:

```javascript
export const SCENE_ORDER = [
    'scene-001',  // Moon Discovery
    'scene-002',  // Monolith Touch
    'scene-003',  // Discovery Ship
    'scene-004',  // Space Station
    'scene-005',  // Moon Surface
    'scene-006',  // Your new scene
    // ... add more scenes here
]
```

### Step 4: Add Assets
1. Place your PNG files in `assets/final/scenes/`
2. Place audio files in `assets/final/audio/` (optional)
3. The changes will appear immediately (hot reload)

## Scene JSON Format

Each scene is a JSON file with this structure:

```json
{
  "id": "scene-001",
  "name": "Scene Display Name",
  "image": "image-filename.png",
  "audio": "audio-filename.mp3",
  "caption": "Brief description of what the player sees",
  "interactions": [
    {
      "text": "Button text that player sees",
      "action": "showMessage",
      "value": "Message to display when clicked"
    },
    {
      "text": "Continue to next scene",
      "action": "nextScene",
      "value": ""
    }
  ]
}
```

### Properties
- `id`: Unique scene identifier (must match filename)
- `name`: Display name for the scene
- `image`: PNG filename in `assets/final/scenes/`
- `audio`: MP3 filename in `assets/final/audio/` (optional - omit to continue current music)
- `caption`: Description shown to the player
- `interactions`: Array of clickable options

### Available Actions

#### `showMessage`
Display a text overlay:
```json
{ 
    "text": "Examine object", 
    "action": "showMessage", 
    "value": "You see a mysterious black monolith..." 
}
```

#### `nextScene`
Go to the next scene in the order array:
```json
{ 
    "text": "Continue", 
    "action": "nextScene", 
    "value": "" 
}
```

#### `goToScene`
Jump to a specific scene:
```json
{ 
    "text": "Go to specific scene", 
    "action": "goToScene", 
    "value": "scene-005" 
}
```

#### `returnToTitle`
Return to the title screen:
```json
{ 
    "text": "Return to title", 
    "action": "returnToTitle", 
    "value": "" 
}
```

## Workflow Examples

### Example 1: Adding a New Scene
1. **Create art**: Use Aseprite to pixelate a movie scene
2. **Export**: Save as `hal-interface.png`
3. **Create scene file**: Copy `scene-template.json` to `scene-006.json`
4. **Update scene data**:
   ```json
   {
     "id": "scene-006",
     "name": "HAL 9000 Interface",
     "image": "hal-interface.png",
     "audio": null,
     "caption": "HAL 9000 computer interface",
     "interactions": [
       {
         "text": "Ask HAL about the mission",
         "action": "showMessage",
         "value": "I'm sorry Dave, I'm afraid I can't do that."
       },
       {
         "text": "Continue",
         "action": "nextScene",
         "value": ""
       }
     ]
   }
   ```
5. **Add to scene order**: Add `'scene-006'` to `SCENE_ORDER` array

### Example 2: Reordering Scenes
To change the order of scenes, simply reorder the array in `src/data/sceneConfig.js`:

```javascript
export const SCENE_ORDER = [
    'scene-001',  // Moon Discovery
    'scene-006',  // HAL Interface (moved up)
    'scene-002',  // Monolith Touch
    'scene-003',  // Discovery Ship
    // ... rest of scenes
]
```

## Testing Different Styles

### Pixel Art Styles to Test
1. **High contrast** (black/white/gray)
2. **Limited color palette** (4-8 colors)
3. **Dithering effects**
4. **Different pixel sizes** (1x1, 2x2, 4x4)

### Quick Style Testing
1. Create multiple versions of the same scene
2. Name them `scene_v1.png`, `scene_v2.png`, etc.
3. Update the scene data to test different versions
4. Compare results instantly with hot reload

## Advanced Features

### Custom Actions
You can add custom actions in `src/scenes/GameScene.js` in the `handleOptionClick()` method:

```javascript
case 'customAction':
    // Your custom logic here
    console.log('Custom action triggered')
    break
```

### Scene Transitions
The tool supports smooth transitions between scenes. Each scene loads its image and options automatically.

### Error Handling
- Missing images show placeholder rectangles
- Invalid scene IDs display error messages
- All errors are logged to the browser console

## Tips for Pixel Art Creation

### From Movie Stills
1. **Reduce resolution** to pixel art size (64x64, 128x128, etc.)
2. **Limit colors** to 4-16 colors maximum
3. **Emphasize key elements** (monolith, HAL's eye, spaceship)
4. **Use dithering** for smooth gradients in limited colors

### Aseprite Workflow
1. Import movie still as reference layer
2. Create new layer for pixel art
3. Use pencil tool with 1px size
4. Apply color reduction filters
5. Export as PNG

### Pixellab AI Workflow
1. Upload movie still
2. Use "pixel art" or "8-bit" style filters
3. Adjust intensity and color count
4. Export as PNG

## Troubleshooting

### Images Not Loading
- Check file path in scene data matches actual filename
- Ensure PNG files are in `assets/images/scenes/`
- Check browser console for error messages

### Scene Not Found
- Verify scene ID in `getSceneData()` function
- Check for typos in scene IDs

### Hot Reload Not Working
- Restart the development server: `npm run dev`
- Clear browser cache (Ctrl+F5)

## Next Steps

Once you're happy with your pixel art style and scene interactions:

1. **Expand scene library** with more movie moments
2. **Add sound effects** (Phaser supports audio)
3. **Implement game logic** (inventory, character stats)
4. **Add animations** (walking, object interactions)
5. **Build full game** with proper game mechanics

The preview tool is perfect for prototyping and testing before building the complete game!
