const fs = require('fs')
const ef = require('./entidera')
const {paramsOk} = require('./validator.js')
paramsOk()
const {dirXmlFile} = require('./params/props.json')

let from = fs.readFileSync('./xml/'+dirXmlFile+'.xml', {encoding:'utf8', flag:'r'})

let lines = from.split('\n')



let to = ''
let nomePontoCs = ''
for(let l of lines){
    let [entidadeNova,nomeDaEntidade] = ef.temosUmaEntidade(l)
    nomePontoCs = entidadeNova ? nomeDaEntidade : nomePontoCs
    if ((entidadeNova)&&(nomeDaEntidade!='PautaEletronica')){
        ef.terminaArquivo(fs,nomePontoCs,to)
        to = ''
    }
    to = to+ef.passarParaEntidade(l)
} 
ef.terminaArquivo(fs,nomePontoCs,to)
console.log('Processo Concluído!')
