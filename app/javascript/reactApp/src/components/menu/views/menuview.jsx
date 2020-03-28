import * as React from "react";
import { withRouter, Link } from "react-router-dom";
import MenuService from '../service/menuService';
import RulesBoard from '../../static/views/rulesBoard';
class MenuView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      boardsize: 4
    }
  }
  componentDidMount() {
    this.modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    this.span = document.getElementsByClassName("close")[0];
    let _this = this;
    window.onclick = function (event) {
      if (event.target == _this.modal) {
        _this.modal.style.display = "none";
      }
    }
  }
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }
  playNow = () => {
    const { name, boardsize } = this.state;
    let _name = name.replace(/[^\w\s]/gi, '')
    if (_name.length > 3) {
      _name = _name.replace(/\s+/g, '-');
      //username = _name.replace(/-/g, ' '); to reverse
      this.props.history.push(`/play/${_name}?boardsize=${boardsize}`);
    }else{
      alert("please enter full name")
    }
  }
  modalPopUp = () => {
    this.modal.style.display = "block";
  }
  onclosePopUp = () => {
    this.modal.style.display = "none";
  }
  render() {

    return (<section >
      <div className="container ">
        <div className="gameHeading"><h1 className="text-uppercase text-dark font-weight-bold">
          Boggle Game</h1>
        </div>

        <div className="menu text-uppercase text-white font-weight-bold">
          <h3 className="menu-item" onClick={this.modalPopUp}>New Game</h3>
          <h3 className="menu-item">Settings</h3>
        </div>
        <RulesBoard />


        <div id="myModal" className="modal">


          <div className="modal-content">
            <span onClick={this.onclosePopUp} className="close float-right">×</span>
            <div className="form-group">
              <label >Name</label>
              <input type="text" name="name" className="form-control"

                onChange={this.changeHandler}
                placeholder="your name" />
            </div>
            <div className="form-group">
              <label >Board Size</label>
              <select name="boardsize" className="form-control"
                onChange={(e) => this.changeHandler(e)}
              >
                <option value="4" defaultValue>4*4</option>
                <option value="5" >5*5</option>
                <option value="6">6*6</option>
                <option value="7">7*7</option>

              </select>
            </div>
            <button type="button" onClick={this.playNow} className="btn btn-primary">PLAY NOW</button>
          </div>

        </div>
      </div>
    </section>
    );
  }
}
export default withRouter(MenuView)