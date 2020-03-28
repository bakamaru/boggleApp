import * as React from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Timer from '../../timer/views/timer';
import GameService from '../services/gameService';
import queryString from 'query-string'
import * as ScoreBoardStatus from "./../../../store/userStore/userStore";
import Loader from '../../static/views/Loader';

class GameBoard extends React.Component {

    scoring = {
        1: 0,
        2: 0,
        3: 1,
        4: 1,
        5: 2,
        6: 3,
        7: 4,
        8: 11,
    }
    boardSize = 4;
    timerMinutes = 3;
    timerSeconds = 0;
    constructor(props) {
        super(props);
        this.state = {
            letters: [],
            word: [],
            wordList: [],
            isShaking: false,
            points: 0,
            isloading: false
        }
        this.onLetterClicked = this.onLetterClicked.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.checkWordApi = this.checkWordApi.bind(this);
        this.wordIsRight = this.wordIsRight.bind(this);
    }
    componentDidMount() {
        this.innerFrame = document.querySelector('#inner-frame');
        this.gameboard = document.querySelector('#gameboard-container');
        this.shakeBtn = document.getElementById('shakeBtn');
        this.wordlistDOM = document.querySelector('#word-list');
        this.scoreboard = document.querySelector('#points');
        const value = queryString.parse(this.props.location.search);
        this.boardSize = value.boardsize == undefined ? 4 : value.boardsize;
        this.getLetters();
        let userName = this.props.match.params.slug;
        if (userName != undefined) {
            let userNameWithSpace = userName.replace(/-/g, ' ');

            this.props.newScore({
                points: 0,
                userName: userNameWithSpace,
                wordList: "",
                right: 0,
                wrong: 0
            });
        }
        // if (this.props.scoreStatus.status.userName != userNameWithSpace) {
        //     this.goToHomePage();
        // }



    }
    goToHomePage = () => {
        this.props.history.push("/")
    }
    async getLetters() {
        let response = await GameService.GenerateLetters(this.boardSize);
        if (response.Code == 200) {
            this.setState({
                letters: response.Data
            }, () => {

            })
        }
        else {
            console.log('error', response)
        }
    }
    async checkWordApi(word) {
        this.setState({
            isloading: true
        });
        let response = await GameService.CheckWord(word);
        const notaWord = Object.keys(response.corrections).length;
        // Length of 1 means word is wrong, 'corrections' are present
        // Length of 0 means word is right, no corrections are given
        let wordLength = response.original.length
        this.setState({
            isloading: false
        });
        return notaWord ? false : true;

    }

    renderLetters = () => {
        const { letters } = this.state;
        let _this = this;
        let x = 1;
        return letters.map(function (n) {
            x++;
            return (<div key={x} className="die-container">
                <div onClick={_this.onLetterClicked} className="die" id={`die-${n + x}`}>{`${n}`}</div></div>);
        })

    }

    renderCurrentWord = () => {
        const { word } = this.state;
        let currentWord = "";
        word.map(function (n) {
            currentWord += n;
        })
        return (<span className="currentWord">{currentWord}</span>)
    }

    onLetterClicked = (e) => {

        let die = document.getElementById(e.target.id);
        const { word } = this.state;
        if (die.classList.contains('selected') &&
            die.innerHTML === word[word.length - 1]) {
            die.classList.toggle('selected');
            word.pop();
            this.setState({
                word: word
            }, () => {

            })
        } else if (die.classList.contains('selected')) {

        }
        else {
            die.classList.toggle('selected');
            word.push(die.innerHTML);
            this.setState({
                word: word
            }, () => {

            })
        }
    }
    // shakeDice = (arrOfLetters) => {

    //     const numbOfDice = 16;
    //     for (let i = 0; i < numbOfDice; i += 1) {
    //         let number = Math.floor(Math.random() * arrOfLetters.length);
    //         let htmlPattern = `
    //   <div class="die-container">
    //     <div  class="die" id="die-${i + 1}">${arrOfLetters[number]}</div>
    //   </div>
    // `;
    //         this.innerFrame.innerHTML += htmlPattern;
    //     }
    // }

    stopShaking = () => {
        this.gameboard.classList.remove('shake-container');
        this.setState({
            isShaking: false
        })

    }
    shakeGameboard = () => {
        this.gameboard.classList.add('shake-container');
        setTimeout(this.stopShaking, 200);
    }


    removeOldLetters = () => {
        while (this.innerFrame.hasChildNodes()) {
            this.innerFrame.removeChild(this.innerFrame.firstChild);
        }
    }

    clearWordList = () => {
        // clear wordList array
        const { wordList } = this.state;
        wordList.splice(0, wordList.length);
        // word word list from DOM
        while (this.wordlistDOM.hasChildNodes()) {
            this.wordlistDOM.removeChild(this.wordlistDOM.firstChild);
        }
    }

    restart = () => {

        this.getLetters()
        this.clearWordList();
        this.resetPoints();
        this.clearSelection();

        this.setState({
            isShaking: true,
            word: [],
            wordList: []
        });
        this.shakeGameboard();
        this.resetTimer()
        console.log(this.state)
        //.then(()=>this.renderLetters())
        //.then(()=> );        
    };

