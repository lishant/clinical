import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Patient } from "../types";

type EntryMetric = {
  date: string; // format: YYYY-MM-DD
  riskscore: number;
  wpm: number;
  pauseDensity: number;
  articulationRate: number;
  lexicalDiversity: number;
  semanticErrorRate: number;
  prosodicVariation: number;
  totalPauseTime: number;
  meanPauseDuration: number;
  syntacticComplexity: number;

};

const mockData: EntryMetric[] = [
  { date: "2025-06-01", riskscore: 0.5, wpm: 110, pauseDensity: 3, articulationRate: 1.5, lexicalDiversity: 0.8, semanticErrorRate: 0.1, prosodicVariation: 0.3, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-02", riskscore: 0.6, wpm: 105, pauseDensity: 4, articulationRate: 1.4, lexicalDiversity: 0.85, semanticErrorRate: 0.12, prosodicVariation: 0.4, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-03", riskscore: 0.4, wpm: 100, pauseDensity: 5, articulationRate: 1.3, lexicalDiversity: 0.82, semanticErrorRate: 0.11, prosodicVariation: 0.35, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-04", riskscore: 0.7, wpm: 120, pauseDensity: 2.5, articulationRate: 1.6, lexicalDiversity: 0.87, semanticErrorRate: 0.13, prosodicVariation: 0.38, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-05", riskscore: 0.7, wpm: 120, pauseDensity: 2.5, articulationRate: 1.6, lexicalDiversity: 0.87, semanticErrorRate: 0.13, prosodicVariation: 0.38, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-06", riskscore: 0.7, wpm: 120, pauseDensity: 2.5, articulationRate: 1.6, lexicalDiversity: 0.87, semanticErrorRate: 0.13, prosodicVariation: 0.38, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-07", riskscore: 0.7, wpm: 120, pauseDensity: 2.5, articulationRate: 1.6, lexicalDiversity: 0.87, semanticErrorRate: 0.13, prosodicVariation: 0.38, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-08", riskscore: 0.7, wpm: 120, pauseDensity: 2.5, articulationRate: 1.6, lexicalDiversity: 0.87, semanticErrorRate: 0.13, prosodicVariation: 0.38, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-09", riskscore: 0.7, wpm: 120, pauseDensity: 2.5, articulationRate: 1.6, lexicalDiversity: 0.87, semanticErrorRate: 0.13, prosodicVariation: 0.38, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-10", riskscore: 0.8, wpm: 115, pauseDensity: 3.5, articulationRate: 1.7, lexicalDiversity: 0.9, semanticErrorRate: 0.1, prosodicVariation: 0.42, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-14", riskscore: 0.65, wpm: 108, pauseDensity: 3.8, articulationRate: 1.5, lexicalDiversity: 0.83, semanticErrorRate: 0.14, prosodicVariation: 0.4, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-20", riskscore: 0.55, wpm: 95, pauseDensity: 4.5, articulationRate: 1.2, lexicalDiversity: 0.79, semanticErrorRate: 0.15, prosodicVariation: 0.33, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-25", riskscore: 0.6, wpm: 98, pauseDensity: 4.2, articulationRate: 1.3, lexicalDiversity: 0.8, semanticErrorRate: 0.14, prosodicVariation: 0.36, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-06-26", riskscore: 0.2, wpm: 98, pauseDensity: 4.2, articulationRate: 1.3, lexicalDiversity: 0.8, semanticErrorRate: 0.14, prosodicVariation: 0.36, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },
  { date: "2025-07-01", riskscore: 0.6, wpm: 98, pauseDensity: 4.2, articulationRate: 1.3, lexicalDiversity: 0.8, semanticErrorRate: 0.14, prosodicVariation: 0.36, totalPauseTime: 3.03, meanPauseDuration: 0.6, syntacticComplexity:0.5 },

];

const metrics = [
  { label: "Risk Score", value: "riskscore" },
  { label: "Words Per Minute", value: "wpm" },
  { label: "Pause Density", value: "pauseDensity" },
  { label: "Articulation Rate", value: "articulationRate" },
  { label: "Lexical Diversity", value: "lexicalDiversity" },
  { label: "Semantic Error Rate", value: "semanticErrorRate" },
  { label: "Prosodic Variation", value: "prosodicVariation" },
  { label: "Total Pause Time", value: "totalPauseTime" },
  { label: "Mean Pause Duration", value: "meanPauseDuration" },
  { label: "Syntactic Complexit", value: "syntacticComplexity" },
];

function aggregateWeekly(data: EntryMetric[], metric: keyof EntryMetric) {
  const weekMap: { [week: string]: number[] } = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Sunday
    const weekStr = weekStart.toISOString().split("T")[0];

    if (!weekMap[weekStr]) weekMap[weekStr] = [];
    weekMap[weekStr].push(item[metric] as number);
  });

  return Object.entries(weekMap).map(([week, values]) => ({
    date: week,
    value: values.reduce((a, b) => a + b, 0) / values.length,
  }));
}

function aggregateMonthly(data: EntryMetric[], metric: keyof EntryMetric) {
  const monthMap: { [month: string]: number[] } = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!monthMap[monthStr]) monthMap[monthStr] = [];
    monthMap[monthStr].push(item[metric] as number);
  });

  return Object.entries(monthMap).map(([month, values]) => ({
    date: month,
    value: values.reduce((a, b) => a + b, 0) / values.length,
  }));
}

interface EntryChartProps {
  patient : Patient;
}

const EntryChart: React.FC<EntryChartProps> = ({patient}) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof EntryMetric>("riskscore");
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">("daily");

  const chartData = useMemo(() => {
    if (timeFrame === "weekly") return aggregateWeekly(mockData, selectedMetric);
    if (timeFrame === "monthly") return aggregateMonthly(mockData, selectedMetric);
    return mockData.map((d) => ({ date: d.date, value: d[selectedMetric] as number }));
  }, [selectedMetric, timeFrame]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        <h2 className="text-lg font-semibold">Patient Metric Trends</h2>
        <div className="flex gap-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as keyof EntryMetric)}
            className="border rounded px-2 py-1 text-sm"
          >
            {metrics.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value as "daily" | "weekly" | "monthly")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EntryChart;
