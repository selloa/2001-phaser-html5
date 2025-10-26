#!/usr/bin/env node

/**
 * Scene Generation Script for 2001 Space Odyssey Demo
 * 
 * This script generates scene data and documentation:
 * 1. Scans assets/final/scenes/ for available images
 * 2. Generates comprehensive scene data
 * 3. Creates demo walkthrough documentation
 * 4. Updates Phaser scene configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const CONFIG = {
    finalAssetsDir: path.join(projectRoot, 'assets', 'final', 'scenes'),
    sceneDataFile: path.join(projectRoot, 'src', 'data', 'scenes.js'),
    demoDocFile: path.join(projectRoot, 'docs', 'demo_walkthrough.md'),
    packageJsonFile: path.join(projectRoot, 'package.json')
};

// Comprehensive scene definitions
const SCENE_TEMPLATES = {
    'monolith_discovery': {
        title: 'Monolith Discovery',
        description: 'The crew discovers the mysterious black monolith on the moon',
        narrative: 'You stand before the monolith, a perfect rectangular prism that seems to absorb all light. The sun reflects off its smooth surface, creating an otherworldly glow.',
        keywords: ['monolith', 'moon', 'discovery', 'black', 'rectangular', 'mysterious'],
        interactions: [
            { 
                text: 'Examine the monolith closely', 
                action: 'showMessage', 
                message: 'The monolith is perfectly smooth and black, reflecting the sun like a mirror. It appears to be a perfect rectangular prism with no visible seams or markings. The surface is completely featureless, yet somehow compelling.' 
            },
            { 
                text: 'Touch the monolith', 
                action: 'goToScene', 
                target: 'monolith_touch' 
            },
            { 
                text: 'Return to the ship', 
                action: 'goToScene', 
                target: 'spaceship_interior' 
            }
        ],
        mood: 'mysterious',
        lighting: 'bright',
        colorPalette: ['black', 'white', 'gray', 'blue']
    },
    
    'monolith_touch': {
        title: 'Monolith Response',
        description: 'Touching the monolith triggers an unexpected response',
        narrative: 'As your hand makes contact with the monolith, something extraordinary happens. The silent structure begins to emit a sound that seems to come from everywhere and nowhere.',
        keywords: ['monolith', 'touch', 'response', 'sound', 'electronic', 'reaction'],
        interactions: [
            { 
                text: 'The monolith emits a high-pitched sound', 
                action: 'showMessage', 
                message: 'A piercing electronic tone fills the air. The monolith is responding to your touch! The sound seems to be coming from within the structure itself, yet the surface remains perfectly smooth and featureless.' 
            },
            { 
                text: 'Step back in alarm', 
                action: 'goToScene', 
                target: 'monolith_discovery' 
            }
        ],
        mood: 'tense',
        lighting: 'dramatic',
        colorPalette: ['black', 'white', 'red', 'orange']
    },
    
    'spaceship_interior': {
        title: 'Discovery One Interior',
        description: 'Inside the Discovery One spaceship',
        narrative: 'You are inside the Discovery One spaceship, surrounded by the familiar hum of life support systems and the gentle glow of control panels.',
        keywords: ['spaceship', 'interior', 'discovery', 'hal', 'computer', 'control'],
        interactions: [
            { 
                text: 'Check the ship\'s systems', 
                action: 'showMessage', 
                message: 'All systems are functioning normally. Life support is stable, navigation is on course, and the discovery awaits further investigation. HAL 9000 reports no anomalies.' 
            },
            { 
                text: 'Return to the monolith', 
                action: 'goToScene', 
                target: 'monolith_discovery' 
            },
            { 
                text: 'Check HAL 9000', 
                action: 'goToScene', 
                target: 'hal_interface' 
            }
        ],
        mood: 'calm',
        lighting: 'artificial',
        colorPalette: ['blue', 'white', 'gray', 'green']
    },
    
    'hal_interface': {
        title: 'HAL 9000 Interface',
        description: 'HAL 9000 computer interface',
        narrative: 'You stand before HAL 9000\'s interface, the red eye of the computer staring back at you with an almost human-like presence.',
        keywords: ['hal', 'computer', 'interface', 'red', 'eye', 'ai'],
        interactions: [
            { 
                text: 'Ask HAL about the mission', 
                action: 'showMessage', 
                message: 'I\'m sorry Dave, I\'m afraid I can\'t do that. The mission parameters are classified and cannot be discussed at this time.' 
            },
            { 
                text: 'Check system status', 
                action: 'showMessage', 
                message: 'All systems are functioning normally. The mission is proceeding as planned. I am monitoring all ship functions and crew activities.' 
            },
            { 
                text: 'Return to ship interior', 
                action: 'goToScene', 
                target: 'spaceship_interior' 
            }
        ],
        mood: 'ominous',
        lighting: 'red',
        colorPalette: ['red', 'black', 'white', 'gray']
    },
    
    'jupiter_approach': {
        title: 'Jupiter Approach',
        description: 'Approaching Jupiter on the Discovery mission',
        narrative: 'The massive gas giant Jupiter looms ahead, its swirling storms and colorful bands visible even from this distance. The planet fills your view with its majestic presence.',
        keywords: ['jupiter', 'space', 'discovery', 'mission', 'planet', 'gas giant'],
        interactions: [
            { 
                text: 'Observe Jupiter', 
                action: 'showMessage', 
                message: 'The massive gas giant looms ahead, its swirling storms visible even from this distance. The Great Red Spot churns slowly, a storm larger than Earth itself.' 
            },
            { 
                text: 'Check navigation', 
                action: 'goToScene', 
                target: 'spaceship_interior' 
            }
        ],
        mood: 'awe-inspiring',
        lighting: 'dramatic',
        colorPalette: ['orange', 'brown', 'white', 'blue']
    }
};

/**
 * Scan for available assets
 */
