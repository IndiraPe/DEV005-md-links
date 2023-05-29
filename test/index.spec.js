const mdLinks = require('../index');
const pathTest = 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba'
const objPrueba = [
    {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md',
        statusText: 'ok',
        status: 200
    },
    {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md',
        statusText: 'ok',
        status: 200
    },
    {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
        statusText: 'ok',
        status: 200
    },
    {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
        statusText: 'ok',
        status: 200
    }]
    const objPruebaBasic = [
        {
            href: 'https://nodejs.org/es/',
            text: 'Node.js',
            file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md',
        },
        {
            href: 'https://developers.google.com/v8/',
            text: 'motor de JavaScript V8 de Chrome',
            file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\hijo\\ya.md',
        },
        {
            href: 'https://nodejs.org/es/',
            text: 'Node.js',
            file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
        },
        {
            href: 'https://developers.google.com/v8/',
            text: 'motor de JavaScript V8 de Chrome',
            file: 'C:\\Users\\asus\\Documents\\Laboratoria\\DEV005-md-links\\test\\prueba\\si.md',
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
    it('debería resolver un array básico, con validate:false', (done) => {
        mdLinks(pathTest, { validate: false })
            .then(res => {
                expect(res).toEqual(objPruebaBasic);
                done()
            });
    });
    it('debería resolver un array con más datos: status y statusText, con validate:true', (done) => {
        mdLinks(pathTest, { validate: true })
            .then(res => {
                expect(res).toEqual(objPrueba);
                done()
            });
    });
});