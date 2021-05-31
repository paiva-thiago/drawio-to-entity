const entities = require('./params/entityNames.json')
const props = require('./params/props.json')

const entityFrameworkTemplate = (ef)=>{
    let customUsing = props.usingList.map(i=>'using '+i+';').join('\n')
    return `
using System;
using System.Collections.Generic;
using System.Linq;
${customUsing}

namespace ${props.namespace}
{
    public class ${ef}
    {
`
    }
const upperCaseKeys = (obj)=> {
    let key=''
    let upKey
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            upKey = key.toUpperCase()
            if (upKey !== key) {
                obj[upKey] = obj[key]
                delete(obj[key])
            }
        }
    }
    return obj;
}
    

const attrType = (n)=>{
    let upperTypes = upperCaseKeys(props.types)
    if(n.length<2) return 'var'
    let tp = upperTypes[n.toUpperCase().substr(0,2)]
    return tp == undefined ? 'var' : tp
}    
const temosUmaEntidade = (linha)=>{
    for(let t of entities){
        if (linha.indexOf(t)>-1){
            let n = t.replace(/\"/g,'')
            return [true,n]
        }        
    }
    return [false,'']
}

const entidade = (linha)=>{
    let queroSaber = temosUmaEntidade(linha)
    if(queroSaber[0]){
        return entityFrameworkTemplate(queroSaber[1])
    }
    return ''
}

const beautifyColumn = (col)=>{
    if(col.length<2){
        return col
    }
    if(attrType(col)=='var'){
        return col.substr(0,1).toUpperCase()+col.substr(1).toLowerCase()
    }
    let prefix,sufix    
    prefix =  col.substr(0,1).toUpperCase()+col.substr(1,1).toLowerCase()
    if(col.length==2){
        return prefix
    }
    sufix = col.substr(2,1).toUpperCase()+col.substr(3).toLowerCase()    
    return prefix.concat(sufix)
}

const passarParaEntidade = (linha)=>{
    let temMxCell = linha.indexOf('<mxCell')>-1
    let temValue =  linha.indexOf('value="')>-1
    let naoTemFuncao =  linha.indexOf('()')==-1
    if(temValue && temMxCell && naoTemFuncao){
        let v = entidade(linha)
        if(v!=''){
            return v
        }else{
            let coluna = linha.substr(linha.indexOf('value="')+7)
            coluna = coluna.substr(0,coluna.indexOf('"'))
            if(coluna.trim()!=''){
                return '\n\t public '+attrType(coluna)+' '+beautifyColumn(coluna)+' { get; set; }'
            }else{
                return ''
            }
        }        
    }
    return ''
}
const terminaArquivo = (fs,nomeArquivo,conteudo)=>{
    conteudo = conteudo + '\n\n\t}\n\n}'
    fs.writeFileSync('./cs/'+nomeArquivo+'.cs',conteudo)
    console.log(nomeArquivo+'.cs gerado com sucesso!')
}
module.exports={temosUmaEntidade,passarParaEntidade,terminaArquivo}