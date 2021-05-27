const paramsOk = ()=>{
    const e = require('./params/entityNames.json')

    if(e.constructor.name != 'Array'){
        throw console.error('O JSON entityNames.json DEVE estar no formato de Array!')
    }
    if(e.length==0){
        throw console.error('O JSON entityNames.json precisa ter o nome das Entidades!')
    }
    const p = require('./params/props.json')
    if ( (!p.namespace) || (p.namespace.trim()==='')){
        throw console.error('O atributo \'namespace\' precisa estar presente em props.json!')
    }
    if ( (!p.dirXmlFile) || (p.dirXmlFile.trim()==='')){
        throw console.error('O atributo \'dirXmlFile\' precisa estar presente em props.json!')
    }
}

module.exports = {paramsOk}