import React from 'react';
import ReactDom from 'react-dom';
import MenuView from '../views/menuview';
import { MemoryRouter } from "react-router-dom";
import { render } from '@testing-library/react'
import { shallow,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });
describe('Menu Component', () => {
    
    // it('Should renders without crashing ', () => {

    //     const { asFragment } = render(<MemoryRouter><MenuView /></MemoryRouter>)
    //     expect(asFragment(<MenuView />)).toMatchSnapshot()

    // });
    it('Should render correctly', () => {
        const component = renderer.create(<MemoryRouter><MenuView /></MemoryRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    
})
