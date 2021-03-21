import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: "" };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      console.log({error})
      return { hasError: true, error: error.message };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log({error})
      // You can also log the error to an error reporting service
      //ogErrorToMyService(error, errorInfo);

    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="error-boundary">
              Something Went Wrong!!!
          </div>
        );
      }
  
      return this.props.children; 
    }
  }
  
  export default ErrorBoundary;