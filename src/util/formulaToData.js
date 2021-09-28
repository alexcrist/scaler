import _ from 'lodash';
import { Parser } from 'expr-eval';

const formulaToData = (formula, xValues) => {
  formula = formula.replace(/\s+/g, '');

  if (formula.substring(0,  2) !== 'y=') {
    throw Error('Invalid formula: ' + formula);
  }

  formula = formula.substring(2);

  const data = [];
  for (const x of xValues) {
    try {
      const value = Parser.evaluate(formula, { x });
      data.push(value);
    } catch (e) {
      throw Error('Formula evaluation error: ' + formula);
    }
  }

  return data;
};

export default formulaToData;