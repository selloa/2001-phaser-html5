#!/usr/bin/env node

/**
 * PixelLab AI Batch Conversion Script - HIBERNATED
 * 
 * This script was designed to automate the conversion of JPG reference images 
 * to pixel art using the PixelLab AI API. However, the required image-to-pixel-art
 * conversion endpoint is not yet available in the PixelLab AI API.
 * 
 * STATUS: HIBERNATED - Waiting for PixelLab AI to add image conversion endpoints
 * 
 * The script is kept here for future use when the API supports this functionality.
 * Currently, PixelLab AI only supports generating new pixel art from text descriptions,
 * not converting existing images to pixel art style.
 * 
 * Usage (when API supports it):
 * 1. Set your PIXELLAB_API_KEY in a .env file
 * 2. Place JPG images in assets/source/reference/
 * 3. Run: npm run pixellab:batch
 */

import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
    inputDir: path.join(__dirname, '..', 'assets', 'source', 'reference'),
    outputDir: path.join(__dirname, '..', 'assets', 'source', 'pixelart'),
    supportedFormats: ['.jpg', '.jpeg'],
    apiEndpoint: 'https://api.pixellab.ai/v2/inpaint',
    maxRetries: 0, // No retries - API is reliable
    retryDelay: 0, // No retry delay needed
};

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// HIBERNATION CHECK - Prevent script from running
console.log('⚠️  PixelLab AI Batch Conversion Script is HIBERNATED');
console.log('   Reason: Image-to-pixel-art conversion endpoint not yet available');
console.log('   Status: Waiting for PixelLab AI to add this functionality');
console.log('   Current API only supports text-to-pixel-art generation');
console.log('');
console.log('   This script will be reactivated when the API supports image conversion.');
console.log('   For now, please use manual pixel art creation or other tools.');
process.exit(0);

const API_KEY = process.env.PIXELLAB_API_KEY;

if (!API_KEY || API_KEY === 'your_pixellab_api_key_here') {
    console.error('❌ Please set your PIXELLAB_API_KEY in the .env file');
    process.exit(1);
}

/**
 * Ensure directory exists, create if it doesn't
 */
async function ensureDirectoryExists(dirPath) {
    try {
        await fs.access(dirPath);
    } catch (error) {
        console.log(`📁 Creating directory: ${dirPath}`);
        await fs.mkdir(dirPath, { recursive: true });
    }
}

/**
 * Get all JPG files from input directory
 */
async function getImageFiles() {
    try {
        const files = await fs.readdir(CONFIG.inputDir);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return CONFIG.supportedFormats.includes(ext);
        });
        
        if (imageFiles.length === 0) {
            console.log(`⚠️  No JPG files found in ${CONFIG.inputDir}`);
            console.log('   Please place your reference images in the reference folder');
            return [];
        }
        
        console.log(`📸 Found ${imageFiles.length} image(s) to process`);
        return imageFiles;
    } catch (error) {
        console.error(`❌ Error reading input directory: ${error.message}`);
        return [];
    }
}

/**
 * Convert image to pixel art using PixelLab AI API
 */
async function convertToPixelArt(imagePath, outputPath) {
    try {
        console.log(`🎨 Converting: ${path.basename(imagePath)}`);
        
        // Read image file and convert to base64
        const imageBuffer = await fs.readFile(imagePath);
        
        // Resize image to 64x64 before sending to API
        const sharp = await import('sharp');
        const resizedBuffer = await sharp.default(imageBuffer)
            .resize(64, 64, { fit: 'cover' })
            .jpeg()
            .toBuffer();
        
        const base64Image = resizedBuffer.toString('base64');
        
        // Create a proper white mask using sharp
        const sharpLib = await import('sharp');
        const whiteMask = await sharpLib.default({
            create: {
                width: 64,
                height: 64,
                channels: 3,
                background: { r: 255, g: 255, b: 255 }
            }
        })
        .png()
        .toBuffer();
        
        const base64Mask = whiteMask.toString('base64');
        
        // Prepare request body according to API documentation
        const requestBody = {
            description: "Convert this image to pixel art style",
            negative_description: "blurry, low quality, non-pixelated",
            image_size: {
                width: 64,
                height: 64
            },
            text_guidance_scale: 3.0,
            inpainting_image: {
                type: "base64",
                base64: base64Image,
                format: "jpeg"
            },
            mask_image: {
                type: "base64", 
                base64: base64Mask,
                format: "png"
            },
            no_background: false,
            isometric: false,
            oblique_projection: false
        };
        
        // Make API request
        const response = await axios.post(CONFIG.apiEndpoint, requestBody, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000, // 60 second timeout
            responseType: 'json'
        });
        
        // Extract base64 image data from response
        if (response.data && response.data.image && response.data.image.base64) {
            const imageData = Buffer.from(response.data.image.base64, 'base64');
            await fs.writeFile(outputPath, imageData);
            console.log(`✅ Saved: ${path.basename(outputPath)}`);
            return true;
        } else {
            console.error(`❌ Invalid response format: ${JSON.stringify(response.data)}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Failed to convert ${path.basename(imagePath)}: ${error.message}`);
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Response: ${error.response.data?.toString()}`);
        }
        return false;
    }
}

/**
 * Main processing function
 */
async function processImages() {
    console.log('🚀 Starting PixelLab AI Batch Conversion');
    console.log('=====================================');
    
    // Ensure directories exist
    await ensureDirectoryExists(CONFIG.inputDir);
    await ensureDirectoryExists(CONFIG.outputDir);
    
    // Get image files
    const imageFiles = await getImageFiles();
    if (imageFiles.length === 0) {
        return;
    }
    
    // Process only the first image for testing
    const imageFile = imageFiles[0];
    const inputPath = path.join(CONFIG.inputDir, imageFile);
    
    // Use the same filename as the reference file, but with .png extension
    const baseName = path.parse(imageFile).name;
    const outputFileName = `${baseName}.png`;
    const outputPath = path.join(CONFIG.outputDir, outputFileName);
    
    console.log(`\n[1/1] Processing: ${imageFile}`);
    console.log(`   Output: ${outputFileName}`);
    
    const success = await convertToPixelArt(inputPath, outputPath);
    const successCount = success ? 1 : 0;
    const failureCount = success ? 0 : 1;
    
    // Summary
    console.log('\n=====================================');
    console.log('📊 Batch Processing Complete!');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failureCount}`);
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
    
    if (successCount > 0) {
        console.log('\n🎉 Your pixel art files are ready!');
    }
}

// Run the script
processImages().catch(error => {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
});
