import React, { useState, useEffect } from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import { savedJobService } from '../../services/savedJobService';
import JobCard from '../../components/JobCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    try {
      setLoading(true);
      const res = await savedJobService.getSavedJobs();
      if (res.success) {
        setSavedJobs(res.savedJobs || []);
      }
    } catch (err) {
      console.error('Error fetching saved jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleSaveToggle = (jobId, isSaved) => {
    if (!isSaved) {
      setSavedJobs((prev) => prev.filter((item) => item.jobId?._id !== jobId));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Saved Opportunities</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your shortlisted internships and jobs and apply before the deadlines.
        </p>
      </div>

      {loading ? (
        <Loader message="Loading saved bookmarks..." />
      ) : savedJobs.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved opportunities yet"
          description="Click the bookmark icon on any job card to save it for easy access."
          actionText="Find Internships & Jobs"
          actionLink="/jobs"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((item) => {
            const job = item.jobId;
            if (!job) return null;
            return (
              <JobCard
                key={item._id}
                job={job}
                isSavedInitially={true}
                onSaveToggle={handleSaveToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
