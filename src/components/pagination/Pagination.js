import React, { useState } from 'react';
import withQuery  from '../../components/withQuery/withQuery';
import { DATA_LIMIT } from '../../utils/constants';

import 'chota/src/_tab.css';


function Pagination({data, pageHandler}) {
  const [selectedPage, setSelected] = useState(0);
  const count = data.rows[0][0];

  if (!count) {
    return null;
  }

  const total = Math.ceil(count/DATA_LIMIT);

  function changePage(pageNumber) {
    pageHandler(pageNumber);
    setSelected(pageNumber);
  }

  return(
    <nav className='tabs'>
      {[...Array(total).keys()].map((pageNumber) => (
          <a
            key={pageNumber}
            href="#!"
            onClick={e => changePage(pageNumber)}
            className={(pageNumber === selectedPage ?  'active': '')}
          >
            {pageNumber + 1}
          </a>
        )
      )}
    </nav>
  )
}

const QueryWrapped = withQuery(Pagination);

export default QueryWrapped;
