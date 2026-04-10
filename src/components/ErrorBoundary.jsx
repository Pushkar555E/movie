import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-red-500/20 p-6 rounded-full mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff4b4b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 uppercase tracking-tighter">System Crash Detected</h1>
          <p className="text-zinc-400 max-w-md mb-8">
            An unexpected error occurred in the primary processing unit. 
            <br/><span className="text-red-400/80 text-xs font-mono mt-4 block">{this.state.error?.toString()}</span>
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all"
          >
            Reboot Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
