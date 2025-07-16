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
  prettyDate: string;
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

function groupAndAverage(entries: EntryMetric[], metric: keyof EntryMetric, groupBy: 'daily' | 'weekly' | 'monthly') {
  const parseGroupKey = (date: Date): string => {
    if (groupBy === 'daily') {
      return date.toISOString().split("T")[0];
    } else if (groupBy === 'weekly') {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      return start.toISOString().split("T")[0];
    } else {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
  };

  const groups: { [key: string]: EntryMetric[] } = {};

  entries.forEach((entry) => {
    const date = new Date(entry.prettyDate);
    const key = parseGroupKey(date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  });

  const sortedKeys = Object.keys(groups).sort();

  return sortedKeys.map((key) => {
    const entriesThisGroup = groups[key];
    const avg = entriesThisGroup.reduce((acc, cur) => acc + (cur[metric] as number), 0) / entriesThisGroup.length;
    return { date: key, value: avg };
  });
}

interface EntryChartProps {
  patient: Patient;
}

const EntryChart: React.FC<EntryChartProps> = ({ patient }) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof EntryMetric>("riskscore");
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">("daily");

  const sortedArray = useMemo(() => {
    const filteredEntries = patient.entries.filter((entry) => entry.rawText && entry.rawText.trim() !== "");
    return [...filteredEntries]
      .map((item) => {
        const date = new Date(item.prettyDate);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return { ...item, prettyDate: `${yyyy}-${mm}-${dd}` };
      })
      .sort((a, b) => new Date(a.prettyDate).getTime() - new Date(b.prettyDate).getTime());
  }, [patient.entries]);

  const chartData = useMemo(() => {
    return groupAndAverage(sortedArray, selectedMetric, timeFrame);
  }, [selectedMetric, timeFrame, sortedArray]);

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
