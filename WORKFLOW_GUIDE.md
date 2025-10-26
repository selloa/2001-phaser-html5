# 2001 Space Odyssey - Demo Workflow Guide

## 🎯 Project Goals
Create a simple demo that demonstrates the full game concept using:
- **Still shots** from movie scenes
- **Readable text** for narrative
- **Hotspot buttons** for interaction simulation
- **No animations** (for now)

## 📁 Recommended Repository Structure

```
2001-phaser-html5/
├── assets/
│   ├── source/                    # Original movie stills
│   │   ├── movie_stills/
│   │   └── reference/
│   ├── processed/                 # Pixellab AI output
│   │   ├── raw_pixel_art/
│   │   └── batch_processed/
│   ├── refined/                   # Aseprite refined versions
│   │   ├── scenes/
│   │   └── characters/
│   └── final/                     # Phaser-ready assets
│       ├── scenes/
│       ├── ui/
│       └── audio/
├── scripts/
│   ├── process_assets.js          # Pixellab AI automation
│   ├── export_aseprite.js         # Aseprite CLI automation
│   └── generate_scenes.js         # Scene data generation
├── src/
│   ├── scenes/
│   ├── data/
│   └── utils/
├── docs/
│   ├── asset_workflow.md
│   ├── scene_design.md
│   └── demo_requirements.md
└── demos/
    ├── v1_basic/                  # Basic demo version
    ├── v2_enhanced/               # Enhanced demo version
    └── final/                     # Final demo
```

## 🔄 Complete Workflow

### **Phase 1: Asset Preparation**
1. **Collect movie stills** → `assets/source/movie_stills/`
2. **Pixellab AI batch processing** → `assets/processed/raw_pixel_art/`
3. **Aseprite refinement** → `assets/refined/scenes/`
4. **Final optimization** → `assets/final/scenes/`

### **Phase 2: Scene Development**
1. **Define scene structure** in `src/data/scenes.js`
2. **Create hotspot interactions** in `src/scenes/GameScene.js`
3. **Test and iterate** with hot reload

### **Phase 3: Demo Assembly**
1. **Assemble key scenes** into coherent demo
2. **Add narrative text** and interactions
3. **Polish and test** final demo

## 🛠️ Tools Integration

### **Pixellab AI → Aseprite → Phaser**
```bash
# 1. Process movie stills with Pixellab AI
npm run process:movie-stills

# 2. Refine in Aseprite (manual)
# 3. Export optimized assets
npm run export:aseprite

# 4. Generate scene data
npm run generate:scenes

# 5. Test in Phaser
npm run dev
```

### **Cursor Integration**
- **Live coding** with Phaser hot reload
- **Asset management** with file watchers
- **Scene data editing** with real-time updates
- **Version control** for different demo iterations

## 📝 Documentation Strategy

### **For Developers**
- **Technical docs** in `/docs/`
- **Code comments** explaining scene logic
- **Asset naming conventions** clearly defined

### **For Stakeholders**
- **Demo walkthrough** with screenshots
- **Game concept** clearly explained
- **Next steps** for full development

## 🎮 Demo Requirements

### **Core Features**
- [ ] 5-7 key scenes from 2001
- [ ] Monolith discovery sequence
- [ ] HAL 9000 interaction
- [ ] Space station scenes
- [ ] Jupiter mission setup

### **Interaction Types**
- [ ] **Examine** - Show detailed descriptions
- [ ] **Navigate** - Move between scenes
- [ ] **Interact** - Trigger responses/events
- [ ] **Collect** - Simulate item gathering

### **Visual Style**
- [ ] **Consistent pixel art** aesthetic
- [ ] **Readable text** overlays
- [ ] **Clear hotspot buttons**
- [ ] **Smooth transitions** between scenes

## 🚀 Getting Started

1. **Set up the workflow**:
   ```bash
   npm run setup:workflow
   ```

2. **Process your first scene**:
   ```bash
   npm run process:scene monolith_discovery
   ```

3. **Test in Phaser**:
   ```bash
   npm run dev
   ```

4. **Iterate and refine** using Cursor's live coding

## 📊 Success Metrics

- **Asset processing time** < 5 minutes per scene
- **Scene loading time** < 2 seconds
- **Demo length** 5-10 minutes
- **Visual consistency** across all scenes
- **Clear narrative flow** from start to finish

This workflow ensures you can quickly prototype, test, and iterate on your 2001 Space Odyssey demo while maintaining professional quality and clear documentation.
