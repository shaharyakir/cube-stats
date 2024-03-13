import { useState } from "react";
import "./App.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { Fireworks } from 'fireworks-js'

const fireworks = new Fireworks(document.body)


function App() {
  const [stats, setStats] = useState({
    ["🔴"]: 0,
    ["🍏"]: 0,
    ["🔵"]: 0,
    ["🟡"]: 0,
    ["🧺"]: 0,
    ["🐦‍⬛"]: 0,
  });

  const [streak, setStreak] = useState({
    last: "",
    count: 0,
  });

  const keys = Object.keys(stats);

  return (
    <div style={{ width: "85%", margin: "0 auto" }}>
      <h1>
        How many throws?{" "}
        {Object.values(stats).reduce((prev, curr) => prev + curr, 0)}
      </h1>
      <div style={{ display: "flex" }}>
        {Object.keys(stats).map((color) => (
          <div key={color}>
            <button
              onClick={() => {
                setStats({ ...stats, [color]: stats[color] + 1 });
                setStreak({ last: color, count: streak.last === color ? streak.count + 1 : 1});
                if (color === '🐦‍⬛') fireworks.start()
              }}
              style={{
                backgroundColor: "white",
                borderColor: "gray",
                fontSize: 30,
              }}
            >
              {color} {stats[color]}
              {streak.last === color && streak.count > 1 ? `🔥` : ""}
            </button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <BarChart
        series={[
          { data: keys.map((k) => stats[k]) },
          // { data: [51, 6, 49, 30] },
          // { data: [15, 25, 30, 50] },
          // { data: [60, 50, 15, 25] },
        ]}
        height={290}
        xAxis={[{ data: keys, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
}

export default App;
