import { useState, useEffect } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { INITIAL_USERS } from '../../data/mockData';

export default function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(30);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock user login
      const mockUser = {
        ...INITIAL_USERS[0],
        phone: `+91 ${phone}`,
        name: 'Ramesh Kumar (Farmer)',
      };
      const mockToken = `mock-token-${Date.now()}`;
      login(mockToken, mockUser);
      navigate('/');
    }, 800);
  };

  return (
    <div className="space-y-4">
      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div>
            <label className="form-label">Mobile Number / मोबाइल नंबर</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-500 font-semibold text-sm">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                maxLength={12}
                className="input-field pl-16 text-base tracking-wider font-medium"
                required
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              We will send a 6-digit verification code to this number.
            </p>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="spinner w-4 h-4 border-2"></span>
                <span>Sending OTP...</span>
              </>
            ) : (
              <span>Send OTP (ओटीपी भेजें) →</span>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fade-in">
          <div className="text-center pb-1">
            <p className="text-xs text-gray-500">
              OTP sent to <span className="font-semibold text-dark">+91 {phone}</span>
            </p>
            <button
              type="button"
              onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); setError(''); }}
              className="text-xs text-primary font-medium hover:underline mt-0.5"
            >
              Change phone number
            </button>
          </div>

          <div className="bg-green-50/70 border border-green-200 rounded-lg p-2.5 text-center">
            <span className="text-xs text-green-800 font-medium">
              💡 Demo Tip: Enter any 6 digits (e.g. <b>123456</b>) to login
            </span>
          </div>

          <div>
            <label className="form-label text-center">Enter 6-digit OTP</label>
            <div className="flex justify-between gap-2 max-w-xs mx-auto">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
          </div>

          {error && <p className="form-error text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="spinner w-4 h-4 border-2"></span>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify & Continue (लॉग इन करें)</span>
            )}
          </button>

          <div className="text-center text-xs text-gray-500 pt-1">
            {timer > 0 ? (
              <span>Resend OTP in <b className="text-dark">{timer}s</b></span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(30)}
                className="text-primary font-semibold hover:underline"
              >
                Resend OTP now
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
