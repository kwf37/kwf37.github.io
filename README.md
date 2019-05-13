# kwf37.github.io

# Diagramming
Diagrams will have two main abstractions:
* Components
* Connections

## Components
A component will be defined by the following:
* Bounding Box (defined by lower left and upper right corner of box)
* Pins (snap points that lie along the bounding box)
* Parameters (association list of attributes and values)
* Instance Name

## Connections
A connection will be defined by coordinates that snap to pins, are floating, or any intersections of 3 or more lines.

A route will be an abstraction that lies between connections and the actual visualization. The route will be a list of line segments, defined by start and end points, that can then be visualized using a canvas or svg. Routes can be generated from Connections automatically.
