/**
 * @jest-environment jsdom
 */
import axios from 'axios';
jest.mock('axios');
 
import { default as QuestionsPage } from '../pages/Questions';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestWatcher } from '@jest/core';
import Context from "../utils/Context"
import {useState} from 'react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Questions', ()=> {
    // beforeEach(() => jest.useFakeTimers());

    test('returns a div', ()=>{
        renderWithProviders(<QuestionsPage />);
        const container = screen.getByRole('question-container');
        expect(container.nodeName).toEqual('DIV');
    });

    // test('checks if useEffect is called when question changes', ()=>{
    //     jest.useFakeTimers();
    //     renderWithProviders(<QuestionsPage />);
    //     //expect(setTimeout).toHaveBeenCalledWith(expect.anything(), 10000)
    // });

    test('color changes when answer is clicked', ()=>{
        // jest.useFakeTimers('modern')
        renderWithProviders(<QuestionsPage />)
        const incorrect = screen.getByText('Foreigner');
        const correct = screen.getByText('Toto')
        userEvent.click(incorrect);
        // jest.advanceTimersByTime(500)
        userEvent.unhover(incorrect)
        expect(correct.className).toContain('questionButtons');
        // expect(incorrect.className).toContain('red');
    });

    test('no trivia data', ()=>{
        const mock = {triviaData: null}
        render(
            <Context.Provider value={mock}>
                <QuestionsPage />
            </Context.Provider>
        )
        expect(window.location.href).toEqual('http://localhost/')
    })

    test('time run out', ()=>{
        jest.useFakeTimers('modern');
        renderWithProviders(<QuestionsPage />);
        jest.advanceTimersByTime(11000);
    })
});