export const sceneOrder = [
    'IntroScene',
    'TitleScene',
    'SpinningWheelStation',
    'LanderOnMoon',
    'BowmanAndHAL',
    'PooleEjected',
    'PooleEjected2'
]

export function getNextScene(currentSceneKey) {
    const currentIndex = sceneOrder.indexOf(currentSceneKey)
    if (currentIndex >= 0 && currentIndex < sceneOrder.length - 1) {
        return sceneOrder[currentIndex + 1]
    }
    // Loop back to start or return null
    return sceneOrder[0]
}
