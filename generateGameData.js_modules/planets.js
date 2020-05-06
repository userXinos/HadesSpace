const mainJs = require('../generateGameData.js')

// создать одну таблицу со всеми планками
function addCommonTable(args) {
    let compileOne = mainJs.compileOne
    let stars = args.categories
    let raw = args.rawData

    for (let star in stars) {
        let obj = {}
        let planets = stars[star]
        for (let planet of planets) {
            obj[planet] = raw[planet]
        }
        raw[star + 'Table'] = compileOne(obj)
    }
    return raw
}

exports.default = addCommonTable 