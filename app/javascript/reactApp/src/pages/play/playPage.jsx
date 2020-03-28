import * as React from 'react';
import UserEntryView from '../../components/userEntry/views/userEntryView';
import GameBoard from '../../components/gameBoard/views/gameBoardView';
import RuleBoard from '../../components/static/views/rulesBoard';
class PlayPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount = () => {	}

	render() {
		const { } = this.state;

		return (<main id="container">
			<section>
				<header id="head">				
					<div className="head-item" id="title">Boggle Game</div>
					<div className="head-item" id="points-cont">Points: <span id="points">0</span></div>
				</header>
				<GameBoard />
			</section></main>
		);
	}
}


export default PlayPage;
