import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { VILLAGES } from '../../data/mockData';

interface RegisterFormData {
  name: string;
  phone: string;
  village: string;
  role: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    phone: '',
    village: 'Rampur',
    role: 'Farmer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newUser = {
        id: `u-${Date.now()}`,
        name: formData.name,
        phone: `+91 ${formData.phone}`,
        village: formData.village,
        role: formData.role,
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        verified: true,
        rating: 5.0,
        reviewsCount: 1,
        memberSince: 'Just joined',
      };

      login(`token-${Date.now()}`, newUser);
      navigate('/');
    }, 700);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-3.5">
      <div>
        <label className="form-label">Full Name / पूरा नाम</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Ramesh Kumar"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="form-label">Mobile Number / मोबाइल नंबर</label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-gray-500 font-semibold text-sm">
            🇮🇳 +91
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="98765 43210"
            maxLength={10}
            className="input-field pl-16"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="form-label">Village / गाँव</label>
          <select
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="input-field bg-white"
          >
            {VILLAGES.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} ({v.distance} km)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Primary Role / भूमिका</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field bg-white"
          >
            <option value="Farmer">Farmer (किसान)</option>
            <option value="Buyer">Buyer / Trader (खरीदार)</option>
            <option value="Dairy Producer">Dairy / Ghee Producer</option>
            <option value="Service Provider">Tractor / Services</option>
          </select>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <>
            <span className="spinner w-4 h-4 border-2"></span>
            <span>Creating Profile...</span>
          </>
        ) : (
          <span>Create Free Account (पंजीकरण करें) →</span>
        )}
      </button>

      <p className="text-[11px] text-gray-400 text-center leading-tight">
        By continuing, you agree to Mandi terms & rural community guidelines.
      </p>
    </form>
  );
}
