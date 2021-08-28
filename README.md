# Interactive-GoL
An interactive version of Conway's Game of Life




## What to do next...

- dynamically resize canvas and grid on window resize
    - if possible we don't want to destroy current cells on resize

- debug draw and canvas so we don't see any lines/outlines / cells are cleaner
- create container div/section to have canvas in
    - canvas should be centered
    - canvas should be width math.floor(window width / resolution)
        - e.g. cells should be resolution wide - not resolution + remainder

- Trial mouse activacting 4 squares
    - this might be a togglable setting that users can play with later
- Trial mouse cells living for N generations before being a) affected by GoL logic, or b) being able to die
    - again, these might be settings later

- add settings menu with hover expand
    - start adding settings
        - resolution
        - reset
        - game speed
        - the options from the trails above
        - the canvas  width and height?