import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { COLORS, GRAY_1, OPACITY_1, OPACITY_2, OPACITY_3 } from '../../constants/colors';
import formulaToData from '../../util/formulaToData';
import styles from './Chart.module.css';

const H = 300;

const Chart = ({
  tracks,
  trackIndex,
  setTracks,
  numBeats,
}) => {

  const xValues = [];
  const numXValues = numBeats * 100;
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

  const data = xValues.map((x) => ({ x }));

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
  for (let i = -3; i <= 3; i++) {
    yLines.push(
      <ReferenceLine
        key={`y-line-${i}`}
        y={i}
        strokeDasharray='3 3'
      />
    );
  }

  const getColor = (i) => {
    const color = COLORS[i % COLORS.length];
    const opacity = i === trackIndex ? '' : OPACITY_2;
    return color + opacity;
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer width='100%' height={H}>
        <LineChart
          data={data}
        >
          {xLines}
          {yLines}
          {tracks.map((_, i) => (
            <Line
              key={`line-${i}`}
              type='monotone'
              dataKey={`Track ${i + 1}`}
              // stroke={getColor(i)}
              style={{ stroke: getColor(i) }}
              dot={false}
              strokeWidth={2}
              animationDuration={600}
              isAnimationActive={false}
            />
          ))}
          <Tooltip
            // formatter={(_, __, props) => notes[Math.round(props.payload.name / 100)]}
            labelFormatter={(label) => Math.round(label / 100)}
          />
          <YAxis domain={['dataMin', 'dataMax']} hide={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;