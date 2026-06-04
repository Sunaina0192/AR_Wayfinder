import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, CreditCard, ExternalLink, ShieldCheck, Truck } from 'lucide-react'

const courseRates = [
  {
    id: 'btech',
    name: 'B.Tech Engineering',
    tuition: 160000,
    admission: 12000,
    processing: 1500,
    hostel: 55000,
    bus: 12500
  },
  {
    id: 'mba',
    name: 'MBA - Master of Business',
    tuition: 145000,
    admission: 10000,
    processing: 1500,
    hostel: 52000,
    bus: 12500
  },
  {
    id: 'mtech',
    name: 'M.Tech Engineering',
    tuition: 135000,
    admission: 10000,
    processing: 1500,
    hostel: 52000,
    bus: 12500
  },
  {
    id: 'ba',
    name: 'BA/B.Sc - Sciences',
    tuition: 92000,
    admission: 9000,
    processing: 1200,
    hostel: 48000,
    bus: 11500
  },
  {
    id: 'bba',
    name: 'BBA - Management',
    tuition: 98000,
    admission: 10000,
    processing: 1300,
    hostel: 50000,
    bus: 12000
  },
  {
    id: 'phd',
    name: 'Ph.D. Programs',
    tuition: 72000,
    admission: 9000,
    processing: 1200,
    hostel: 45000,
    bus: 11500
  }
]

const scholarships = [
  { id: 'none', label: 'No Scholarship', discount: 0, description: 'Standard fee schedule.' },
  { id: 'sc', label: 'SC', discount: 0.75, description: '75% tuition relief for SC students.' },
  { id: 'bc', label: 'BC', discount: 0.5, description: '50% tuition relief for BC students.' },
  { id: 'single-parent', label: 'Single Parent', discount: 0.6, description: '60% tuition relief for single-parent families.' },
  { id: 'ews', label: 'EWS', discount: 0.4, description: '40% tuition relief for EWS students.' }
]

const paymentRecords = [
  {
    id: '2026-001',
    student: 'Aman Kaur',
    course: 'B.Tech Engineering',
    scholarship: 'BC',
    paid: 'Paid in Full',
    method: 'Online QR',
    amountPaid: 118625,
    balanceDue: 0,
    date: '2026-05-14'
  },
  {
    id: '2026-007',
    student: 'Raj Singh',
    course: 'MBA - Master of Business',
    scholarship: 'Single Parent',
    paid: 'Half Paid',
    method: 'Admission Cell',
    amountPaid: 63500,
    balanceDue: 63500,
    date: '2026-05-18'
  }
]

const currency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value)

