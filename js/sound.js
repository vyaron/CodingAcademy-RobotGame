// Sound effects manager
class SoundManager {
    constructor() {
        this.sounds = {
            btn: new Audio('./sound/btn.mp3'),
            right: new Audio('./sound/right.mp3'),
            wrong: new Audio('./sound/wrong.mp3'),
            coins: new Audio('./sound/coins.mp3'),
            drop: new Audio('./sound/drop.mp3'),
            broken: new Audio('./sound/broken.mp3')
        };
        
        // Set volume levels
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;
        });
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            // Clone the audio to allow overlapping sounds
            const sound = this.sounds[soundName].cloneNode();
            sound.volume = this.sounds[soundName].volume;
            sound.play().catch(err => {
                // Ignore errors (usually from user not interacting with page yet)
                console.log('Sound play prevented:', err.message);
            });
        }
    }
    
    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        });
    }
}

export const soundManager = new SoundManager();
