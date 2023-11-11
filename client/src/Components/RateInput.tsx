import React,{useState} from 'react'
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
function RateInput() {
    const [value,setValue] = useState(0)

    return (
        <Box display="flex" gap={"5px"}>
            <IconButton onClick={()=>{}}>
                <StarIcon sx={value === 1 || value === 2 || value === 3 || value === 4 || value === 5 ? { fill: "#E7C23F" } : {}} 
                onClick={()=>{
                    if(value === 1){
                        setValue(0)
                    }else{
                        setValue(1)
                    }
                }}
                
                />
            </IconButton>
            <IconButton onClick={()=>{}}>
                <StarIcon sx={value === 2 || value === 3 || value === 4 || value === 5 ? { fill: "#E7C23F" } : {}} 
                onClick={()=>{
                    if(value === 2){
                        setValue(0)
                    }else{
                        setValue(2)
                    }
                }}
                />
            </IconButton>
            <IconButton>
                <StarIcon sx={value === 3 || value === 4 || value === 5? { fill: "#E7C23F" } : {}} 
                onClick={()=>{
                    if(value === 3){
                        setValue(0)
                    }else{
                        setValue(3)
                    }
                }}
                />
            </IconButton>
            <IconButton>
                <StarIcon sx={value === 4 || value === 5 ? { fill: "#E7C23F" } : {}} 
                onClick={()=>{
                    if(value === 4){
                        setValue(0)
                    }else{
                        setValue(4)
                    }
                }}
                />
            </IconButton>
            <IconButton>
                <StarIcon sx={value === 5 ? { fill: "#E7C23F" } : {}} 
                onClick={()=>{
                    if(value === 5){
                        setValue(0)
                    }else{
                        setValue(5)
                    }
                }}/>
            </IconButton>
        </Box>
    )
}

export default RateInput