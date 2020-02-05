import React from 'react';
import useFetch from 'fetch-suspense';

import { configure, render } from '@testing-library/react';
import QueryResponseBuilder from "../../tests/queryBuilder";

import { statements } from '../../utils/statements';
import List from "./List";


jest.mock('../../utils/statements');
jest.mock('fetch-suspense');


describe('List', function () {
  beforeAll(() => {
    configure({ testIdAttribute: 'data-test' });

    statements.queryTableContent = jest.fn().mockReturnValue('SELECT * FROM DUMMY');

    useFetch.mockImplementation(() => {
      return new QueryResponseBuilder()
        .withCols("column_name1", "column_name2", "column_name3", "column_name4", "column_name5")
        .withRows("test-row-1", "test-row-2", "test-row-3", "test-row-4", "test-row-5")
        .withRows("test-row-5", "test-row-6", "test-row-7", "test-row-8", "test-row-9")
        .withRows(["http://dummy.com/1", "http://dummy.com/1", "http://dummy.com/1"], "test-row-10", "test-row-11", "test-row-12", "test-row-13")
        .build();
    });

  });

  afterAll(()=>{
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.unmock('fetch-suspense');
  });

  it('Show all the table data', function() {
    const {queryAllByTestId, getByTestId} = render(<List query={statements.queryTableContent}/>);

    expect(getByTestId('crate-db-table')).toBeInTheDocument();
    expect(getByTestId('crate-db-table-name')).toBeInTheDocument();
    expect(queryAllByTestId('crate-db-row-link').length).toEqual(3);
  });

});
