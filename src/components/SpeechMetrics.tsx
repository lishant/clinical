import React from 'react';

const metrics = [
  ['Words Per Minute(WPM)', '0.0'],
  ['Pause Density', '10.6'],
  ['Articulation Rate', '0.0'],
  ['Lexical Diversity', '0.0'],
  ['Semantic Error Rate', '0.0'],
  ['Prosodic Variation', '0.0'],
]; 

interface SpeechMetricsProps {
  Metrics : [string, number][];
}

const SpeechMetrics: React.FC<SpeechMetricsProps> = ({Metrics}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Average Speech Metrics - Overall</h2>
      <table className="min-w-full text-sm">
        <tbody className="divide-y divide-gray-200">
          {Metrics.map(([label, value]) => (
            <tr key={label}>
              <td className="py-2  font-medium">{label}</td>
              <td className="py-2 text-right font-medium">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SpeechMetrics;
