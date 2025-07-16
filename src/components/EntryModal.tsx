import React from 'react';
import { Dialog } from '@headlessui/react';

export default function EntryModal({ entry, onClose }: any) {
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="bg-white p-6 rounded-xl shadow-xl z-10 w-11/12 max-w-md">
        <Dialog.Title className="text-lg font-semibold mb-4">Entry Metrics</Dialog.Title>
        <ul className="space-y-2 text-sm">
          {/* {Object.entries(entry.metrics).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span className="capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="font-medium">{String(value)}</span>
            </li>
          ))} */}
          <li className='flex justify-between'>
            <span className='capitalize'>Words Per Miniute(WPM)</span>
            <span className='font-medium'>{parseFloat((entry.wpm).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Total Pause time</span>
            <span className='font-medium'>{parseFloat((entry.totalPauseTime).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Mean pause duration</span>
            <span className='font-medium'>{parseFloat((entry.meanPauseDuration).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Pause density</span>
            <span className='font-medium'>{parseFloat((entry.pauseDensity).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Articulation Rate</span>
            <span className='font-medium'>{parseFloat((entry.articulationRate).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Lexical diversity</span>
            <span className='font-medium'>{parseFloat((entry.lexicalDiversity).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>SyntacticComplexity</span>
            <span className='font-medium'>{parseFloat((entry.syntacticComplexity).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Semantic error rate</span>
            <span className='font-medium'>{parseFloat((entry.semanticErrorRate).toFixed(2))}</span>
          </li>
          <li className='flex justify-between'>
            <span className='capitalize'>Prosodic Variation</span>
            <span className='font-medium'>{parseFloat((entry.prosodicVariation).toFixed(2))}</span>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 text-blue-600 hover:underline float-right"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
