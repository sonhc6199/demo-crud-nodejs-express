const { unlink } = require('fs/promises');

const unlinkSingleFile = (file) => {
    unlink(file.path);
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