// Text styling presets for consistent text display across the game
export const TextPresets = {
    // Character speech/dialogue
    speech: {
        position: 'bottom',
        fontSize: '36px',
        typewriter: true,
        typewriterSpeed: 115,
        splitCharacterName: true // Enable character name split
    },
    
    // Captions/subtitles
    caption: {
        position: 'bottom',
        fontSize: '36px',
        typewriter: true,
        typewriterSpeed: 80
    },
    
    // Title text
    title: {
        position: 'custom',
        fontSize: '60px',
        typewriter: true,
        typewriterSpeed: 100
    }
}

// Helper function to get preset with custom positioning
export function getTextPreset(presetName, customOptions = {}) {
    const preset = TextPresets[presetName]
    if (!preset) {
        console.warn(`Text preset '${presetName}' not found. Using default.`)
        return TextPresets.caption
    }
    
    // Merge preset with custom options
    return { ...preset, ...customOptions }
}
