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
1. File streaming instead of reading
  - The way I have implemented this, when a file is uploaded, the whole thing is read at once by awaiting asynchronous filedata using the fs.promises library. By changing this to a read stream, we could process the data as it is read instead of in one big chunk. For larger .stl files this may have performance benefits.
2. Time Complexity
  - Creating the Data Object
    - In creating the data object, we loop over the data read from the file after splitting on the newlines. The loop is O(N) time complexity, the split is also typically O(N) but since the .stl files are standard and it is a small string, this is effectively O(1). Once we parse out the facet, we splice that data out of the dataobject. Splice is O(N) so the overall time complexity is O(N^2) which will degrade performance for larger stl files.
      - The solution to this is instead of splicing out the data, we sould have an index that we keep track of and increase the size of. Indexing into the array is O(1) so this would reduce the overall time complexity to O(N)
  - Calculating triangle count and total area from the Data Object
    - Same as the creation of the data object, this is O(N^2) time complexity because the implementation loops over the facets in the dataObject and then splices them out in the loop.
      - The solution again is the re-factor and make a variable to keep track of the index so that we can index into the facets array in O(1) time making the overall solution O(N).

3. O(N) time complexity is the best that can be achieved for this because the solution will always need to process every facet so the solution time will always be proportional to the number of facets.
4. Space complexity could be reduced by not creating the dataObject, however, the dataObject makes the code much more extensible because we have all of the information available to us in a nicely structured JavaScript object.
