import React, { Component } from 'react';
import { Pager } from 'react-bootstrap'
import Products from '../components/Products'
import Categories from '../components/Categories'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


const navContainer = {
    width: '25%',
    marginTop: '40px',
    listStyleType: 'none',
    lineHeight: '60px',
    height: '150vh',
    float: 'left',
    borderRight: 'solid gray 1px'
}

const ulContainer = {
    listStyleType: 'none',
    paddingRight: '30px'
}



class Gallery extends Component {

    render() {
        return (
        <div style={{width: '100%'}}>
                <div>
                </div>
                <div style={navContainer} className="hideMobile">
                    <Categories />
                </div>
                <Container fluid>
                        <Products />
                </Container>
                <div>
                <Pager>
                    <Pager.Item href="#">Previous</Pager.Item>{' '}
                    <Pager.Item href="#">Next</Pager.Item>
                </Pager>
                </div>
        </div>
        )
    }
}

export default Gallery;