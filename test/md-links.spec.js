const mdLinks = require('../index');
const { validatePath, lookForMD, readMD, readAllMD, statsLinks, statsValidateLinks } = require('../logic')
//variables de prueba
const url = 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba'
const mdEmpty = 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\empty.md'
const arrMD = [
  'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
  'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md'
]
const objPrueba = [
{
  href: 'https://nodejs.org/es/',
  text: 'Node.js',
  file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
  statusText: 'ok',
  status: 200
},
{
  href: 'https://nodejs.org/es/',
  text: 'Node.js',
  file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\otro.md',
  statusText: 'ok',
  status: 200
},
{
  href: 'https://developers.google.com/v8/sdfsfdsfs',
  text: 'motor de JavaScript (404)',
  file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
  statusText: 'fail',
  status: 404
}]

describe('mdLinks', () => {
  it('debería ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Si no existe un path nos deberia arrojar un error ',  (done) =>{
    mdLinks().catch(error => {
      expect(error).toBe('Error: La ruta no existe :(')
      done()
    })
  })
});

describe('validatePath', () => {
  it('si la ruta es absoluta, retorna la ruta', () => {
    expect(validatePath(url)).toBe(url)
  })
  it('si la ruta es relativa, debería resolverla en absoluta', () => {
    expect(validatePath('test\\prueba')).toBe(url)
  })
})

describe('lookForMD', () => {
  it('si la ruta es un directorio, debería retornar los archivos .md', () => {
    expect(lookForMD(url)).toStrictEqual(
      ['C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md',
      'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md'
      ]) 
  })
}) 

describe('readMD', () => {
  it('debería retornar un mensaje si hay un error al leer el archivo .md en la promesa', () => {
    return readMD(`${url}\\siiiii.md`)
    .then(() => {
      throw new Error('la promesa se debió rechazar porque no existía')
    })
    .catch(error => {
      expect(error).toBe('Se encontró un error al leer el archivo')
    })
  })
  it('debería retornar un [] si .md no tiene links ', (done) => {
      expect(readMD(mdEmpty)).resolves.toEqual([])
    done()
  })
  it('debería extraer los links del archivo .md', (done) => {
      expect(readMD(`${url}\\si.md`)).resolves.toStrictEqual([
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md'
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md'
        }
      ])
    done()
  })
})

describe('readAllMD', () => {
  it('debería retornar un array de objetos', (done) => {
    readAllMD(arrMD)
    .then(resp => {
      expect(resp).toStrictEqual([
        [{
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md'
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md'
        }],
        [{
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md'
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md'
        }]
      ])
    })
    done()
  })
})

describe('statsLinks', () => {
  it('Debería retornar un objeto con Total e Unique', () => {
    expect(statsLinks(objPrueba)).toStrictEqual({ Total: 3, Unique: 2})
  })
})

describe('statsValidateLinks', () => {
  it('Debería retornar un objeto con Total, Unique y Broken', () => {
    expect(statsValidateLinks(objPrueba)).toStrictEqual({ Total: 3, Unique: 2, Broken: 1 })
  })
})