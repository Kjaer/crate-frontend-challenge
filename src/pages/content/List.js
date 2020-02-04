import React from 'react';
import withQuery  from '../../components/withQuery/withQuery';

import './List.css';

function List({data, tableName}) {
  return(
    <section>
      <h3 className="table-name">{tableName} </h3>
      <div className="table-container">
        <table className="striped">
          <thead>
            <tr>
              {
                data.cols.map((columnName, idx) => (
                  <td key={idx}>
                    <strong>{columnName}</strong>
                  </td>
                  )
                )
              }
            </tr>
          </thead>
          <tbody>
          {
            data.rows.map((rowData, idx) => (
                <tr key={idx}>
                  {
                    rowData.map((row, idx2) => {
                      if(Array.isArray(row)) {
                        const list = row.join('\n');
                        return (
                          <td key={idx2}>
                            <a href={list} target="_blank" rel="noopener noreferrer">{list}</a>
                          </td>
                        )
                      }

                      return <td key={idx2}>{row}</td>
                    })
                  }
                </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
    </section>
  )
}


const QueryWrapped = withQuery(List);

export default QueryWrapped;
