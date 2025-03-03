import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from './vars.css';

const responsiveProperties = defineProperties({
  conditions: {
    mobile: { '@media': 'screen and (max-width: 767px)' },
    tablet: { '@media': 'screen and (min-width: 768px) and (max-width: 1023px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline', 'grid', 'inline-flex'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    gap: vars.space,
    padding: vars.space,
    paddingTop: vars.space,
    paddingRight: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    margin: vars.space,
    marginTop: vars.space,
    marginRight: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    width: ['100%', 'auto', '50%', '33.333%', '25%', '20%'],
    height: ['100%', 'auto', '50vh', '100vh'],
    borderRadius: vars.radii,
    fontSize: vars.fontSizes,
    textAlign: ['left', 'center', 'right'],
  },
  shorthands: {
    p: ['padding'],
    pt: ['paddingTop'],
    pr: ['paddingRight'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['margin'],
    mt: ['marginTop'],
    mr: ['marginRight'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors,
    backgroundColor: vars.colors,
    borderColor: vars.colors,
    boxShadow: vars.shadows,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];