import { Color, PaletteColor, PaletteColorOptions } from '@mui/material/styles/createPalette';
import { ThemeProvider, createTheme } from '@mui/material';

const dennysBrownMain: string = "#464340"
const dennysYellowMain: string = "#ffd31a"
const dennysGreyMain: string = "#474355"
const dennysRedMain: string = "#d63d42"
const beigeMain: string = "#F2EEEA"
declare module '@mui/material/styles' {
  interface Palette {
        dennysRed: PaletteColor,
        dennysBrown: PaletteColor,
        dennysYellow: PaletteColor,
        dennysGrey: PaletteColor,
        beige: PaletteColor,
    }
  
  interface PaletteOptions {
        dennysRed: PaletteColorOptions,
        dennysBrown: PaletteColorOptions,
        dennysYellow: PaletteColorOptions,
        dennysGrey: PaletteColorOptions,
        beige: PaletteColorOptions,


    }
  }


const {palette} = createTheme(); // grab the default palette from the theme
const theme = createTheme({
    palette:
    {
        dennysRed: palette.augmentColor({color:{main: dennysRedMain}, name:"dennysRed"}),
        dennysBrown: palette.augmentColor({color:{main: dennysBrownMain}, name:"dennysBrown"}),
        dennysYellow: palette.augmentColor({color:{main: dennysYellowMain}, name:"dennysYellow"}),
        dennysGrey: palette.augmentColor({color:{main: dennysGreyMain}, name:"dennysGrey"}),
        beige: palette.augmentColor({color: {main: beigeMain}, name:"beige"}),
    }
})

export default theme