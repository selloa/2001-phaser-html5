#!/usr/bin/env node

/**
 * Aseprite Export Script for 2001 Space Odyssey Demo
 * 
 * This script automates Aseprite CLI exports:
 * 1. Takes .aseprite files from assets/refined/scenes/
 * 2. Exports them as PNG files using Aseprite CLI
 * 3. Saves optimized images to assets/final/scenes/
 * 4. Updates scene data with final assets
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
    asepriteDir: path.join(projectRoot, 'assets', 'refined', 'scenes'),
    finalDir: path.join(projectRoot, 'assets', 'final', 'scenes'),
    asepritePath: process.env.ASEPRITE_PATH || 'aseprite', // Path to Aseprite executable
    exportSettings: {
        format: 'png',
        scale: 1,
        sheet: false, // Export individual frames
        splitLayers: false,
        splitTags: false
    }
};

/**
 * Check if Aseprite is available
 */
async function checkAseprite() {
    try {
        await execAsync(`${CONFIG.asepritePath} --version`);
        console.log('✅ Aseprite CLI found');
        return true;
    } catch (error) {
        console.log('❌ Aseprite CLI not found');
        console.log('   Please install Aseprite and add it to your PATH');
        console.log('   Or set ASEPRITE_PATH environment variable');
        return false;
    }
}

/**
 * Export a single .aseprite file
 */
async function exportAsepriteFile(filename) {
    const inputPath = path.join(CONFIG.asepriteDir, filename);
    const outputName = path.parse(filename).name;
    const outputPath = path.join(CONFIG.finalDir, `${outputName}.png`);
    
    if (!fs.existsSync(inputPath)) {
        console.log(`❌ Aseprite file not found: ${filename}`);
        return null;
    }
    
    console.log(`🔄 Exporting: ${filename}`);
    
    try {
        // Build Aseprite command
        const command = [
            CONFIG.asepritePath,
            '--batch',
            `--sheet ${outputPath}`,
            `--format ${CONFIG.exportSettings.format}`,
            `--scale ${CONFIG.exportSettings.scale}`,
            inputPath
        ].join(' ');
        
        await execAsync(command);
        console.log(`✅ Exported: ${outputName}.png`);
        return outputName;
    } catch (error) {
        console.log(`❌ Export failed for ${filename}: ${error.message}`);
        return null;
    }
}

/**
 * Export all .aseprite files in the directory
 */
async function exportAllAsepriteFiles() {
    const asepriteFiles = fs.readdirSync(CONFIG.asepriteDir)
        .filter(file => file.endsWith('.aseprite'));
    
    if (asepriteFiles.length === 0) {
        console.log('❌ No .aseprite files found in assets/refined/scenes/');
        console.log('   Please add .aseprite files to export');
        return [];
    }
    
    console.log(`📁 Found ${asepriteFiles.length} .aseprite files`);
    
    const exportedFiles = [];
    for (const file of asepriteFiles) {
        const result = await exportAsepriteFile(file);
        if (result) {
            exportedFiles.push(result);
        }
    }
    
    return exportedFiles;
}

/**
 * Update scene data with final assets
 */
function updateSceneData(exportedFiles) {
    const sceneDataFile = path.join(projectRoot, 'src', 'data', 'scenes.js');
    
    if (!fs.existsSync(sceneDataFile)) {
        console.log('❌ Scene data file not found: src/data/scenes.js');
        return;
    }
    
    // Read current scene data
    const sceneDataContent = fs.readFileSync(sceneDataFile, 'utf8');
    
    // Update image paths to use final assets
    const updatedContent = sceneDataContent.replace(
        /image: '([^']+)\.png'/g,
        (match, imageName) => {
            if (exportedFiles.includes(imageName)) {
                return `image: '${imageName}.png'`;
            }
            return match;
        }
    );
    
    fs.writeFileSync(sceneDataFile, updatedContent);
    console.log(`📝 Updated scene data with final assets`);
}

/**
 * Create export report
 */
function createExportReport(exportedFiles) {
    const reportPath = path.join(projectRoot, 'docs', 'export_report.md');
    const reportContent = `# Aseprite Export Report

## Export Summary
- **Date**: ${new Date().toISOString()}
- **Files Exported**: ${exportedFiles.length}
- **Source Directory**: assets/refined/scenes/
- **Output Directory**: assets/final/scenes/

## Exported Files
${exportedFiles.map(file => `- ${file}.png`).join('\n')}

## Next Steps
1. Test the exported assets in Phaser: \`npm run dev\`
2. Verify image quality and sizing
3. Update scene data if needed
4. Commit changes to version control

## Notes
- All images exported as PNG format
- Scale factor: ${CONFIG.exportSettings.scale}x
- Individual frames exported (not sprite sheets)
`;

    fs.writeFileSync(reportPath, reportContent);
    console.log(`📊 Export report created: docs/export_report.md`);
}

/**
 * Main export function
 */
async function main() {
    console.log('🚀 Starting Aseprite export...');
    
    // Check if Aseprite is available
    const asepriteAvailable = await checkAseprite();
    if (!asepriteAvailable) {
        return;
    }
    
    // Ensure output directory exists
    if (!fs.existsSync(CONFIG.finalDir)) {
        fs.mkdirSync(CONFIG.finalDir, { recursive: true });
    }
    
    // Export all .aseprite files
    const exportedFiles = await exportAllAsepriteFiles();
    
    if (exportedFiles.length === 0) {
        console.log('❌ No files were exported');
        return;
    }
    
    // Update scene data
    updateSceneData(exportedFiles);
    
    // Create export report
    createExportReport(exportedFiles);
    
    console.log(`✅ Export complete! ${exportedFiles.length} files exported`);
    console.log(`📁 Final assets: assets/final/scenes/`);
    console.log(`🎮 Run 'npm run dev' to test in Phaser`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { exportAsepriteFile, exportAllAsepriteFiles };
