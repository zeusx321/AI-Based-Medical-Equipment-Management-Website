import React, { useState, useEffect } from 'react';
import axios from 'axios';
import alertWarningIcon from '../../../assets/Error-Warning.svg';
import alertRedIcon from '../../../assets/Error-Red.svg';
import alertGreenIcon from '../../../assets/Error-Green.svg';

const SystemAlerts = ({ token, maxHeight = "400px" }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/alerts?size=20&sort=createdAt,desc', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(res.data.content || res.data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Periodic polling as a fallback since EventSource requires backend changes for headers
    const interval = setInterval(() => {
      fetchAlerts();
    }, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval);
  }, [token]);

  const getSeverityData = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          colorClass: 'bg-color-red/10 text-color-red',
          icon: alertRedIcon,
          borderClass: 'border-color-red/20 bg-color-red/5'
        };
      case 'INFO':
        return {
          colorClass: 'bg-color-green/10 text-color-green',
          icon: alertGreenIcon,
          borderClass: 'border-color-green/20 bg-color-green/5'
        };
      default:
        return {
          colorClass: 'bg-color-warning/10 text-color-warning',
          icon: alertWarningIcon,
          borderClass: 'border-color-warning/20 bg-color-warning/5'
        };
    }
  };

  return (
    <div className="bg-color-gray1 border border-color-white/10 rounded-[12px] p-8 user-card flex flex-col gap-6 h-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-color-red/10 flex items-center justify-center text-color-red">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-white tracking-tight">
            System Alerts
          </h2>
          <p className="text-[12px] text-color-white/40 uppercase tracking-widest font-semibold">
            Priority Notifications
          </p>
        </div>
      </div>

      <div className={`flex flex-col gap-4 overflow-y-auto user-card custom-scrollbar pr-2`} style={{ maxHeight }}>
        {loading ? (
          <div className="py-10 text-center text-color-white/30 text-sm animate-pulse">Synchronizing alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="py-10 text-center text-color-white/30 text-sm">No active alerts found.</div>
        ) : (
          alerts.map((alert, idx) => {
            const severity = getSeverityData(alert.severity);
            return (
              <div
                key={alert.id || idx}
                className={`p-5 rounded-[12px] flex flex-col gap-4 bg-color-white/5 border border-color-white/5 hover:bg-color-white/[0.08] transition-all duration-300 ${alert.status === 'NEW' ? 'border-color-purple/20 bg-color-purple/5 shadow-[0_0_15px_rgba(168,85,247,0.05)]' : ''}`}
              >
                <div className="flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${severity.colorClass} border ${severity.borderClass}`}>
                    <img src={severity.icon} alt="Alert" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="text-white text-[14px] font-bold uppercase tracking-wider">
                        {alert.type?.replace('_', ' ')}
                      </h3>
                      <span className="text-[11px] text-color-white/30 font-medium bg-color-white/5 px-2 py-0.5 rounded-full">
                        {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[13px] text-color-white/60 font-medium leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                </div>

                {/* AI Insight Section - New based on Documentation */}
                {alert.aiExplanation && (
                  <div className="mt-1 p-4 rounded-[8px] bg-color-purple/10 border border-color-purple/20 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-color-purple">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 8v4l3 3"></path></svg>
                      <span className="text-[11px] font-bold uppercase tracking-widest">AI Intelligence Insight</span>
                    </div>
                    <p className="text-[12px] text-color-white/50 leading-relaxed italic">
                      "{alert.aiExplanation}"
                    </p>
                    {alert.aiProvider && (
                      <div className="flex justify-end">
                        <span className="text-[9px] text-color-purple/40 font-bold uppercase italic">Powered by {alert.aiProvider}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SystemAlerts;
