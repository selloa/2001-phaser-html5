# PixelLab AI Batch Automation - HIBERNATED

⚠️ **STATUS: HIBERNATED** - This feature is currently not available.

This document explains the automated PixelLab AI batch conversion system that was designed for converting reference images to pixel art. However, this feature is currently hibernated due to API limitations.

## Why This Feature is Hibernated

The PixelLab AI API currently only supports:
- ✅ Generating new pixel art from text descriptions
- ✅ Character creation with multiple directions
- ✅ Animation generation
- ❌ **Converting existing images to pixel art style** (not available)

The required image-to-pixel-art conversion endpoint is not yet available in the PixelLab AI API. This feature will be reactivated when the API supports this functionality.

## Current Status

- **Script**: Hibernated with clear status messages
- **Dependencies**: Kept for future use
- **Documentation**: Updated to reflect hibernated status
- **API Key**: Preserved for future activation

## Setup (For Future Use)

### 1. API Key Configuration

Create a `.env` file in the project root with your PixelLab API key:

```env
PIXELLAB_API_KEY=your_actual_api_key_here
```

**Important:** Never commit your actual API key to version control. The `.env` file is already included in `.gitignore`.

### 2. Directory Structure

The automation uses the following directory structure:

```
assets/source/
├── reference/          # Place your JPG reference images here
└── pixelart/          # Generated pixel art PNGs will be saved here
```

## Usage

### Basic Usage

1. **Place your reference images** in `assets/source/reference/`
   - Supported formats: `.jpg`, `.jpeg`
   - Any number of images can be processed

2. **Run the batch conversion:**
   ```bash
   npm run pixellab:batch
   ```

3. **Find your results** in `assets/source/pixelart/`
   - Files are named: `pixelart_001.png`, `pixelart_002.png`, etc.
   - Sequential numbering based on processing order

### Example Workflow

```bash
# 1. Copy your reference images
cp /path/to/your/reference/images/*.jpg assets/source/reference/

# 2. Run the batch conversion
npm run pixellab:batch

# 3. Check the results
ls assets/source/pixelart/
```

## Features

- **Sequential Processing**: Images are processed one at a time to respect API rate limits
- **Automatic Retry**: Failed conversions are retried up to 3 times with 2-second delays
- **Progress Tracking**: Real-time progress updates and final summary
- **Error Handling**: Failed conversions are skipped, processing continues
- **Directory Management**: Output directory is created automatically if needed

## Output

The script provides detailed console output:

```
🚀 Starting PixelLab AI Batch Conversion
=====================================
📸 Found 5 image(s) to process

[1/5] Processing: reference1.jpg
🎨 Converting: reference1.jpg
✅ Saved: pixelart_001.png

[2/5] Processing: reference2.jpg
🎨 Converting: reference2.jpg
✅ Saved: pixelart_002.png

=====================================
📊 Batch Processing Complete!
✅ Successful: 5
❌ Failed: 0
📁 Output directory: assets/source/pixelart

🎉 Your pixel art files are ready!
```

## Troubleshooting

### Common Issues

1. **"Please set your PIXELLAB_API_KEY in the .env file"**
   - Ensure you've created a `.env` file with your actual API key
   - Check that the key is not set to the placeholder value

2. **"No JPG files found in assets/source/reference"**
   - Place your reference images in the correct directory
   - Ensure files have `.jpg` or `.jpeg` extensions

3. **API Errors**
   - Check your internet connection
   - Verify your API key is valid and has sufficient credits
   - Check PixelLab AI service status

4. **Permission Errors**
   - Ensure the script has write permissions to the output directory
   - Check that the `assets/source/pixelart/` directory exists

### API Rate Limits

The script processes images sequentially to avoid hitting rate limits. If you encounter rate limit errors:

- The script will automatically retry failed requests
- Consider processing smaller batches if you have many images
- Check your PixelLab AI account for usage limits

## Technical Details

- **Language**: Node.js with ES modules
- **Dependencies**: `axios`, `form-data`, `dotenv`
- **API**: PixelLab AI REST API
- **Timeout**: 60 seconds per image conversion
- **Retry Logic**: 3 attempts with 2-second delays

## Integration with Game Workflow

The generated pixel art files can be integrated into your existing asset workflow:

1. **Review generated pixel art** in `assets/source/pixelart/`
2. **Process through your existing pipeline** using `npm run process:assets`
3. **Export to game format** using `npm run export:aseprite`
4. **Generate scene data** using `npm run generate:scenes`

This automation significantly reduces the manual effort required for converting reference images to pixel art, allowing you to focus on the creative aspects of your game development.

## Reactivation Instructions

When PixelLab AI adds image-to-pixel-art conversion endpoints:

1. **Remove the hibernation check** in `scripts/pixellab_batch.js` (lines 47-55)
2. **Update the API endpoint** to use the new image conversion endpoint
3. **Test with a single image** to verify functionality
4. **Update this documentation** to reflect the active status
5. **Remove the hibernated status** from the script header

The script is ready to be reactivated with minimal changes when the API supports this functionality.
