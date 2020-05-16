import React, { Component } from 'react';
import ProductImage from './ProductImage';
class Product extends Component {

    render() {
        return (
            <div className="model">
                <ProductImage item={this.props.item} />
                <div><span>{this.props.item.name}</span></div>
            </div>
        );
    }
}

export default Product;
