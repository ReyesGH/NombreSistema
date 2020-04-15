
function vectorMap() {
  return {
    restrict: 'A',
    scope: {
      options: '=?',
    },
    link: function(scope, element, attrs) {
      
      $('#vmap').vectorMap({    
                map: 'mx_en',
                width: 980,
                height: 680,
                enableZoom: true,
                showTooltip: true,
                backgroundColor: '',
                borderColor: '#818181',
                borderOpacity: 0.25,
                borderWidth: 1,
                color: '#f4f3f0',
                hoverColor: '#c9dfaf',
                hoverOpacity: null,
                normalizeFunction: 'linear',
                scaleColors: ['#b6d6ff', '#005ace'],
                selectedColor: '#c9dfaf',
                regionsSelectable:true,
                regionStyle:{
                    initial: {
                        fill: '#eee',
                        "fill-opacity": 1,
                        stroke: 'black',
                        "stroke-width": 0.5,
                        "stroke-opacity": 1
                    },
                    hover: {
                        fill: '#000000',
                        "fill-opacity": 0.5,
                        cursor: 'pointer'
                    },
                    selected: {
                        fill: '#aaa'
                    },
                    selectedHover: {
                    }
                },
                regionLabelStyle:{
                    initial: {
                        'font-family': 'Verdana',
                        'font-size': '12',
                        'font-weight': 'bold',
                        cursor: 'default',
                        fill: 'black'
                    },
                    hover: {
                        cursor: 'pointer'
                    }
                },
                onRegionSelected: function(element, code, region)
                {
                  //Aqui val algo :P
                  alert ("info");
                }
            });
      
    }
  };
}

angular
  .module("silPortal")
  .directive('vectorMap', vectorMap)
  


