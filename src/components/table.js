import React from 'react';
import axios from 'axios';
import {Table,} from "@grafana/ui";
import {toDataFrame, FieldType, fiel} from "@grafana/data";

export default class TableComponent extends React.Component {

    state = {
        data: buildData([
            {
                "people_count": { "enter": 0, "leave": 0},
                "timestamp": "2020-05-01 00:10:56.5600010"
            },
            {
                "people_count": { "enter": 2, "leave": 0},
                "timestamp": "2020-05-01 00:12:56.5600010"
            },
            {
                "people_count": { "enter": 5, "leave": 2},
                "timestamp": "2020-05-01 01:10:56.5600010"
            }
        ])
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
        console.log(this.state.data)
        return (
            <Table data={this.state.data} width={100} height={100}>
            </Table>
        )
    }
}
