import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, FolderKanban, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioData } from '../../lib/portfolio-service';
import type { Project } from '../../lib/portfolio-data';

export const AdminProjects: React.FC = () => {
  const { projects, saveProjects } = usePortfolioData();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processImageFile = (file: File, callback: (base64Url: string) => void) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, WebP, GIF, etc.)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image size exceeds 8MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
        toast.success('Image loaded via drag & drop!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsCreatingNew(false);
  };

  const handleStartNew = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      title: 'New Interactive Project',
      displayTitle: 'New Project Title — UX/UI',
      subCategory: 'UX/UI DESIGN',
      badgeTopLeft: 'UX CASE STUDY',
      tagline: 'Short project summary tagline',
      category: 'UI/UX',
      description: 'Short overview description of the project.',
      fullDescription: 'Detailed deep dive description of the user experience and implementation.',
      challenge: 'Key design or technical challenge faced.',
      solution: 'How the design solution resolved the challenge.',
      impact: 'Measurable results or user impact.',
      coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000',
      gallery: [],
      tags: ['Figma', 'Prototyping'],
      metrics: [
        { label: 'Tool', value: 'Figma' },
        { label: 'Flow', value: 'End-to-End' },
      ],
      deliverables: ['High-Fidelity Wireframes', 'Interactive Figma Prototype'],
      interactiveDemoType: 'link',
      featured: true,
    };
    setEditingProject(newProj);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: Project[];
    if (isCreatingNew) {
      updatedList = [editingProject, ...projects];
    } else {
      updatedList = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }

    saveProjects(updatedList);
    toast.success(isCreatingNew ? 'New project added successfully!' : 'Project updated successfully!');
    setEditingProject(null);
    setIsCreatingNew(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updatedList = projects.filter((p) => p.id !== id);
      saveProjects(updatedList);
      toast.success(`Deleted project "${title}"`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#1B1E23] flex items-center space-x-2">
            <FolderKanban className="w-6 h-6 text-[#E65F2B]" />
            <span>Projects CMS ({projects.length})</span>
          </h2>
          <p className="text-xs text-[#6E6A62] mt-1">
            Create, edit, or remove project case studies and game builds.
          </p>
        </div>

        <button
          onClick={handleStartNew}
          className="px-5 py-3 rounded-full bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Editor Modal / Panel */}
      {editingProject && (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#E65F2B] shadow-2xl space-y-6 relative animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DC]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E65F2B]" />
              <h3 className="text-lg font-bold font-heading text-[#1B1E23]">
                {isCreatingNew ? 'Create New Project' : `Editing: ${editingProject.title}`}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="p-2 rounded-full hover:bg-[#F0EEE8] text-[#6E6A62] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Project Title <span className="text-[#E65F2B]">*</span>
              </label>
              <input
                type="text"
                required
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-semibold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              />
            </div>

            {/* Display Title */}
            <div>
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Display Card Title
              </label>
              <input
                type="text"
                value={editingProject.displayTitle || ''}
                onChange={(e) => setEditingProject({ ...editingProject, displayTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-semibold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Category
              </label>
              <select
                value={editingProject.category}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    category: e.target.value as 'UI/UX' | 'Game Dev' | 'Vibe Coding',
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-semibold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              >
                <option value="UI/UX">UI/UX Design</option>
                <option value="Game Dev">Game Dev</option>
                <option value="Vibe Coding">Vibe Coding ⚡</option>
              </select>
            </div>

            {/* Sub-Category Badge */}
            <div>
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Sub-Category Label (e.g. UX/UI DESIGN)
              </label>
              <input
                type="text"
                value={editingProject.subCategory || ''}
                onChange={(e) => setEditingProject({ ...editingProject, subCategory: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-semibold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              />
            </div>

            {/* Tagline */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Short Card Tagline <span className="text-[#E65F2B]">*</span>
              </label>
              <input
                type="text"
                required
                value={editingProject.tagline}
                onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-semibold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              />
            </div>

            {/* Cover Image Upload (Drag & Drop + URL Input) */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-[#1B1E23] flex items-center justify-between">
                <span>Project Cover Image</span>
                <span className="text-[10px] text-[#6E6A62] font-mono">Drag & Drop Image File or Paste Link</span>
              </label>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    processImageFile(e.dataTransfer.files[0], (url) => {
                      setEditingProject({ ...editingProject, coverImage: url });
                    });
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden ${
                  isDragging
                    ? 'border-[#E65F2B] bg-[#E65F2B]/10 scale-[1.01]'
                    : 'border-[#E5E2DC] hover:border-[#E65F2B]/60 bg-[#F7F6F3]'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      processImageFile(e.target.files[0], (url) => {
                        setEditingProject({ ...editingProject, coverImage: url });
                      });
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />

                {editingProject.coverImage ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                    <div className="w-36 h-22 rounded-xl overflow-hidden bg-black/10 shrink-0 border border-[#E5E2DC] relative shadow-sm">
                      <img
                        src={editingProject.coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#1B1E23] flex items-center space-x-1.5">
                        <ImageIcon className="w-4 h-4 text-[#E65F2B]" />
                        <span>Project Cover Image Set</span>
                      </div>
                      <p className="text-[11px] text-[#6E6A62] font-mono truncate max-w-md mt-0.5">
                        {editingProject.coverImage.startsWith('data:')
                          ? 'Uploaded Image File (Base64 Data URL)'
                          : editingProject.coverImage}
                      </p>
                      <p className="text-[10px] text-[#E65F2B] font-semibold mt-1">
                        Click or Drag & Drop another image to change
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="w-12 h-12 rounded-full bg-[#E65F2B]/10 text-[#E65F2B] flex items-center justify-center mx-auto">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-[#1B1E23]">
                      Drag and drop your project cover image here
                    </div>
                    <p className="text-[11px] text-[#6E6A62]">
                      Supports PNG, JPG, WebP, GIF (or click to browse local files)
                    </p>
                  </div>
                )}
              </div>

              {/* Paste Direct URL Fallback Input */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[10px] font-mono text-[#8A857B] shrink-0 uppercase">Or Image URL Link:</span>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={editingProject.coverImage}
                  onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Short Overview Description
              </label>
              <textarea
                rows={2}
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
              />
            </div>

            {/* Full Modal Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Full Modal Case Study Description
              </label>
              <textarea
                rows={3}
                value={editingProject.fullDescription}
                onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
              />
            </div>

            {/* Challenge & Solution */}
            <div>
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Challenge
              </label>
              <textarea
                rows={2}
                value={editingProject.challenge}
                onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Solution
              </label>
              <textarea
                rows={2}
                value={editingProject.solution}
                onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
              />
            </div>

            {/* Tags (comma separated) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={editingProject.tags.join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="Figma, UI/UX, Design System"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              />
            </div>

            {/* Deliverables (line separated) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#1B1E23] mb-1">
                Deliverables (One item per line)
              </label>
              <textarea
                rows={3}
                value={editingProject.deliverables.join('\n')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    deliverables: e.target.value.split('\n').filter(Boolean),
                  })
                }
                placeholder="Dish Discovery & Menu Screens&#10;Streamlined Checkout Flow"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E5E2DC]">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-5 py-2.5 rounded-xl bg-[#F7F6F3] hover:bg-[#E5E2DC] text-[#1B1E23] text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl p-5 border border-[#E5E2DC] shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Image Thumbnail */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-[#F0EEE8] relative border border-[#E5E2DC]">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#1B1E23] text-white shadow-xs">
                  {proj.category}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-base font-bold font-heading text-[#1B1E23] mb-1 leading-snug">
                {proj.title}
              </h3>
              <p className="text-xs text-[#6E6A62] leading-relaxed line-clamp-2 mb-4">
                {proj.tagline}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-[#F7F6F3] text-[10px] font-mono font-semibold text-[#1B1E23] border border-[#E5E2DC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E2DC]">
              <button
                onClick={() => handleStartEdit(proj)}
                className="px-4 py-2 rounded-xl bg-[#1B1E23] hover:bg-[#E65F2B] text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Project</span>
              </button>

              <button
                onClick={() => handleDelete(proj.id, proj.title)}
                className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
