#!/usr/bin/env node
const mdLinks = require('./index')
const { statsLinks, statsValidateLinks } = require('./logic');
const pathUser = process.argv
var colors = require('colors');

if(pathUser.includes('--validate') && pathUser.includes('--stats')){
  mdLinks(pathUser[2], { validate:true, stats:true })
    .then((resp) => {
      const respStatsValidate = statsValidateLinks(resp)
      console.log('');
      console.log('⭑ Total: '.bgCyan.bold,`${respStatsValidate.Total}`);
      console.log('⭑ Unique:'.bgBrightCyan.bold,`${respStatsValidate.Unique}`);
      console.log('⭑ Broken:'.bgCyan.bold,`${respStatsValidate.Broken}`);
      console.log('');
    }) 
    .catch((err)=> {
      console.log(err)
    })
}else if(pathUser.includes('--stats')){
  mdLinks(pathUser[2], { stats:true })
    .then((resp) => {
      const respStats = statsLinks(resp)
      console.log('');
      console.log('⭑ Total: '.bgCyan.bold,`${respStats.Total}`);
      console.log('⭑ Unique:'.bgBrightCyan.bold,`${respStats.Unique}`);
      console.log('');
    }) 
    .catch((err)=> {
      console.log(err)
    })
}else if(pathUser.includes('--validate')){
    mdLinks(pathUser[2], { validate:true })
    .then((resp) => {
      resp.forEach((elem) => {
        console.log('');
        console.log('⭑ Href:      '.bgBlue.bold,`${elem.href}`);
        console.log('⭑ Text:      '.bgBrightBlue.bold,`${elem.text}`);
        console.log('⭑ File:      '.bgBlue.bold,`${elem.file}`);
        console.log('⭑ StatusText:'.bgBrightBlue.bold,`${elem.statusText}`);
        console.log('⭑ Status:    '.bgBlue.bold,`${elem.status}`);
        console.log('');
      });
    }) 
    .catch((err)=> {
      console.log(err)
    })
} else if(pathUser.includes('--help')) {
  console.log(
    `    ─────────────────────────────
    ─────────▄▀▄─────▄▀▄───────── Hola!, utiliza las siguientes opciones para esta librería:
    ────────▄█░░▀▀▀▀▀░░█▄──────── 
    ────▄▄──█░░░░░░░░░░░█──▄▄──── 1. --validate: El status de cada link, si está roto o no, 
    ───█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█───      la ubicación y el texto.
    ───█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█─── 2. --stats: Nro de links y Nro de los que no se repiten.    
    ───█░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗ ░░█─── 3. --validate --stats || --stats --validate: Incluye la   
    ───█░░║║║╠─║─║─║║║║║╠─ ░░█───      información de --stats y el nro de los links rotos.
    ───█░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝ ░░█─── 4. Sin opción: Te brindará por defecto los links encontrados,  
    ───█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█───      su ubicación y el texto.
    ─────────────────────────────`.green
    )

}else {
    mdLinks(pathUser[2], { validate:false })
    .then((resp) => {
      resp.forEach((elem) => {
        console.log('');
        console.log('⭑ Href:'.bgBlue.bold,`${elem.href}`);
        console.log('⭑ Text:'.bgBrightBlue.bold,`${elem.text}`);
        console.log('⭑ File:'.bgBlue.bold,`${elem.file}`);
        console.log('');
      });
    }) 
    .catch((err)=> {
      console.log(err)
    })
}


