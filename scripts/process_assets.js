#!/usr/bin/env node

/**
 * Asset Processing Script for 2001 Space Odyssey Demo
 * 
 * This script automates the workflow:
 * 1. Takes movie stills from assets/source/movie_stills/
 * 2. Processes them with Pixellab AI (if API key available)
 * 3. Saves processed images to assets/processed/raw_pixel_art/
 * 4. Generates scene data for Phaser
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const CONFIG = {
    sourceDir: path.join(projectRoot, 'assets', 'source', 'movie_stills'),
    processedDir: path.join(projectRoot, 'assets', 'processed', 'raw_pixel_art'),
    finalDir: path.join(projectRoot, 'assets', 'final', 'scenes'),
    sceneDataFile: path.join(projectRoot, 'src', 'data', 'scenes.js'),
    pixellabApiKey: process.env.PIXELLAB_API_KEY || null
};

// Scene definitions for 2001 Space Odyssey
const SCENE_DEFINITIONS = {
    'monolith_discovery': {
        description: 'The crew discovers the monolith on the moon',
        keywords: ['monolith', 'moon', 'discovery', 'black', 'rectangular'],
        interactions: [
            { text: 'Examine the monolith closely', action: 'showMessage', message: 'The monolith is perfectly smooth and black, reflecting the sun like a mirror.' },
            { text: 'Touch the monolith', action: 'goToScene', target: 'monolith_touch' },
            { text: 'Return to the ship', action: 'goToScene', target: 'spaceship_interior' }
        ]
    },
    'monolith_touch': {
        description: 'Touching the monolith triggers a response',
        keywords: ['monolith', 'touch', 'response', 'sound', 'electronic'],
        interactions: [
            { text: 'The monolith emits a high-pitched sound', action: 'showMessage', message: 'A piercing electronic tone fills the air. The monolith is responding!' },
            { text: 'Step back in alarm', action: 'goToScene', target: 'monolith_discovery' }
        ]
    },
    'spaceship_interior': {
        description: 'Inside the Discovery One spaceship',
        keywords: ['spaceship', 'interior', 'discovery', 'hal', 'computer'],
        interactions: [
            { text: 'Check the ship\'s systems', action: 'showMessage', message: 'All systems are functioning normally. HAL 9000 reports no anomalies.' },
            { text: 'Return to the monolith', action: 'goToScene', target: 'monolith_discovery' }
        ]
    },
    'hal_interface': {
        description: 'HAL 9000 computer interface',
        keywords: ['hal', 'computer', 'interface', 'red', 'eye'],
        interactions: [
            { text: 'Ask HAL about the mission', action: 'showMessage', message: 'I\'m sorry Dave, I\'m afraid I can\'t do that.' },
            { text: 'Check system status', action: 'showMessage', message: 'All systems are functioning normally. The mission is proceeding as planned.' }
        ]
    },
    'jupiter_approach': {
        description: 'Approaching Jupiter on the Discovery mission',
        keywords: ['jupiter', 'space', 'discovery', 'mission', 'planet'],
        interactions: [
            { text: 'Observe Jupiter', action: 'showMessage', message: 'The massive gas giant looms ahead, its swirling storms visible even from this distance.' },
            { text: 'Check navigation', action: 'goToScene', target: 'spaceship_interior' }
        ]
    }
};

/**
 * Process a single image file
 */
async function processImage(filename) {
    const sourcePath = path.join(CONFIG.sourceDir, filename);
    const processedPath = path.join(CONFIG.processedDir, filename);
    
    if (!fs.existsSync(sourcePath)) {
        console.log(`❌ Source file not found: ${filename}`);
        return null;
    }
    
    console.log(`🔄 Processing: ${filename}`);
    
    // If Pixellab API key is available, use it
    if (CONFIG.pixellabApiKey) {
        try {
            await processWithPixellab(sourcePath, processedPath, filename);
        } catch (error) {
            console.log(`⚠️  Pixellab processing failed, using fallback: ${error.message}`);
            await copyFile(sourcePath, processedPath);
        }
    } else {
        console.log(`ℹ️  No Pixellab API key found, copying original file`);
        await copyFile(sourcePath, processedPath);
    }
    
    return filename;
}

