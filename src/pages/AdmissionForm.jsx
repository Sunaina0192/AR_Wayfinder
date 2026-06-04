import React, { useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {
  User, Phone, Mail, MapPin, BookOpen, FileText,
  Upload, CheckCircle, ChevronRight, ChevronLeft,
  GraduationCap, ClipboardList, Camera
} from 'lucide-react';

const STEPS = ['Personal Details', 'Address', 'Academic Details', 'Documents', 'Review & Submit'];

const COURSES = [
  'B.Tech Computer Science Engineering',
  'B.Tech Electronics & Communication',
  'B.Tech Mechanical Engineering',
  'B.Tech Civil Engineering',
  'MBA - Master of Business Administration',
  'M.Tech Engineering',
  'BA / B.Sc Sciences',
  'BBA - Management',
  'Ph.D Programs',
];

const STATES = ['Punjab', 'Haryana', 'Himachal Pradesh', 'Delhi', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand', 'Other'];

const initialForm = {
  fullName: '', fatherName: '', motherName: '', dob: '', gender: '', mobile: '', email: '',
  state: '', district: '', city: '', address: '',
  marks10: '', marks12: '', prevQualification: '', course: '',
  documents: { passportPhoto: '', aadhaarCard: '', certificate10th: '', certificate12th: '' },
};

const InputField = ({ label, icon: Icon, type = 'text', value, onChange, placeholder, required = true }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500"><Icon className="w-4 h-4" /></div>}
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`w-full bg-white/5 border border-white/10 rounded-2xl ${Icon ? 'pl-11' : 'pl-5'} pr-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/60 transition-all`}
      />
    </div>
  </div>
);

const SelectField = ({ label, icon: Icon, value, onChange, options }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 z-10"><Icon className="w-4 h-4" /></div>}
      <select
        required
        value={value}
        onChange={onChange}
        className={`w-full bg-white/5 border border-white/10 rounded-2xl ${Icon ? 'pl-11' : 'pl-5'} pr-5 py-3.5 text-sm text-white focus:outline-none focus:border-accent/60 transition-all appearance-none`}
      >
        <option value="" className="bg-gray-900">-- Select {label} --</option>
        {options.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
      </select>
    </div>
  </div>
);

const DocumentUpload = ({ label, value, onChange }) => {
  const ref = useRef(null);
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
      <div
        onClick={() => ref.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-4 flex items-center gap-4 transition-all ${value ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5 hover:border-accent/50 hover:bg-white/10'}`}
      >
        {value ? (
          <>
            <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-400">Uploaded ✓</p>
              <p className="text-[10px] text-slate-500">Click to replace</p>
            </div>
            <img src={value} alt="preview" className="ml-auto w-14 h-14 rounded-xl object-cover border border-white/10" />
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-slate-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-300">Click to upload</p>
              <p className="text-[10px] text-slate-500">JPG, PNG, PDF supported</p>
            </div>
          </>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => onChange(reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
    </div>
  );
};

const AdmissionForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null); // { applicationId }
  const [error, setError] = useState('');

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const setDoc = (key, value) => setForm(prev => ({ ...prev, documents: { ...prev.documents, [key]: value } }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admissions/apply`, form);
      setSubmitted({ applicationId: res.data.applicationId });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success Screen ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-dark text-white pt-24 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.2)]">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-50"></div>
          </div>
          <h1 className="text-4xl font-black text-white mb-3 uppercase tracking-tight">Application Submitted!</h1>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed">Your admission application has been received successfully. The admin team will review and update you shortly.</p>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Application Number</p>
            <p className="text-4xl font-black text-accent tracking-widest">{submitted.applicationId}</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-sm text-amber-300 font-medium mb-6">
            📋 Please save your Application Number for future reference. You can use it to check your application status.
          </div>
          <button
            onClick={() => window.location.href = '/admissions'}
            className="w-full py-4 rounded-2xl bg-accent text-dark font-black uppercase tracking-[0.2em] text-xs hover:bg-accent/90 transition-all"
          >
            Back to Admissions
          </button>
        </div>
      </div>
    );
  }

  // ── Step Content ────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <InputField label="Full Name" icon={User} value={form.fullName} onChange={e => set('fullName', e.target.value)} />
          </div>
          <InputField label="Father's Name" icon={User} value={form.fatherName} onChange={e => set('fatherName', e.target.value)} />
          <InputField label="Mother's Name" icon={User} value={form.motherName} onChange={e => set('motherName', e.target.value)} />
          <InputField label="Date of Birth" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
          <SelectField label="Gender" value={form.gender} onChange={e => set('gender', e.target.value)} options={['Male', 'Female', 'Other']} />
          <InputField label="Mobile Number" icon={Phone} type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="Enter 10-digit mobile" />
          <InputField label="Email Address" icon={Mail} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Enter email address" />
        </div>
      );
      case 1: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="State" icon={MapPin} value={form.state} onChange={e => set('state', e.target.value)} options={STATES} />
          <InputField label="District" value={form.district} onChange={e => set('district', e.target.value)} />
          <InputField label="City / Town" value={form.city} onChange={e => set('city', e.target.value)} />
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Address</label>
            <textarea
              required
              value={form.address}
              onChange={e => set('address', e.target.value)}
              rows={3}
              placeholder="House/Flat No., Street, Locality..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/60 transition-all resize-none"
            />
          </div>
        </div>
      );
      case 2: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="10th Marks / Percentage" icon={BookOpen} value={form.marks10} onChange={e => set('marks10', e.target.value)} placeholder="e.g. 85%" />
          <InputField label="12th Marks / Percentage" icon={BookOpen} value={form.marks12} onChange={e => set('marks12', e.target.value)} placeholder="e.g. 78%" />
          <div className="sm:col-span-2">
            <InputField label="Previous Qualification" icon={GraduationCap} value={form.prevQualification} onChange={e => set('prevQualification', e.target.value)} placeholder="e.g. 12th Science, Diploma in IT" />
          </div>
          <div className="sm:col-span-2">
            <SelectField label="Course Applying For" icon={ClipboardList} value={form.course} onChange={e => set('course', e.target.value)} options={COURSES} />
          </div>
        </div>
      );
      case 3: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DocumentUpload label="Passport Photo" value={form.documents.passportPhoto} onChange={v => setDoc('passportPhoto', v)} />
          <DocumentUpload label="Aadhaar Card" value={form.documents.aadhaarCard} onChange={v => setDoc('aadhaarCard', v)} />
          <DocumentUpload label="10th Certificate" value={form.documents.certificate10th} onChange={v => setDoc('certificate10th', v)} />
          <DocumentUpload label="12th Certificate" value={form.documents.certificate12th} onChange={v => setDoc('certificate12th', v)} />
        </div>
      );
      case 4: return (
        <div className="space-y-6">
          {[
            { title: 'Personal Information', fields: [['Full Name', form.fullName], ['Father\'s Name', form.fatherName], ['Mother\'s Name', form.motherName], ['Date of Birth', form.dob], ['Gender', form.gender], ['Mobile', form.mobile], ['Email', form.email]] },
            { title: 'Address', fields: [['State', form.state], ['District', form.district], ['City', form.city], ['Address', form.address]] },
            { title: 'Academic Details', fields: [['10th Marks', form.marks10], ['12th Marks', form.marks12], ['Previous Qualification', form.prevQualification], ['Course', form.course]] },
          ].map(section => (
            <div key={section.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-4">{section.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.fields.map(([label, val]) => (
                  <div key={label}>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{val || <span className="text-slate-600 italic">Not provided</span>}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-4">Documents</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[['Passport Photo', form.documents.passportPhoto], ['Aadhaar Card', form.documents.aadhaarCard], ['10th Certificate', form.documents.certificate10th], ['12th Certificate', form.documents.certificate12th]].map(([label, val]) => (
                <div key={label} className="text-center">
                  <div className={`w-full h-16 rounded-xl border flex items-center justify-center mb-1 ${val ? 'border-green-500/40 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>
                    {val ? <CheckCircle className="w-6 h-6 text-green-400" /> : <Upload className="w-5 h-5 text-slate-600" />}
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
          {error && <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-2xl text-sm font-bold text-center">{error}</div>}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">SBBSU Admissions 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-2">Admission Application</h1>
          <p className="text-slate-400 text-sm">Complete all steps to submit your application</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border-2 transition-all duration-300 ${i < step ? 'bg-accent border-accent text-dark' : i === step ? 'bg-accent/10 border-accent text-accent' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider hidden sm:block ${i === step ? 'text-accent' : i < step ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < step ? 'bg-accent' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-accent/10 border border-accent/20 text-accent rounded-xl flex items-center justify-center text-sm font-black">{step + 1}</span>
            {STEPS[step]}
          </h2>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-dark font-black uppercase tracking-[0.15em] text-xs hover:bg-accent/90 transition-all shadow-lg"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.15em] text-xs hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
              >
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> Submit Application</>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdmissionForm;
