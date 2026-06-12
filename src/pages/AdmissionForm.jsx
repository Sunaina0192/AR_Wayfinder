import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {
  User, Phone, Mail, MapPin, BookOpen, FileText,
  Upload, CheckCircle, ChevronRight, ChevronLeft,
  GraduationCap, ClipboardList, Camera, AlertCircle
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
  fullName: '', fatherName: '', motherName: '', dob: '', gender: '', mobile: '', email: '', password: '',
  state: '', district: '', city: '', address: '',
  marks10: '', marks12: '', prevQualification: '', course: '',
  documents: { passportPhoto: '', aadhaarCard: '', certificate10th: '', certificate12th: '' },
};

// ─── Validation helpers ────────────────────────────────────────────────────

const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);
const isValidDocumentBase64 = (data) => typeof data === 'string' && data.startsWith('data:image/');
const isAcceptedImageType = (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);

/**
 * Validate an image by loading it and checking dimensions & aspect ratio.
 * Returns a promise that resolves to { valid, message }.
 */
const validateImage = (base64, docType) =>
  new Promise((resolve) => {
    if (!base64) return resolve({ valid: false, message: 'No file selected.' });

    // Must be an image (not PDF or other)
    if (!isValidDocumentBase64(base64)) {
      return resolve({ valid: false, message: 'Only image files (JPG, PNG, WEBP) are accepted for this field.' });
    }

    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      const ratio = width / height;

      switch (docType) {
        case 'passportPhoto': {
          // Passport photos are portrait-oriented, roughly 3.5×4.5 cm → ratio ~0.78
          // Accept ratios between 0.55 and 0.95 (portrait) and reasonable size
          if (ratio > 1.1) {
            return resolve({ valid: false, message: 'Passport photo must be portrait-oriented (taller than wide). Please upload a valid passport-size photo.' });
          }
          if (width < 100 || height < 100) {
            return resolve({ valid: false, message: 'Image resolution is too low. Please upload a clear passport-size photo.' });
          }
          if (ratio < 0.4 || ratio > 1.1) {
            return resolve({ valid: false, message: 'The aspect ratio does not match a passport photo. Please upload a standard passport-size photograph.' });
          }
          return resolve({ valid: true, message: '' });
        }
        case 'aadhaarCard': {
          // Aadhaar cards are landscape-oriented, roughly 3.4×2.1 inches → ratio ~1.6
          if (ratio < 0.9) {
            return resolve({ valid: false, message: 'Aadhaar Card images are usually landscape-oriented. Please upload a valid scan/photo of your Aadhaar Card.' });
          }
          if (width < 200 || height < 100) {
            return resolve({ valid: false, message: 'Image resolution is too low. Please upload a clear scan/photo of your Aadhaar Card.' });
          }
          return resolve({ valid: true, message: '' });
        }
        case 'certificate10th':
        case 'certificate12th': {
          // Certificates are usually A4 landscape or portrait, reasonable size
          if (width < 200 || height < 200) {
            return resolve({ valid: false, message: 'Image resolution is too low. Please upload a clear scan of your certificate.' });
          }
          return resolve({ valid: true, message: '' });
        }
        default:
          return resolve({ valid: true, message: '' });
      }
    };
    img.onerror = () => resolve({ valid: false, message: 'Failed to load image. Please upload a valid image file.' });
    img.src = base64;
  });

// ─── Sub-components ────────────────────────────────────────────────────────

