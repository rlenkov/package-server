const promisify = require('util').promisify
const path = require('path')
const fs = require('fs')
const url = require('url')
const http = require('http')
// const { exec, swpan } = require('child_process')

const readdirp = promisify(fs.readdir)
const statp = promisify(fs.stat)

const resourcesPath = path.join(__dirname, '..', '..', 'resources')

const downloadFileHttpget = (fileUrl, downloadDir = resourcesPath) => {
    const options = {
        host: url.parse(fileUrl).host,
        port: 80,
        path: url.parse(fileUrl).pathname,
    }

    const fileName = url
        .parse(fileUrl)
        .pathname.split('/')
        .pop()

    const newFilePath = path.join(resourcesPath, fileName)
    const file = fs.createWriteStream(newFilePath)

    http.get(options, res => {
        res.on('data', data => {
            file.write(data)
        }).on('end', () => {
            file.end()
            console.log(`${fileName} downloaded to ${downloadDir}`)
        })
    })
}

const listFiles = async (directoryName = resourcesPath, results = []) => {
    let files = await readdirp(directoryName)
    for (let f of files) {
        let fullPath = path.join(directoryName, f)
        let stat = await statp(fullPath)
        if (stat.isDirectory()) {
            await listFiles(fullPath, results)
        } else {
            results.push(fullPath)
        }
    }
    return results
}

module.exports = {
    listFiles,
    downloadFileHttpget,
}