    addToWordList = (arrOfLetters) => {
        const { wordList, word } = this.state;
        let wordtoList = arrOfLetters.join('').toLowerCase();
        this.checkWordApi(wordtoList).then((response) => {
            if (response) {
                let newWord = `<li class="word">${wordtoList.toLowerCase()} <span class="wordpoints"></span></li>`
                document.getElementById('word-list').innerHTML += newWord;
                wordList.push(wordtoList);
                this.wordIsRight(wordtoList.length);
                this.setState({
                    word: word,
                    wordList: wordList
                })
            } else { alert(`${wordtoList} is not a word`) }
        });
        word.splice(0, word.length);
        this.removeHighlight();

    }
    //Remove highlighted BG from dice
    removeHighlight = () => {
        const dice = document.querySelectorAll('.die');
        dice.forEach(die => {
            if (die.classList.contains('selected')) {
                die.classList.remove('selected');
            }
        });
    }

    addWord = () => {
        const { wordList, word } = this.state;
        if (word.length > 2)
            this.addToWordList(word);
        else
            alert('please select 3 letters atleast')
    };
    clearSelection = () => {

        this.setState({
            word: []
        }, () => {
            const dice = document.querySelectorAll('.die');
            dice.forEach(die => {
                if (die.classList.contains('selected')) {
                    die.classList.remove('selected');
                }
            });
        })
    }

    wordIsWrong = () => {
        //this.wordlistDOM.lastChild.classList.add('notaWord');
    }
    wordIsRight = (wordLength) => {
        return this.addPoints(wordLength);
    }

    // If word is in dictionary or not
    checkWord = (dataObj) => {
        const notaWord = Object.keys(dataObj.corrections).length;
        // Length of 1 means word is wrong, 'corrections' are present
        // Length of 0 means word is right, no corrections are given
        let wordLength = dataObj.original.length
        notaWord ? this.wordIsWrong() : this.wordIsRight(wordLength);
    }

    addPoints = (wordLength) => {
        const { points } = this.state;
        let new_points = points;
        const wordpoints = document.querySelectorAll('.wordpoints');
        let lastWord = wordpoints[wordpoints.length - 1];
        new_points += this.scoring[wordLength];
        this.scoreboard.innerHTML = new_points;
        lastWord.innerHTML = `+ ${this.scoring[wordLength]}`;
        //console.log(wordpoints.length - 1);
        this.setState({
            points: new_points
        });
    }

    resetPoints = () => {
        this.setState({
            points: 0
        });
        this.scoreboard.innerHTML = this.state.points;

    }
    onTimerFinished = () => {
        console.log('finished')
        this.saveScore();

    }
    saveScore = () => {
        const { points, wordList } = this.state;
        let userName = this.props.match.params.slug;
        let userNameWithSpace = userName.replace(/-/g, ' ');
        this.props.updateScore({
            points: points,
            userName: userNameWithSpace,
            wordList: wordList,
            right: 0,
            wrong: 0
        });
        this.props.history.push(`/result/${this.props.match.params.slug}`)
    }

    resetTimer = () => {
        window.resetTimer(this.timerMinutes, this.timerSeconds);
    }
    render() {
        const { word, isloading } = this.state;
        return (<section id="body-container">

            <div className="body-section" id="body-left">
                <section id="gameboard-container" className={"csize_" + this.boardSize}>
                    <section id="inner-frame" className={"size_" + this.boardSize}>
                        {this.renderLetters()}
                    </section>

                </section>
                <section>
                    <p>Current Selection: {this.renderCurrentWord()}</p>
                </section>
                <section className="btnSection">
                    <div className="btn-cont">
                        <button type="button" onClick={(e) => this.restart(e)} className="btn btn-danger" id="shakeBtn">Re-Start</button>
                    </div>
                    <div className="btn-cont">
                        {isloading ? <Loader /> :
                            <button type="button" onClick={(e) => this.addWord()} className="btn btn-primary" id="addWordBtn">Add Selected Word</button>
                        }
                    </div>
                    <div className="btn-cont">
                        <button type="button" onClick={(e) => this.clearSelection()} className="btn btn-primary" id="addWordBtn">Clear Selection</button>
                        (<Link to={"#"} onClick={this.saveScore} className="btn btn-theme-orange" title="Play video">See Result</Link>)}
                    </div>
                </section>
            </div>

            <div className="body-section" id="body-right">
                <section id="word-list-container">
                    <Timer resetTimer={this.resetTimer} minutes={this.timerMinutes} seconds={this.timerSeconds} onFinished={this.onTimerFinished} />
                    <h3 id="word-list-header">Word List</h3>
                    <ol id="word-list">

                    </ol>

                </section>
            </div>

        </section>

        );
    }
};

const mapStateToProps = (state) => ({
    scoreStatus: state.scoreStatus
});
const mapDispatchToProps = {
    ...ScoreBoardStatus.actionCreators,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps  // Selects which action creators are merged into the component's props
)(withRouter(GameBoard));