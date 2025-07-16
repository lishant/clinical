import React from 'react';
import { Dialog } from '@headlessui/react';

export default function EmptyModal({ onClose }: any) {
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="bg-white p-6 rounded-xl shadow-xl z-10 w-11/12 max-w-md">
        <Dialog.Title className="text-lg font-semibold mb-4">Notification</Dialog.Title>
        <ul className="space-y-2 text-sm">
          {/* {Object.entries(entry.metrics).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span className="capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="font-medium">{String(value)}</span>
            </li>
          ))} */}
          <li className='flex justify-between'>
            <span className='capitalize'>entry made with text-no speech</span>
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
