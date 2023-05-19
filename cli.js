const mdLinks = require('./index')
const pathUser = process.argv

if(pathUser.includes('--validate')){
    mdLinks(pathUser[2], {validate:true})
    .then((resp) => {
      console.log('thenValidTrue', resp)
    }) 
    .catch((err)=> {
      console.log('catchValidTrue', err)
    })
} else {
    mdLinks(pathUser[2], {validate:false})
    .then((resp) => {
      console.log('thenValidFalse', resp)
    }) 
    .catch((err)=> {
      console.log('catchValidFalse', err)
    })
}


