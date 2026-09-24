import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Globe, ExternalLink, Search, Briefcase } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await api.get('/jobs/featured');
        if (res.data.success) {
          setCompanies(res.data.topCompanies || []);
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filtered = companies.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.industry && c.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.location && c.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
          Employer Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Top Companies Hiring on InternConnect
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Discover verified enterprise recruiters, IT leaders, and fast-growing technology startups.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search companies by name or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 focus:outline-none placeholder-slate-400"
          />
        </div>
      </div>

      {loading ? (
        <Loader message="Loading company directory..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No companies match your query"
          description="Try searching for a different company name or industry."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((comp) => (
            <div
              key={comp._id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={comp.logo}
                    alt={comp.companyName}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{comp.companyName}</h3>
                    <p className="text-xs text-blue-600 font-semibold">{comp.industry}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {comp.location || 'India'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {comp.description || 'Global technology and consulting enterprise.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {comp.website ? (
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Website
                  </a>
                ) : (
                  <span></span>
                )}

                <Link
                  to={`/jobs?q=${encodeURIComponent(comp.companyName)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  View Openings
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;
