# Asset Workflow Documentation

## Overview
This document describes the simplified asset creation and processing workflow for the 2001 Space Odyssey demo.

## Workflow Pipeline

```
Movie Still → Processing → Phaser → Demo
     ↓            ↓         ↓        ↓
  Source       Final     Game    Demo
```

## Step-by-Step Process

### 1. Asset Preparation
**Location**: `assets/source/movie_stills/`

- Collect high-quality movie stills from 2001: A Space Odyssey
- Use key scenes: monolith discovery, HAL interface, spaceship interior, etc.
- Save as PNG or JPG files with descriptive names
- Recommended resolution: 1920x1080 or higher

**Naming Convention**:
- `monolith_discovery.jpg`
- `hal_interface.jpg`
- `spaceship_interior.jpg`
- `jupiter_approach.jpg`

### 2. Asset Processing
**Location**: `assets/final/scenes/`

**Processing Steps**:
1. Process movie stills using your preferred image editing tool
2. Optimize for web display (appropriate resolution, file size)
3. Maintain visual consistency across all scenes
4. Save optimized images directly to `assets/final/scenes/`

**Recommended Settings**:
- Format: PNG
- Resolution: 800x600 or similar
- File size: < 500KB per image
- Optimization: Web-optimized compression

### 3. Scene Integration
**Location**: `src/scenes/`

**Integration Steps**:
1. Create or update scene files in `src/scenes/`
2. Load assets from `assets/final/scenes/`
3. Add interactions and narrative text
4. Test changes with hot reload

## File Structure

```
assets/
├── source/
│   ├── movie_stills/          # Original movie stills
│   └── reference/             # Reference materials
└── final/
    ├── scenes/                # Phaser-ready PNG files
    ├── ui/                    # UI elements
    └── audio/                 # Sound effects and music
```

## Development Scripts

### `scripts/generate_scenes.js`
- Generates comprehensive scene data
- Creates demo walkthrough documentation
- Updates package.json scripts

## Quality Guidelines

### Visual Consistency
- **Color Palette**: Use consistent 8-bit color scheme
- **Pixel Size**: Maintain consistent pixel density
- **Style**: Keep 2001 Space Odyssey aesthetic
- **Lighting**: Match scene mood and atmosphere

### Technical Requirements
- **Format**: PNG with transparency support
- **Resolution**: 800x600 (scalable)
- **File Size**: < 500KB per image
- **Optimization**: Web-optimized compression

### Narrative Integration
- **Scene Descriptions**: Clear and engaging
- **Interaction Text**: Descriptive and actionable
- **Narrative Flow**: Logical progression
- **Character Voice**: Consistent with 2001 tone

## Troubleshooting

### Common Issues

**Scene Data Not Updating**:
- Check file permissions
- Verify JSON syntax
- Restart development server

**Asset Loading Issues**:
- Verify file paths are correct
- Check file formats are supported
- Ensure assets are in the correct directory

### Performance Optimization

**Image Optimization**:
- Use appropriate compression
- Optimize color palettes
- Remove unnecessary metadata

**Loading Performance**:
- Implement lazy loading
- Use progressive enhancement
- Cache frequently used assets

## Best Practices

### Development Workflow
1. **Start with high-quality source images**
2. **Process and optimize for web**
3. **Test frequently with hot reload**
4. **Document changes and iterations**
5. **Version control all assets**

### Collaboration
- **Use descriptive file names**
- **Document asset sources and processing**
- **Maintain consistent naming conventions**
- **Share optimization settings and parameters**

### Testing
- **Test on different screen sizes**
- **Verify color accuracy**
- **Check loading performance**
- **Validate interaction flows**

## Next Steps

### Phase 1: Basic Demo
- [ ] Process 5-7 key scenes
- [ ] Create basic interactions
- [ ] Test visual consistency
- [ ] Document workflow

### Phase 2: Enhanced Demo
- [ ] Add more complex interactions
- [ ] Implement scene transitions
- [ ] Add sound effects
- [ ] Polish visual presentation

### Phase 3: Full Game
- [ ] Expand scene library
- [ ] Add character animations
- [ ] Implement game mechanics
- [ ] Create full narrative

This simplified workflow ensures consistent, high-quality assets while maintaining development efficiency and ease of use.
