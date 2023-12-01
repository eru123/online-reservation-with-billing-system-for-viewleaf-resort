// QuantitySelector.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Props = {
  name: string;
  pricePerItem: number;
  value: number;
  inclusion?: any;
  type: string;
  setValue: (newValue: number, inclusion: any) => void;
};

function QuantitySelector({ name, value, inclusion, type, setValue, pricePerItem }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexGrow: '1' }}>
        <Typography variant="subtitle1" fontWeight={500} color="initial">
          {name}
        </Typography>
        <Typography
          variant="body2"
          marginTop={'-5px'}
          sx={{ paddingLeft: '.5em' }}
          color="initial"
          fontWeight={100}
        >
          {value} x {pricePerItem}
        </Typography>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <IconButton
          aria-label=""
          onClick={() => {
            if (type==="inclusion"){
              if (value > 0) {
                setValue(value - 1, inclusion);
              }
            } 
            else if (type==="guest"){

            }
            
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="subtitle1" color="initial">
          {value}
        </Typography>
        <IconButton
          aria-label=""
          onClick={() => {
            if (type==="inclusion"){
              setValue(value + 1, inclusion);
            } 
            else if (type==="guest"){

            }
            
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default QuantitySelector;
