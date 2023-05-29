const { validatePath, lookForMD, readAllMD, validAllLinks } = require('./logic');

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  const resultPath = validatePath(path)
  if (resultPath === 'err') {
    reject('Error: La ruta no existe :(');
  }
  const filesMD = lookForMD(resultPath)
  readAllMD(filesMD)
    .then((res) => {
      const resFlat = res.flat()
      validAllLinks(resFlat)
        .then(resp => {
          if (option.validate) {
            resolve(resp);
          } else {
            resolve(resFlat)
          }
        })
        .catch(err => {
          reject(err);
        })
    })
    .catch((err) => {
      reject(err);
    })
});

module.exports = mdLinks;

