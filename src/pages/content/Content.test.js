import React from 'react';
import {MemoryRouter, Route} from "react-router-dom";
import useFetch from 'fetch-suspense';

import { configure, render } from '@testing-library/react';
import QueryResponseBuilder from "../../tests/queryBuilder";

import { statements } from '../../utils/statements';
import Content from "./Content";


jest.mock('../../utils/statements');
jest.mock('fetch-suspense');


describe('Content', function () {
  beforeAll(() => {
    configure({ testIdAttribute: 'data-test' });

    statements.queryTableContentPaginated = jest.fn().mockReturnValue('SELECT * FROM DUMMY LIMIT 3 OFFSET 3');
    statements.queryCount = jest.fn().mockReturnValue('SELECT COUNT(*) FROM DUMMY');

    useFetch.mockImplementation(() => {
      // useFetch.mock.calls output:
      // ---------
      // [
      //   [
      //     'http://localhost:4200/_sql',
      //     {
      //       method: 'POST',
      //       body: '{"stmt":"SELECT * FROM DUMMY LIMIT 3 OFFSET 3"}'
      //     }
      //   ],
      //   [
      //     'http://localhost:4200/_sql',
      //     { method: 'POST', body: '{"stmt":"SELECT COUNT(*) FROM DUMMY"}' }
      //   ]
      // ]

      const query = (JSON.parse(([...useFetch.mock.calls].pop())[1].body)).stmt;

      if(query === statements.queryTableContentPaginated()) {
        return new QueryResponseBuilder()
          .withCols("column_name1", "column_name2")
          .withRows("test-row-1", "test-row-2")
          .withRows("test-row-5", "test-row-6")
          .withRows(["http://dummy.com/1", "http://dummy.com/1", "http://dummy.com/1"], "test-row-10")
          .withRows("test-row-1", "test-row-2")
          .withRows("test-row-5", "test-row-6")
          .withRows("test-row-1", "test-row-2")
          .withRows("test-row-5", "test-row-6")
          .build();
      }

      return new QueryResponseBuilder()
        .withCols("dummy")
        .withRows(7)
    })

  });

  afterAll(()=>{
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.unmock('fetch-suspense');
  });

  it('lists tables data with pagination', () => {
    const {queryAllByTestId, getByTestId} = render(
      <MemoryRouter initialEntries={['/paginated/dummy']}>
        <Route path="/paginated/:tableName">
          <Content />
        </Route>
      </MemoryRouter>
    );

    expect(getByTestId('crate-paginated-table')).toBeInTheDocument();
    expect(getByTestId('crate-db-table')).toBeInTheDocument();
    expect(getByTestId('crate-db-table-name')).toBeInTheDocument();
    expect(queryAllByTestId('crate-db-row-link').length).toEqual(3);
    expect(getByTestId('crate-pagination')).toBeInTheDocument();
    expect(queryAllByTestId('crate-pagination-link').length).toEqual(3);
  });
});
