/**
 * @jest-environment jsdom
 */

import { default as ResultsPage } from '../pages/ResultsPage';
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import Context from "../utils/Context"

import axios from 'axios';
jest.mock('axios');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Results Page', ()=> {
    test('renders results', ()=>{
        renderWithProviders(<ResultsPage />)

    });
    
    test('gives error when no results', async ()=>{
        
        const originalWarn = global.console.warn
        let consoleOutput = []
        const mockedWarn = output => consoleOutput.push(output)
        global.console.warn = jest.fn().mockImplementation(mockedWarn)

        const result = await axios.post.mockRejectedValue({ err: {message: 'fail' }} );
        renderWithProviders(<ResultsPage />)
        // console.warn(result)
        // global.console = {warn: jest.fn()}
        // const warn = jest.spyOn(global.console, 'warn')
        //const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(()=>{})
        // expect(consoleOutput).toEqual({ err: {message: 'fail' }})
        console.warn = originalWarn
    });

    test('no trivia data', ()=>{
        const mock = {triviaData: null}
        render(
            <Context.Provider value={mock}>
                <ResultsPage />
            </Context.Provider>
        )
        expect(window.location.href).toEqual('http://localhost/')
    });

});