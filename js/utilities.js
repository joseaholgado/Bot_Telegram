// utilities.js
const { exec } = require('child_process');

function shutdown_computer() {
    if (process.platform === 'win32') { // Windows
        exec('shutdown /s /t 0');
    } else if (process.platform === 'darwin') { // macOS
        exec('sudo shutdown -h now');
    } else if (process.platform === 'linux') { // Linux
        exec('shutdown -h now');
    }
}

module.exports = {
    shutdown_computer
};
