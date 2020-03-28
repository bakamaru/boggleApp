import * as React from "react";
import { withRouter, Link } from "react-router-dom";
const queryString = require("query-string");
import * as ScoreBoardStatus from "./../../../store/userStore/userStore";
import { ApplicationState } from "./../../../store/index";
import { connect } from "react-redux";
import GameBoard from '../../gameBoard/views/gameBoardView';
import MenuView from "../../menu/views/menuview";
class UserEntryView extends React.Component {
  constructor(props) {
    super(props);
    let param = queryString.parse(this.props.location.search);
    this.state = {

    };
    //calling first time to fetch token
  }

  async componentDidMount() {
   this.props.clearScore();
  }

  render = () => {
    // const { isLoggedIn, userName, email, firstName, lastName, picture, roles, identityUserId } = this.props.status;

    return (
     <MenuView/>

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
  mapDispatchToProps  // Selects which action creators are merged into the component's props
)(withRouter(UserEntryView));
