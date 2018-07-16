import React from 'react';
import { Link } from 'react-router-dom';

const productBlocks = {
    width: '20%',
    height: '250px',
    border: '1px solid gray',
    margin: '25px',
    padding: '10px',
    display: 'inline-block'
}

let api = '/api/store/products/12'


class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }

    componentDidMount() {

        fetch(api)
        .then(response => {
            return response.json();
        }).then(data => {
            // console.log(data.data)
            let products = data.data.map((product, id) => {
                // console.log(products)
                return (
                    <Link to={"/store/product/" + encodeURIComponent(product.name)} key={id}>
                    <div key={product._id} style={productBlocks}>
                        <h4>{product.name}</h4>
                        <p>{product.price}</p>
                    </div>
                    </Link>
                )
            })
            this.setState({products});
            })
    }
    render() {
        return(
            <div>
                {this.state.products}
            </div>
        )
    }
}

export default Products;