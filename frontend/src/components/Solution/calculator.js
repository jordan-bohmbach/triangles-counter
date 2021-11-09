const math = require('mathjs')

const getVector = (point1, point2) => {
    // accepts takes two points as input
    // returns a vector from point 1 -> point 2
    return [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]]
}

const getVectorMagnitude = (vector) => {
    // accepts a 3 dimensional vector
    // returns the magnitude (used for area)
    return Math.sqrt((vector[0] ** 2) + (vector[1] ** 2) + vector[2] ** 2)
}

const getTriangleArea = (corner1, corner2, corner3) => {
    // accepts an [x, y, z] array for each corner
    // returns the area of the triangle
    let C1C2Vector = getVector(corner1, corner2)
    let C1C3Vector = getVector(corner1, corner3)

    return getVectorMagnitude(math.cross(C1C2Vector, C1C3Vector)) / 2
}

const getObject = (data) => {
    let dataObj = {}
    let splitData = data.split('\n')

    dataObj.type = splitData[0].split(' ')[0]
    dataObj.name = splitData[0].split(' ')[1].split('\r')[0]
    dataObj.facets = []
    
    while(splitData.length){
        if(splitData[0].includes('facet')){
            let normaStr = splitData[0].split('normal')[1]
            let vertex1Str = splitData[2].split('vertex')[1]
            let vertex2Str = splitData[3].split('vertex')[1]
            let vertex3Str = splitData[4].split('vertex')[1]

            dataObj.facets.push({
                'normal':    [parseFloat(normaStr.split(' ')[1]),   parseFloat(normaStr.split(' ')[2]),   parseFloat(normaStr.split(' ')[3])],
                'vertex1': [parseFloat(vertex1Str.split(' ')[1]), parseFloat(vertex1Str.split(' ')[2]), parseFloat(vertex1Str.split(' ')[3])],
                'vertex2': [parseFloat(vertex2Str.split(' ')[1]), parseFloat(vertex2Str.split(' ')[2]), parseFloat(vertex2Str.split(' ')[3])],
                'vertex3': [parseFloat(vertex3Str.split(' ')[1]), parseFloat(vertex3Str.split(' ')[2]), parseFloat(vertex3Str.split(' ')[3])],
            })
            splitData.splice(0, 7)
        } else {
            splitData.splice(0, 1)
        }
    }
    return dataObj
}

const main = async (data) => {
    let dataObject = getObject(data)
    
    let totalArea = 0
    let triangleCount = 0
    
    while (dataObject.facets.length) {
            // there are still facets to add
            let facet = dataObject.facets[0]
            let individualArea = getTriangleArea(facet.vertex1, facet.vertex2, facet.vertex3)
            totalArea += individualArea
            triangleCount++
            dataObject.facets.splice(0,1)
    }

    return {
        triangleCount,
        totalArea
    }
}

export default main