import { evaluate } from 'mathjs';

export const formulaToData = (formula, xValues) => {

  // Validate formula
  formula = formula.replace(/\s+/g, '');
  if (formula.substring(0,  2) !== 'y=') {
    throw Error('Invalid formula: ' + formula);
  }
  formula = formula.substring(2);

  // Calculate y-values
  let yValues = [];
  for (const x of xValues) {
    try {
      const y = evaluate(formula, { x });
      yValues.push(y);
    } catch (e) {
      throw Error('Formula evaluation error: ' + formula);
    }
  }

  // Cap big / small numbers
  const cap = 30;
  let wasCapped = false;
  yValues = yValues.map((y) => {
    if (y > cap) {
      wasCapped = true;
      return cap;
    } else if (y < -cap) {
      wasCapped = true;
      return -cap;
    }
    return y;
  });

  // Handle bad values (functions)
  for (const y of yValues)  {
    if (typeof y !== 'number') {
      console.error('Error in y-values:', yValues);
      throw Error('Formula produced invalid values: ' + formula);
    }
  }

  // Convert NaN to 0
  yValues = yValues.map((y) => isNaN(y) ? 0 : y);

  return {
    yValues,
    wasCapped,
    cap
  };
};
