const fs = require('fs')
const ef = require('./entidera')
const {paramsOk} = require('./validator.js')
paramsOk()
const {dirXmlFile,firstEntityOnXmlFile} = require('./params/props.json')

let from = fs.readFileSync('./xml/'+dirXmlFile+'.xml', {encoding:'utf8', flag:'r'})

let lines = from.split('\n')



let to = ''
let nomePontoCs = ''
for(let l of lines){
    let [entidadeNova,nomeDaEntidade] = ef.temosUmaEntidade(l)
    if( nomePontoCs == '') nomePontoCs = nomeDaEntidade
    if ((entidadeNova)&&(nomeDaEntidade!=firstEntityOnXmlFile)){
        ef.terminaArquivo(fs,nomePontoCs,to)
        nomePontoCs = nomeDaEntidade
        to = ''
    }
    to = to+ef.passarParaEntidade(l)
} 
ef.terminaArquivo(fs,nomePontoCs,to)
console.log('Processo Concluído!')
