const util = require('util');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/../../public/images`));
    },
    filename: (req, file, callback) => {
        const math = ['image/png', 'image/jpeg', 'image/jpg'];
        if (math.indexOf(file.mimetype) === -1) {
            const errorMessage = `The file ${file.originalname} is invalid. Only allowed to upload image jpeg or png or jpg.`;
            return callback(errorMessage, null);
        }
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const uploadManyFiles = multer({ storage: storage }).array('files', 6);

const uploadSingleFile = multer({ storage: storage }).single('file');

const utilMultipleUpload = util.promisify(uploadManyFiles);

const utilSingleleUpload = util.promisify(uploadSingleFile);


// const debug = console.log.bind(console);

const multipleUpload = async (req, res, next) => {

    try {
        
        await utilMultipleUpload(req, res);

        if (req.files.length <= 0) {
            return res.status(400).json({ message: 'You must select at least 1 file or more.' });
        }

        next();

    } catch (error) {

        if (error.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ message: 'Exceeds the number of files allowed to upload.' });

        return res.status(400).json({ message: `Error when trying upload many files: ${error}` });
    }
};

const singleUpload = async (req, res, next) => {
    try {
        await utilSingleleUpload(req, res);

        

        if (!req.file) {
            return res.status(400).json({ message: 'You must select at least 1 file.' });
        }

        next();

    } catch (error) {

        if (error.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ message: 'Exceeds the number of files allowed to upload.' });

        return res.status(400).json({ message: `Error when trying upload single file: ${error}` });
    }
};

module.exports = {
    singleUpload,
    multipleUpload,
};