import React, { useState } from 'react';
import axios from 'axios';
import closeIcon from '../../../assets/Close.svg';
import plusIcon from '../../../assets/Plus.svg';

function AddDevice({ addOpen, setAddOpen, departments, refreshDevices }) {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    manufacturer: '',
    serialNumber: '',
    assetTag: '',
    status: 'ACTIVE',
    conditionDescription: '',
    departmentId: '',
    location: '',
    supplier: '',
    purchasePrice: '',
    purchaseDate: '',
    warrantyExpiryDate: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    lastCleanedDate: '',
    lastSterilizationDate: '',
    maxUsageHours: '',
    sterilizationIntervalHours: '',
    usageHours: '',
    riskScore: '',
    riskLevel: 'LOW',
    maintenanceDue: 'false',
    sterilizationDue: 'false'
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...formData,
        departmentId: formData.departmentId ? Number(formData.departmentId) : null,
        purchasePrice: formData.purchasePrice !== '' ? Number(formData.purchasePrice) : null,
        maxUsageHours: formData.maxUsageHours !== '' ? Number(formData.maxUsageHours) : null,
        sterilizationIntervalHours: formData.sterilizationIntervalHours !== '' ? Number(formData.sterilizationIntervalHours) : null,
        usageHours: formData.usageHours !== '' ? Number(formData.usageHours) : null,
        riskScore: formData.riskScore !== '' ? Number(formData.riskScore) : null,
        maintenanceDue: formData.maintenanceDue === 'true',
        sterilizationDue: formData.sterilizationDue === 'true',
        lastCleanedDate: formData.lastCleanedDate ? `${formData.lastCleanedDate}T00:00:00` : null,
        lastSterilizationDate: formData.lastSterilizationDate ? `${formData.lastSterilizationDate}T00:00:00` : null
      };
      
      // Clean up empty strings for optional fields
      Object.keys(payload).forEach(key => {
        if (payload[key] === '') {
          payload[key] = null;
        }
      });

      await axios.post("/api/medical-devices", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      refreshDevices();
      setAddOpen(false);
      // Reset form
      setFormData({
        name: '', model: '', manufacturer: '', serialNumber: '', assetTag: '', status: 'ACTIVE',
        conditionDescription: '', departmentId: '', location: '', supplier: '', purchasePrice: '',
        purchaseDate: '', warrantyExpiryDate: '', lastMaintenanceDate: '', nextMaintenanceDate: '',
        lastCleanedDate: '', lastSterilizationDate: '', maxUsageHours: '', sterilizationIntervalHours: '',
        usageHours: '', riskScore: '', riskLevel: 'LOW', maintenanceDue: 'false', sterilizationDue: 'false'
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.error || "Error adding device.");
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${addOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setAddOpen(false)}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-4xl bg-color-gray1 border border-color-white/10 rounded-[8px] transition-all duration-300 transform
        ${addOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"} max-h-[90vh] flex flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-color-white/5'>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-color-purple/10 flex items-center justify-center text-color-purple">
              <img src={plusIcon} alt="" className="w-5" />
            </div>
            <div>
              <h3 className="font-bold text-[20px] text-white">Add New Medical Device</h3>
              <p className="text-[12px] text-color-white/40 font-semibold uppercase tracking-wider">Asset Inventory Management</p>
            </div>
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-color-white/5 transition-all text-color-white/40 hover:text-white" 
            onClick={() => setAddOpen(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5" />
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar bg-color-gray1/50">
          {error && (
            <div className="bg-color-red/10 border border-color-red/20 p-3 rounded-[8px] text-[12px] text-color-red font-semibold mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            
            {/* SECTION 1: Core Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <h4 className="text-[13px] font-bold text-color-purple uppercase tracking-wider col-span-1 md:col-span-2 border-b border-color-white/5 pb-1">
                Core Information
              </h4>
              
              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Device Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. Patient Monitor" />
              </div>
              
              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Serial Number *</label>
                <input required type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. SN-MON-010" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Department *</label>
                <select required name="departmentId" value={formData.departmentId} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all cursor-pointer'>
                  <option value="" disabled>Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Status *</label>
                <select required name="status" value={formData.status} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all cursor-pointer'>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PASSIVE">PASSIVE</option>
                  <option value="SEMI_ACTIVE">SEMI_ACTIVE</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                  <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Model (Optional)</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. IntelliVue MX450" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Manufacturer (Optional)</label>
                <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. Philips" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Asset Tag (Optional)</label>
                <input type="text" name="assetTag" value={formData.assetTag} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. AT-TEST-010" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Location (Optional)</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. ICU Room 3" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Supplier (Optional)</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. Philips Healthcare" />
              </div>
            </div>

            {/* SECTION 2: Purchase & Warranty Details */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <h4 className="text-[13px] font-bold text-color-purple uppercase tracking-wider col-span-1 md:col-span-3 border-b border-color-white/5 pb-1">
                Purchase & Warranty Details
              </h4>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Purchase Price (Optional)</label>
                <input type="number" step="any" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. 32000" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Purchase Date (Optional)</label>
                <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Warranty Expiry Date (Optional)</label>
                <input type="date" name="warrantyExpiryDate" value={formData.warrantyExpiryDate} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' />
              </div>
            </div>

            {/* SECTION 3: Maintenance & Cleaning Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <h4 className="text-[13px] font-bold text-color-purple uppercase tracking-wider col-span-1 md:col-span-2 border-b border-color-white/5 pb-1">
                Maintenance & Cleaning Metrics
              </h4>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Last Maintenance Date (Optional)</label>
                <input type="date" name="lastMaintenanceDate" value={formData.lastMaintenanceDate} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Next Maintenance Date (Optional)</label>
                <input type="date" name="nextMaintenanceDate" value={formData.nextMaintenanceDate} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Last Cleaned Date (Optional)</label>
                <input type="date" name="lastCleanedDate" value={formData.lastCleanedDate} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Last Sterilization Date (Optional)</label>
                <input type="date" name="lastSterilizationDate" value={formData.lastSterilizationDate} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Max Usage Hours (Optional)</label>
                <input type="number" name="maxUsageHours" value={formData.maxUsageHours} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. 15000" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Sterilization Interval Hours (Optional)</label>
                <input type="number" name="sterilizationIntervalHours" value={formData.sterilizationIntervalHours} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. 300" />
              </div>

              <div className='flex flex-col gap-2 col-span-1 md:col-span-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Usage Hours (Optional)</label>
                <input type="number" step="any" name="usageHours" value={formData.usageHours} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. 5400" />
              </div>
            </div>

            {/* SECTION 4: Risk & Due Indicators */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <h4 className="text-[13px] font-bold text-color-purple uppercase tracking-wider col-span-1 md:col-span-2 border-b border-color-white/5 pb-1">
                Risk & Due Indicators
              </h4>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Risk Score (Optional)</label>
                <input type="number" name="riskScore" value={formData.riskScore} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all' placeholder="e.g. 35" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Risk Level (Optional)</label>
                <select name="riskLevel" value={formData.riskLevel} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all cursor-pointer'>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Maintenance Due? (Optional)</label>
                <select name="maintenanceDue" value={formData.maintenanceDue} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all cursor-pointer'>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Sterilization Due? (Optional)</label>
                <select name="sterilizationDue" value={formData.sterilizationDue} onChange={handleChange} className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white transition-all cursor-pointer'>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[13px] font-bold text-color-white/60 uppercase tracking-wide'>Condition Description (Optional)</label>
              <textarea name="conditionDescription" value={formData.conditionDescription} onChange={handleChange} rows="3" className='bg-color-gray2 border border-color-white/10 rounded-[8px] px-4 py-3 outline-none focus:border-color-purple text-[14px] text-white resize-none transition-all' placeholder="e.g. Fully functional, recently calibrated."></textarea>
            </div>

            <div className='flex justify-end gap-3 pt-4 border-t border-color-white/5'>
              <button type="button" onClick={() => setAddOpen(false)} className='px-8 py-3 border border-color-white/10 rounded-[8px] text-[14px] font-bold text-color-white/60 hover:bg-color-white/5 hover:text-white transition-all'>Cancel</button>
              <button type="submit" className='px-8 py-3 bg-color-purple text-white rounded-[8px] text-[14px] font-bold hover:opacity-90 transition-all'>Add Device</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDevice;
