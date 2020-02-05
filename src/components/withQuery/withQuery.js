import React, { Suspense } from 'react';
import useFetch from 'fetch-suspense';
import { API } from '../../utils/constants';

import 'chota/src/_util.css';
import hourglass from './hourglass.gif';

function Loading() {
  return(
    <section className="text-center" data-test="crate-fetch-loading">
      <h4>LOADING ... </h4>
      <img src={hourglass} alt="data is loading from remote..."/>
    </section>
  )
}

function executeQuery(Component) {
  return function (props) {
    const response = useFetch(API, {
      method: 'POST',
      body: JSON.stringify({stmt: props.query})
    });
    
    return(
      <Component data={response} {...props} />
    )
  }
}


export function withQuery(Component) {
  const QueryComponent = executeQuery(Component);

  return function (props) {
    return(
      <Suspense fallback={<Loading/>}>
        <QueryComponent {...props}/>
      </Suspense>
    )
  }
}

export default withQuery;
