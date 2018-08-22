const path = require('path')
const FileLoader = require('./lib/file_loader')

const fileloader = new FileLoader({directory: path.resolve(__dirname)})

fileloader.load()