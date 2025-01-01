

export default function CustomConnect(eventBus, modeling){

    var modeling = modeling

    eventBus.on('connect.end', function(event){
        modeling.moveShape(event.context.source, {x: 0 , y: 0})
        modeling.moveShape(event.context.target, {x: 0 , y: 0})
    }, 2000)

}

CustomConnect.$inject = [
    'eventBus',
    'modeling'
];