'use client';

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { PopulationData } from "../../../interfaces/interfaces";
import { Card, CardContent } from "../../ui/card";

/**
 * PopulationChart component to display a line chart of population data.
 * @param {Array<PopulationData>} population - The population data to display.
 * @returns {JSX.Element} The population chart component.
 */
export const PopulationChart = ({ population }: { population: PopulationData[] }) => (
  <Card>
    <CardContent className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">Population Over Time</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={population}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: "Year", position: "bottom" }} />
            <YAxis
              tickFormatter={(value) => value.toLocaleString()}
              label={{
                value: "Population",
                angle: -90,
                position: "insideLeft",
                dy: -15,
                dx: -2,
                style: { fontSize: "12px", fill: "#333", fontWeight: "bold" },
              }}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              width={95}
            />
            <Tooltip
              formatter={(value) => [`${value.toLocaleString()}`, "Population"]}
              contentStyle={{
                backgroundColor: "#ffffff",
                color: "#333",
                border: "1px solid #ddd",
              }}
              itemStyle={{ color: "#2563eb" }}
              labelStyle={{ color: "#111", fontWeight: "bold" }}
            />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);