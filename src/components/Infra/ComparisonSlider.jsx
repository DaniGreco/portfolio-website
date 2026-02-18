import React, { useState } from 'react';

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl">
      {/* The "After" Image (Sovereign Cloud) - Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white p-10">
          <h3 className="text-3xl font-bold">The Sovereign Cloud</h3>
          <ul className="text-left mt-4 space-y-2">
             <li>✅ Hetzner Dedicated Bare Metal</li>
             <li>✅ 3-2-1 Backup Strategy (Local + Cloud)</li>
             <li>✅ Headscale Mesh Network</li>
             <li>✅ Automated with Terraform</li>
          </ul>
        </div>
      </div>

      {/* The "Before" Image (Dusty Room) - Clipped Overlay */}
      <div 
        className="absolute inset-0 bg-sepia-600 grayscale flex items-center justify-center bg-gray-200"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="text-center text-gray-800 p-10 w-full">
           {/* Content mirrors the structure above but "Old School" */}
           <h3 className="text-3xl font-bold">The Legacy Server</h3>
           <ul className="text-left mt-4 space-y-2">
             <li>❌ Single Point of Failure</li>
             <li>❌ Manual "ClickOps" Management</li>
             <li>❌ Expensive Proprietary Licenses</li>
             <li>❌ "It works on my machine"</li>
           </ul>
        </div>
      </div>

      {/* The Slider Handle */}
      <input 
        type="range" 
        min="0" max="100" 
        value={sliderPosition} 
        onChange={(e) => setSliderPosition(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
      
      {/* Visual Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white z-10 pointer-events-none" 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg">
           ↔️
        </div>
      </div>
    </div>
  );
}