const InputField = ({ label, icon: Icon, type = 'text', value, onChange, placeholder, required = true, error, maxLength }) => (
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
        maxLength={maxLength}
        className={`w-full bg-white/5 border rounded-2xl ${Icon ? 'pl-11' : 'pl-5'} pr-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent/60'}`}
      />
    </div>
    {error && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);

const SelectField = ({ label, icon: Icon, value, onChange, options, error }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
    <div className="relative">
      {Icon && <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 z-10"><Icon className="w-4 h-4" /></div>}
      <select
        required
        value={value}
        onChange={onChange}
        className={`w-full bg-white/5 border rounded-2xl ${Icon ? 'pl-11' : 'pl-5'} pr-5 py-3.5 text-sm text-white focus:outline-none transition-all appearance-none ${error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent/60'}`}
      >
        <option value="" className="bg-gray-900">-- Select {label} --</option>
        {options.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
      </select>
    </div>
    {error && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);

const DocumentUpload = ({ label, value, onChange, error, validating }) => {
  const ref = useRef(null);
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
      <div
        onClick={() => ref.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-4 flex items-center gap-4 transition-all ${error ? 'border-red-500/60 bg-red-500/5' : value ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5 hover:border-accent/50 hover:bg-white/10'}`}
      >
        {validating ? (
          <>
            <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-accent">Verifying document...</p>
              <p className="text-[10px] text-slate-500">Please wait</p>
            </div>
          </>
        ) : value && !error ? (
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
            <Upload className={`w-8 h-8 flex-shrink-0 ${error ? 'text-red-400' : 'text-slate-500'}`} />
            <div>
              <p className={`text-sm font-bold ${error ? 'text-red-400' : 'text-slate-300'}`}>{error ? 'Upload rejected — click to retry' : 'Click to upload'}</p>
              <p className="text-[10px] text-slate-500">JPG, PNG supported</p>
            </div>
          </>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => onChange(reader.result, file);
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
      {error && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────

const AdmissionForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [docErrors, setDocErrors] = useState({});
  const [docValidating, setDocValidating] = useState({});

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
  };

  const setDoc = (key, value) => {
    setForm(prev => ({ ...prev, documents: { ...prev.documents, [key]: value } }));
    setDocErrors(prev => ({ ...prev, [key]: '' }));
  };

  // ── Mobile handler ─────────────────────────────────────────────────────
  const handleMobileChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ''); // strip non-digits
    if (raw.length <= 10) {
      set('mobile', raw);
    }
    // Live validation
    if (raw.length > 0 && raw.length !== 10) {
      setFieldErrors(prev => ({ ...prev, mobile: 'Mobile number must be exactly 10 digits.' }));
    } else {
      setFieldErrors(prev => ({ ...prev, mobile: '' }));
    }
  };

  // ── Email handler ──────────────────────────────────────────────────────
  const handleEmailChange = (e) => {
    const val = e.target.value;
    set('email', val);
    if (val && !isValidGmail(val)) {
      setFieldErrors(prev => ({ ...prev, email: 'Only Gmail addresses are allowed (e.g. name@gmail.com).' }));
    } else {
      setFieldErrors(prev => ({ ...prev, email: '' }));
    }
  };

  // ── Document handler with validation ───────────────────────────────────
  const handleDocUpload = useCallback(async (key, base64, file) => {
    setDocValidating(prev => ({ ...prev, [key]: true }));
    setDocErrors(prev => ({ ...prev, [key]: '' }));

    if (!file || !isAcceptedImageType(file)) {
      setDocValidating(prev => ({ ...prev, [key]: false }));
      setDoc(key, '');
      setDocErrors(prev => ({ ...prev, [key]: 'Only JPG, PNG, or WEBP image files are accepted for this document.' }));
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setDocValidating(prev => ({ ...prev, [key]: false }));
      setDoc(key, '');
      setDocErrors(prev => ({ ...prev, [key]: 'Image file is too large. Please upload a file under 4MB.' }));
      return;
    }

    if (!isValidDocumentBase64(base64)) {
      setDocValidating(prev => ({ ...prev, [key]: false }));
      setDoc(key, '');
      setDocErrors(prev => ({ ...prev, [key]: 'Uploaded file is not a valid image. Please upload a proper image file.' }));
      return;
    }

    const result = await validateImage(base64, key);

    setDocValidating(prev => ({ ...prev, [key]: false }));

    if (result.valid) {
      setDoc(key, base64);
      setDocErrors(prev => ({ ...prev, [key]: '' }));
    } else {
      setDoc(key, '');
      setDocErrors(prev => ({ ...prev, [key]: result.message }));
    }
  }, []);

  // ── Step Validators ────────────────────────────────────────────────────
  const validateStep0 = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!form.fatherName.trim()) errs.fatherName = "Father's name is required.";
    if (!form.motherName.trim()) errs.motherName = "Mother's name is required.";
    if (!form.dob) errs.dob = 'Date of birth is required.';
    if (!form.gender) errs.gender = 'Please select gender.';
    if (!form.mobile) errs.mobile = 'Mobile number is required.';
    else if (!isValidMobile(form.mobile)) errs.mobile = 'Mobile number must be exactly 10 digits.';
    if (!form.email) errs.email = 'Email is required.';
    else if (!isValidGmail(form.email)) errs.email = 'Only Gmail addresses are allowed (e.g. name@gmail.com).';
    if (!form.password) errs.password = 'Password is required.';
    setFieldErrors(prev => ({ ...prev, ...errs }));
    return Object.keys(errs).length === 0;
  };

  const validateStep1 = () => {
    const errs = {};
    if (!form.state) errs.state = 'State is required.';
    if (!form.district.trim()) errs.district = 'District is required.';
    if (!form.city.trim()) errs.city = 'City is required.';
    if (!form.address.trim()) errs.address = 'Address is required.';
    setFieldErrors(prev => ({ ...prev, ...errs }));
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.marks10.trim()) errs.marks10 = '10th marks are required.';
    if (!form.marks12.trim()) errs.marks12 = '12th marks are required.';
    if (!form.prevQualification.trim()) errs.prevQualification = 'Previous qualification is required.';
    if (!form.course) errs.course = 'Please select a course.';
    setFieldErrors(prev => ({ ...prev, ...errs }));
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!form.documents.passportPhoto) errs.passportPhoto = 'Passport photo is required.';
    if (!form.documents.aadhaarCard) errs.aadhaarCard = 'Aadhaar Card is required.';
    if (!form.documents.certificate10th) errs.certificate10th = '10th Certificate is required.';
    if (!form.documents.certificate12th) errs.certificate12th = '12th Certificate is required.';
    setDocErrors(prev => ({ ...prev, ...errs }));
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    let valid = false;
    switch (step) {
      case 0: valid = validateStep0(); break;
      case 1: valid = validateStep1(); break;
      case 2: valid = validateStep2(); break;
      case 3: valid = validateStep3(); break;
      default: valid = true;
    }
    if (valid) setStep(s => Math.min(STEPS.length - 1, s + 1));
  };

  // ── Check if submit is allowed ────────────────────────────────────────
  const isFormComplete = () => {
    const { fullName, fatherName, motherName, dob, gender, mobile, email, password, state, district, city, address, marks10, marks12, prevQualification, course, documents } = form;
    return (
      fullName && fatherName && motherName && dob && gender &&
      isValidMobile(mobile) && isValidGmail(email) && password &&
      state && district && city && address &&
      marks10 && marks12 && prevQualification && course &&
      documents.passportPhoto && documents.aadhaarCard && documents.certificate10th && documents.certificate12th &&
      !Object.values(fieldErrors).some(e => e) &&
      !Object.values(docErrors).some(e => e) &&
      !Object.values(docValidating).some(Boolean)
    );
  };

  const handleSubmit = async () => {
    if (!isFormComplete()) {
      setError('Please complete all fields and fix any errors before submitting.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admissions/apply`, form);
      setSubmitted({ 
        applicationId: res.data.applicationId,
        studentId: res.data.studentId,
        password: form.password
      });
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
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 text-left">
            <div className="mb-4 pb-4 border-b border-white/5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Application Number</p>
              <p className="text-2xl font-mono text-accent font-black tracking-wider">{submitted.applicationId}</p>
            </div>
            
            {submitted.studentId && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-2">
                <h3 className="text-sm font-black text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Your Login Credentials
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-green-500/70 uppercase tracking-widest mb-1">Student ID</p>
                    <p className="text-lg font-mono text-white font-black tracking-wider bg-black/20 px-3 py-1.5 rounded-lg inline-block border border-green-500/20">{submitted.studentId}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-green-500/70 uppercase tracking-widest mb-1">Password</p>
                    <p className="text-lg font-mono text-white tracking-wider bg-black/20 px-3 py-1.5 rounded-lg inline-block border border-green-500/20">{submitted.password}</p>
                  </div>
                </div>
              </div>
            )}
            <p className="text-[10px] text-slate-400 mt-3 text-center uppercase tracking-widest">Please note down these details for future logins.</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
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
            <InputField label="Full Name" icon={User} value={form.fullName} onChange={e => set('fullName', e.target.value)} error={fieldErrors.fullName} />
          </div>
          <InputField label="Father's Name" icon={User} value={form.fatherName} onChange={e => set('fatherName', e.target.value)} error={fieldErrors.fatherName} />
          <InputField label="Mother's Name" icon={User} value={form.motherName} onChange={e => set('motherName', e.target.value)} error={fieldErrors.motherName} />
          <InputField label="Date of Birth" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} error={fieldErrors.dob} />
          <SelectField label="Gender" value={form.gender} onChange={e => set('gender', e.target.value)} options={['Male', 'Female', 'Other']} error={fieldErrors.gender} />
          <InputField label="Mobile Number" icon={Phone} type="tel" value={form.mobile} onChange={handleMobileChange} placeholder="Enter 10-digit mobile" maxLength={10} error={fieldErrors.mobile} />
          <InputField label="Email Address" icon={Mail} type="email" value={form.email} onChange={handleEmailChange} placeholder="Enter Gmail address" error={fieldErrors.email} />
          <div className="sm:col-span-2">
            <InputField label="Create Password" icon={Lock} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Create a strong password" error={fieldErrors.password} />
          </div>
        </div>
      );
      case 1: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="State" icon={MapPin} value={form.state} onChange={e => set('state', e.target.value)} options={STATES} error={fieldErrors.state} />
          <InputField label="District" value={form.district} onChange={e => set('district', e.target.value)} error={fieldErrors.district} />
          <InputField label="City / Town" value={form.city} onChange={e => set('city', e.target.value)} error={fieldErrors.city} />
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Address</label>
            <textarea
              required
              value={form.address}
              onChange={e => set('address', e.target.value)}
              rows={3}
              placeholder="House/Flat No., Street, Locality..."
              className={`w-full bg-white/5 border rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all resize-none ${fieldErrors.address ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-accent/60'}`}
            />
            {fieldErrors.address && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{fieldErrors.address}</p>}
          </div>
        </div>
      );
      case 2: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="10th Marks / Percentage" icon={BookOpen} value={form.marks10} onChange={e => set('marks10', e.target.value)} placeholder="e.g. 85%" error={fieldErrors.marks10} />
          <InputField label="12th Marks / Percentage" icon={BookOpen} value={form.marks12} onChange={e => set('marks12', e.target.value)} placeholder="e.g. 78%" error={fieldErrors.marks12} />
          <div className="sm:col-span-2">
            <InputField label="Previous Qualification" icon={GraduationCap} value={form.prevQualification} onChange={e => set('prevQualification', e.target.value)} placeholder="e.g. 12th Science, Diploma in IT" error={fieldErrors.prevQualification} />
          </div>
          <div className="sm:col-span-2">
            <SelectField label="Course Applying For" icon={ClipboardList} value={form.course} onChange={e => set('course', e.target.value)} options={COURSES} error={fieldErrors.course} />
          </div>
        </div>
      );
      case 3: return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DocumentUpload label="Passport Photo" value={form.documents.passportPhoto} onChange={(v, f) => handleDocUpload('passportPhoto', v, f)} error={docErrors.passportPhoto} validating={docValidating.passportPhoto} />
          <DocumentUpload label="Aadhaar Card" value={form.documents.aadhaarCard} onChange={(v, f) => handleDocUpload('aadhaarCard', v, f)} error={docErrors.aadhaarCard} validating={docValidating.aadhaarCard} />
          <DocumentUpload label="10th Certificate" value={form.documents.certificate10th} onChange={(v, f) => handleDocUpload('certificate10th', v, f)} error={docErrors.certificate10th} validating={docValidating.certificate10th} />
          <DocumentUpload label="12th Certificate" value={form.documents.certificate12th} onChange={(v, f) => handleDocUpload('certificate12th', v, f)} error={docErrors.certificate12th} validating={docValidating.certificate12th} />
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
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-dark font-black uppercase tracking-[0.15em] text-xs hover:bg-accent/90 transition-all shadow-lg"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !isFormComplete()}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.15em] text-xs hover:opacity-90 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
