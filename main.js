// main.js
import './pluginInfo.js';
import './settingsPanel.js';

const plugin = {
    ...pluginInfo,
    onStart() {
        // Initialization code here
    },
    onStop() {
        // Cleanup code here
    },
    getSettingsPanel({ settings }) {
        return <SettingsPanel settings={settings} />;
    }
};

window.enmity.plugins.registerPlugin(plugin);

// pluginInfo.js
{
    "name": "GlobalBadges",
    "version": "0.1",
    "description": "Adds global badges from other client mods",
    "authors": [
        {
            "name": "marrrrrrrrrrrrrrrrrrrrrrrrrrrr",
            "id": "1246661163354296481"
        }
    ],
    "color": "#E54B4B",
    "rawUrl": "https://raw.githubusercontent.com/marlonalbto18/My-plugin/main/pluginInfo.js
    "sourceUrl": "https://github.com/domi-btnr/Enmity-Stuff/tree/main/GlobalBadges",
    "changelog": [
        "Fixed Badges not appearing on Profiles",
        "Fixed Settings repository button not opening and updated descriptions."
    ],
    "hash": "DEBUG"
}

// settingsPanel.js

const SettingsPanel = ({ settings }) => {
    const [selectedImage, setSelectedImage] = React.useState(settings.get('profileImage') || null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                settings.set('profileImage', reader.result);
                updateProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateProfilePicture = (imageUrl) => {
        const profileBadges = document.querySelectorAll('.profile-badge');
        profileBadges.forEach(badge => {
            badge.style.backgroundImage = `url(${imageUrl})`;
        });
    };

    return (
        <View>
            <Button onPress={() => document.getElementById('fileInput').click()}>
                Upload Profile Picture
            </Button>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 100, height: 100 }}
                />
            )}
        </View>
    );
};
