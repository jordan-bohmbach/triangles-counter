Triangles-Counter

# To set up Locally
1. git clone https://github.com/jordan-bohmbach/triangles-counter
2. cd triangles-counter/frontend 
3. npm install
4. npm start

# Design Decisions
1. Added front-end React App for useability. NPM run the web server and upload a .stl file through the browser
2. Made modular helper functions so math steps are readable
  - getVector (given two points return a vector from point 1 -> point 2)
  - getVectorMagnitude (given a vector return the magnitude of the vector)
  - getTriangelArea (given an [x,y,z] array for 3 corners, return the surface area of the triangel)
3. Parse the .stl file into a local data object. With all the data including the normal vector in a useable format, this provides for extensability
  ```
  {'type' : 'solid',
   'name' : 'simplePart',
   'facets' : [{'normal' : [0, 0, 0],
                'vertex1' : [0, 0, 0],
                'vertex2' : [1, 0, 0],
                'vertex3' : [1, 1, 1]},
                ...
                { ...lastFacet}]
  }
  ```

# Performance improvements
