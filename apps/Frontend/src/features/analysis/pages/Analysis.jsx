import React from 'react';
import { adminRoleCards } from '../../../constants';
import Card from '../../../components/ui/Card';
import SystemAlerts from '../components/SystemAlerts';
import AIPredictionList from '../components/AIPredictionList';
import MaintenanceInsights from '../components/MaintenanceInsights';

function Analysis() {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col gap-8 pt-2 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-bold text-white tracking-tight">AI Analysis & Insights</h1>
        <p className="text-[14px] text-color-white/50">Global monitoring, predictive maintenance, and system alerts</p>
      </div>

      {/* Stats Grid - Using adminRoleCards style */}
      <div className="grid grid-cols-4 max-2xl:grid-cols-2 max-md:grid-cols-1 justify-between items-center gap-5">
        {adminRoleCards.map((items, index) => (
          <Card key={index} title={items.title} number={items.number} status={items.status} increaseNum={items.increaseNum} />
        ))}
      </div>

      {/* Main Analysis Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-4">
        {/* Left Column: Alerts and Predictions */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <AIPredictionList token={token} />
          
          <div className=" gap-8">
            <div className="h-[500px]">
              <SystemAlerts token={token} maxHeight="350px" />
            </div>
          </div>
        </div>

        {/* Right Column: Maintenance History */}
        <div className="lg:col-span-4 h-[760px]">
          <MaintenanceInsights token={token} />
        </div>
      </div>
    </div>
  );
}

export default Analysis;



