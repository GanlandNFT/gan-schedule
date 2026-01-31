import { useState, useEffect } from 'react'

const REPO_OWNER = 'GanlandNFT'
const REPO_NAME = 'gan-schedule'
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`

function App() {
  const [tasks, setTasks] = useState({ todo: [], inprogress: [], done: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadIssues = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [openRes, closedRes] = await Promise.all([
        fetch(`${API_URL}?state=open&per_page=100`),
        fetch(`${API_URL}?state=closed&per_page=50`)
      ])

      if (!openRes.ok || !closedRes.ok) {
        throw new Error('Failed to fetch issues')
      }

      const openIssues = await openRes.json()
      const closedIssues = await closedRes.json()
      const allIssues = [...openIssues, ...closedIssues]

      const categorized = { todo: [], inprogress: [], done: [] }

      allIssues.forEach(issue => {
        const labels = issue.labels.map(l => l.name.toLowerCase())
        
        if (issue.state === 'closed' || labels.includes('done')) {
          categorized.done.push(issue)
        } else if (labels.includes('in-progress') || labels.includes('inprogress') || labels.includes('progress')) {
          categorized.inprogress.push(issue)
        } else {
          categorized.todo.push(issue)
        }
      })

      setTasks(categorized)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadIssues()
    const interval = setInterval(loadIssues, 120000)
    return () => clearInterval(interval)
  }, [])

  const truncate = (str, len) => {
    if (!str) return ''
    str = str.replace(/\r?\n/g, ' ').trim()
    return str.length > len ? str.substring(0, len) + '...' : str
  }

  const timeAgo = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)
    
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago'
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago'
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago'
    return date.toLocaleDateString()
  }

  const Column = ({ status, title, emoji, issues }) => (
    <div className={`column ${status}`}>
      <div className="column-header">
        <span className="column-title">
          {emoji} {title}
          <span className="column-count">{issues.length}</span>
        </span>
      </div>
      <div className="tasks">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            Loading...
          </div>
        ) : error ? (
          <div className="error">Failed to load</div>
        ) : issues.length === 0 ? (
          <div className="empty">No tasks</div>
        ) : (
          issues.map(issue => (
            <div 
              key={issue.id} 
              className="task"
              onClick={() => window.open(issue.html_url, '_blank')}
            >
              <div className="task-title">
                <a 
                  href={issue.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                >
                  {issue.title}
                </a>
              </div>
              {issue.body && (
                <div className="task-desc">{truncate(issue.body, 100)}</div>
              )}
              <div className="task-meta">
                <span>#{issue.number}</span>
                <span>{timeAgo(issue.created_at)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="app">
      <header>
        <h1>👁️ GAN Schedule</h1>
        <p>Fractal Visions AI Agent Task Management</p>
      </header>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{tasks.todo.length}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat">
          <div className="stat-value">{tasks.inprogress.length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat">
          <div className="stat-value">{tasks.done.length}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="admin-bar">
        <a 
          href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?labels=todo&title=New+Task`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          ➕ Add Task
        </a>
        <a 
          href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          📋 All Issues
        </a>
        <button className="btn btn-secondary" onClick={loadIssues}>
          🔄 Refresh
        </button>
      </div>

      <div className="board">
        <Column status="todo" title="To Do" emoji="📋" issues={tasks.todo} />
        <Column status="inprogress" title="In Progress" emoji="⚡" issues={tasks.inprogress} />
        <Column status="done" title="Done" emoji="✅" issues={tasks.done} />
      </div>

      <footer>
        Powered by{' '}
        <a href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`} target="_blank" rel="noopener noreferrer">
          GitHub Issues
        </a>{' '}
        |{' '}
        <a href="https://fractalvisions.io" target="_blank" rel="noopener noreferrer">
          Fractal Visions
        </a>
        <br /><br />
        <em>patterns emerge from noise. signal found.</em> 👁️
      </footer>
    </div>
  )
}

export default App
