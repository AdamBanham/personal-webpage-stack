
export default function PopupMenuProvider
(create, elementFactory, lassoTool, palette, connect, popupMenu) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._lassoTool = lassoTool;
  this._palette = palette;
  this._connect = connect;
  this._popup = popupMenu

  this._popup.registerProvider('connection-menu',1, this)
  console.log(this._popup)
  }

  PopupMenuProvider.$inject = [
    'create',
    'elementFactory',
    'lassoTool',
    'palette',
    'connect',
    'popupMenu'
  ];

  PopupMenuProvider.prototype.getPopupMenuEntries = function() {
    return {
      createConnection: {
        action: (event, entry) => {
          console.log(event.target);
          console.log(entry.label);

          if (Array.isArray(target)) {
            target.forEach(({ id }) => console.log(id));
          } else {
            console.log(target.id);
          }
        },
        className: 'mdi-arrow-right-thick mdi',
        label: 'connect states'
      }
    };
  }

  PopupMenuProvider.prototype.getHeaderEntries = function(target) {
    return [
      {
        action: (event, entry) => {
          console.log(event.target);
          console.log(entry.title);

          if (Array.isArray(target)) {
            target.forEach(({ id }) => console.log(id));
          } else {
            console.log(target.id);
          }
        },
        active: false,
        className: 'bar',
        id: 'bar',
        imageUrl: 'https://example.com/',
        imageHtml: '<img src="https://example.com/" />',
        label: 'Bar',
        title: 'Bar',
        group: 'bar'
      }
    ];
  }