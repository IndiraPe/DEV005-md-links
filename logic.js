const path = require('path')
const fs = require('fs'); 
const axios = require('axios')

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
        const childrenPath = data.map(elem => validPath+`\\${elem}`)
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
            reject('Se encontró un error al leer el archivo')
        }
        const er = new RegExp(/\[.*\]\(https?:\/{2}[\w\-.]+\/?.*\)/g)
        const mdContainMatch = data.match(er)
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
                return { href: link, text: text, file: mdPath }
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
// validar si es un link activo
const validLink = (Objectlink) => {
    return axios.get(Objectlink.href)
        .then(res => {
            const status = res.status
            if(status > 199 && status < 400){
                return { 
                    href:Objectlink.href, 
                    text:Objectlink.text, 
                    file:Objectlink.file, 
                    ok:'ok', 
                    status: status 
                }
            }else{
                return { 
                    href:Objectlink.href, 
                    text:Objectlink.text, 
                    file:Objectlink.file, 
                    ok:'fail', 
                    status: status 
                }
            }
        })
        .catch(error => {
            const statusError = error.response.status
            if(statusError){
                return { 
                    href:Objectlink.href, 
                    text:Objectlink.text, 
                    file:Objectlink.file, 
                    ok:'fail', 
                    status: statusError
                }
            }
        })
}
//validar links en el array de objetos
const validAllLinks = (arrayObject) => {
    const arrayObjectMap = arrayObject.map(elem => {
        return validLink(elem)
    })
    return Promise.all(arrayObjectMap)
}
//stats de los links
const statsLinks = (allObjects) => {
    const total = allObjects.length
    const listUrl = allObjects.map(elem => elem.href)
    const set = new Set(listUrl)
    const unique = set.size
    return { Total:total, Unique:unique }
}
//stats + validate de los links
const statsValidateLinks = (allObjects) => {
    const total = allObjects.length
    const listUrl = allObjects.map(elem => elem.href)
    const set = new Set(listUrl)
    const unique = set.size
    const broken = allObjects.filter(obj => obj.ok === 'fail').length
    return { Total:total, Unique:unique, Broken:broken }
}

module.exports = { validatePath, lookForMD, readAllMD, validAllLinks, readMD, statsLinks, statsValidateLinks };

