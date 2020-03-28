import * as React from "react";
import { withRouter, Link } from "react-router-dom";
const queryString = require("query-string");
import * as ScoreBoardStatus from "./../../../store/userStore/userStore";
import { connect } from "react-redux";
class ResultView extends React.Component {
    result = {
        points: 0,
        userName: "",
        wordList: "",
        right: 0,
        wrong: 0
    }
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            userName: "",
        }
    }
    componentDidMount() {
        let userName = this.props.match.params.slug;
        if (userName != undefined) {
            this.result=this.props.scoreStatus.status;
            this.setState({
                points:  this.result.points,
                userName:  this.result,userName
            })
            //console.log(this.result)
            let userNameWithSpace = userName.replace(/-/g, ' ');
            if (this.props.scoreStatus.status.userName != userNameWithSpace) {
                this.goToHomePage();
            }
        }else{
            this.goToHomePage();
        }

    }
    goToHomePage = () => {
        this.props.history.push("/")
    }
    render() {

        return (<div className="container ">
            <div className="gameHeading"><h1 className="text-uppercase text-dark font-weight-bold">
                Boggle Game</h1>
            </div>
            <div className="results">
                <div className="text-center">
                    <div id="name">
                        {this.state.userName}
                    </div>
                    <div id="title">
                        SCORE:
                        </div>

                    <div id="score">
                        {this.state.points}
                    </div>
                    <div >
                        <button onClick={this.goToHomePage} className="btn btn-info retrybutton">Retry</button>
                    </div>
                </div>
            </div>
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
    mapDispatchToProps  // Selects which action creators are merged into the component's props
)(withRouter(ResultView));