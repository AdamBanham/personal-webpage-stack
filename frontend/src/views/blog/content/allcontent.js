import phdContent from "./phdcontent"
import auContent from "./aucontent"


var allContent = [].concat(phdContent.content).concat(auContent.content).sort( (a,b) => b.year-a.year)

export {
     allContent
}