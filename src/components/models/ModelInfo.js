import React, { Component } from 'react';
import path1 from '../../assets/product1/product1-img1.jpg';
import path2 from '../../assets/product1/product1-img2.jpg';
import path3 from '../../assets/product1/product1-img3.jpg';
import path4 from '../../assets/product1/product1-img4.jpg';

const productInfoData = {
    product1: {
        id: 0,
        title: 'Mt.Rainier',
        text: 'A towering 12’6” (3,80m) in height, 4 climbing options, 1 large slide, and 4 jumping areas Mt. Rainier provides a full days worth of enjoyment and challenges to customers of all skill levels. Ranging from our easy climb steps to our climbing tree Mt. Rainier will test strength, balance, and courage.',
        gallery: [ path1, path2, path3, path4 ],
    },
    product2: {
        id: 1,
        title: 'Mt.Hood',
        text: 'The middle ground in our tower series, Mt. Hood offers a unique integrated ladder for easy climbing, a 10’ (3,05m) jumping cliff, an exciting high speed slide and a vertical wall climb.',
        gallery: [ path2, path1, path3, path4 ],
    },
    product3: {
        id: 2,
        title: 'Mt.Baker',
        text: 'The smallest in our tower lineup, Mt. Baker has everything a park owner wants in a smaller form factor. The cliff jump and slide are easily accessed by our integrated ladder system so guests can jump and slide all day.',
        gallery: [ path3, path2, path1, path4 ],
    }
}

class ModelList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setProductInfoData: productInfoData.product1,
        }
    }

    componentDidUpdate(prevProps) {
        const i = this.props.productInfo;

        if( i !== prevProps.productInfo ){
            switch(i){
                case 'Mt.Rainier':
                this.setState({
                    setProductInfoData: productInfoData.product1
                })
                break;
                case 'Mt.Hood':
                this.setState({
                    setProductInfoData: productInfoData.product2
                })
                break;
                case 'Mt.Baker':
                this.setState({
                    setProductInfoData: productInfoData.product3
                })
                break;
                default:
                break;
            }
        }
    }

    render() {
        const { setProductInfoData } = this.state;

        return (
            <div className="model-info">
                <div className="model-info-close" onClick={() => this.props.openProduct('', 'force')}><i className="fas fa-times"></i></div>
                <div className="model-info-gallery"><img src={setProductInfoData.gallery[0]} alt={setProductInfoData.title}/></div>
                <div className="model-info-galleryThumb">
                    {
                        setProductInfoData.gallery.map( (data, index) => {
                            return (
                                <img key={index} src={data} alt={setProductInfoData.title} />
                            )
                        })
                    }
                </div>
                <div className="model-info-text">
                    <span className="title">{setProductInfoData.title}</span>
                    <p>{setProductInfoData.text}</p>
                </div>
            </div>
        );
    }
}

export default ModelList;
