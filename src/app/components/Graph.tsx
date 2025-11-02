import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

// #region Sample data
const data = [
  { velocidade: 0, espaco: 0 },
  { velocidade: 10, espaco: 50 },
  { velocidade: 20, espaco: 200 },
  { velocidade: 30, espaco: 450 },
  { velocidade: 40, espaco: 800 },
  { velocidade: 50, espaco: 1250 },
];
// #endregion

export default function Graph() {
  return (
    <LineChart
      style={{
        width: '100%',
        maxWidth: '700px',
        height: '100%',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" /> {/* grade levemente cinza */}
      <XAxis
        dataKey="velocidade"
        type="number"
        tick={{ fill: '#ccc' }} // ticks cinza claro
        stroke="#ccc"
      >
        <Label
          value="Velocidade (m/s)"
          offset={-10}
          position="insideBottom"
          style={{ fill: '#fff', fontWeight: 500 }}
        />
      </XAxis>
      <YAxis tick={{ fill: '#ccc' }} stroke="#ccc">
        <Label
          value="Espaço (m)"
          angle={-90}
          position="insideLeft"
          style={{ fill: '#fff', textAnchor: 'middle', fontWeight: 500 }}
        />
      </YAxis>
      <Tooltip
        contentStyle={{
          backgroundColor: '#1f1f1f',
          border: 'none',
          color: '#fff',
        }}
        labelStyle={{ color: '#ccc' }}
        itemStyle={{ color: '#fff' }}
      />
      <Line type="monotone" dataKey="espaco" stroke="red" strokeWidth={2} dot={{ r: 4 }} />
    </LineChart>
  );
}