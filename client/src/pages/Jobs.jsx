import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Building2,
} from 'lucide-react';
import { jobService } from '../services/jobService';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { CATEGORIES, WORK_MODES, JOB_TYPES } from '../utils/constants';

const POPULAR_LOCATIONS = [
  { label: 'All Locations', value: '' },
  { label: 'Bengaluru', value: 'Bengaluru' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Pune', value: 'Pune' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Delhi NCR', value: 'Delhi' },
  { label: 'Gurugram', value: 'Gurugram' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Remote', value: 'Remote' },
];

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL search params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
  const [workModeFilter, setWorkModeFilter] = useState(searchParams.get('workMode') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'latest');

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setTypeFilter(searchParams.get('type') || 'all');
    setWorkModeFilter(searchParams.get('workMode') || 'all');
    setCategoryFilter(searchParams.get('category') || 'all');
    setLocationQuery(searchParams.get('location') || '');
    setSortBy(searchParams.get('sort') || 'latest');
  }, [searchParams]);

  // Fetch Jobs based on active filters
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery.trim()) params.q = searchQuery.trim();
      if (typeFilter !== 'all') params.type = typeFilter;
      if (workModeFilter !== 'all') params.workMode = workModeFilter;
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (locationQuery.trim()) params.location = locationQuery.trim();
      if (sortBy) params.sort = sortBy;

      const res = await jobService.getJobs(params);
      if (res.success) {
        setJobs(res.jobs || []);
        setTotalCount(res.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [typeFilter, workModeFilter, categoryFilter, locationQuery, sortBy]);

  const updateUrlParams = (newLocation = locationQuery) => {
    const params = {};
    if (searchQuery.trim()) params.q = searchQuery.trim();
    if (typeFilter !== 'all') params.type = typeFilter;
    if (workModeFilter !== 'all') params.workMode = workModeFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (newLocation.trim()) params.location = newLocation.trim();
    if (sortBy !== 'latest') params.sort = sortBy;
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlParams();
    fetchJobs();
  };

  const handleLocationSelect = (loc) => {
    setLocationQuery(loc);
    updateUrlParams(loc);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setWorkModeFilter('all');
    setCategoryFilter('all');
    setLocationQuery('');
    setSortBy('latest');
    setSearchParams({});
  };

  const isFiltered =
    searchQuery ||
    typeFilter !== 'all' ||
    workModeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    locationQuery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {typeFilter === 'Internship'
            ? 'Explore Internships'
            : typeFilter === 'Full-time'
            ? 'Explore Fresher Jobs'
            : 'Explore All Opportunities'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Showing {totalCount} open positions available for college students and recent graduates.
        </p>
      </div>

      {/* Main Search Bar & Quick Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-card mb-6">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-5 flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Job title, skills, or company..."
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Location Search */}
          <div className="md:col-span-4 flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="City, state, or 'Remote'..."
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            {locationQuery && (
              <button
                type="button"
                onClick={() => handleLocationSelect('')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Submit & Filter Buttons */}
          <div className="md:col-span-3 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition shadow-md shadow-blue-500/20"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Main Content: Sidebar Filters + Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div
          className={`lg:block ${
            mobileFilterOpen ? 'fixed inset-0 z-50 bg-slate-900/60 p-4 flex items-end sm:items-center justify-center' : 'hidden'
          }`}
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card w-full max-w-md lg:max-w-none max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Filter className="w-4 h-4 text-blue-600" />
                Filter Opportunities
              </div>
              <div className="flex items-center gap-2">
                {isFiltered && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="lg:hidden p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Location Filter Option */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Preferred Location
              </label>
              <select
                value={locationQuery}
                onChange={(e) => handleLocationSelect(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc.label} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Opportunity Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Opportunity Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={typeFilter === 'all'}
                    onChange={() => setTypeFilter('all')}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  All Types
                </label>
                {JOB_TYPES.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="type"
                      checked={typeFilter === t}
                      onChange={() => setTypeFilter(t)}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Work Mode
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="workMode"
                    checked={workModeFilter === 'all'}
                    onChange={() => setWorkModeFilter('all')}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  All Modes
                </label>
                {WORK_MODES.map((mode) => (
                  <label
                    key={mode}
                    className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="workMode"
                      checked={workModeFilter === mode}
                      onChange={() => setWorkModeFilter(mode)}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Category / Domain
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Domains</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">Latest Posted</option>
                <option value="deadline">Application Deadline</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-xl"
              >
                Apply Filters
              </button>
            )}
          </div>
        </div>

        {/* Right Jobs Listing */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Location Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-400 flex items-center gap-1 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Quick Cities:
            </span>
            {POPULAR_LOCATIONS.map((loc) => {
              const isSelected = loc.value === '' ? !locationQuery : locationQuery.toLowerCase().includes(loc.value.toLowerCase());
              return (
                <button
                  key={loc.label}
                  type="button"
                  onClick={() => handleLocationSelect(loc.value)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'
                  }`}
                >
                  {loc.label}
                </button>
              );
            })}
          </div>

          {loading ? (
            <Loader message="Searching verified opportunities..." />
          ) : jobs.length === 0 ? (
            <EmptyState
              title="No opportunities match your filters"
              description="Try clearing your search query or selecting a different location, work mode or category."
              actionText="Reset All Filters"
              onActionClick={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
