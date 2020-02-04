import React from 'react';
import { Link } from 'react-router-dom';

import withQuery  from '../../components/withQuery/withQuery';

function Tables({data}) {
  return(
    <section>
      <h1> Tables</h1>

      <h4> Full list </h4>
      <p> List below will fetch all data for the selected table.</p>
      <ul>
        {
          data.rows.map((row, idx) => (
              <li key={idx}>
                <Link
                  to={`/full/${row}`}
                  data-test="table-name-link"
                >
                  {row}
                </Link>
              </li>
            )
          )
        }
      </ul>

      <hr />
      <h4> Paginated list </h4>
      <p> List below will fetch partially data for the selected table.</p>
      <ul>
        {
          data.rows.map((row, idx) => (
              <li key={idx}>
                <Link
                  to={`/paginated/${row}`}
                  data-test="table-name-link"
                >
                  {row}
                </Link>
              </li>
            )
          )
        }
      </ul>
    </section>
  )
}

const QueryWrapped = withQuery(Tables);

export default QueryWrapped;


