import React from 'react'
import InputBase from '@mui/material/InputBase'

interface SearchBarProps {
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    value?:string;
}

const SearchBar = ({ placeholder, onChange , value}: SearchBarProps) => {
    return (
        <InputBase
            inputMode="search"
            placeholder={placeholder}
            onChange={onChange} 
            size="small"
            value={value}
            sx={{
                fontSize: 14.5,
                pb: 1,
                pt: 1,
                height: '35px',
                width: '175px',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingLeft: '10px',
                paddingRight: '4px',
                alignSelf: 'right',
                alignContent: 'center',
                "& .MuiInputBase-input":
                {
                    pb: 0,
                    fontSize: 12,
                },
                "&.MuiInputBase-root":
                {
                    p: 0.5,
                    pl: 1,
                }
            }} 
        />
    );
};

export default SearchBar;