function scanAssets() {
    if (!fs.existsSync(CONFIG.finalAssetsDir)) {
        console.log('❌ Final assets directory not found: assets/final/scenes/');
        return [];
    }
    
    const assets = fs.readdirSync(CONFIG.finalAssetsDir)
        .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
        .map(file => path.parse(file).name);
    
    console.log(`📁 Found ${assets.length} assets: ${assets.join(', ')}`);
    return assets;
}

/**
 * Generate scene data
 */
function generateSceneData(availableAssets) {
    const scenes = {};
    
    availableAssets.forEach(assetName => {
        const template = SCENE_TEMPLATES[assetName];
        if (template) {
            scenes[assetName] = {
                image: `${assetName}.png`,
                title: template.title,
                description: template.description,
                narrative: template.narrative,
                options: template.interactions,
                metadata: {
                    mood: template.mood,
                    lighting: template.lighting,
                    colorPalette: template.colorPalette,
                    keywords: template.keywords
                }
            };
        } else {
            // Generate default scene for unknown assets
            scenes[assetName] = {
                image: `${assetName}.png`,
                title: `Scene: ${assetName}`,
                description: `A scene from 2001: A Space Odyssey`,
                narrative: `You find yourself in an unknown location.`,
                options: [
                    { text: 'Examine closely', action: 'showMessage', message: 'You examine the scene...' },
                    { text: 'Continue', action: 'nextScene' }
                ],
                metadata: {
                    mood: 'unknown',
                    lighting: 'unknown',
                    colorPalette: ['unknown'],
                    keywords: ['unknown']
                }
            };
        }
    });
    
    return scenes;
}

/**
 * Write scene data file
 */
function writeSceneData(scenes) {
    const sceneDataContent = `// Auto-generated scene data for 2001 Space Odyssey Demo
// Generated on: ${new Date().toISOString()}

export const sceneData = ${JSON.stringify(scenes, null, 4)};

export function getSceneData(sceneId) {
    return sceneData[sceneId] || null;
}

export function getAllSceneIds() {
    return Object.keys(sceneData);
}

export function getScenesByMood(mood) {
    return Object.values(sceneData).filter(scene => scene.metadata?.mood === mood);
}

export function getScenesByKeyword(keyword) {
    return Object.values(sceneData).filter(scene => 
        scene.metadata?.keywords?.includes(keyword)
    );
}`;
    
    fs.writeFileSync(CONFIG.sceneDataFile, sceneDataContent);
    console.log(`📝 Scene data written: ${Object.keys(scenes).length} scenes`);
}

