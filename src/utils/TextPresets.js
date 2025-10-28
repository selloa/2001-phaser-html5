// Text styling presets for consistent text display across the game
export const TextPresets = {
    // Character speech/dialogue - uses Courier New for retro console feel
    speech: {
        position: 'bottom',
        fontSize: '36px',
        fontFamily: 'Courier New, monospace',
        typewriter: true,
        typewriterSpeed: 115,
        splitCharacterName: true // Enable character name split
    },
    
    // Captions/subtitles - uses Futura Now Inline for modern sci-fi feel
    caption: {
        position: 'bottom',
        fontSize: '36px',
        fontFamily: 'Futura Now Inline, Courier New, monospace',
        typewriter: true,
        typewriterSpeed: 80
    },
    
    // Title text - uses Futura Now Inline for modern sci-fi feel
    title: {
        position: 'custom',
        fontSize: '60px',
        fontFamily: 'Futura Now Inline, Courier New, monospace',
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
