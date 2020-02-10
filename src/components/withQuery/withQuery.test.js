import React from 'react';

import { configure, render, wait } from '@testing-library/react';
import QueryResponseBuilder from "../../tests/queryBuilder";

import withQuery from "./withQuery";

function Dummy({data}) {
  const { rows: [ [ { name } ] ] } = data;

  return(
    <p data-test="crate-dummy">
      {name}
    </p>
  )
}

const QueryWrapper = withQuery(Dummy);

describe('withQuery', function () {

  beforeAll(() => {
    configure({testIdAttribute: 'data-test'});
  });

  afterAll(()=>{
    fetch.resetMocks()
  });


  it('pass fetched data to the wrapped component', async () => {
    const payload = new QueryResponseBuilder().withRows({name: 'dummy content'});
    fetch.mockResponseOnce(JSON.stringify(payload), {headers: {'Content-Type': 'application/json'} });

    const { getByText, container } = render(<QueryWrapper query="SELECT * FROM DUMMY"/>);
    // testing the loading
    expect(container).toMatchSnapshot();

    await wait(() => {
      expect(getByText(/dummy content/i)).toBeInTheDocument();
      // testing the wrapped component
      expect(container).toMatchSnapshot();
    });

  })
});
