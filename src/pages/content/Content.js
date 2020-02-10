import React, { useState } from 'react';
import { useParams } from 'react-router';

import List from './List';
import Pagination from '../../components/pagination/Pagination';
import { statements } from '../../utils/statements';
import { DATA_LIMIT, DATA_OFFSET } from '../../utils/constants';


function Content() {
  const { tableName } = useParams();
  const [dataQuery, setDataQuery] = useState(statements.queryTableContentPaginated(tableName, DATA_LIMIT, 0));
  const dataCountQuery = statements.queryCount(tableName);

  function pageHandler(pageNumber) {
    const nextOffset = pageNumber * DATA_OFFSET;
    setDataQuery(statements.queryTableContentPaginated(tableName, DATA_LIMIT, nextOffset));
  }

  return(
    <div data-test="crate-paginated-table">
      <List query={dataQuery} tableName={tableName} />
      <Pagination query={dataCountQuery}  pageHandler={pageHandler} />
    </div>
  )
}

export default Content
