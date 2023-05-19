const { validatePath, lookForMD, readAllMD } = require('./logic');

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  const resultPath = validatePath(path)
  if(resultPath==='err'){
    reject('Error: La ruta no existe :(');
  }
  const filesMD = lookForMD(resultPath)
  readAllMD(filesMD)
  .then((res)=>{
    resolve(res.flat())
  })
  .catch((err)=> {
    reject(err);
  })
  
});

module.exports = mdLinks;

    