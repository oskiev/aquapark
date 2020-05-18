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
    endDrag(props, monitor, component) {
        const didDrop = monitor.didDrop()
        const dragId = props.item.id
        if (!didDrop) {
            props.removeDragProduct(dragId)
        }
    }
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
        const { isDragging, connectDragSource, connectDragPreview, item } = props;

        return connectDragSource(
            <div style={getStyles(item.left, item.top, isDragging)}>
                 <div key={item.id} className="model-product">
                     <DragPreviewImage src={item.item.product} connect={connectDragPreview} />
                     <img src={item.item.product} className="model-img" alt={item.item.name} draggable="false" />
                 </div>
            </div>
        );
    });

export default DraggableProduct;
