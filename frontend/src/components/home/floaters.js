export const FloaterTypes = Object.freeze(
    {
    SMALL : 1,
    MEDIUM : 2,
    LARGE : 3,
    }
);

export class FloaterBase
{
    constructor(type) 
    {
        // check that type is a floaterType
        if (!Object.values(FloaterTypes).includes(type)) {
            throw TypeError("Floater type was " + type +" when accepted values are : FloaterType.["+Object.keys(FloaterTypes)+"]");
        }
        // continue to setup
        this.type = null;
        this.orbitsize = null;
        this.zlevel = null;
        this.speed = null;
        this.starsize = null;
        this.startdeg = null;
        this.type =type;
        this.setup(this.type);
    }

    setup(type) 
    {
        switch(type)
        {
            case (FloaterTypes.SMALL):
                {
                    this.small();
                    break;
                }
            case FloaterTypes.MEDIUM:
                {
                    this.medium();
                    break;
                }
            case FloaterTypes.LARGE:
                {
                    this.large();
                    break;
                }
        }
        this.checkSetup();
    }

    small()
    {
        this.orbitsize=Math.random() * 100 + 450;
        this.zlevel=Math.round(Math.random() * 50 + 50);
        this.speed=Math.round(Math.random() * 15 +15);
        this.starsize=Math.random() * 25 + 30;
        this.startdeg=Math.random() * 360;
    }

    medium() 
    {
        this.orbitsize=Math.random() * 100 + 450;
        this.zlevel=Math.round(Math.random() * 50 + 15);
        this.speed=Math.round(Math.random() * 15 + 30);
        this.starsize=Math.random() * 25 + 60;
        this.startdeg=Math.random() * 360;
    }

    large() 
    {
       this.orbitsize=Math.random() * 250 + 450;
       this.zlevel=Math.round(Math.random() * 50 + 15);
       this.speed=Math.round(Math.random() * 15 + 60);
       this.starsize=Math.random() * 25 + 120;
       this.startdeg=Math.random() * 360;
    }

    checkSetup() 
    {
        var unValidated = {};
        var valid = true;
        var checks = ["orbitsize", "zlevel", "speed", "starsize", "startdeg"];
        try 
        {
            for (var check of checks)
            {
                if (!this[check] || this[check] === null || this[check] == undefined)
                {
                    unValidated[check] = this[check];
                    valid = false
                }
            }
            if (!valid)
            {
                throw Error(JSON.stringify(unValidated))
            }
        } 
        catch (err) 
        {
            throw Error("Floater setup can not be validated : " + err.message );
        }
    }
}

export class Floater extends FloaterBase
{
    constructor(type) 
    {
        super(type)
    }
}



export default {
    FloaterTypes,
    Floater
}