/**
 * Process image with Pixellab AI
 */
async function processWithPixellab(sourcePath, outputPath, filename) {
    const imageBuffer = fs.readFileSync(sourcePath);
    const base64Image = imageBuffer.toString('base64');
    
    // Get scene definition for better prompts
    const sceneId = path.parse(filename).name;
    const sceneDef = SCENE_DEFINITIONS[sceneId] || SCENE_DEFINITIONS['monolith_discovery'];
    
    const prompt = `Convert to 8-bit pixel art style, 2001 Space Odyssey aesthetic. ${sceneDef.description}. Keywords: ${sceneDef.keywords.join(', ')}`;
    
    const response = await fetch('https://api.pixellab.ai/v1/generate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CONFIG.pixellabApiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            image: base64Image,
            style: 'pixel_art',
            resolution: '800x600'
        })
    });
    
    if (!response.ok) {
        throw new Error(`Pixellab API error: ${response.status}`);
    }
    
    const result = await response.json();
    fs.writeFileSync(outputPath, Buffer.from(result.image, 'base64'));
    console.log(`✅ Processed with Pixellab: ${filename}`);
}

/**
 * Copy file as fallback
 */
async function copyFile(sourcePath, outputPath) {
    fs.copyFileSync(sourcePath, outputPath);
    console.log(`📋 Copied: ${path.basename(sourcePath)}`);
}

/**
 * Generate scene data for Phaser
 */
function generateSceneData() {
    const scenes = {};
    
    // Read processed images
    const processedFiles = fs.readdirSync(CONFIG.processedDir)
        .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
        .map(file => path.parse(file).name);
    
    // Generate scene data
    processedFiles.forEach(sceneId => {
        const sceneDef = SCENE_DEFINITIONS[sceneId];
        if (sceneDef) {
            scenes[sceneId] = {
                image: `${sceneId}.png`,
                description: sceneDef.description,
                options: sceneDef.interactions
            };
        } else {
            // Generate default scene data
            scenes[sceneId] = {
                image: `${sceneId}.png`,
                description: `Scene: ${sceneId}`,
                options: [
                    { text: 'Examine closely', action: 'showMessage', message: 'You examine the scene...' },
                    { text: 'Continue', action: 'nextScene' }
                ]
            };
        }
    });
    
    // Write scene data file
    const sceneDataContent = `// Auto-generated scene data
export const sceneData = ${JSON.stringify(scenes, null, 4)};

export function getSceneData(sceneId) {
    return sceneData[sceneId] || null;
}

export function getAllSceneIds() {
    return Object.keys(sceneData);
}`;
    
    fs.writeFileSync(CONFIG.sceneDataFile, sceneDataContent);
    console.log(`📝 Generated scene data: ${Object.keys(scenes).length} scenes`);
}

/**
 * Main processing function
 */
async function main() {
    console.log('🚀 Starting asset processing...');
    
    // Ensure directories exist
    [CONFIG.processedDir, CONFIG.finalDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
    
    // Get source files
    const sourceFiles = fs.readdirSync(CONFIG.sourceDir)
        .filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
    
    if (sourceFiles.length === 0) {
        console.log('❌ No source images found in assets/source/movie_stills/');
        console.log('   Please add movie still images to process');
        return;
    }
    
    console.log(`📁 Found ${sourceFiles.length} source images`);
    
    // Process each image
    const processedFiles = [];
    for (const file of sourceFiles) {
        const result = await processImage(file);
        if (result) {
            processedFiles.push(result);
        }
    }
    
    // Generate scene data
    generateSceneData();
    
    console.log(`✅ Processing complete! ${processedFiles.length} images processed`);
    console.log(`📁 Processed images: assets/processed/raw_pixel_art/`);
    console.log(`📝 Scene data: src/data/scenes.js`);
    console.log(`🎮 Run 'npm run dev' to test in Phaser`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { processImage, generateSceneData };
