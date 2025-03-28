// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* eslint-disable quote-props */
const COLORS = {
  grey_7: '#898989',
  brick_20: '#B77B6A',
  brick_21: '#8B574F',
  brick_22: '#392421',
  lime_8: '#7DC240',
  lime_9: '#76B73D',
  lime_4: '#CFEDB5',
  lime_5: '#B6E490',
  lime_6: '#9EDB6B',
  lime_7: '#8ECF56',
  lime_1: '#F3FBED',
  lime_2: '#EBF8E1',
  lime_3: '#E3F5D4',
  orange_22: '#32221D',
  orange_20: '#DDA37C',
  orange_21: '#A2705B',
  stone_9: '#716852',
  stone_8: '#776E57',
  stone_20: '#4D4A44',
  stone_1: '#F3F2EF',
  amber_22: '#32251D',
  stone_21: '#282623',
  amber_20: '#DDB27C',
  amber_21: '#A2785B',
  navy_17: '#CAD1E6',
  navy_16: '#18264D',
  navy_15: '#132559',
  navy_14: '#162A65',
  navy_13: '#1A3177',
  navy_12: '#1E3788',
  navy_11: '#223F9A',
  navy_10: '#2647AC',
  navy_19: '#7989B7',
  navy_18: '#9CAAD3',
  teal_9: '#1C8EB4',
  teal_8: '#1E96BE',
  teal_5: '#79C7E3',
  teal_4: '#A6DAEC',
  teal_7: '#35A6CC',
  teal_6: '#4DB5D9',
  teal_1: '#E9F6FA',
  teal_3: '#CBE9F4',
  teal_2: '#DAF0F7',
  teal_19: '#73A6B7',
  teal_18: '#96C3D2',
  teal_11: '#17779A',
  teal_10: '#1A85AB',
  teal_13: '#125C77',
  teal_12: '#146988',
  teal_15: '#0D4559',
  teal_14: '#0F4E65',
  teal_17: '#C7DDE5',
  teal_16: '#103B49',
  gold_20: '#DDBE7C',
  gold_21: '#A27E5B',
  gold_22: '#32271D',
  olive_9: '#B8C436',
  olive_8: '#C3D039',
  olive_7: '#CFDC4F',
  olive_6: '#DBE765',
  olive_5: '#E4ED8B',
  olive_4: '#EDF3B2',
  olive_3: '#F5F8D2',
  olive_2: '#F8FADF',
  olive_1: '#FBFCEC',
  green_22: '#212A1F',
  green_20: '#5A735A',
  green_21: '#2F3C2F',
  indigo_17: '#CCC7E4',
  indigo_16: '#1B1247',
  indigo_15: '#1C0F58',
  indigo_14: '#201163',
  indigo_13: '#261474',
  indigo_12: '#2C1685',
  indigo_11: '#321A97',
  indigo_10: '#371DA8',
  indigo_19: '#7E71B2',
  indigo_18: '#A095CF',
  blue_22: '#222A34',
  blue_20: '#536A81',
  blue_21: '#2D3946',
  olive_22: '#28291C',
  olive_20: '#878A5E',
  olive_21: '#484A32',
  violet_16: '#510E30',
  violet_17: '#E0C1D8',
  violet_14: '#6B083F',
  violet_15: '#620736',
  violet_12: '#860A5A',
  violet_13: '#79094D',
  violet_10: '#A40D77',
  violet_11: '#950C69',
  dirt_16: '#261A10',
  dirt_17: '#BCB6B1',
  dirt_14: '#322113',
  dirt_15: '#2D1D10',
  dirt_12: '#442D19',
  dirt_13: '#3B2716',
  violet_18: '#C78BB8',
  violet_19: '#B1699C',
  stone_15: '#373227',
  stone_14: '#3E392D',
  stone_17: '#C6C4C0',
  stone_16: '#2E2A22',
  stone_11: '#5F5845',
  stone_10: '#6A624D',
  stone_13: '#494335',
  stone_12: '#544D3D',
  stone_19: '#706C63',
  stone_18: '#938F87',
  aqua_3: '#CAF2F4',
  aqua_2: '#D9F6F7',
  aqua_1: '#E8FAFA',
  aqua_7: '#2FC5CC',
  aqua_6: '#47D3D9',
  aqua_5: '#75DEE3',
  aqua_4: '#A3E9EC',
  aqua_9: '#15AEB4',
  aqua_8: '#17B8BE',
  orange_7: '#FE891A',
  orange_6: '#FF9833',
  orange_5: '#FFB266',
  orange_4: '#FFCB99',
  orange_3: '#FFE1C4',
  orange_2: '#FFEAD5',
  orange_1: '#FFF2E6',
  orange_9: '#FA7400',
  orange_8: '#FD7900',
  purple_13: '#510869',
  purple_11: '#670B8C',
  purple_10: '#720C9D',
  purple_7: '#9226BE',
  purple_6: '#A13ECD',
  purple_5: '#B86EDA',
  purple_4: '#D09FE6',
  purple_3: '#E4C7F1',
  purple_2: '#ECD7F5',
  purple_1: '#F3E7F9',
  blue_18: '#99B6D3',
  blue_17: '#C9D7E6',
  blue_16: '#16314D',
  blue_15: '#103459',
  blue_14: '#133B65',
  blue_13: '#164677',
  blue_12: '#195188',
  purple_9: '#7A0DA6',
  blue_10: '#2067AC',
  orange_13: '#D65200',
  orange_12: '#E45D00',
  orange_11: '#ED6600',
  orange_10: '#F26C00',
  orange_17: '#F8E2CC',
  orange_16: '#8C330A',
  orange_15: '#B93C00',
  orange_14: '#C84600',
  orange_19: '#F6BD8A',
  orange_18: '#F8CCA1',
  magenta_11: '#B51241',
  magenta_10: '#C5154A',
  magenta_13: '#970E2D',
  magenta_12: '#A51037',
  magenta_15: '#7E0A1D',
  magenta_14: '#880B23',
  magenta_17: '#EDCAD6',
  magenta_16: '#63101D',
  magenta_19: '#D2809A',
  magenta_18: '#E29DB4',
  stone_3: '#E2E0DA',
  stone_2: '#EBE9E4',
  stone_5: '#B3AD9E',
  stone_4: '#CDC9BF',
  stone_7: '#89806B',
  stone_6: '#9A927E',
  blue_9: '#226DB5',
  blue_8: '#2473BD',
  blue_7: '#3B85CC',
  blue_6: '#5297DA',
  blue_5: '#7DB1E3',
  blue_4: '#A9CBED',
  blue_3: '#CDE1F4',
  blue_2: '#DCEAF7',
  blue_1: '#EAF2FA',
  gold_9: '#FAC200',
  gold_8: '#FDC900',
  gold_5: '#FFE466',
  gold_4: '#FFEB8C',
  gold_7: '#FED21A',
  gold_6: '#FFDB33',
  gold_1: '#FFFBE6',
  gold_3: '#FFF5C4',
  gold_2: '#FFF8D5',
  dirt_22: '#191410',
  dirt_21: '#201B17',
  dirt_20: '#3D342C',
  white: '#FFFFFF',
  gold_19: '#F6E08A',
  gold_18: '#F8E8A1',
  grey_8: '#777777',
  grey_9: '#717171',
  gold_11: '#EDAB00',
  gold_10: '#F6BA00',
  gold_13: '#D68800',
  gold_12: '#E49B00',
  gold_15: '#B96500',
  gold_14: '#C87500',
  gold_17: '#F8F0CC',
  gold_16: '#8C500A',
  grey_10: '#6A6A6A',
  grey_11: '#5F5F5F',
  grey_12: '#545454',
  grey_13: '#494949',
  grey_14: '#3E3E3E',
  grey_15: '#373636',
  grey_16: '#2E2D2D',
  grey_17: '#C6C6C6',
  grey_18: '#939393',
  grey_19: '#707070',
  dirt_19: '#5B4D42',
  yellow_20: '#DDC97C',
  yellow_21: '#A2845B',
  yellow_22: '#32291D',
  dirt_10: '#573921',
  dirt_11: '#4E331D',
  brown_8: '#986232',
  brown_9: '#905D2F',
  stone_22: '#1C1A18',
  brown_6: '#B7885E',
  brown_7: '#A87548',
  brick_1: '#FEEEE8',
  brick_3: '#FCD6C8',
  brick_2: '#FDE2D8',
  brick_5: '#F89570',
  brick_4: '#FAB8A0',
  brick_7: '#EF5D28',
  brick_6: '#F57141',
  brick_9: '#DF4916',
  brick_8: '#E7531F',
  amber_7: '#FEB31A',
  amber_6: '#FFBE33',
  amber_5: '#FFCE66',
  amber_4: '#FFDF99',
  amber_3: '#FFECC4',
  amber_2: '#FFF2D5',
  amber_1: '#FFF7E6',
  amber_9: '#FAA100',
  amber_8: '#FDA700',
  grey_2: '#F1F1F1',
  grey_3: '#E5E5E4',
  violet_22: '#301C25',
  violet_21: '#51303F',
  violet_20: '#7F4B6D',
  grey_1: '#F8F8F9',
  red_19: '#D37676',
  red_18: '#E49595',
  red_15: '#880000',
  red_14: '#910000',
  red_17: '#EEC7C7',
  red_16: '#6D0A0A',
  red_11: '#BB0000',
  red_10: '#C90000',
  red_13: '#9F0000',
  red_12: '#AC0000',
  black: '#000000',
  grey_4: '#D6D6D5',
  grey_5: '#C0C0C0',
  navy_7: '#4265CC',
  navy_6: '#5879DA',
  navy_5: '#829AE3',
  navy_4: '#ABBCED',
  navy_3: '#CFD8F4',
  navy_2: '#DDE3F7',
  navy_1: '#EBEFFA',
  navy_9: '#294CB5',
  navy_8: '#2C51BE',
  yellow_15: '#B97600',
  yellow_14: '#C88900',
  yellow_17: '#F8F6CC',
  yellow_16: '#8C5C0A',
  yellow_11: '#EDC800',
  yellow_10: '#F6DA00',
  yellow_13: '#D6A000',
  yellow_12: '#E4B600',
  yellow_19: '#F6EF8A',
  yellow_18: '#F8F5A1',
  purple_20: '#664473',
  purple_21: '#352139',
  magenta_1: '#FCE9EF',
  magenta_3: '#F9CADA',
  magenta_2: '#FBDAE4',
  magenta_5: '#EF769E',
  magenta_4: '#F4A3BF',
  magenta_7: '#E1316A',
  magenta_6: '#E9487E',
  magenta_9: '#CF1750',
  magenta_8: '#D91955',
  indigo_3: '#D4CCF3',
  indigo_2: '#E1DBF6',
  indigo_1: '#EDE9FA',
  indigo_7: '#5438C8',
  indigo_6: '#694FD6',
  indigo_5: '#8F7BE0',
  indigo_4: '#B4A7EB',
  indigo_9: '#3B1EB1',
  indigo_8: '#482BBD',
  magenta_20: '#9E5F70',
  magenta_21: '#6D4046',
  magenta_22: '#2C1B1E',
  purple_22: '#231727',
  red_9: '#D20000',
  red_8: '#DA0000',
  red_5: '#F06D6D',
  red_4: '#F59999',
  red_7: '#E31A1A',
  red_6: '#EA4444',
  red_1: '#FDE6E6',
  red_3: '#F9C4C4',
  red_2: '#FBD5D5',
  grey_21: '#282727',
  grey_20: '#4D4D4D',
  grey_22: '#1C1B1B',
  lime_16: '#30471D',
  lime_17: '#D9E6CE',
  lime_14: '#406422',
  lime_15: '#39581E',
  lime_12: '#57882E',
  lime_13: '#4C7628',
  lime_10: '#6EAC3A',
  lime_11: '#639A34',
  lime_18: '#BAD4A4',
  lime_19: '#9EBB84',
  dirt_18: '#81746B',
  violet_8: '#B80F87',
  violet_9: '#AE0E7F',
  violet_4: '#E79FD5',
  violet_5: '#DA70BF',
  violet_6: '#CE40AA',
  violet_7: '#C32899',
  violet_1: '#F9E8F5',
  violet_2: '#F5D8EE',
  violet_3: '#F1C8E6',
  red_20: '#A55C5C',
  red_21: '#784343',
  red_22: '#361F1F',
  amber_19: '#F6D18A',
  amber_18: '#F8DCA1',
  amber_13: '#D67100',
  amber_12: '#E48000',
  amber_11: '#ED8D00',
  amber_10: '#F69A00',
  amber_17: '#F8EACC',
  amber_16: '#8C440A',
  amber_15: '#B95300',
  amber_14: '#C86100',
  green_17: '#CDDDCD',
  green_16: '#254325',
  green_15: '#274F28',
  green_14: '#2C5A2E',
  green_13: '#356A36',
  green_12: '#3D7A3E',
  green_11: '#458A46',
  green_10: '#4C9A4E',
  green_19: '#82A682',
  green_18: '#A2C2A2',
  turquoise_19: '#77AC9B',
  turquoise_18: '#99C7B9',
  turquoise_15: '#185240',
  turquoise_14: '#1B5D48',
  turquoise_17: '#C9E0D9',
  turquoise_16: '#1A4538',
  turquoise_11: '#2B8F70',
  turquoise_10: '#309F7D',
  turquoise_13: '#216E56',
  turquoise_12: '#267E63',
  aqua_22: '#1A2C2B',
  aqua_20: '#4F7E81',
  aqua_21: '#2B4447',
  yellow_9: '#FAE300',
  yellow_8: '#FDEC00',
  yellow_5: '#FFFA66',
  yellow_4: '#FFFB98',
  yellow_7: '#FEF21A',
  yellow_6: '#FFF833',
  yellow_1: '#FFFEE6',
  yellow_3: '#FFFDC4',
  yellow_2: '#FFFED5',
  teal_20: '#507481',
  teal_21: '#2C3F46',
  teal_22: '#152629',
  indigo_22: '#1A1724',
  purple_12: '#5C097A',
  indigo_20: '#59507E',
  indigo_21: '#312C45',
  purple_17: '#D5C1DF',
  purple_16: '#360B40',
  purple_15: '#3F054C',
  purple_14: '#460658',
  purple_19: '#9563A8',
  purple_18: '#B389C6',
  blue_19: '#7597B6',
  lime_22: '#1E241A',
  lime_21: '#3A4531',
  lime_20: '#6C815B',
  turquoise_1: '#ECF9F5',
  turquoise_3: '#D2F1E7',
  turquoise_2: '#DFF5EE',
  turquoise_5: '#89DAC1',
  turquoise_4: '#B1E7D6',
  turquoise_7: '#4DC19C',
  turquoise_6: '#62CEAD',
  turquoise_9: '#34A984',
  turquoise_8: '#37B38B',
  brown_4: '#DBC3AF',
  brown_5: '#C9A686',
  brown_2: '#F0E7DE',
  brown_3: '#EADDD0',
  brown_1: '#F6F0EB',
  blue_11: '#1C5C9A',
  brown_14: '#4F3319',
  purple_8: '#820DAF',
  brown_15: '#452D16',
  brown_16: '#3C2A18',
  brown_18: '#B09C8A',
  brick_19: '#E19D84',
  brick_18: '#EEB5A1',
  brick_15: '#9B1C04',
  brick_14: '#A42105',
  brick_17: '#F3D7CC',
  brick_16: '#7A1F0E',
  brick_11: '#CB380B',
  brick_10: '#D73F0D',
  brick_13: '#B12907',
  brick_12: '#BE3009',
  olive_13: '#777E23',
  olive_12: '#899128',
  olive_11: '#9BA52E',
  olive_10: '#ADB933',
  olive_17: '#E9ECD0',
  olive_16: '#494C1B',
  olive_15: '#595E1A',
  olive_14: '#656B1D',
  olive_19: '#C3C989',
  olive_18: '#DBE0A8',
  navy_22: '#232734',
  navy_20: '#555F81',
  navy_21: '#2E3446',
  brown_21: '#352D24',
  brown_20: '#645446',
  brown_22: '#29231C',
  dirt_4: '#C3B5A9',
  dirt_5: '#A68F7E',
  dirt_6: '#886A53',
  dirt_7: '#75553C',
  dirt_1: '#F0EDEA',
  dirt_2: '#E7E1DC',
  dirt_3: '#DDD4CD',
  dirt_8: '#624025',
  dirt_9: '#5D3D23',
  green_3: '#DAEFDA',
  green_2: '#E4F3E4',
  green_1: '#EFF8EF',
  green_7: '#6ABB6B',
  green_6: '#7DC97F',
  green_5: '#9ED79F',
  green_4: '#BEE4BF',
  green_9: '#52A353',
  green_8: '#57AD57',
  brown_10: '#88572C',
  brown_11: '#7A4E28',
  brown_12: '#6B4523',
  brown_13: '#5D3C1E',
  turquoise_20: '#52776C',
  turquoise_21: '#2C403A',
  turquoise_22: '#1E2C27',
  brown_17: '#D4CAC1',
  grey_6: '#A6A5A5',
  brown_19: '#917A66',
  aqua_19: '#70B4B7',
  aqua_18: '#94CFD2',
  aqua_13: '#0E7077',
  aqua_12: '#108188',
  aqua_11: '#12939A',
  aqua_10: '#13A4AB',
  aqua_17: '#C6E4E5',
  aqua_16: '#0F474A',
  aqua_15: '#0A545A',
  aqua_14: '#0B5F65'
};
/* eslint-enable quote-props */

export default COLORS;

export const ColorsByTheme = Object.keys(COLORS).reduce((accu, key) => {
  if (!key.includes('_')) {
    return accu;
  }
  const [theme, idx] = key.split('_');

  return {
    ...accu,
    [theme]: {
      ...accu[theme],
      [idx]: COLORS[key]
    }
  };
}, {});

// theme name in order wheel order
export const Themes = [
  'yellow',
  'gold',
  'amber',
  'orange',
  'brick',
  'red',
  'magenta',
  'violet',
  'purple',
  'indigo',
  'navy',
  'blue',
  'teal',
  'aqua',
  'turquoise',
  'green',
  'lime',
  'olive',
  'grey',
  'stone',
  'brown',
  'dirt'
];
