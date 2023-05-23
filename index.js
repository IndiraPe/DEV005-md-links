const { validatePath, lookForMD, readAllMD, validAllLinks, statsLinks, statsValidateLinks } = require('./logic');

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  const resultPath = validatePath(path)
  if (resultPath === 'err') {
    reject('Error: La ruta no existe :(');
  }
  const filesMD = lookForMD(resultPath)
  readAllMD(filesMD)
    .then((res) => {
      validAllLinks(res.flat())
        .then(resp => {
          if (option.validate && option.stats) {
            resolve(statsValidateLinks(resp));
          } else if (option.stats) {
            resolve(statsLinks(resp));
          } else if (option.validate) {
            resolve(resp);
          } else {
            resolve(res.flat())
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

