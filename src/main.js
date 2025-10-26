import Phaser from 'phaser'
import IntroScene from './scenes/IntroScene.js'
import TitleScene from './scenes/TitleScene.js'
import Scene001 from './scenes/Scene001.js'
import Scene002 from './scenes/Scene002.js'
import Scene003 from './scenes/Scene003.js'
import Scene004 from './scenes/Scene004.js'
import Scene005 from './scenes/Scene005.js'

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 320,
            height: 240
        },
        max: {
            width: 1920,
            height: 1080
        }
    },
            scene: [IntroScene, TitleScene, Scene001, Scene002, Scene003, Scene004, Scene005],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: false
    }
}

const game = new Phaser.Game(config)

// Enhanced window resize handling
let resizeTimeout
window.addEventListener('resize', () => {
    // Debounce resize events to prevent excessive calls
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        
        console.log(`Resizing canvas to: ${newWidth}x${newHeight}`)
        
        // Resize the game
        game.scale.resize(newWidth, newHeight)
        
        // Notify scenes about the resize
        game.scene.getScenes().forEach(scene => {
            if (scene.resize) {
                scene.resize(newWidth, newHeight)
            }
        })
    }, 100) // 100ms debounce
})