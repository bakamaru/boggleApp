import * as React from 'react';
import { withRouter, Link } from "react-router-dom";
import ResultView from '../../components/scoreResult/views/resultView'
import * as LoginStatusStore from "../../store/userStore/userStore";
import { connect } from "react-redux";
class ResultPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount = () => {

	}



	render() {
		const { } = this.state;

		return (
			<ResultView />

		);
	}
}

const mapStateToProps = (state) => ({
    loginStatus: state.loginStatus
  });
  const mapDispatchToProps = {
    ...LoginStatusStore.actionCreators,
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps  // Selects which action creators are merged into the component's props
  )(withRouter(ResultPage));
