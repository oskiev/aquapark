import React, { Component  } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import ReactDOM from 'react-dom'
import DraggableProduct from '../models/DraggableProduct';

 var count = 0;
 var b = {};
 var store = new Set();
 var dragItems = {};

const productTarget = {
    drop(props, monitor, component) {
         const item = monitor.getItem();
         let type = monitor.getItemType();

         if( type === 'product' ){
             const delta = monitor.getInitialSourceClientOffset();
             const alpha =  monitor.getSourceClientOffset();
             const pos = getCorrectDroppedOffsetValue(component, delta, alpha);

             props.onDrop(item.item, pos.x, pos.y);

             // let i = item.item.id;
             // let n = item.item.name;
             // let p = item.item.product;
             //
             // b = { id: count, item: { id: i, name: n, product: p }, left: pos.x, top: pos.y };
             // store.add(b);
             // count = count + 1;
             //
             // dragItems = Array.from(store);
             //
             // props.updateComponent(dragItems);
        }

        if( type === 'draggableProduct' ){

            const x = item.left;
            const y = item.top;

            const delta1 = monitor.getDifferenceFromInitialOffset()
            const l = Math.round(x + delta1.x)
            const t = Math.round(y + delta1.y)

            const id = item.id;
            props.moveProduct(id, item, l, t);
        }

        //console.log(item);

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
        const { connectDropTarget, components } = this.props;

        return (
            connectDropTarget(
                <div className="target">
                    {
                        components.map( (data, index) => {
                            return (
                                <DraggableProduct key={index} item={data} components={components} />
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
