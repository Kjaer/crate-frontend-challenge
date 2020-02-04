import React, { useState } from 'react';
import { useParams } from 'react-router';

import List from './List';
import Pagination from '../../components/pagination/Pagination';
import {queryCount, queryTableContentPaginated} from '../../utils/statements';
import { DATA_LIMIT, DATA_OFFSET } from '../../utils/constants';


function Content() {
  const { tableName } = useParams();
  const [dataQuery, setDataQuery] = useState(queryTableContentPaginated(tableName, DATA_LIMIT, 0));
  const dataCountQuery = queryCount(tableName);

  function pageHandler(pageNumber) {
    const nextOffset = pageNumber * DATA_OFFSET;
    setDataQuery(queryTableContentPaginated(tableName, DATA_LIMIT, nextOffset));
  }

  return(
    <div>
      <List query={dataQuery} tableName={tableName} />
      <Pagination query={dataCountQuery}  pageHandler={pageHandler} />
    </div>
  )
}

export default Content
