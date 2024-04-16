export const regionColor = (region) => {
    let color = 'transparent';
    if (region === 'NA') color = '#70558E';
    if (region === 'EUNE') color = '#3B4D82';
    if (region === 'EUW') color = '#4979A9';
    if (region === 'KR') color = '#0DBAAE';
    if (region === 'JP') color = '#DF7299';
    if (region === 'BR') color = '#69BE74';
    if (region === 'LAN') color = '#DECF49';
    if (region === 'LAS') color = '#DB9342';
    if (region === 'OCE') color = '#55B4D2';
    if (region === 'TR') color = '#C95D58';
    if (region === 'RU') color = '#B84984';
    if (region === 'PH') color = '#8986DB';
    if (region === 'SG') color = '#9DB717';
    if (region === 'TH') color = '#A743AE';
    if (region === 'TW') color = '#A47C10';
    if (region === 'VN') color = '#B26441';

    return color;
}