const Admissions = () => {
  const navigate = useNavigate()
  const [selectedCourseId, setSelectedCourseId] = useState('btech')
  const [selectedScholarshipId, setSelectedScholarshipId] = useState('none')
  const [includeBus, setIncludeBus] = useState(false)
  const [includeHostel, setIncludeHostel] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('none')

  const selectedCourse = courseRates.find((course) => course.id === selectedCourseId)
  const selectedScholarship = scholarships.find((sch) => sch.id === selectedScholarshipId)

  const tuitionAfterScholarship = useMemo(() => {
    return Math.round(selectedCourse.tuition * (1 - selectedScholarship.discount))
  }, [selectedCourse, selectedScholarship])

  const admissionTotal = selectedCourse.admission + selectedCourse.processing
  const busTotal = includeBus ? selectedCourse.bus : 0
  const hostelTotal = includeHostel ? selectedCourse.hostel : 0
  const payableAmount = tuitionAfterScholarship + admissionTotal + busTotal + hostelTotal
  const paidAmount = paymentStatus === 'full' ? payableAmount : paymentStatus === 'half' ? Math.round(payableAmount / 2) : 0
  const dueAmount = payableAmount - paidAmount

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-48 bg-accent/10 blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-black text-accent">Admissions & Fees</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-6">
                Complete Course Fee &amp; Admission Guide
              </h1>
              <p className="max-w-3xl text-slate-300 leading-relaxed text-lg">
                Choose your program, pick a scholarship category, and see your exact fee obligation with separate hostel and bus fees. Manage payment status and pay instantly with QR or visit the admission cell for in-person support.
              </p>
              <button
                onClick={() => navigate('/apply')}
                className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_20px_60px_rgba(6,182,212,0.35)] hover:scale-105 transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" /> Apply Now 2026
              </button>
            </div>

            <div className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400 font-bold">Quick fee preview</p>
                  <h2 className="text-3xl font-black text-white">Instant fee calculator</h2>
                </div>
                <div className="rounded-3xl bg-linear-to-r from-accent to-cyan-500 px-4 py-3 text-dark font-black uppercase tracking-[0.2em] text-[10px]">Updated 2026</div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300">Select Course</label>
                  <select
                    value={selectedCourseId}
                    onChange={(event) => setSelectedCourseId(event.target.value)}
                    className="w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-4 text-white focus:ring-2 focus:ring-accent/30 outline-none"
                  >
                    {courseRates.map((course) => (
                      <option key={course.id} value={course.id} className="bg-dark text-white">
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300">Scholarship category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scholarships.map((sch) => (
                      <button
                        key={sch.id}
                        onClick={() => setSelectedScholarshipId(sch.id)}
                        className={`rounded-3xl border px-4 py-4 text-left transition-all duration-300 ${selectedScholarshipId === sch.id ? 'border-accent bg-accent/10 text-white shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'border-white/10 bg-white/5 text-slate-300 hover:border-accent/30 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-bold text-sm uppercase tracking-[0.16em]">{sch.label}</span>
                          {selectedScholarshipId === sch.id && <CheckCircle2 className="w-5 h-5 text-accent" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{sch.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBus}
                      onChange={() => setIncludeBus((prev) => !prev)}
                      className="accent-accent h-5 w-5 rounded"
                    />
                    <div>
                      <p className="font-black uppercase tracking-[0.18em] text-white text-sm">Bus Fee</p>
                      <p className="text-slate-400 text-xs">{currency(selectedCourse.bus)} per year</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHostel}
                      onChange={() => setIncludeHostel((prev) => !prev)}
                      className="accent-accent h-5 w-5 rounded"
                    />
                    <div>
                      <p className="font-black uppercase tracking-[0.18em] text-white text-sm">Hostel Fee</p>
                      <p className="text-slate-400 text-xs">{currency(selectedCourse.hostel)} per year</p>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Tuition after scholarship</p>
                    <p className="text-3xl font-black text-white mt-4">{currency(tuitionAfterScholarship)}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Total payable amount</p>
                    <p className="text-3xl font-black text-accent mt-4">{currency(payableAmount)}</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm uppercase tracking-[0.25em] text-slate-400 font-bold">Admission fee details</h3>
                    <span className="text-xs uppercase tracking-[0.25em] text-accent font-black">Clear breakdown</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-200">
                    <div className="flex justify-between"><span>Tuition fee</span><span>{currency(selectedCourse.tuition)}</span></div>
                    <div className="flex justify-between"><span>Scholarship deduction</span><span className="text-emerald-300">-{currency(Math.round(selectedCourse.tuition * selectedScholarship.discount))}</span></div>
                    <div className="flex justify-between"><span>Admission charges</span><span>{currency(selectedCourse.admission)}</span></div>
                    <div className="flex justify-between"><span>Processing charges</span><span>{currency(selectedCourse.processing)}</span></div>
                    {includeBus && <div className="flex justify-between"><span>Bus fee</span><span>{currency(selectedCourse.bus)}</span></div>}
                    {includeHostel && <div className="flex justify-between"><span>Hostel fee</span><span>{currency(selectedCourse.hostel)}</span></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-10">
          <div className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-bold">Fee calculator actions</p>
                <h2 className="text-4xl font-black tracking-tight">Payment options</h2>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Pay online instantly or visit admission cell directly.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                className="flex items-center gap-3 rounded-3xl bg-linear-to-r from-accent to-cyan-500 px-6 py-5 font-black uppercase tracking-[0.2em] text-dark transition-all hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
                onClick={() => alert('QR payment flow is simulated here. Use the SBBSU payment page or mobile app to scan the QR code.')}
              >
                <CreditCard className="w-5 h-5" />
                Scan QR to Pay
              </button>

              <button
                className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
                onClick={() => alert('Please visit the SBBSU Admission Cell with your documents and challan to complete payment.')}
              >
                <Truck className="w-5 h-5 text-accent" />
                Visit Admission Cell
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">Online QR</p>
                <p className="mt-4 text-3xl font-black text-accent">Fast</p>
                <p className="text-slate-400 text-sm mt-2">Instant confirmation with secure campus payment network.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">In-person</p>
                <p className="mt-4 text-3xl font-black text-white">Trusted</p>
                <p className="text-slate-400 text-sm mt-2">Pay directly at the Admission Cell with staff assistance.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">Record</p>
                <p className="mt-4 text-3xl font-black text-white">Transparent</p>
                <p className="text-slate-400 text-sm mt-2">See exactly how much is paid and how much remains.</p>
              </div>
            </div>
          </div>

          <div className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-bold">Payment status</p>
                <h2 className="text-4xl font-black tracking-tight">Admission fee record</h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentStatus('none')}
                  className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.3em] transition ${paymentStatus === 'none' ? 'bg-accent text-dark' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  Unpaid
                </button>
                <button
                  onClick={() => setPaymentStatus('half')}
                  className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.3em] transition ${paymentStatus === 'half' ? 'bg-accent text-dark' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  Half Paid
                </button>
                <button
                  onClick={() => setPaymentStatus('full')}
                  className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.3em] transition ${paymentStatus === 'full' ? 'bg-accent text-dark' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  Full Paid
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">Amount paid</p>
                <p className="mt-4 text-3xl font-black text-white">{currency(paidAmount)}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">Remaining balance</p>
                <p className="mt-4 text-3xl font-black text-accent">{currency(dueAmount)}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">Fee status</p>
                <p className="mt-4 text-3xl font-black text-white">{paymentStatus === 'full' ? 'Paid in Full' : paymentStatus === 'half' ? 'Half Paid' : 'Pending'}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold mb-4">What happens next?</p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 w-5 h-5 text-accent" />
                    <span>Full payment clears your admission allotment immediately.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 w-5 h-5 text-accent" />
                    <span>Half payment reserves your seat; remaining balance is due within 30 days.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 w-5 h-5 text-accent" />
                    <span>Visit the Admission Cell for challan confirmation or fee reconciliation.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold mb-4">Last payment records</p>
                <div className="space-y-3">
                  {paymentRecords.map((record) => (
                    <div key={record.id} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400 font-bold mb-3">
                        <span>{record.student}</span>
                        <span>{record.date}</span>
                      </div>
                      <p className="text-sm font-black text-white">{record.course}</p>
                      <p className="text-slate-400 text-sm mt-2">Scholarship: {record.scholarship}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200">
                        <div className="rounded-3xl bg-white/5 p-3">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Paid</p>
                          <p className="font-black text-white mt-2">{currency(record.amountPaid)}</p>
                        </div>
                        <div className="rounded-3xl bg-white/5 p-3">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Due</p>
                          <p className="font-black text-accent mt-2">{currency(record.balanceDue)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-bold mb-4">Course-wise fee overview</p>
            <div className="space-y-4">
              {courseRates.map((course) => (
                <div key={course.id} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-white">{course.name}</p>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Annual fee summary</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-accent font-black">{currency(course.tuition + course.admission + course.processing)}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-slate-300 text-sm">
                    <div className="rounded-3xl bg-white/5 p-3">Tuition {currency(course.tuition)}</div>
                    <div className="rounded-3xl bg-white/5 p-3">Admission {currency(course.admission)}</div>
                    <div className="rounded-3xl bg-white/5 p-3">Processing {currency(course.processing)}</div>
                    <div className="rounded-3xl bg-white/5 p-3">Hostel {currency(course.hostel)}</div>
                    <div className="rounded-3xl bg-white/5 p-3">Bus {currency(course.bus)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-bold">Admission process</p>
                <h3 className="text-3xl font-black text-white">How to complete admission</h3>
              </div>
              <ExternalLink className="w-5 h-5 text-accent" />
            </div>
            <ol className="space-y-5 text-slate-300 text-sm">
              <li className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent"><span className="font-black">1</span></div>
                <div>
                  <p className="font-bold text-white">Apply through the SBBSU portal.</p>
                  <p className="mt-1">Upload your documents and choose the program you want to join.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent"><span className="font-black">2</span></div>
                <div>
                  <p className="font-bold text-white">Claim your scholarship category.</p>
                  <p className="mt-1">Select SC, BC, Single Parent, EWS or none during admission registration.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent"><span className="font-black">3</span></div>
                <div>
                  <p className="font-bold text-white">Download fee challan and review hostel/bus options.</p>
                  <p className="mt-1">Choose hostel or bus if needed, then confirm the net amount.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent"><span className="font-black">4</span></div>
                <div>
                  <p className="font-bold text-white">Pay in full or reserve with half payment.</p>
                  <p className="mt-1">Half payment holds your seat; remaining fee is due within 30 days.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent"><span className="font-black">5</span></div>
                <div>
                  <p className="font-bold text-white">Visit the Admission Cell if needed.</p>
                  <p className="mt-1">Get assistance, confirm receipts, or finish payments in person.</p>
                </div>
              </li>
            </ol>
          </div>
        </aside>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Processing fees</p>
              </div>
              <p className="text-slate-300">All admissions include a one-time processing charge. This covers document verification, portal registration and support.</p>
              <p className="mt-4 text-2xl font-black text-white">{currency(selectedCourse.processing)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-5 h-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Optional fees</p>
              </div>
              <p className="text-slate-300">Bus and hostel fees are separate. You only pay for what you select, and they are clearly listed in the summary.</p>
              <p className="mt-4 text-2xl font-black text-white">{currency(busTotal + hostelTotal)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight className="w-5 h-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Final commitment</p>
              </div>
              <p className="text-slate-300">Choose payment mode now, then record whether you paid full or half. The remaining balance will remain visible until settled.</p>
              <p className="mt-4 text-2xl font-black text-accent">{paymentStatus === 'full' ? 'Completed' : paymentStatus === 'half' ? 'Partial' : 'Pending'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admissions
