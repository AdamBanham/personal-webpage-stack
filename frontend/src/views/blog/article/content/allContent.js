import content2024 from "./2024"
import content2025 from "./2025"
import phdcontent from "./phdcontent";

const allcontent = []
    .concat(phdcontent.content)
    .concat(content2024)
    .concat(content2025)
    
const contentkeys = []
const contentDict = {}

for(const i in allcontent){
    const cont = allcontent[i]
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