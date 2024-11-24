import React, {forwardRef} from 'react'
import InputBase from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import { SxProps, Theme } from '@mui/material'

interface SearchBarProps
{
    placeholder?: string,
}

const SearchBar = ({placeholder}: SearchBarProps)=>
{
    <InputBase inputMode='search' placeholder={placeholder} size='small' sx={{
        fontSize: 14.5,
        pb: 1,
        pt: 1,
        height: '35px',
        width: '200px',
        borderRadius: 4,
        backgroundColor: 'white', 
        paddingLeft: '10px',
        paddingRight: '4px',
        alignSelf: 'right'
        }}/>
}
export default SearchBar