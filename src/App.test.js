import React from 'react';
import { MemoryRouter } from "react-router-dom";
import useFetch from 'fetch-suspense';

import { configure, render } from '@testing-library/react';
import QueryResponseBuilder from "./tests/queryBuilder";

import { statements } from './utils/statements';
import App from './App';

jest.mock('./utils/statements');
jest.mock('fetch-suspense');

describe('App', function () {

  beforeAll(()=>{
    configure({ testIdAttribute: 'data-test' });

    statements.QUERY_TABLENAMES = jest.fn().mockReturnValue('SELECT * FROM DUMMY')();

    useFetch.mockImplementation(() => {
      return new QueryResponseBuilder()
        .withCols("table_name")
        .withRows("test-table-1")
        .withRows("test-table-2")
        .withRows("test-table-3")
        .withRows("test-table-4")
        .build();
    });
  });

  afterAll(()=>{
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.unmock('fetch-suspense');
  });

  it('Lists all the tables fetched from database', () => {

    const { queryAllByTestId, getByTestId }  = render(<App />, { wrapper: MemoryRouter });

    expect(getByTestId('crate-challenge-app')).toBeInTheDocument();
    expect(getByTestId('crate-header')).toBeInTheDocument();
    expect(getByTestId('crate-logo-link')).toBeInTheDocument();
    expect(getByTestId('crate-tables')).toBeInTheDocument();
    expect(queryAllByTestId('crate-full-table-list').length).toEqual(4);
    expect(queryAllByTestId('crate-paginated-table-list').length).toEqual(4);
  })

});
