const promisify = require('util').promisify
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const url = require('url')
const http = require('http')
const archiver = require('archiver')

const readdirp = promisify(fs.readdir)
const statp = promisify(fs.stat)
const mkdir = promisify(fs.mkdir)

const resourcesPath = path.join(__dirname, '..', '..', 'resources')

const getSessionDir = async () => {
    const sessionNameId = new Date().valueOf()
    const sessionPath = path.join(resourcesPath, `session_${sessionNameId}`)
    console.log(`Session id: ${sessionNameId}`)
    if (!fs.existsSync(sessionPath)) {
        await mkdir(sessionPath)
        return sessionPath
    }
}

const downloadFile = async (fileUrl, downloadDir = resourcesPath) => {
    const fileName = url
        .parse(fileUrl)
        .pathname.split('/')
        .pop()
    const newFilePath = path.join(downloadDir, fileName)
    const writer = fs.createWriteStream(newFilePath)

    const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream',
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            console.log(`${fileName} downloaded to ${downloadDir}`)
            resolve()
        })
        writer.on('error', reject)
    })
}

const zipDirectory = async source => {
    const archive = archiver('zip', { zlib: { level: 9 } })
    const stream = fs.createWriteStream(`${source}.zip`)

    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', err => reject(err))
            .pipe(stream)

        stream.on('close', () => resolve(`${source}.zip`))
        archive.finalize()
    })
}

// const downloadFileHttpget = (fileUrl, downloadDir = resourcesPath) => {
//     const options = {
//         host: url.parse(fileUrl).host,
//         port: 80,
//         path: url.parse(fileUrl).pathname,
//     }

//     const fileName = url
//         .parse(fileUrl)
//         .pathname.split('/')
//         .pop()

//     const newFilePath = path.join(downloadDir, fileName)
//     const file = fs.createWriteStream(newFilePath)

//     http.get(options, res => {
//         res.on('data', data => {
//             file.write(data)
//         }).on('end', () => {
//             file.end()
//             console.log(`${fileName} downloaded to ${downloadDir}`)
//         })
//     })
// }

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

const getFilesForDir = async (items, path, nodeId) => {
    const filesToGet = items.filter(itm => itm.group_id === nodeId)
    if (fs.existsSync(path) && filesToGet.length !== 0) {
        const promises = filesToGet.map(fileObj => {
            return downloadFile(fileObj.item_url, path)
        })
        await Promise.all(promises)
    }
}

const createDirectories = async (
    rootDir,
    directoryList,
    items,
    currentPath = resourcesPath,
) => {
    const newPath = path.join(currentPath, rootDir.group_name)
    if (!fs.existsSync(newPath)) {
        console.log(`creating directory at: ${newPath}`)
        fs.mkdirSync(newPath)
        await getFilesForDir(items, newPath, rootDir.id)
        const childDirs = directoryList.filter(dir => dir.parent === rootDir.id)
        if (childDirs && childDirs.length !== 0) {
            while (childDirs.length !== 0) {
                const nextDir = childDirs.pop()
                await createDirectories(nextDir, directoryList, items, newPath)
            }
        }
    }
}

const setupDirectoryTree = async (
    rootNode,
    nodes,
    items,
    sessionDirectory = resourcesPath,
) => {
    await createDirectories(rootNode, nodes, items, sessionDirectory)
}

const createPackage = async location => {
    const zipFile = await zipDirectory(location)
    return zipFile
}

module.exports = {
    getSessionDir,
    listFiles,
    setupDirectoryTree,
    createPackage,
}
