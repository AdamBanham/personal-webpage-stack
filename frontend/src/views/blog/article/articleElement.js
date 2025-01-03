
class ArticleStructure {

    constructor(title, id){
        this.title = title;
        this.id = id;
        this.components = []
        this.references = []
        this.figures = 0
        this.snippets = 0
        this.quotes = 0
        this.clips = 0
    }

    addTextSection(text){
        this.components.push(
            new TextSection(text)
        )
    }

    addQuote(text, quotee){
        this.quotes += 1
        this.components.push(
            new QuoteSection(text,quotee, this.quotes)
        )
    }

    addReference(reference){
        this.references.push(
            new ReferenceSection(reference)
        )
    }

    addCode(code, lang, label){
        this.snippets += 1
        this.components.push(
            new CodeSection(code, lang, label, this.snippets)
        )
    }

    addFigure(figure, alt){
        this.figures += 1
        this.components.push(
            new FigureSection(figure, alt, this.figures)
        )
    }

    addProfile(name, photo, blur, align){
        this.components.push(
            new ProfileSection(name, photo, blur, align)
        )
    }

    addYoutubeSection(youtube, title, pretext, posttext){
        this.clips += 1
        this.components.push( 
            new YoutTubeVideoSection(youtube, title, pretext, posttext, this.clips)
        )
    }

    getComponents(){
        return this.components
    }

    getReferences(){
        return this.references
    }
}

const compModes = {
    'text' : 1,
    'figure' : 2,
    'quote' : 3,
    'code' : 4,
    'profile': 5,
    'youtube': 6
}

class TextSection {

        constructor(text){
            this.mode = compModes['text']
            this.value = '<p> '+text+' </p>'
        }
}

class FigureSection {

    constructor(filepath, alt, count){
        this.mode = compModes['figure']
        this.path = filepath
        this.alt = alt
        this.count = count
    }
}

class QuoteSection {

    constructor(quote, quotee, count){
        this.value = quote 
        this.label = quotee
        this.mode = compModes['quote']
        this.count = count
    }
}

class CodeSection {

    constructor(code, lang, label, count){
        this.mode = compModes['code']
        this.code = code 
        this.lang = lang 
        this.label = label
        this.count = count
    }
}

class ReferenceSection {

    constructor(reference){
        this.value = reference
    }
}

class ProfileSection {

    constructor(name, photo, blur, align){
        this.mode = compModes['profile']
        this.name = name
        this.photo = photo 
        this.blur = blur
        if (align == null){
            this.align = "L"
        } else {
            this.align = align
        }
    }
}

class YoutTubeVideoSection {

    constructor(youtube, title, pretext, posttext, clipNo){
        this.mode = compModes['youtube']
        this.youtube = youtube
        this.title = title
        this.pretext = pretext 
        this.posttext = posttext
        this.clipNo = clipNo
    }
}


export {
    ArticleStructure
}