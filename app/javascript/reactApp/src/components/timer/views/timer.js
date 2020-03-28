import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as ScoreBoardStatus from "./../../../store/userStore/userStore";
 class Timer extends Component {
    state = {
        minutes: this.props.minutes,
        seconds: this.props.seconds,
        onFinished:this.props.onFinished
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
        window.resetTimer = this.resetTimer.bind(this);
    }
    resetTimer=(minutes,seconds)=>{
       // clearInterval(this.myInterval)
      
                this.setState({
                    minutes:minutes,
                    seconds:seconds
                });
           
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds,onFinished } = this.state
        if(minutes === 0 && seconds === 0){
            onFinished()
        }
           
        return (
            <div  id="timer-cont">Timer:
            { minutes === 0 && seconds === 0
                ?
                   <span className="timer">finished!</span>
                : <span className="timer">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            }
            </div>
        )
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
)(withRouter(Timer));