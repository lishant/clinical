import React, { useState } from "react";
import EntryModal from "./EntryModal";
import { Patient } from "../types/index";
import EmptyModal from "./EmptyModal";

const entries = [
  {
    date: "2025-06-30 12:00",
    excerpt: "Short sentence...",
    imageUrl: "#",
    audioUrl: "#",
    metrics: {
      wpm: 0.0,
      pause: 10.6,
      articulation: 0.0,
      diversity: 0.0,
      semantic: 0.0,
      prosody: 0.0,
      risk: 0.3,
    },
  },
];

interface EntryTableProps {
  patient: Patient;
}
const EntryTable: React.FC<EntryTableProps> = ({ patient }) => {
  const [modalData, setModalData] = useState<any>(null);
  const [showEmptyModal, setShowEmptyModal] = useState<boolean>(false);
  const convertTimestamp = (timestamp: any) => {
    const millis =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1_000_000); // Convert to milliseconds
    const date = new Date(millis);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };
  return (
    <div className="mt-6 pt-6">
      <h2 className="text-lg font-semibold mb-2 text-left">Entry List</h2>
      <table className="min-w-full text-sm bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Date & Time</th>
            <th className="p-2">Raw Text</th>
            <th className="p-2">Image</th>
            <th className="p-2">Audio</th>
          </tr>
        </thead>
        <tbody>
          {patient.entries.map((entry, idx) => (
            <tr key={idx} className="border-t cursor-pointer hover:bg-gray-50">
              <td className="p-2" onClick={() => entry.rawText ? setModalData(entry) : setShowEmptyModal(true)}>
                {convertTimestamp(entry.timestamp)}
              </td>
              <td className="p-2" onClick={() => entry.rawText ? setModalData(entry) : setShowEmptyModal(true)}>
                {entry.rawText}
              </td>
              <td className="p-2">
                {entry.imageURL ? (
                  <a
                    href={entry.imageURL}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400 ">-</span>
                )}
              </td>
              <td className="p-2">
                {entry.audioURL ? (
                  <a
                    href={entry.audioURL}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play
                  </a>
                ) : (
                  <span className="text-gray-400 ">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalData && (
        <EntryModal entry={modalData} onClose={() => setModalData(null)} />
      )}
      {showEmptyModal && <EmptyModal onClose = {() => setShowEmptyModal(false)} />}
    </div>
  );
};

export default EntryTable;
