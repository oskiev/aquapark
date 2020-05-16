import React from 'react';
import { DragSource, DragPreviewImage } from 'react-dnd';
import ItemTypes from '../ItemTypes';

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
        position: 'absolute',
        transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}

const productSource = {
    beginDrag(props, monitor, component) {
        const item = {...props.item};
        return item;
    },
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

const DraggableProduct = DragSource(ItemTypes.PRODUCTDRAG,productSource,collect)(
    props=>{
        const { isDragging, connectDragSource, connectDragPreview, drag, item, left, top } = props;

        return connectDragSource(
            <div style={getStyles(left, top, isDragging)} ref={drag}>
             {
                 <div key={item.id} className="model-product">
                     <DragPreviewImage src={item.product} connect={connectDragPreview} />
                     <img src={item.product} className="model-img" alt={item.name} draggable="false" />
                 </div>
             }
            </div>
        );
    });

export default DraggableProduct;
