import { useState, useEffect } from 'react';
import { Code2, ExternalLink, Award, Loader2 } from 'lucide-react';
import './LeetCode.css';

const LEETCODE_USERNAME = 'puhaniya_';
const RAW_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = RAW_URL.replace(/\/+$/, '');

const FALLBACK_STATS = {
  totalSolved: 160,
  easySolved: 108,
  mediumSolved: 48,
  hardSolved: 4,
};

const FEATURED_PROBLEMS = [
  {
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topic: 'Two Pointers / Monotonic Stack',
    complexity: 'Time: O(N) | Space: O(1)',
    link: 'https://leetcode.com/problems/trapping-rain-water/',
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    complexity: 'Time: O(N) | Space: O(min(N, M))',
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
  },
  {
    title: 'Course Schedule',
    difficulty: 'Medium',
    topic: 'Graph / Topological Sort (BFS)',
    complexity: 'Time: O(V + E) | Space: O(V + E)',
    link: 'https://leetcode.com/problems/course-schedule/',
  },
  {
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topic: 'Intervals / Sorting',
    complexity: 'Time: O(N log N) | Space: O(N)',
    link: 'https://leetcode.com/problems/merge-intervals/',
  },
];

export default function LeetCodeSection() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        setLoading(true);
        // Request through your Express backend proxy
        const res = await fetch(`${API_BASE_URL}/leetcode/${LEETCODE_USERNAME}`);
        
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        const json = await res.json();
        if (json.success && json.data && isMounted) {
          setStats(json.data);
        }
      } catch (err) {
        console.warn('Fallback stats rendered. Backend fetch notice:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="leetcode" className="leetcode-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Problem Solving</span>
          <h2 className="section-title">Data Structures & Algorithms</h2>
          <p className="section-subtitle">
            Live metrics and selected problems showcasing algorithmic efficiency and patterns.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="stats-grid">
          <div className="stat-card total-card">
            <div className="stat-icon-wrap">
              <Award size={24} className="stat-icon" />
            </div>
            <div>
              <p className="stat-label">Total Solved</p>
              <h3 className="stat-number">
                {loading ? <Loader2 size={22} className="spinner" /> : stats.totalSolved}
              </h3>
            </div>
          </div>

          <div className="stat-card easy-card">
            <p className="stat-label">Easy</p>
            <h3 className="stat-number text-easy">
              {loading ? <Loader2 size={22} className="spinner" /> : stats.easySolved}
            </h3>
            <span className="stat-sub">Fundamentals</span>
          </div>

          <div className="stat-card medium-card">
            <p className="stat-label">Medium</p>
            <h3 className="stat-number text-medium">
              {loading ? <Loader2 size={22} className="spinner" /> : stats.mediumSolved}
            </h3>
            <span className="stat-sub">Core Interview Level</span>
          </div>

          <div className="stat-card hard-card">
            <p className="stat-label">Hard</p>
            <h3 className="stat-number text-hard">
              {loading ? <Loader2 size={22} className="spinner" /> : stats.hardSolved}
            </h3>
            <span className="stat-sub">Complex Optimization</span>
          </div>
        </div>

        {/* Highlighted Problems Grid */}
        <h3 className="curated-title">Highlighted Problems</h3>
        <div className="problems-grid">
          {FEATURED_PROBLEMS.map((problem) => (
            <div key={problem.title} className="problem-card">
              <div className="problem-header">
                <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
                <span className="topic-badge">{problem.topic}</span>
              </div>
              <h4 className="problem-title">{problem.title}</h4>
              <p className="problem-complexity">{problem.complexity}</p>
              <a
                href={problem.link}
                target="_blank"
                rel="noreferrer"
                className="problem-link"
              >
                <span>View on LeetCode</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Profile CTA */}
        <div className="profile-cta">
          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noreferrer"
            className="btn-leetcode"
          >
            <Code2 size={18} />
            <span>Visit Complete LeetCode Profile</span>
          </a>
        </div>
      </div>
    </section>
  );
}