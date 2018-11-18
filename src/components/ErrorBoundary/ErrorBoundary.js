import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.errorInfo) {
			const style = {
				width: '100%',
				height: '100%',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			};
			return (
				<div style={style}>
					<h2>Sorry, something went wrong.</h2>
					<h3>Refresh the page or try again later.</h3>
					{/* <details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details> */}
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
