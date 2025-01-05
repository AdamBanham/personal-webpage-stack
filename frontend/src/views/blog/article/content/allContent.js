import content2024 from "./2024"
import phdcontent from "./phdcontent";

const allcontent = []
    .concat(phdcontent.content)
    .concat(content2024);
var contentkeys = []
var contentDict = {}

for(let i in allcontent){
    var cont = allcontent[i]
    if (cont.id in contentDict){
        throw Error("Found duplicated article id :: "+cont.id)
    }
    contentDict[cont.id] = cont;
    contentkeys.push(cont.id)
}

export default {
    contentDict,
    contentkeys
}