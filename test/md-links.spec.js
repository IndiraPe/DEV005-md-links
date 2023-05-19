const mdLinks = require('../index');

describe('mdLinks', () => {
  it('debería ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Si no existe un path nos deberia arrojar un error ',  (done) =>{
    mdLinks().catch(error => {
      expect(error).toBe("Error: La ruta no existe :(")
      done()
    })
  })
});