/**
 * Generate demo walkthrough documentation
 */
function generateDemoWalkthrough(scenes) {
    const walkthroughContent = `# 2001 Space Odyssey Demo Walkthrough

## Demo Overview
This demo showcases the visual style and gameplay mechanics of a 2001: A Space Odyssey pixel art adventure game.

## Available Scenes
${Object.values(scenes).map(scene => `
### ${scene.title}
- **Description**: ${scene.description}
- **Narrative**: ${scene.narrative}
- **Mood**: ${scene.metadata?.mood || 'unknown'}
- **Lighting**: ${scene.metadata?.lighting || 'unknown'}
- **Color Palette**: ${scene.metadata?.colorPalette?.join(', ') || 'unknown'}

**Interactions**:
${scene.options.map(option => `- ${option.text}`).join('\n')}
`).join('\n')}

## Demo Flow
1. **Start**: Title screen with starry sky
2. **Monolith Discovery**: First encounter with the mysterious monolith
3. **Monolith Response**: Touching the monolith triggers a reaction
4. **Spaceship Interior**: Return to the Discovery One
5. **HAL Interface**: Interact with the ship's computer
6. **Jupiter Approach**: Journey to the gas giant

## Technical Features
- **Pixel Art Style**: Consistent 8-bit aesthetic
- **Interactive Text**: Clickable options for player choices
- **Scene Transitions**: Smooth movement between locations
- **Narrative Integration**: Story-driven gameplay

## Controls
- **Mouse**: Click on text options to interact
- **Keyboard**: Press any key to advance from title screen
- **Navigation**: Use "Back to Title" button to return to start

## Development Notes
- All assets are optimized for web display
- Scene data is easily modifiable in \`src/data/scenes.js\`
- Hot reload enables real-time testing
- Asset pipeline supports Aseprite and Pixellab AI

## Next Steps for Full Game
1. Add character animations
2. Implement inventory system
3. Add sound effects and music
4. Create more complex puzzle mechanics
5. Expand narrative with more scenes
`;

    fs.writeFileSync(CONFIG.demoDocFile, walkthroughContent);
    console.log(`📖 Demo walkthrough written: docs/demo_walkthrough.md`);
}

/**
 * Update package.json with new scripts
 */
function updatePackageJson() {
    const packageJson = JSON.parse(fs.readFileSync(CONFIG.packageJsonFile, 'utf8'));
    
    packageJson.scripts = {
        ...packageJson.scripts,
        'process:assets': 'node scripts/process_assets.js',
        'export:aseprite': 'node scripts/export_aseprite.js',
        'generate:scenes': 'node scripts/generate_scenes.js',
        'workflow:full': 'npm run process:assets && npm run export:aseprite && npm run generate:scenes',
        'demo:build': 'npm run workflow:full && npm run build',
        'demo:dev': 'npm run generate:scenes && npm run dev'
    };
    
    fs.writeFileSync(CONFIG.packageJsonFile, JSON.stringify(packageJson, null, 2));
    console.log(`📦 Package.json updated with new scripts`);
}

/**
 * Main generation function
 */
async function main() {
    console.log('🚀 Starting scene generation...');
    
    // Scan for available assets
    const availableAssets = scanAssets();
    
    if (availableAssets.length === 0) {
        console.log('❌ No assets found in assets/final/scenes/');
        console.log('   Run the asset processing workflow first:');
        console.log('   npm run process:assets');
        return;
    }
    
    // Generate scene data
    const scenes = generateSceneData(availableAssets);
    
    // Write files
    writeSceneData(scenes);
    generateDemoWalkthrough(scenes);
    updatePackageJson();
    
    console.log(`✅ Scene generation complete!`);
    console.log(`📁 Scenes: ${Object.keys(scenes).length}`);
    console.log(`📝 Scene data: src/data/scenes.js`);
    console.log(`📖 Walkthrough: docs/demo_walkthrough.md`);
    console.log(`🎮 Run 'npm run dev' to test the demo`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { generateSceneData, scanAssets };
