import { LineChart, Line, CartesianGrid, Tooltip, YAxis } from 'recharts';
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

const Chart = ({
  formulas,
  numNotes,
  noteRange,
  notes
}) => {

  noteRange = noteRange - 1;
  if (noteRange < 1) {
    noteRange = 1;
  }

  const xMin = 0;
  const xMax = 2 * Math.PI;
  const numX = numNotes * 100;
  const xInc = (xMax - xMin) / numX;
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
    const dataPoint = { name: i };

    for (let j = 0; j < formulaDatas.length; j++) {
      const key = `f${j}`;
      const y = formulaDatas[j][i];
      dataPoint[key] = y;
    }

    data.push(dataPoint);
  }

  const verticalPoints = [];
  for (let i = 0; i < numNotes + 1; i++) {
    verticalPoints.push(i * W / numNotes);
  }
  const horizontalPoints = [];
  for (let i = 0; i < noteRange + 1; i++) {
    horizontalPoints.push(i * H / noteRange);
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
          verticalPoints={verticalPoints}
          horizontalPoints={horizontalPoints}
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
        <Tooltip
          formatter={(_, __, props) => notes[Math.round(props.payload.name / 100)]}
          labelFormatter={(label) => Math.round(label / 100)}
        />
        <YAxis domain={['dataMin', 'dataMax']} hide={true} />
      </LineChart>
    </div>
  );
}

export default Chart;
