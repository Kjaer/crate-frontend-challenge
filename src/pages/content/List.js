import React from 'react';
import withQuery  from '../../components/withQuery/withQuery';

import './List.css';

function List({data, tableName}) {
  return(
    <section data-test="crate-db-table">
      <h3 className="table-name" data-test="crate-db-table-name">{tableName} </h3>
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
                        return (
                          <td key={idx2}>
                            {row.map((link, idx3) => <a key={idx3} href={link} className="data-link" target="_blank" rel="noopener noreferrer" data-test="crate-db-row-link">{link}</a>)}
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
