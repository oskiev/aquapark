import React, { Component } from 'react';
import ModelInfo from './ModelInfo';
import Product from './Product';
import product1 from '../../assets/product1-small.png';
import product2 from '../../assets/product2-small.png';
import product3 from '../../assets/product3-small.png';
import product4 from '../../assets/product4-small.png';
import product5 from '../../assets/product5-small.png';
import product6 from '../../assets/product6-small.png';

const data = {
    items1: [
        { id: 0, name: 'Mt.Rainier', product: product1},
        { id: 1, name: 'Mt.Hood', product: product2},
        { id: 2, name: 'Mt.Baker', product: product3},
        { id: 3, name: 'Mt.Hood', product: product4},
        { id: 4, name: 'Mt.Rainier', product: product5},
        { id: 5, name: 'Mt.Hood', product: product6},
    ],
    items2: [
        { id: 0, name: 'Mt.Rainer', product: product5},
        { id: 1, name: 'Mt.Hood', product: product2},
        { id: 2, name: 'Mt.Baker', product: product4},
    ],
    items3: [
        { id: 0, name: 'Mt.Rainer', product: product2},
        { id: 1, name: 'Mt.Hood', product: product6},
        { id: 2, name: 'Mt.Baker', product: product1},
        { id: 3, name: 'Mt.Baker', product: product4},
        { id: 4, name: 'Mt.Baker', product: product3},
    ],
    items4: [
        { id: 0, name: 'Mt. Rainer', product: product4},
        { id: 1, name: 'Mt. Hood', product: product1},
    ]
}

class ModelList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productList: data.items1,
            showProductInfo: false,
            productInfoName: '',
        }
        this.toggleProductInfo = this.toggleProductInfo.bind(this);
    }

    toggleProductInfo(itemName, force) {
        if( force === 'force' ){
            this.setState(state => ({
                showProductInfo: false,
            }));
        } else {
            this.setState(state => ({
                productInfoName: itemName,
                showProductInfo: ( ( state.productInfoName !== itemName ) ? true : !state.showProductInfo ),
            }));
        }
    }

    componentDidUpdate(prevProps) {
        const p = this.props.productCat;

        if( p !==  prevProps.productCat ){
            switch(p){
                case 'items1':
                this.setState({
                    productList: data.items1
                })
                break;
                case 'items2':
                this.setState({
                    productList: data.items2
                })
                break;
                case 'items3':
                this.setState({
                    productList: data.items3
                })
                break;
                case 'items4':
                this.setState({
                    productList: data.items4
                })
                break;
                default:
                break;
            }
        }
    }

    render() {
        const { productList, productInfoName } = this.state;
        const getProductInfo = this.state.showProductInfo ? 'model-info-wrap show' : 'model-info-wrap hidden';

        return (
            <div className="wrapper">
                <div className="model-wrap">
                    <div className="model-inner">
                        { productList.map((item, index) => (
                            <Product key={item.id} item={item} openProduct={this.toggleProductInfo}/>
                        ))}
                    </div>
                </div>
                <div className={getProductInfo}><ModelInfo productInfo={productInfoName} openProduct={this.toggleProductInfo}/></div>
            </div>
        );
    }
}


export default ModelList;
