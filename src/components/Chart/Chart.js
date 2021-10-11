import _ from 'lodash';
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { formulaToData } from '../../util/formulaEvaluator';
import styles from './Chart.module.css';

const H = 300;
const dataResolution = 20; 

const Chart = ({
  tracks,
  numBeats,
  notes,
}) => {

  const xValues = [];
  const numXValues = numBeats * dataResolution;
  for (let i = 0; i < numXValues + 1; i++) {
    xValues.push(i * (2 * Math.PI) / numXValues);
  }

  let wasCapped = false;
  let cap = 0;
  const yValuesArray = tracks
    .map((track) => {
      try {
        const data = formulaToData(track.formula, xValues);
        wasCapped = wasCapped || data.wasCapped;
        cap = data.cap;
        return data.yValues;
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

  console.log(yValuesArray);

  const yLines = [];
  const yMin = Math.floor(_(yValuesArray).flatten().min());
  const yMax = Math.ceil(_(yValuesArray).flatten().max());
  const range = yMax - yMin;
  const inc = Math.max(1, 10 ** Math.floor(Math.log10(range - 1)));
  for (let i = yMin; i <= yMax; i += inc) {
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
    const beatIndex = Math.round(i / dataResolution);
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
            labelFormatter={(label) => Math.floor(label / dataResolution) + 1}
          />
          <YAxis domain={['dataMin', 'dataMax']} hide={true} />
        </LineChart>
      </ResponsiveContainer>
      {wasCapped
        ? <div className={styles.cap}>* y-values capped at ±{cap}</div>
        : null
      }
    </div>
  );
};

export default Chart;