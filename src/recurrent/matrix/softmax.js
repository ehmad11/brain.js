import Matrix from './';
/**
 *
 * @param {Matrix} m
 * @returns {Matrix}
 */
export default function softmax(m) {
  let result = new Matrix(m.rows, m.columns); // probability volume
  let maxVal = -999999;
  let i;
  let max;

  for (i = 0, max = m.weights.length; i < max; i++) {
    if(m.weights[i] <= maxVal) continue;
    maxVal = m.weights[i];
  }

  let s = 0;
  for (i = 0, max = m.weights.length; i < max; i++) {
    result.weights[i] = Math.exp(m.weights[i] - maxVal);
    s += result.weights[i];
  }

  for (i = 0, max = m.weights.length; i < max; i++) {
    result.weights[i] /= s;
    result.recurrence[i] = 0;
  }

  // no backward pass here needed
  // since we will use the computed probabilities outside
  // to set gradients directly on m
  return result;
}