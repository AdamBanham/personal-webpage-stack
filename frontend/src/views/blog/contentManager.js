import { exogenousContent } from "./exogenousdata/content"
import { phdContent } from "./phd/content"
import { vispmContent } from "./vispm/content"

const allContent = exogenousContent.concat(phdContent).concat(vispmContent)

class ContentManager {

    constructor(content){
        this.content = content;
        this.visible = content;
    }

    getTitles() {
        return this.visible.map( e => e.title)
    }

    getYears() {
        return new Set(this.visible.map( e => e.year))
    }

    getMonths() {
        return new Set(this.visible.map( e => e.month))
    }

    getAuthors() {
        return new Set(this.visible.map(e => e.authors).reduce( (p, c) => p.concat(c)))
    }

    getInfo() {
        return this.visible
    }

}

const manager = new ContentManager(allContent)

export {
    manager
}