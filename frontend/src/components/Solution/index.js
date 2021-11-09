import { useState } from "react"
import main from "./calculator"
const fs = require('fs').promises


const Solution = () => {
    const [stl] = useState('')
    const [triangleCount, setTriangleCount] = useState(0)
    const [surfaceArea, setSurfaceArea] = useState(0)

    const processFile = async () => {
        let fileData = fs.readFile(stl, 'utf-8')
        let data = await fileData
        return data
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await processFile(stl)
    }

    let fileReader

    const handleFileRead = (e) => {
        const content = fileReader.result;
        main(content).then(res=>{
            setTriangleCount(res.triangleCount)
            setSurfaceArea(res.totalArea)
        })
    }

    const handleChange = (file) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        try{
            fileReader.readAsText(file)
        } catch (e) {
            console.log('no file uploaded')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="file" onChange={e => handleChange(e.target.files[0])}/>
                </label>
            </form>

            {triangleCount ? <h1>Triangle Count = {triangleCount}</h1> : <h1>Upload a File to count the triangles and surface area</h1>}
            {surfaceArea ? <h1>Total Area = {surfaceArea}</h1>: ''}
        </>
    )
}

export default Solution