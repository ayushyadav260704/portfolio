import { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../../api/api';
import { PlusCircle, Trash2, Lock, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import './Admin.css';

// Simple client-side admin password check (store this or customize as needed)
const ADMIN_SECRET = 'Ayush2200';

const INITIAL_PROJECT_STATE = {
  title: '',
  description: '',
  techStack: '', // Comma-separated in the input
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(INITIAL_PROJECT_STATE);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }

  // Load current projects when authenticated
  const loadProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data || []);
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to load projects list.' });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  // Handle Passcode Unlock
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === ADMIN_SECRET) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Access denied.');
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit New Project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.techStack) {
      setFeedback({
        type: 'error',
        message: 'Please fill in Title, Description, and at least one Tech Stack tag.',
      });
      return;
    }

    try {
      setLoading(true);
      setFeedback(null);

      // Parse comma-separated tech stack into an array of trimmed strings
      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map((tech) => tech.trim()).filter(Boolean),
      };

      await createProject(payload);
      setFeedback({ type: 'success', message: 'Project successfully created!' });
      setFormData(INITIAL_PROJECT_STATE);
      await loadProjects(); // Refresh the list
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Error creating project.' });
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id);
      setFeedback({ type: 'success', message: 'Project deleted successfully.' });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to delete project.' });
    }
  };

  // 1. Password Protection Gate
  if (!isAuthenticated) {
    return (
      <section className="admin-section auth-gate">
        <div className="admin-auth-card">
          <Lock size={32} className="lock-icon" />
          <h2>Admin Access</h2>
          <p>Enter your secret passcode to manage projects.</p>

          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="admin-input"
            />
            {authError && <span className="auth-error">{authError}</span>}
            <button type="submit" className="admin-btn">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <section className="admin-section">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Project Management</h1>
            <p className="admin-subtitle">Add, inspect, and remove projects from your live portfolio.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="logout-btn">
            Log Out
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`admin-alert alert-${feedback.type}`}>
            {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="admin-layout">
          {/* Add Project Form */}
          <div className="admin-form-container">
            <h3>Add New Project</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI-Powered Note App"
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief overview of features and architecture..."
                  className="admin-input admin-textarea"
                  required
                />
              </div>

              <div className="form-group">
                <label>Tech Stack (Comma-separated) *</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="React, Express, MongoDB, Tailwind"
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="admin-input"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="admin-input"
                  />
                </div>

                <div className="form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://my-app.vercel.app"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span>Mark as Featured Project</span>
                </label>
              </div>

              <button type="submit" disabled={loading} className="admin-btn">
                <PlusCircle size={18} />
                <span>{loading ? 'Creating...' : 'Publish Project'}</span>
              </button>
            </form>
          </div>

          {/* Manage Existing Projects */}
          <div className="admin-list-container">
            <h3>Existing Projects ({projects.length})</h3>
            <div className="admin-project-list">
              {projects.map((project) => (
                <div key={project._id} className="admin-project-item">
                  <div className="admin-project-info">
                    <h4>{project.title}</h4>
                    <p className="admin-project-tags">{project.techStack?.join(', ')}</p>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-preview-link"
                      >
                        <ExternalLink size={14} />
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(project._id)}
                    className="delete-btn"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="empty-text">No projects available. Add one on the left!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}