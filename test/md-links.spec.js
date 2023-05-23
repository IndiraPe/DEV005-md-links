const mdLinks = require('../index');
const { validatePath, lookForMD, readMD } = require('../logic')
const url = 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba'
const mdEmpty = 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\empty.md'

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
//Test en mantenimiento :( ↓
describe('readMD', () => {
  it('debería retornar un mensaje si hay un error al leer el archivo .md en la promesa', () => {
    expect.assertions(1);
    return readMD(`${url}\\siiii.md`).catch(error => {
      expect(error).toBe('Se encontró un error al leer el archivo')
    })
  })
  // it('debería retornar un [] si .md no tiene links ', (done) => {
      
  //     expect(readMD(mdEmpty)).resolves.toStrictEqual([])
  //   done()
  // })
  // it('debería extraer los links del archivo .md', (done) => {
  //   readMD('C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md')
  //   .then(resp => {
  //     expect(resp).toBe([
  //       {
  //         href: 'https://nodejs.org/es/',
  //         text: 'Node.js',
  //         file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\pruebita\\si.md'
  //       },
  //       {
  //         href: 'https://developers.google.com/v8/',
  //         text: 'motor de JavaScript V8 de Chrome',
  //         file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\pruebita\\si.md'
  //       }
  //     ])
  //   })
  //   done()
  // })
})