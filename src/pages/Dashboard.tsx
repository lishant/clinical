import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PatientCard from "../components/PatientCard";
import PatientDetails from "../components/PatientDetails";
import { Patient } from "../types";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";

// const samplePatients: Patient[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//     entries: [],
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     image: "https://randomuser.me/api/portraits/women/2.jpg",
//     entries: [],
//   },
// ];

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patientMetrics, setPatientMetrics] = useState<[string, number][]>([]);
  const calcMetrics = (arr: any[]) => {
    var wpm = 0,
      totalPauseTime = 0,
      meanPauseDuration = 0,
      pauseDensity = 0,
      articulationRate = 0,
      lexicalDiversity = 0,
      syntacticComplexity = 0,
      semanticErrorRate = 0,
      prosodicVariation = 0;
    arr.forEach((e) => {
      if (e.wpm) {
        wpm += e.wpm; // Sum up WPM
      }
      if (e.totalPauseTime) {
        totalPauseTime += e.totalPauseTime; // Sum up total pause time
      }
      if (e.meanPauseDuration) {
        meanPauseDuration += e.meanPauseDuration; // Sum up mean pause duration
      }
      if (e.pauseDensity) {
        pauseDensity += e.pauseDensity; // Sum up pause density
      }
      if (e.articulationRate) {
        articulationRate += e.articulationRate; // Sum up articulation rate
      }
      if (e.lexicalDiversity) {
        lexicalDiversity += e.lexicalDiversity; // Sum up lexical density
      }
      if (e.syntacticComplexity) {
        syntacticComplexity += e.syntacticComplexity; // Sum up synthetic speech rate
      }
      if (e.semanticErrorRate) {
        semanticErrorRate += e.semanticErrorRate; // Sum up semantic error rate
      }
      if (e.prosodicVariation) {
        prosodicVariation += e.prosodicVariation; // Sum up prosodic
      }
    });
    const result: [string, number][] = [];
    const arrLength = arr.length || 1;
    wpm = parseFloat((wpm / arrLength).toFixed(2)); // Calculate average WPM
    totalPauseTime = parseFloat((totalPauseTime / arrLength).toFixed(2)); // Calculate average total pause time
    meanPauseDuration = parseFloat((meanPauseDuration / arrLength).toFixed(2)); // Calculate average mean pause duration
    pauseDensity = parseFloat((pauseDensity / arrLength).toFixed(2)); // Calculate average pause density
    articulationRate = parseFloat((articulationRate / arrLength).toFixed(2)); // Calculate average articulation rate
    lexicalDiversity = parseFloat((lexicalDiversity / arrLength).toFixed(2)); // Calculate average lexical density
    syntacticComplexity = parseFloat(
      (syntacticComplexity / arrLength).toFixed(2)
    ); // Calculate average synthetic speech rate
    semanticErrorRate = parseFloat((semanticErrorRate / arrLength).toFixed(2)); // Calculate average semantic error rate
    prosodicVariation = parseFloat((prosodicVariation / arrLength).toFixed(2)); // Calculate average prosodic
    result.push(["Words Per Minute(WPM)", wpm]);
    result.push(["Total pause time", totalPauseTime]);
    result.push(["Mean pause duration", meanPauseDuration]);
    result.push(["Pause density", pauseDensity]);
    result.push(["Articulation rate", articulationRate]);
    result.push(["Lexical diversity", lexicalDiversity]);
    result.push(["Syntactic Complexit", syntacticComplexity]);
    result.push(["Semantic error rate", semanticErrorRate]);
    result.push(["Prosodic Variation", prosodicVariation]);
    setPatientMetrics(result);
    return result;
  };
  useEffect(() => {
    const fetchPatients = async () => {
      const snap = await getDocs(
        query(collection(db, "entries"), orderBy("timestamp", "desc"))
      );

      const currentEntries = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Array<{ id: string; rawText?: string; [key: string]: any }>;
      console.log("entries==>", currentEntries);
      const filteredEntries = currentEntries.filter((entry) => entry.rawText && entry.rawText.trim() !== "");
      const metrics = calcMetrics(filteredEntries);
      const patient = {
        id: 1,
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        entries: currentEntries,
        metrics: metrics,
      };
      setPatients([patient]);
    };
    fetchPatients();
  }, []);
  const handleSidebarNav = () => {
    // Reset to patient list when switching nav
    setSelectedPatient(null);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar onBack={handleSidebarNav} />
      </div>

      {/* Mobile Hamburger Button */}
      {!isSidebarOpen && (
        <div className="md:hidden fixed top-0 left-0 z-50">
          <button
            className="m-2 p-2 rounded-md bg-white shadow-md"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 flex"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 bg-white h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onBack={handleSidebarNav} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Navbar
          onBack={selectedPatient ? () => setSelectedPatient(null) : () => {}}
          title={selectedPatient ? selectedPatient.name : "My Patients"}
        />
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          {!selectedPatient ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  name={patient.name}
                  image={patient.image}
                  entryCount={patient.entries.length}
                  onClick={() => setSelectedPatient(patient)}
                />
              ))}
            </div>
          ) : (
            <PatientDetails
              patient={selectedPatient}
              onBack={() => setSelectedPatient(null)}
              Metrics = {patientMetrics}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
