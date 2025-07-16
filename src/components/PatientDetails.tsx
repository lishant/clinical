// import React from 'react';
// import SpeechMetrics from './SpeechMetrics';
// import EntryChart from './EntryChart';
// import EntryTable from './EntryTable';

// export default function PatientDetails({ patient, onBack }: any) {
//   return (
//     <div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {['Entry Details', 'With Images', 'Risk Score', 'Risk Score'].map((label, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow p-4 text-center">
//             <div className="text-sm text-gray-500">{label}</div>
//             <div className="text-lg font-bold">{idx + 1}</div>
//           </div>
//         ))}
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <SpeechMetrics />
//         <EntryChart />
//       </div>

//       <EntryTable />

//       <button onClick={onBack} className="mt-6 text-blue-600 hover:underline">Back to Patients</button>
//     </div>
//   );
// }
import React from "react";
import { ClipboardList, Image, Activity, BarChart2 } from "lucide-react";
import SpeechMetrics from "./SpeechMetrics";
import EntryChart from "./EntryChart";
import EntryTable from "./EntryTable";
import { Patient } from "../types";

interface PatientDetailsProps {
  patient: Patient;
  onBack: () => void;
  Metrics: [string, number][];
}
const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  onBack,
  Metrics,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const filteredEntries = patient.entries.filter((entry)=> entry.rawText && entry.rawText.trim()!=="");
  const todaysEntries =
    filteredEntries?.filter((e: any) => {
      const entryDate = new Date(e.timestamp.seconds * 1000);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    }) ?? [];

  const todayAvgRisk =
    todaysEntries.length > 0
      ? (
          todaysEntries.reduce((sum, e) => sum + (e.riskscore ?? 0), 0) /
          todaysEntries.length
        ).toFixed(2)
      : "-";

  const overallAvgRisk =
    filteredEntries?.length > 0
      ? (
          filteredEntries.reduce((sum, e) => sum + (e.riskscore ?? 0), 0) /
          filteredEntries.length
        ).toFixed(2)
      : "-";

  const metrics = [
    {
      label: "Entry Details",
      icon: ClipboardList,
      value: patient.entries?.length ?? 0,
    },
    {
      label: "With Images",
      icon: Image,
      value: patient.entries?.filter((e: any) => e.imageURL).length ?? 0,
    },
    {
      label: "Risk Score (Today)",
      icon: Activity,
      value: todayAvgRisk,
    },
    {
      label: "Avg. Risk Score",
      icon: BarChart2,
      value: overallAvgRisk,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map(({ label, icon: Icon, value }, idx) => (
          <div
            key={idx}
            className="bg-white flex flex-col rounded-xl shadow p-4 text-center"
          >
            <div className="justify-center mb-2">
              <Icon className="w-5 h-5 text-blue-500 " />
            </div>
            <div>
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-lg font-bold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SpeechMetrics Metrics={Metrics} />
        <EntryChart patient={patient} />
      </div>

      <EntryTable patient={patient} />

      <button onClick={onBack} className="mt-6 text-blue-600 hover:underline">
        Back to Patients
      </button>
    </div>
  );
};
export default PatientDetails;
