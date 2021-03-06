import React from 'react';
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Col
} from 'reactstrap';


const productBlocks = {
    width: '200px',
    height: '250px',
    border: '1px solid gray',
    margin: '20px',
    padding: '0px',
    // paddingTop: '20px',
    display: 'inline-block',
    verticalAlign: 'top'
}

const productsDiv = {
    // maxWidth: '1200px'
}

// let api = '/api/store/products/9'


class Products extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = {
            products: [],
            page: this.props.page,
            count: 0
        };
        
        this.state.perPage = 9;
        this.state.pageLinks = [];
        this.state.done = false;
        this.handleClick = this.handleClick.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }
    getProducts(){
        console.log('page', this.state.page)
        fetch(`/api/store/products/${this.state.perPage}/${this.state.page}`)
        .then(response => {
            return response.json();
        }).then(response => {
            // console.log(data.data)
            let products = response.data.products.map((product, id) => {
                // console.log(products)
                return (
                    <Col xs={12} md={4} key={id}>
                    <Link to={"/store/product/" + encodeURIComponent(product.name)} key={id}>
                        <div key={product._id} className="grid-container">
                            <div className="productImage" style={{backgroundImage: `url('/images/products/${product._id}/${product.primaryImage}')`}}>
                                <h6 className="productTitle">{product.name}</h6>
                                <span className="productPrice">${product.price}</span>
                            </div>
                        </div>

                    </Link>
                    </Col>
                )
            })
            let pageCount = Math.ceil(parseInt(response.data.count) / this.state.perPage)
            let pageLinks = []
            for(let x = 1; x < pageCount + 1; x++){
                pageLinks.push((<PaginationItem key={x}>
                    <PaginationLink href={`/gallery/${x}`}>
                        {x}
                    </PaginationLink>
                </PaginationItem>))
            }
            console.log(pageCount);
            console.log(this.state)
            this.setState({products, count: response.data.count, pageLinks, done: true});
            })
    }
    
    
    componentDidMount() {
        // console.log(this.state)
        this.getProducts();
    }

    handleClick() {
        this.setState(prevState => ({
            page: prevState.page++
        }));
    }



    render() {
        if(this.state.done){
            return(
                <div>
                <Row>
                    

                    
                    {this.state.products}
                    <div className="paginationSet">
                    <Pagination>
                        {this.state.pageLinks}
                    </Pagination>
                    
                </div>
                </Row>
                </div>
            )
        } else {
            return(
                <div className="loadDisplay">
                    <h3>Loading...</h3>
                </div>
            )
        }
        
    }
}

export default Products;