import { createTheme, type MantineColorsTuple } from '@mantine/core';

const gold: MantineColorsTuple = [
  '#FDF6E3', '#FBEAC0', '#F7DA95', '#F3C86A', '#EEB745',
  '#E3A429', '#C98A1E', '#A66E17', '#815310', '#5C3A0A',
];

const clay: MantineColorsTuple = [
  '#FBEAE2', '#F3C6B3', '#E9A183', '#DE7C57', '#D25A34',
  '#B8431E', '#983418', '#792812', '#5A1D0D', '#3B1207',
];

const plum: MantineColorsTuple = [
  '#EDE7F5', '#CDBEE0', '#AC96CB', '#8C6EB6', '#6E4E9C',
  '#523A78', '#3C2660', '#2C1B49', '#20143A', '#180F26',
];

export const theme = createTheme({
  fontFamily: 'var(--font-body), sans-serif',
  fontFamilyMonospace: 'var(--font-mono), monospace',
  headings: {
    fontFamily: 'var(--font-display), serif',
    fontWeight: '600',
  },
  colors: { gold, clay, plum },
  primaryColor: 'gold',
  primaryShade: 4,
  defaultRadius: 'md',
  black: '#180F26',
  white: '#F3E7CE',
  other: {
    ink: '#180F26',
    plum: '#2C1B49',
    plumLight: '#3C2660',
    gold: '#E3A429',
    goldSoft: '#F1C876',
    clay: '#B8431E',
    parchment: '#F3E7CE',
    parchmentDim: '#C9BBA0',
  },
});
