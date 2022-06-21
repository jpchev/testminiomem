const http = require('http')
const Minio = require('minio')

function MinioCustomStorage() { }

MinioCustomStorage.prototype.getMinioClient = function getMinioClient(token, cb) {
    const minioClient = new Minio.Client({
                        endPoint: 'localhost',
                        port: 9000,
                        accessKey: "admin",
                        secretKey: "ChangezMoi",
                        useSSL: false
                    })

    cb(null, minioClient)
}

MinioCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    this.getMinioClient("", (err, minioClient) => {
        try {
            if (err) {
                res.json({ 'success': false, 'message': err })
            }
            var originalname = file.originalname.split(' ');
            const fileName = originalname.join('_');
            let used = process.memoryUsage()
            for (let key in used) {
                console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
            }
            minioClient.putObject(req.params.bucket, fileName, file.stream, (err, objInfo) => {
                if (err) {
                    console.log(err)
                    return cb(err, {})
                }
                let used = process.memoryUsage()
                for (let key in used) {
                    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
                }
                return cb(null, {})
            });
        } catch (err) {
            console.log(err)
            return cb(err, {})
        }
    })
}

MinioCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    fs.unlink(file.path, cb)
}

module.exports = function (opts) {
    return new MinioCustomStorage(opts)
}