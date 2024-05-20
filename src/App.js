import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, Environment } from "@react-three/drei";
import Lindenmayer from "./component/lindenmayer";
import RowRadioButtonsGroup from "./component/selector";
import { TextField, Button, Grid, Typography } from "@mui/material";
import DiscreteSliderMarks from "./component/iterationslider";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { GridHelper, Vector3 } from "three";

var axiom = "";
var rule1 = "";
var rule1_r = "";

var rule2 = "";
var rule2_r = "";

var rule3 = "";
var rule3_r = "";

const gridTemplate = new GridHelper(100,100,"teal","teal");
gridTemplate.rotation.x=Math.PI/2;
gridTemplate.position.set(0.5,0.5,0);

function App() {
  const [preset, setPreset] = useState("k");
  const [rules, setRules] = useState();
  const [iteration, setIteration] = useState(1);
  const gridRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setPreset("custom");
    let s = { rules: "", axiom: "" };
    
    if (rule3.length === 0 && rule2.length === 0) {
      s.rules = JSON.parse(`{"${rule1}":"${rule1_r}"}`);
    } else if (rule3.length === 0) {
      s.rules = JSON.parse(`{"${rule1}":"${rule1_r}","${rule2}":"${rule2_r}"}`);
    } else {
      s.rules = JSON.parse(
        `{"${rule1}":"${rule1_r}","${rule2}":"${rule2_r}","${rule3}":"${rule3_r}"}`
      );
    }
    s.axiom = axiom;
    setRules(s);
  }

  function handleSubmit_2() {
    let s = { rules: "", axiom: "" };
    if (rule1.length === 0 && rule2.length === 0 && rule3.length === 0) {
      s = {};
    } else if (rule3.length === 0 && rule2.length === 0) {
      s.rules = JSON.parse(`{"${rule1}":"${rule1_r}"}`);
    } else if (rule3.length === 0) {
      s.rules = JSON.parse(`{"${rule1}":"${rule1_r}","${rule2}":"${rule2_r}"}`);
    } else {
      s.rules = JSON.parse(
        `{"${rule1}":"${rule1_r}","${rule2}":"${rule2_r}","${rule3}":"${rule3_r}"}`
      );
    }
    s.axiom = axiom;
    setRules(s);
  }

  function setrule1(e) {
    rule1 = e.target.value;
  }
  function setrule1_r(e) {
    rule1_r = e.target.value;
  }
  function setrule2(e) {
    rule2 = e.target.value;
  }
  function setrule2_r(e) {
    rule2_r = e.target.value;
  }

  function setrule3(e) {
    rule3 = e.target.value;
  }
  function setrule3_r(e) {
    rule3_r = e.target.value;
  }
  function setaxiom(e) {
    axiom = e.target.value;
  }
  function handleChange(n) {
    setPreset(n);
  }

  function handleSlider(v) {
    setIteration(v);
    handleSubmit_2();
  }

  const ruleStyle = {
    marginTop: "10px",
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div style={{marginTop:"50px",borderStyle:"solid",backgroundColor:"FloralWhite",padding:"15px"}}>
          <Typography align="center"  variant="h6"  gutterBottom>
          PRESET
        </Typography>
            <RowRadioButtonsGroup
              autoComplete="off"
              onChange={handleChange}
              preset={preset}
            />
          </div>

          <div style={{marginTop:"50px",borderStyle:"solid",padding:"15px",backgroundColor:"FloralWhite"}}>
          <Typography align="center" variant="h6" gutterBottom>
          ITERATION
        </Typography> <DiscreteSliderMarks  handleSlider={handleSlider} />
          </div>

          <form  style={{marginTop:"50px",borderStyle:"solid",padding:"15px",backgroundColor:"FloralWhite"}} onSubmit={handleSubmit}>

          <Typography align="center" variant="h6"  gutterBottom>
          CUSTOM RULES
        </Typography> 
            <TextField
              id="outlined-basic"
              label="axiom"
              onChange={setaxiom}
              size="small"
              autoComplete="off"
              style={{marginTop:"10px"}}
            />
            <Button type="submit" variant="contained" style={{marginLeft:"10px",marginTop:"10px"}}>Generate</Button>

            <div style={ruleStyle}>
              <TextField
                id="outlined-basic"
                label="rule1"
                style={{ width: "20%" }}
                autoComplete="off"
                onChange={setrule1}
                size="small"
              />
              <ArrowCircleRightTwoToneIcon
                sx={{ color: "green", marginTop: "1.5%" }}
              />
              <TextField
                id="outlined-basic"
                onChange={setrule1_r}
                size="small"
                autoComplete="off"
              />
            </div>
            <div style={ruleStyle}>
              <TextField
                id="outlined-basic"
                label="rule2"
                style={{ width: "20%" }}
                autoComplete="off"
                onChange={setrule2}
                size="small"
              />
              <ArrowCircleRightTwoToneIcon
                sx={{ color: "green", marginTop: "1.5%" }}
              />

              <TextField
                id="outlined-basic"
                onChange={setrule2_r}
                autoComplete="off"
                size="small"
              />
            </div>
            <div style={ruleStyle}>
              <TextField
                id="outlined-basic"
                label="rule3"
                style={{ width: "20%" }}
                autoComplete="off"
                onChange={setrule3}
                size="small"
              />
              <ArrowCircleRightTwoToneIcon
                sx={{ color: "green", marginTop: "1.5%" }}
              />

              <TextField
                id="outlined-basic"
                onChange={setrule3_r}
                autoComplete="off"
                size="small"
              />
            </div>
          </form>
          <div>
          <div style={{marginTop:"50px",borderStyle:"solid",padding:"15px",backgroundColor:"FloralWhite", fontSize:"20px"}}>
            F , G = forward <br></br>

O = sphere <br></br>

/ = stair up <br></br>

U,D = up, down<br></br>

L,R,+,- = left, right, rotate_left, rotate_right <br></br>

B = back <br></br>

[,] = save,resume 

 </div>
          </div>



        </Grid>
        <Grid item xs={9}>
          <div className="threejs">
            <Canvas>
              <gridHelper ref={gridRef} position={[0.5,0.5,-0.5]} rotation-x={[Math.PI/2]} args={[100,100,"teal","teal"]}></gridHelper>
              <color attach="background" args={["#f0fcfc"]} />
              <OrbitControls makeDefault />
              <ambientLight args={["#ffffff", 0.3]} />
              <pointLight args={["yellow", 1]} position={[0, 2, 8]} />
              <Environment files="./empty_warehouse_01_1k.hdr"/>
              <Lindenmayer
                preset={preset}
                custom_rules={rules}
                iteration={iteration}
              />
            </Canvas>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

//        <PerspectiveCamera makeDefault position={[0, -15, 9]} />

//
