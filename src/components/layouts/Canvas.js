import React, { Component, useState  } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import ReactDOM from 'react-dom'
import DraggableProduct from '../models/DraggableProduct';

const productTarget = {
    drop(props, monitor, component) {
         const item = monitor.getItem();
         let type = monitor.getItemType();

         if( type === 'product' ){
             const delta = monitor.getInitialSourceClientOffset();
             const alpha =  monitor.getSourceClientOffset();
             const pos = getCorrectDroppedOffsetValue(component, delta, alpha);
             props.onDrop(item, pos.x, pos.y);
        }

        if( type === 'draggableProduct' ){

            component.props.components.map( (data) => {
                const delta1 = monitor.getDifferenceFromInitialOffset()
                const l = Math.round(data.left + delta1.x)
                const t = Math.round(data.top + delta1.y)

                if(data.item.id == item.id){
                    props.moveProduct(item.id, item, l, t);
                }
            })
        }

         return item;
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

class Canvas extends Component {

    render() {
        const { connectDropTarget, components, drop } = this.props;

        return (
            connectDropTarget(
                <div className="target">
                    {
                        components.map( (data, index) => {
                            return (
                                <DraggableProduct key={index} item={data.item} left={data.left} top={data.top} components={components} />
                            )
                        })
                    }
                </div>
            )
        );
    }
}

const getCorrectDroppedOffsetValue = (component, initialPosition, finalPosition) => {

    const dropTargetPosition = ReactDOM.findDOMNode(component).getBoundingClientRect();

    const { y: finalY, x: finalX } = finalPosition;
    const { y: initialY, x: initialX } = initialPosition;

    const newYposition =
      finalY > initialY
        ? initialY + (finalY - initialY) - dropTargetPosition.top
        : initialY - (initialY - finalY) - dropTargetPosition.top;

    const newXposition =
      finalX > initialX
        ? initialX + (finalX - initialX) - dropTargetPosition.left
        : initialX - (initialX - finalX) - dropTargetPosition.left;

    return {
      x: newXposition,
      y: newYposition,
    };
  };

export default DropTarget([ItemTypes.PRODUCT, ItemTypes.PRODUCTDRAG], productTarget, collect)(Canvas);
