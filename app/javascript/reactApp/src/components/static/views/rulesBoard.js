import * as React from 'react';

export default class RulesBoard extends React.Component {
    render() {
        return (<section id="instructions-cont">
            <div id="instructions">
                <h3 className="instr-text">RULES SCORING</h3>
                <p className="instr-text">A player has three minutes to find as many words as they can in the grid, according to the following rules:</p>
                <ul className="instr-list">
                    <li>The letters must be adjoining in a 'chain'.</li>
                    <li>Words must contain at least three letters.</li>
                    <li>No letter cube may be used more than once within a single word.</li>
                    <li>Click letters in order then 'Add Word'</li>
                    <li>Your entry will be checked using an online API</li>
                    <li>The Timer will start after clicking the 'Shake' button</li>
                </ul>

                <p className="instr-text">Scoring:</p>
                <ul className="instr-list">
                    <li>Fewer than 3 Letters: 0 points</li>
                    <li>3 Letters: 1 point</li>
                    <li>4 Letters: 1 point</li>
                    <li>5 Letters: 2 points</li>
                    <li>6 Letters: 3 points</li>
                    <li>7 Letters: 4 points</li>
                    <li>8 or More Letters: 11 points</li>
                </ul>

            </div>
        </section>
        );
    }
};
