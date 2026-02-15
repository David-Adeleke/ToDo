import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Something went wrong.
          </h1>

          <p className="mb-6 text-gray-600">
            {this.state.error?.message}
          </p>

          <Link
            to='/tasks'
            onClick={this.handleReset}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Go Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
