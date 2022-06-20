## DEMO
![demo](https://github.com/taroandmulan/voxel-based-L-system-react-three-fiber-/blob/master/src/img/demo.png)
![demo](https://github.com/taroandmulan/voxel-based-L-system-react-three-fiber-/blob/master/src/img/custom.png)

https://frozen-ravine-65087.herokuapp.com/
WARNING : Don't set "ITERATION" above 5 unless you are confident in your GPU power


### `local installation`

git clone https://github.com/taroandmulan/voxel-based-L-system-react-three-fiber-

cd voxel-based-L-system-react-three-fiber-

npm install

npm start

## CUSTOM RULE

Type rule

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

