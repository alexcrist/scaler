import { Parser } from 'expr-eval';

const formulaToData = (formula, xValues) => {
  formula = formula.replace(/\s+/g, '');

  if (formula.substring(0,  2) !== 'y=') {
    throw Error('Invalid formula: ' + formula);
  }

  formula = formula.substring(2);

  let yValues = [];
  for (const x of xValues) {
    try {
      const y = Parser.evaluate(formula, { x });
      yValues.push(y);
    } catch (e) {
      throw Error('Formula evaluation error: ' + formula);
    }
  }

  // Cap big / small numbers
  const cap = 50;
  yValues = yValues.map((y) => {
    if (y > cap) {
      return cap;
    } else if (y < -cap) {
      return -cap;
    }
    return y;
  });

  return yValues;
};

export default formulaToData;