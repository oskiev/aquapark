import React from 'react';
import { DragSource, DragPreviewImage } from 'react-dnd';
import ItemTypes from '../ItemTypes';

const productSource = {
    beginDrag(props, monitor, component) {
        const item = {...props.item};
        const newItem = {
            id: item.id,
            item: item,
            left: 0,
            top: 0,
        }
        return newItem;
    },
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
    }
}

const ProductImage = DragSource(ItemTypes.PRODUCT,productSource,collect)(
    props=>{
        const { connectDragSource, connectDragPreview, drag } = props;

        return connectDragSource(
            <div ref={drag} key={props.id} className="model-product">
                <DragPreviewImage src={props.item.product} connect={connectDragPreview} />
                <img src={props.item.product} className="model-img" alt={props.item.name} draggable="false" />
            </div>
        );
    });

export default ProductImage;
