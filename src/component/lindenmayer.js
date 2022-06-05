import { useFrame, _roots } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {  Color,BoxBufferGeometry, Matrix4, MeshPhysicalMaterial, Vector3, SphereBufferGeometry } from "three";

const N = new Vector3(0,1,0);
const S = new Vector3(0,-1,0);
const E = new Vector3(1,0,0);
const W = new Vector3(-1,0,0);
const U = new Vector3(0,0,1);
const D = new Vector3(0,0,-1);
const UN = new Vector3(0,2,1);
const US = new Vector3(0,-2,1);
const UE = new Vector3(2,0,1);
const UW = new Vector3(-2,0,1);
const DN = new Vector3(0,2,-1);
const DS = new Vector3(0,-2,-1);
const DE = new Vector3(2,0,-1);
const DW = new Vector3(-2,0,-1);
var stack = [];
var curr ; 
var d = 1;
var boxes = [];
const boxgeometry = new BoxBufferGeometry();
const boxmat = new MeshPhysicalMaterial();
boxmat.color = new Color(0xff0000);
boxmat.roughness= 0;
const stairmat = new MeshPhysicalMaterial();
//stairmat.color = new Color(0x009150);
stairmat.color = new Color(0x123456);
stairmat.roughness=0;
const spheregeometry = new SphereBufferGeometry(0.5,20,20);
const spheremat = new MeshPhysicalMaterial();
//spheremat.color = new Color(0x00ffff);
spheremat.color = new Color(0x0fab1b);
spheremat.roughness = 0;

const Koch_curve ={rules:{"F":"F+F-F-F+F"},axiom:"F"}
const Dragon_curve={rules:{"F":"F+G","G":"F-G"},axiom:"F"}
const chinese_temple={rules:{"F":"FF","G":"F[+G]-G"},axiom:"G"}
const antenna = {rules:{"F":"F/F","G":"F[+G]-G"},axiom:"G"}
const rules_set = {"k":Koch_curve,"c":chinese_temple,"d":Dragon_curve,"a":antenna}

const atod = {
    "N":{"F":"N","+":"W","-":"E","B":"S","/":"N","G":"N","\\":"N","O":"N","U":"N","D":"N"},
    "E":{"F":"E","+":"N","-":"S","B":"W","/":"E","G":"E","\\":"E","O":"E","U":"E","D":"E"},
    "W":{"F":"W","+":"S","-":"N","B":"E","/":"W","G":"W","\\":"W","O":"W","U":"W","D":"W"},
    "S":{"F":"S","+":"E","-":"W","B":"N","/":"S","G":"S","\\":"S","O":"S","U":"S","D":"S"},
}

const atov = {
    "N":{"F":"N","+":"W","-":"E","B":"S","/":"UN","G":"N","\\":"DN","O":"N","U":"U","D":"D"},
    "E":{"F":"E","+":"N","-":"S","B":"W","/":"UE","G":"E","\\":"DE","O":"E","U":"U","D":"D"},
    "W":{"F":"W","+":"S","-":"N","B":"E","/":"UW","G":"W","\\":"DW","O":"W","U":"U","D":"D"},
    "S":{"F":"S","+":"E","-":"W","B":"N","/":"US","G":"S","\\":"DS","O":"S","U":"U","D":"D"}
}

const dtov = {
    "N": N, "E":E, "W":W, "S":S, "UN":UN,"UE":UE,"UW":UW,"US":US, "U":U,
    "DN":DN,"DE":DE,"DW":DW,"DS":DS, "D":D
}

function getPositionFromIndex(i,j,k){
    const position = new Vector3()
    position.set(i,j,k).multiplyScalar(d);
    return position
}

function drawBox(i,j,k,key){
    return (<mesh key={key} position={getPositionFromIndex(i,j,k)} geometry={boxgeometry} material={boxmat}/>)
}

function drawBlob(i,j,k,key){
    return (<mesh key={key} position={getPositionFromIndex(i,j,k)} geometry={spheregeometry} material={spheremat}/>)
}

