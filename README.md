# Interactive-GoL
An interactive version of Conway's Game of Life




## basic outline / to do first

v1 - grid and divs
basic functionality should be cells go black when mouse goes over them
plays out like Conway's game of life

- create grid the size of the screen (no scroll bars)
- changing screen size should resize the grid
    - hardmode: this shouldn't reset all the cells

- create game of life logic with random start
- add mouse hover turns cell live functionality

- add a setting icon (cog) in corner
    - grey circle with cog icon centered
- clicking (or hovering) should increase it's size
    - hardmode: add animation for it 'rolling out'
- settings to incude...
    - setting resolution/grid size 


## GoL standard rules
- if cell is dead and has exactly 3 neighbours alive, it turns alive
- if a cell is alive and has less than 2 or more than 3 (e.g. not 2 or 3) neighbours alive it will die

## Notes
for v1 (grid w/ divs)
- can use int devision and modulo to get cols and rows
- will need to conversion to go both ways e.g. given x,y find cell number, or given cell number find x,y
- just use nested loops at this point :-( in later versions look to use vectors / matrix with convolutions or other more efficient methods, maybe w/ canvas???