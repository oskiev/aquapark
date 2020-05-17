import React, { Component } from 'react';
import ProductImage from './ProductImage';
class Product extends Component {

    render() {

        return (
            <div className="model">
                <div className="model-icon" onClick={() => this.props.openProduct(this.props.item.name, '')}><i className="far fa-images"></i></div>
                <ProductImage item={this.props.item} />
                <span>{this.props.item.name}</span>
            </div>
        );
    }
}

export default Product;
