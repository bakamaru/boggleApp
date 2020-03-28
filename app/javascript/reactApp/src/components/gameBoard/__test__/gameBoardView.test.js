import React from 'react';
import ReactDom from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import { render } from '@testing-library/react'
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import GameBoard from '../views/gameBoardView';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory, createLocation } from 'history';
const mockStore = configureStore([]);
configure({ adapter: new Adapter() });
const history = createMemoryHistory();
const path = `/play/username`;
const match = {
  isExact: false,
  path,
  url: path.replace(':id', '1'),
  params: { id: "1" }
};
const location = createLocation(match.url);
describe('Game Board', () => {
  let store;
  let component;


  beforeEach(() => {
    store = mockStore({
      scoreStatus: {}
    });

  });
  it('Should renders without crashing', () => {
    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter >
          <GameBoard />
        </MemoryRouter>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  // (6) Checking if function called once
  it('Should call onclick function when the button is clicked', () => {
   
    const component = mount(<Provider store={store}>
      <MemoryRouter >
        <GameBoard />
      </MemoryRouter>
    </Provider>);
    expect(component.find('button').length).toBe(3);//restart /addbutton/ clear selection
  });

})