import { allContent } from "./content/allContent"

class ContentManager {

    constructor(content){
        this.content = content;
        this.visible = content;
        this.filters = []
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

    updateInfo(){
        var ret = []
        for (var cont of this.content){
            var keep = true
            for (var fil of this.filters){
                keep = keep && fil.accepts(cont)
                if (!keep){
                    break
                }
            }
            if (keep){
                ret.push(cont)
            }
        }
        this.visible = ret
    }

    getInfo() {
        return this.visible
    }

    addFilter(mode, value) {
        var fil = new ContentFilter(mode, value)
        this.filters.push(fil)
        this.updateInfo()
    }

    removeFilter(mode, value){
        this.filters = this.filters.filter( (v) => v.mode != mode && v.value != value)
        this.updateInfo()
    }

}

const modes = {
    1 : { name: 'tag' },
    2 : { name: 'years' },
    3 : { name: 'months' },
    4 : { name: 'authors' }
}

class ContentFilter {

    constructor(mode, value) {
        if (mode in modes){
            this.mode = mode 
        } else {
            this.mode = -1
        }
        this.value = value
    }

    accepts(record) {
        if (this.mode > 0){
            switch (this.mode){
                case (1):
                    return record.tags.includes(this.value)
                case (2):
                    return record.year == this.value 
                case (3):
                    return record.month == this.value 
                case (4):
                    return record.authors.includes(this.value)
            }
            return false
        }
        else{
            return true
        }
    }
}

const manager = new ContentManager(allContent)

export {
    manager
}