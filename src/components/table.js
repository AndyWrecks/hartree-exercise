import React from 'react';
import {Table,} from "@grafana/ui";
import {FieldType, getDisplayProcessor, toDataFrame} from "@grafana/data";
export default class TableComponent extends React.Component {

    state = {
        data: toDataFrame({
            name: 'field1',
            fields: [
                {name: 'test1', type:FieldType.string, values: ['test1', 'test2'], display: getDisplayProcessor()}
            ]
        })
    };



    // componentDidMount() {
    //     axios.get(`https://dummyjson.com/products`)
    //       .then(res => {
    //         const apiData = res.data;
    //         const products = apiData.products;
    //         const fieldLength = 0
    //
    //
    //           console.log({res})
    //
    //         this.setState({ data: products });
    //       })
    // }


    render() {
        return (
            <Table data={this.state.data} width={100} height={100} columnMinWidth={0}>
            </Table>
        )
    }
}
