import * as React from "react";
import MenuView from "../../menu/views/menuview";
import { RouteComponentProps, withRouter } from "react-router";
import * as ScoreBoardStatus from "./../../../store/userStore/userStore";
import { ApplicationState } from "./../../../store/index";
import { connect } from "react-redux";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    
  }
  render() {
    return (
      <div>
        {/* <MenuView /> */}
        {this.props.children}       
     </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreStatus: state.scoreStatus
});
const mapDispatchToProps = {
  ...ScoreBoardStatus.actionCreators,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps // Selects which action creators are merged into the component's props
)(withRouter(DefaultLayout));
