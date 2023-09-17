
export default function queryMaker (filterObject) {
    let queryString = '?'
    for (let prop in filterObject) {
        if (queryString.at(-1) !== '?') { queryString += '&' } 
        queryString += `${prop}=${filterObject[prop]}`
    }
    return queryString
}