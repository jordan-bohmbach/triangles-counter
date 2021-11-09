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


const main = async (data) => {
    // const data = await processFile('./simple-part.stl')
    // const data = await processFile(file)
    let splitData = data.split('vertex ')
    let totalArea = 0
    let triangleCount = 0

    while (splitData.length) {
        if (!isNaN(parseInt(splitData[0][0]))) {
            // we have found a vertx which will be the first of 3
            let vertex1 = [parseFloat(splitData[0].split(' ')[0]), parseFloat(splitData[0].split(' ')[1]), parseFloat(splitData[0].split(' ')[2])]
            let vertex2 = [parseFloat(splitData[1].split(' ')[0]), parseFloat(splitData[1].split(' ')[1]), parseFloat(splitData[1].split(' ')[2])]
            let vertex3 = [parseFloat(splitData[2].split(' ')[0]), parseFloat(splitData[2].split(' ')[1]), parseFloat(splitData[2].split(' ')[2])]
            let individualArea = getTriangleArea(vertex1, vertex2, vertex3)
            totalArea += individualArea
            triangleCount++
            splitData.splice(0, 3) //splice those 3 verticies out
        } else {
            splitData.splice(0, 1)
        }
    }

    return {
        triangleCount,
        totalArea
    }
}

export default main