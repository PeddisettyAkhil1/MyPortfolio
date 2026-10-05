import React, { useState } from 'react';
import { Cpu, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioData } from '../../lib/portfolio-service';
import type { CapabilityColumn } from '../../lib/portfolio-data';

export const AdminSkills: React.FC = () => {
  const { skills, saveCapabilityMatrix } = usePortfolioData();
  const [capabilityMatrix, setCapabilityMatrix] = useState<CapabilityColumn[]>(skills);
  const [newChipInputs, setNewChipInputs] = useState<Record<number, string>>({});

  const handleTitleChange = (idx: number, newTitle: string) => {
    const updated = [...capabilityMatrix];
    updated[idx].title = newTitle;
    setCapabilityMatrix(updated);
  };

  const handleProficiencyChange = (idx: number, val: number) => {
    const updated = [...capabilityMatrix];
    updated[idx].proficiency = Math.min(100, Math.max(0, val));
    setCapabilityMatrix(updated);
  };

  const handleAddChip = (colIdx: number) => {
    const chipText = (newChipInputs[colIdx] || '').trim();
    if (!chipText) return;

    const updated = [...capabilityMatrix];
    updated[colIdx].chips.push(chipText);
    setCapabilityMatrix(updated);
    setNewChipInputs({ ...newChipInputs, [colIdx]: '' });
    toast.success(`Added skill chip "${chipText}"`);
  };

  const handleDeleteChip = (colIdx: number, chipIdx: number) => {
    const updated = [...capabilityMatrix];
    const removedName = updated[colIdx].chips[chipIdx];
    updated[colIdx].chips.splice(chipIdx, 1);
    setCapabilityMatrix(updated);
    toast.info(`Removed skill "${removedName}"`);
  };

  const handleSaveAll = () => {
    saveCapabilityMatrix(capabilityMatrix);
    toast.success('Capability Matrix updated successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#1B1E23] flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-[#E65F2B]" />
            <span>Skills Matrix CMS</span>
          </h2>
          <p className="text-xs text-[#6E6A62] mt-1">
            Edit proficiency meters, column titles, and skill chips.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-3 rounded-full bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Skills Matrix</span>
        </button>
      </div>

      {/* 4-Column Capability Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilityMatrix.map((col, colIdx) => (
          <div
            key={colIdx}
            className="bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Column Title */}
              <div>
                <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                  Category Title {colIdx + 1}
                </label>
                <input
                  type="text"
                  value={col.title}
                  onChange={(e) => handleTitleChange(colIdx, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-bold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
                />
              </div>

              {/* Proficiency Level Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1B1E23] mb-1.5">
                  <span>Proficiency Percentage</span>
                  <span className="text-[#E65F2B] font-extrabold">{col.proficiency}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={col.proficiency}
                    onChange={(e) => handleProficiencyChange(colIdx, parseInt(e.target.value, 10))}
                    className="flex-1 accent-[#E65F2B] cursor-pointer"
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={col.proficiency}
                    onChange={(e) => handleProficiencyChange(colIdx, parseInt(e.target.value, 10) || 0)}
                    className="w-16 px-2.5 py-1 rounded-lg bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-center font-bold text-[#1B1E23]"
                  />
                </div>
              </div>

              {/* Skill Chips List */}
              <div>
                <label className="block text-xs font-bold text-[#1B1E23] mb-2">
                  Skill Chips ({col.chips.length})
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {col.chips.map((chip, chipIdx) => (
                    <span
                      key={chipIdx}
                      className="px-3 py-1.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-semibold text-[#1B1E23] flex items-center space-x-1.5 shadow-2xs group"
                    >
                      <span>{chip}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteChip(colIdx, chipIdx)}
                        className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove Skill"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add New Chip Input */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add new skill (e.g. Unity 3D)"
                    value={newChipInputs[colIdx] || ''}
                    onChange={(e) => setNewChipInputs({ ...newChipInputs, [colIdx]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddChip(colIdx);
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddChip(colIdx)}
                    className="px-3.5 py-2 rounded-xl bg-[#1B1E23] hover:bg-[#E65F2B] text-white text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
