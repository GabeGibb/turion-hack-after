let planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
let size = [10, 0.8, .95, 1, .53, 5, 4, 2, 2, 0.5]
let defaultSize = window.innerWidth / 30;
console.log(defaultSize)

let planetsDiv = $('#planets')
for (let i = 0; i < planets.length; i++){
    let curPlanet = $('<div class="planet" onclick="location.href = \'planet.html?type=' + planets[i]+'\'"></div>')
    let fileEnd = '.gif'
    if (i == 0){
        fileEnd = '.svg'
    }
    curPlanet.css('background-image', 'url(asset/' + planets[i] + fileEnd +')')
    curPlanet.css('width', defaultSize * size[i] + 'px')
    curPlanet.css('height', defaultSize * size[i] + 'px')
    planetsDiv.append(curPlanet)
}