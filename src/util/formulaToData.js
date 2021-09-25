import _ from 'lodash';


const formulaToData = (formula, xValues) => {
  formula = formula.replace(/\s+/g, '');
  formula = formula.replace(/sin/g, 'Math.sin');
  formula = formula.replace(/cos/g, 'Math.cos');

  if (formula.substring(0,  2) !== 'y=') {
    throw Error('Invalid formula: ' + formula);
  }

  formula = formula.substring(2);

  const data = [];
  for (const x of xValues) {
    const evalFormula = _.replace(formula, 'x', x);
    try {
      data.push(eval(evalFormula));
    } catch (e) {
      throw Error('Formula evaluation error: ' + evalFormula);
    }
  }

  return data;
};

export default formulaToData;