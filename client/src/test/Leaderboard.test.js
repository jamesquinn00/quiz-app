/**
 * @jest-environment jsdom
 */

import { default as Leaderboard } from '../pages/Leaderboard';
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import axios from 'axios';
jest.mock('axios');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Leaderboard', ()=> {
    test('loads leaderboard', async ()=>{
        const entries = [
            {
                _id: "61e7072705ae19b7d1181f81",
                name: "hello",
                easy: 10
            },
            {
                _id: "61e73d8405ae19b7d1378c46",
                name: "Test1",
                easy: 20
            }
            ]
        await axios.get.mockResolvedValue({ data: { entries } } );
        render(<Leaderboard />);
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/users/));
    })

    test('fails to load', async ()=>{
        await axios.get.mockRejectedValue({ err: {message: 'fail' }} );
        render(<Leaderboard />);
        const h2 = screen.getAllByRole('heading')[0];
        expect(h2.textContent).toBe('LEADERBOARD'); //cannot check 
    })

    test('choose difficulty', async ()=>{
        const entries = [
            {
                _id: "61e7072705ae19b7d1181f81",
                name: "hello",
                easy: 10
            },
            {
                _id: "61e73d8405ae19b7d1378c46",
                name: "Test1",
                easy: 20
            }
            ]
        await axios.get.mockResolvedValue({ data: { entries } } );
        render(<Leaderboard />)
        const select = screen.getByRole('leaderboard-difficulty');
        await userEvent.selectOptions(select, 'Easy')
        expect(select.value).toEqual('easy')
        const scorelist = screen.getByRole('scorelist')
        // expect(scorelist.childElementCount).toEqual(2) //problem
    })
});