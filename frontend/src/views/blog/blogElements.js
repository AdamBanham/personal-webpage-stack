import {TAGS} from "./tagList.js";

class BlogInfo {

    constructor(title, overview, content, year, month, authors){
        this.title = title;
        this.overview = overview;
        this.content = content;
        this.year = year;
        this.month = month;
        this.authors = authors;
        this.tags = []
        this.expansion = "todo";
    }

    addTag(tag) {
        if (tag in TAGS){
            this.tags.push(TAGS[tag]);
        } else {
            throw new Error("Unknown Tag presented :: " + tag);
        }
        
    }

    addTags(... tags){
        tags.forEach(
            (tag) => this.addTag(tag)
        )
    }

    addPicture() {
        // TODO
    }

    addExpansionPage(expansionId){
        this.expansion = expansionId
    }

}

export {
    BlogInfo
}