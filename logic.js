const path = require('path')
const fs = require('fs'); 

// Validar que ruta exista y transformar a absoluta
const validatePath = (userPath) => {
    if (!fs.existsSync(userPath)){
        return 'err'
    }
    if(path.isAbsolute(userPath)){
        return userPath
    } else {
        return path.resolve(userPath)
    }
}
// Filtrar si es archivo .md
const arrayMD = []
const lookForMD = (validPath) => {
    if (fs.lstatSync(validPath).isDirectory() === true){
        const data = fs.readdirSync(validPath)
        const childrenPath = data.map(elem => validPath+`/${elem}`)
        childrenPath.forEach(elm => lookForMD(elm))
    } else {
        path.extname(validPath) === '.md' && arrayMD.push(validPath);
    }
    return arrayMD
}
// Leer archivo .md y extraer links
const readMD = (mdPath) => new Promise((resolve, reject) =>  {
    fs.readFile(mdPath, 'utf8', (error, data) => {
        if(error){
            reject('No se encontraron links')
        }
        const er = new RegExp(/\[.*\]\(https?:\/{2}[\w\-.]+\/?.*\)/g)
        const mdContain = data.toString()
        const mdContainMatch = mdContain.match(er)
        if(mdContainMatch === null){
            resolve([])
        }else{
            const mdContainSlice = mdContainMatch.map(elem => {
                const parenthesisLeft = elem.indexOf('(')
                const parenthesisRight = elem.indexOf(')')
                const link = elem.slice(parenthesisLeft+1, parenthesisRight)
                const bracketLeft = elem.indexOf('[')
                const bracketRight = elem.indexOf(']')
                const text = elem.slice(bracketLeft+1, bracketRight)
                return {href: link, text: text, file: mdPath}
            })
        resolve(mdContainSlice)
        }
    });
})
//Extraer los links en todos los .md
const readAllMD = (filesMD) => {
    const arrLinks = filesMD.map(file => {
    return readMD(file)
    })
    return Promise.all(arrLinks)
}

// const http = require('http')

// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8')
//   response.on('data', console.log)
//   response.on('error', console.error)
// }).on('error', console.error)
// readMD(process.argv[2])
module.exports = { validatePath, lookForMD, readAllMD };