const Upstair = ({i,j,k,dir})=>{
    const ref= useRef();
    const ref2=useRef();
    const ref3=useRef();
    let stairgeometry = new BoxBufferGeometry();

    useEffect(()=>{
  
        const shear = new Matrix4();
        shear.makeShear(0,0,0,1,0,0);
        const tran = new Matrix4();
        tran.makeTranslation(0,0,d/2);
        shear.multiply(tran);
        tran.makeTranslation(0,-d,0);
        shear.multiply(tran);
        if(dir==="N")
        ref2.current.rotation.z = 0;
        if(dir==="S")
        ref2.current.rotation.z=Math.PI;
        if(dir==="E")
        ref2.current.rotation.z=-Math.PI/2;
        if(dir==="W"){
        ref2.current.rotation.z=Math.PI/2;

        }
        stairgeometry.applyMatrix4(shear);
        ref2.current.position.set(i*d,j*d,k*d);
        ref3.current.position.set(i*d,j*d,k*d);
       }
       )

    return (<>
    <mesh ref={ref2} material={stairmat} geometry={stairgeometry}></mesh>
    <mesh ref={ref3} material={stairmat}><boxBufferGeometry args={[d,d,d]}/></mesh>
    </>)
}
function drawStair(i,j,k,dir,key){
 
    return (<Upstair key={key} i={i} j={j} k={k} dir={dir}/>)
}

function step(action,b){

    try{
        if(action==="["){
            const temp = {position:curr.position.clone(),dir:curr.dir};
            stack.push(temp);
            return;
        }
    
        if(action==="]"){
            curr = stack.pop()
            return;
        }

        curr.position.add(dtov[atov[curr.dir][action]]);

    
        curr.dir = atod[curr.dir][action]
        let type="flat";
        if(action==="/")
            type="upstair"
        if(action==="O")
            type ="blob"
        b.push({pos:curr.position.clone(),type:type,dir:curr.dir});
    } catch(e){
        console.log(e);
    }

}

var items= ["F","L","R","B","U"];

function generatePath(){
    let path = "";
    for (let i=0;i<100;i++){
        path+= items[Math.floor(Math.random() * 5)];
    }
    return path;
}

function Lsystem(preset,iteration){
    //const rules = Dragon_curve.rules;
    //const axiom = Dragon_curve.axiom;
    const rules= rules_set[preset].rules;
    const axiom= rules_set[preset].axiom;
    var path = axiom;
    for(let i=0;i<iteration;i++){
        var temp_path="";
        for(let j=0;j<path.length;j++){
            if (path[j] in rules){
                temp_path+=rules[path[j]];
            }
            else
                temp_path+=path[j];
        } 
        path = temp_path;
    } 
    return path;
}

function Lsystem_custom(custom,iteration){

    if(custom){
    const rules= custom.rules;
    const axiom= custom.axiom;


    var path = axiom;
    for(let i=0;i<iteration;i++){
        var temp_path="";
        for(let j=0;j<path.length;j++){
            if (path[j] in rules){
                temp_path+=rules[path[j]];
            }
            else
                temp_path+=path[j];
        } 
        path = temp_path;
    } 
     return path;
    }
    return "";

}

const Lindenmayer = ({preset,custom_rules,iteration})=>{
 
        boxes=[];
        stack = [];
        curr = {position:new Vector3(0,0,0),dir:"N"};
        //let path = "FFFF[RFFFU[UUFRLF]FUFURFLFFRFFLLLRRUFFUUR]LFFFFRFF[[FUL]FULRFU]FFURLFUURLFF";
        //let path = generatePath();
        var path;
        if(preset!=="custom")
            path = Lsystem(preset,iteration);
        else
             path = Lsystem_custom(custom_rules,iteration);

        console.log(path);
        for(let i=0;i<path.length;i++){
            step(path[i],boxes);
        }


    return(
        <>
        {
        boxes.map((b,key)=>{
            if(b.type==="flat") 
            {return drawBox(b.pos.x,b.pos.y,b.pos.z,key);}
            else if(b.type==="upstair")
            {return drawStair(b.pos.x,b.pos.y,b.pos.z,b.dir,key);}
            else 
            {return drawBlob(b.pos.x,b.pos.y,b.pos.z,key);}}
        )
        }
        </>
    )
  
}

export default Lindenmayer;