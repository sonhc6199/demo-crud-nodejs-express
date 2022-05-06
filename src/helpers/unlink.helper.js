const { unlink } = require('fs/promises');

const unlinkSingleFile = (filePath) => {
    unlink(filePath);
}

const unlinkMultipleFiles = (files) => {
    files.forEach((file) => {
        unlink(file.path);
    });
}


module.exports = {
    unlinkSingleFile,
    unlinkMultipleFiles
}