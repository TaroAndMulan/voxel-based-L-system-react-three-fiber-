# Lsystem in Voxel

In computer science, L-systems are used as a formalism for generating complex structures through a set of rewriting rules. Initially introduced for modeling plant growth, L-systems have found applications in computer graphics, fractal generation, and procedural content generation. They provide a flexible and recursive approach to describing patterns, making them valuable in various computational and artistic domains.


In this project, I created a voxel-based L-system simulator designed for teachers who want to introduce the concept of L-systems to students through 3D graphics. Students can input a list of rules and see the result in minecraft-liked world that can be navigate like in a video game. (Frontend-React/Graphic-ReactThreeFiber)

## DEMO

https://voxel-based-l-system-react-three-fiber.vercel.app/

![demo](https://github.com/taroandmulan/voxel-based-L-system-react-three-fiber-/blob/master/src/img/demo.png)
![demo](https://github.com/taroandmulan/voxel-based-L-system-react-three-fiber-/blob/master/src/img/custom.png)


### `local installation`

git clone https://github.com/taroandmulan/voxel-based-L-system-react-three-fiber-

cd voxel-based-L-system-react-three-fiber-

npm install

npm start

## PRESET RULE

Choose rule 

adjust the slider 

## CUSTOM RULE

Choose "custom" 

adjust the slider 

click generate


## SUPPORT OPERATION

F , G  = forward

O = sphere

/  = stair up 

U,D = up, down

L,R,+,- = left, right, rotate_left, rotate_right

B = back

[,] = save,resume


## EXAMPLE

custom rules

axiom     F

rule1     F- > FF[UUULR]

This will generate a wall

