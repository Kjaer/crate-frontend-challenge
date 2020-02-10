export default class QueryResponseBuilder {
  constructor() {
    Object.assign(this, new QueryResponseBuilder.queryResponse());
  }

  withCols(...cols){
    this.cols = Array.from(cols);
    return this;
  }

  withRows(...rows){
    if(rows.length < this.cols.length) {
      throw new Error("missing row data")
    }
    this.rows.push(rows);
    return this;
  }

  build(){
    this.rowcount = this.rows.length;
    this.duration = Math.random() * 10;
    return this;
  }

  static get queryResponse() {
    class QueryResponse {
      constructor() {
        this.cols = [];
        this.rows = [];
        this.rowcount = 0;
        this.duration = 0;
      }
    }

    return QueryResponse;
  }
}
