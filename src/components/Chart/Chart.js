import _ from 'lodash';
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import formulaToData from '../../util/formulaToData';
import styles from './Chart.module.css';

const H = 300;

const Chart = ({
  tracks,
  numBeats,
  notes,
}) => {

  const xValues = [];
  const numXValues = numBeats * 10;
  for (let i = 0; i < numXValues + 1; i++) {
    xValues.push(i * (2 * Math.PI) / numXValues);
  }

  const yValuesArray = tracks
    .map((track) => {
      try {
        return formulaToData(track.formula, xValues);
      } catch (e) {
        return [];
      }
    });

  const data = xValues.map((x, i) => ({ x, i }));

  for (let i = 0; i < yValuesArray.length; i++) {
    const name = `Track ${i + 1}`;
    const yValues = yValuesArray[i];
    for (let j = 0; j < yValues.length; j++) {
      const y = yValues[j];
      data[j][name] = y;
    }
  }

  const xLines = [];
  for (let i = 0; i < numBeats + 1; i++) {
    xLines.push(
      <ReferenceLine
        key={`x-line-${i}`}
        x={i / numBeats * numXValues}
        strokeDasharray='3 3'
      />
    );
  }

  const yLines = [];
  const yMin = Math.floor(_(yValuesArray).flatten().min());
  const yMax = Math.ceil(_(yValuesArray).flatten().max());
  for (let i = yMin; i <= yMax; i++) {
    yLines.push(
      <ReferenceLine
        key={`y-line-${i}`}
        y={i}
        strokeDasharray='3 3'
      />
    );
  }

  const formatter = (_, __,  properties) => {
    const { dataKey, payload: { i } } = properties; 
    const trackIndex = Number(dataKey[dataKey.length - 1]) - 1;
    const beatIndex = Math.round(i / 100);
    return notes[trackIndex][beatIndex];
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer width='100%' height={H}>
        <LineChart
          data={data}
        >
          {xLines}
          {yLines}
          {tracks.map((track, i) => (
            <Line
              key={`line-${i}`}
              type='monotone'
              dataKey={`Track ${i + 1}`}
              stroke={track.color}
              opacity={track.isMuted ? 0.4 : 1}
              dot={false}
              strokeWidth={2}
            />
          ))}
          <Tooltip
            formatter={formatter}
            labelFormatter={(label) => Math.round(label / 100)}
          />
          <YAxis domain={['dataMin', 'dataMax']} hide={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;