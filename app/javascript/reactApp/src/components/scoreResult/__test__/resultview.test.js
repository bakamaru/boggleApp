import React from 'react';
import ReactDom from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import { render } from '@testing-library/react'
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ResultView from '../views/resultView';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory, createLocation } from 'history';
const mockStore = configureStore([]);
configure({ adapter: new Adapter() });
describe('Result View Board', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            scoreStatus: {status:{
                points: 0,
                userName: "",
                wordList: "",
                right: 0,
                wrong: 0
            }}
        });

    });
    it('Should renders without crashing', () => {
        component = renderer.create(
            <Provider store={store}>
                <MemoryRouter >
                    <ResultView />
                </MemoryRouter>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

})