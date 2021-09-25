import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import formulaToData from '../../util/formulaToData';
import styles from './Chart.module.css';

const W = 730;
const H = 250;
const COLORS = [
  '#8338ec',
  '#ff006e',
  '#3a86ff',
  '#fb5607',
  '#ffbe0b',
];

const Chart = ({ formulas }) => {

  console.log(formulas);

  const xMin = 0;
  const xMax = 2 * Math.PI;
  const numX = 100;
  const xInc = (xMax - xMin) / 100;

  const xRange = [];
  for (let i = 0; i < numX; i++) {
    xRange.push(i * xInc);
  }

  const formulaDatas = formulas
    .map(f => {
      try {
        return formulaToData(f, xRange);
      } catch (e) {
        return null;
      }
    })
    .filter(f => f !== null);

  const data = [];
  for (let i = 0; i < numX; i++) {
    const x = xRange[i];
    const dataPoint = { name: x };

    for (let j = 0; j < formulaDatas.length; j++) {
      const key = `f${j}`;
      const y = formulaDatas[j][i];
      dataPoint[key] = y;
    }

    data.push(dataPoint);
  }

  return (
    <div className={styles.chart}>

      <LineChart
        width={W}
        height={H}
        data={data}
      >
        <CartesianGrid
          stroke='#ccc'
          strokeDasharray='3 3' 
          verticalPoints={[0, W / 4, W / 2, 3 * W / 4, W]}
          horizontalPoints={[0, H / 4, H / 2, 3 * H / 4, H]}
        />
        {formulaDatas.map((_, i) => 
          <Line
            key={i}
            type='monotone'
            dataKey={`f${i}`}
            stroke={COLORS[i % COLORS.length] + '99'}
            dot={false}
            strokeWidth={3}
          />
        )}

        {/* <XAxis dataKey='name' type='number' domain={['dataMin', 'dataMax']} /> */}
        <Tooltip />
      </LineChart>

    </div>
  );
}

export default Chart;
