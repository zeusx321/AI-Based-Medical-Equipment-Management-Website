import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceInsights = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: 1,
    performedById: 1,
    issueDescription: '',
    actionTaken: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    cost: 0
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/maintenance-logs?size=50&sort=createdAt,desc', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(res.data.content || res.data);
    } catch (err) {
      console.error("Error fetching maintenance logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/maintenance-logs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchLogs();
    } catch (err) {
      alert("Error adding log: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-color-gray1 rounded-[8px] p-6 user-card border border-color-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 ">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-color-green/10 flex items-center justify-center text-color-green">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3 className="text-[16px] font-semibold text-white">Maintenance Insights</h3>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-8 h-8 rounded-full bg-color-purple text-white flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-color-purple/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto user-card custom-scrollbar pr-2">
        {loading ? (
          <p className="text-center text-color-white/30 py-10 text-sm">Loading logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-color-white/30 py-10 text-sm">No maintenance history.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-color-white/5 border border-color-white/5 rounded-[12px] p-4 hover:bg-color-white/[0.08] transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                  log.priority === 'CRITICAL' ? 'bg-color-red/10 border-color-red text-color-red' : 
                  log.priority === 'HIGH' ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 
                  'bg-sky-500/10 border-sky-500 text-sky-500'
                }`}>
                  {log.priority}
                </span>
                <span className="text-[11px] text-color-white/30">{log.maintenanceDate || 'No Date'}</span>
              </div>
              <h4 className="text-[14px] font-semibold text-white mb-1">Device ID: {log.deviceId}</h4>
              <p className="text-[13px] text-color-white/60 line-clamp-2 mb-2">{log.issueDescription}</p>
              <div className="flex items-center justify-between pt-3 border-t border-color-white/5">
                <span className={`text-[11px] font-bold ${log.status === 'COMPLETED' ? 'text-color-green' : 'text-color-warning'}`}>
                  {log.status}
                </span>
                <span className="text-[12px] font-bold text-white">${log.cost?.toLocaleString() || 0}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Log Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${showModal ? "visible opacity-100" : "invisible opacity-0"}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
        
        {/* Modal Container */}
        <div className={`relative bg-color-gray1 border border-color-white/10 rounded-[8px] w-full max-w-xl duration-300 flex flex-col overflow-hidden
          ${showModal ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`} onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-color-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-color-purple/10 flex items-center justify-center text-color-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-white leading-tight">Add Maintenance Log</h3>
                <p className="text-[12px] text-color-white/40 font-semibold uppercase tracking-wider">Service Record</p>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-color-white/5 transition-all text-color-white/40 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Device ID *</label>
                  <input 
                    type="number" 
                    value={formData.deviceId} 
                    onChange={e => setFormData({...formData, deviceId: e.target.value})} 
                    className="bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all placeholder:text-color-white/10" 
                    placeholder="e.g. 1"
                    required 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Priority</label>
                  <select 
                    value={formData.priority} 
                    onChange={e => setFormData({...formData, priority: e.target.value})} 
                    className="bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Repair Cost ($)</label>
                <input 
                  type="number" 
                  value={formData.cost} 
                  onChange={e => setFormData({...formData, cost: e.target.value})} 
                  className="bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all placeholder:text-color-white/10" 
                  placeholder="e.g. 500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-wide">Issue Description *</label>
                <textarea 
                  value={formData.issueDescription} 
                  onChange={e => setFormData({...formData, issueDescription: e.target.value})} 
                  className="bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white h-24 resize-none transition-all placeholder:text-color-white/10" 
                  placeholder="Describe the issue detected..."
                  required 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-color-white/5">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-6 py-2.5 border border-color-white/10 rounded-[8px] text-[14px] font-bold text-color-white/60 hover:bg-color-white/5 transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-2.5 bg-color-purple text-white rounded-[8px] text-[14px] font-bold hover:opacity-90 transition-all shadow-lg shadow-color-purple/20"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceInsights;

