import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const RowRadioButtonsGroup = ({onChange,preset})=>{
    return (
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Preset Setting</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={preset}
            onChange={(e)=>{onChange(e.target.value)}}
          >
            <FormControlLabel value="k" control={<Radio />} label="Koch curve" />
            <FormControlLabel value="c" control={<Radio />} label="Chinese temple" />
            <FormControlLabel value="a" control={<Radio />} label="Antenna" />
            <FormControlLabel value="d" control={<Radio />} label="Dragon" />
            <FormControlLabel value="custom" control={<Radio />} label="CUSTOM" />

          </RadioGroup>
        </FormControl>
      );

}
export default RowRadioButtonsGroup;
