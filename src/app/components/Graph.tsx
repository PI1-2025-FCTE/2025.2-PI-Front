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
    <div className="w-full h-full flex items-center justify-center">
      <LineChart
        width={380}
        height={260}
        data={data}
        margin={{ top: 5, right: 15, left: -10, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis
          dataKey="velocidade"
          type="number"
          tick={{ fill: '#ccc', fontSize: 10 }}
          stroke="#ccc"
        >
          <Label
            value="Velocidade (m/s)"
            offset={0}
            position="insideBottom"
            style={{ fill: '#fff', fontWeight: 500, fontSize: 11 }}
          />
        </XAxis>
        <YAxis tick={{ fill: '#ccc', fontSize: 10 }} stroke="#ccc">
          <Label
            value="Espaço (m)"
            angle={-90}
            position="insideLeft"
            style={{ fill: '#fff', textAnchor: 'middle', fontWeight: 500, fontSize: 11 }}
          />
        </YAxis>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f1f1f',
            border: 'none',
            color: '#fff',
            fontSize: 10
          }}
          labelStyle={{ color: '#ccc' }}
          itemStyle={{ color: '#fff' }}
        />
        <Line type="monotone" dataKey="espaco" stroke="red" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </div>
  );
}
