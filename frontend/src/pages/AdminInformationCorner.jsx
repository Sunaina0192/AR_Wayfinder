import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { 
  Info, Upload, Trash2, FileText, Download, Shield, X, AlertCircle, Image, FileSpreadsheet
} from 'lucide-react';

const AdminInformationCorner = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const [file, setFile] = useState(null);
  const [docData, setDocData] = useState({ title: '', description: '', type: 'PDF' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/upload`);
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file to upload');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', docData.title);
    formData.append('description', docData.description);
    formData.append('type', docData.type);

    setUploading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}` 
        }
      });
      setShowUploadModal(false);
      setFile(null);
      setDocData({ title: '', description: '', type: 'PDF' });
      fetchDocuments();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document permanently?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/upload/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-400" />;
      case 'Excel': return <FileSpreadsheet className="w-6 h-6 text-green-400" />;
      case 'Image': return <Image className="w-6 h-6 text-blue-400" />;
      default: return <FileText className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider flex items-center gap-3">
            <Info className="w-8 h-8 text-accent" />
            Information Corner Docs
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage public documents, forms, and statutory uploads</p>
        </div>
        
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-sm hover:bg-accent/90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <Upload className="w-5 h-5" /> Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : documents.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-white/10 border-dashed">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Documents Uploaded</p>
          </div>
        ) : (
          documents.map(doc => (
            <div key={doc._id} className="bg-slate-900 border border-white/10 rounded-3xl p-6 group hover:border-accent/50 transition-all shadow-xl hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  {getIconForType(doc.type)}
                </div>
                <div className="flex gap-2">
                  <a href={`${API_BASE_URL}${doc.fileUrl}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all">
                    <Download className="w-4 h-4" />
                  </a>
                  <button onClick={() => handleDelete(doc._id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2 line-clamp-1">{doc.title}</h3>
              {doc.description && <p className="text-sm text-slate-400 line-clamp-2 mb-4">{doc.description}</p>}
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{doc.size || 'Unknown'}</span>
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> {doc.uploadedBy}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !uploading && setShowUploadModal(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-white uppercase tracking-wide">Upload Document</h2>
              <button onClick={() => !uploading && setShowUploadModal(false)} className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Document Title</label>
                <input type="text" required value={docData.title} onChange={(e) => setDocData({...docData, title: e.target.value})} placeholder="e.g. Academic Calendar 2026" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Description (Optional)</label>
                <textarea rows="2" value={docData.description} onChange={(e) => setDocData({...docData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent resize-none"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">File Type</label>
                  <select value={docData.type} onChange={(e) => setDocData({...docData, type: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent">
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel / CSV</option>
                    <option value="Word">Word Doc</option>
                    <option value="Image">Image</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">File</label>
                  <input type="file" required onChange={handleFileChange} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-accent/10 file:text-accent hover:file:bg-accent/20 cursor-pointer" />
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button type="submit" disabled={uploading || !file} className="w-full py-4 rounded-xl bg-accent text-dark font-black uppercase tracking-[0.2em] hover:bg-accent/90 transition-all flex justify-center items-center gap-2 disabled:opacity-50">
                  {uploading ? (
                    <><div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin"></div> Uploading...</>
                  ) : (
                    <><Upload className="w-5 h-5" /> Upload to Server</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInformationCorner;
