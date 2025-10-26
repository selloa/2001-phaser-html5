# 2001: A Space Odyssey - Pixel Art Adventure Demo

A comprehensive development toolkit for creating a 2D pixel art adventure game inspired by 2001: A Space Odyssey. Features automated asset processing, scene management, and interactive demo creation.

## 🎯 Project Overview

This project provides a complete workflow for creating pixel art adventure games using:
- **Pixellab AI** for automated movie still processing
- **Aseprite** for pixel art refinement and export
- **Phaser.js** for interactive game development
- **Cursor** for live coding and iteration

## 🚀 Quick Start

### 1. Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Add Your Assets
```bash
# Place movie stills in assets/source/movie_stills/
# Process and optimize images
# Place final assets in assets/final/scenes/
```

### 3. Test Your Demo
```bash
# Start development server
npm run dev
```

## 📁 Project Structure

```
2001-phaser-html5/
├── assets/
│   ├── source/                    # Original movie stills
│   │   ├── movie_stills/          # High-res movie images
│   │   └── reference/             # Reference materials
│   └── final/                     # Phaser-ready assets
│       ├── scenes/                # Optimized PNG files
│       ├── ui/                    # UI elements
│       └── audio/                 # Sound effects
├── scripts/                       # Automation scripts
│   ├── process_assets.js          # Pixellab AI integration
│   ├── export_aseprite.js         # Aseprite CLI automation
│   └── generate_scenes.js         # Scene data generation
├── src/                          # Game source code
│   ├── scenes/                   # Phaser scenes
│   ├── data/                     # Scene data and configuration
│   └── utils/                    # Utility functions
├── docs/                         # Documentation
│   ├── asset_workflow.md         # Complete workflow guide
│   ├── scene_design.md           # Design principles
│   └── demo_walkthrough.md       # Demo documentation
```

## 🛠️ Complete Workflow

### Phase 1: Asset Creation
1. **Collect movie stills** → `assets/source/movie_stills/`
2. **Process and optimize** → `assets/final/scenes/`

### Phase 2: Scene Development
1. **Generate scene data** → `src/data/scenes.js`
2. **Create interactions** → `src/scenes/GameScene.js`
3. **Test and iterate** → Hot reload development

### Phase 3: Demo Assembly
1. **Assemble key scenes** → Coherent narrative flow
2. **Add interactions** → Player choices and responses
3. **Polish and test** → Final demo version

## 🎮 Demo Features

### Core Functionality
- **Still Shots**: High-quality pixel art scenes from 2001
- **Readable Text**: Clear narrative and interaction text
- **Hotspot Buttons**: Interactive text options for player choices
- **Scene Transitions**: Smooth movement between locations
- **Narrative Flow**: Story-driven gameplay experience

### Visual Style
- **Pixel Art**: Consistent 8-bit aesthetic
- **Color Palette**: Black, white, grays with accent colors
- **Atmospheric Lighting**: Dramatic and mood-setting
- **Cinematic Composition**: Movie-inspired framing

### Interaction Types
- **Examine**: "Look closely at the monolith"
- **Interact**: "Touch the mysterious object"
- **Navigate**: "Return to the spaceship"
- **Ask**: "Ask HAL about the mission"
- **Use**: "Check the ship's systems"

## 📚 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Asset Processing
```bash
# Manual asset processing and optimization
# Place final assets in assets/final/scenes/
```

## 🎨 Asset Workflow

### 1. Movie Still Collection
- Collect high-quality stills from 2001: A Space Odyssey
- Save as PNG/JPG in `assets/source/movie_stills/`
- Use descriptive names: `monolith_discovery.jpg`

### 2. Asset Processing
- Process and optimize images for web
- Maintain consistent visual style
- Optimize file sizes for performance
- Save final assets in `assets/final/scenes/`

### 3. Phaser Integration
- Direct integration with game scenes
- Hot reload for instant testing
- Interactive text system
- Scene transition management

## 📖 Documentation

### Technical Docs
- **Asset Workflow**: Complete processing pipeline
- **Scene Design**: Design principles and guidelines
- **API Reference**: Script documentation and usage

### Demo Docs
- **Walkthrough**: Step-by-step demo guide
- **Scene Descriptions**: Detailed scene information
- **Interaction Guide**: Player choice explanations

## 🔧 Configuration

### Environment Variables
```bash
# No special environment variables required
```

### Scene Data
Edit `src/data/scenes.js` to modify:
- Scene descriptions and narrative
- Player interaction options
- Scene transitions and flow
- Visual and audio settings

## 🎯 Demo Scenes

### Key Scenes
1. **Monolith Discovery** - First encounter with the mysterious monolith
2. **Monolith Response** - Touching the monolith triggers a reaction
3. **Spaceship Interior** - Inside the Discovery One spaceship
4. **HAL Interface** - Interacting with HAL 9000 computer
5. **Jupiter Approach** - Journey to the gas giant

### Scene Features
- **Narrative Text**: Story context and atmosphere
- **Interactive Options**: Meaningful player choices
- **Visual Consistency**: Unified pixel art style
- **Smooth Transitions**: Seamless scene changes

## 🚀 Next Steps

### Phase 1: Basic Demo
- [ ] Process 5-7 key scenes
- [ ] Create basic interactions
- [ ] Test visual consistency
- [ ] Document workflow

### Phase 2: Enhanced Demo
- [ ] Add complex interactions
- [ ] Implement scene transitions
- [ ] Add sound effects
- [ ] Polish presentation

### Phase 3: Full Game
- [ ] Expand scene library
- [ ] Add character animations
- [ ] Implement game mechanics
- [ ] Create full narrative

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Follow coding standards
4. Test thoroughly
5. Submit pull request

### Asset Guidelines
- Use consistent naming conventions
- Follow color palette guidelines
- Maintain visual consistency
- Document processing steps

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Phaser.js** - Game development framework
- **Aseprite** - Pixel art creation tool
- **Pixellab AI** - Automated pixel art processing
- **2001: A Space Odyssey** - Source material and inspiration

---

**Perfect for prototyping visual styles and game functionality before building the full game!**