import React, { Component, useRef } from 'react';
import './App.css';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import ModelList from './models/ModelList';
import Canvas from './layouts/Canvas';
import Backend from 'react-dnd-html5-backend';
import { DndProvider  } from 'react-dnd';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          sidebarIcons: false,
          showProductLayer: true,
          sidebarSubProducts: true,
          sidebarSubCollections: false,
          sidebarProductActive: '',
          components: [],
          productCat: '',
          newID: 0,
      }
      this.toggleSidebarIcons = this.toggleSidebarIcons.bind(this);
      this.toggleProductLayer = this.toggleProductLayer.bind(this);
      this.toggleSubLayer = this.toggleSubLayer.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.moveProduct = this.moveProduct.bind(this);
  }

  toggleSidebarIcons() {
      this.setState(state => ({
          sidebarIcons: !state.sidebarIcons
      }));
  }
  toggleProductLayer(category, catName) {
      this.setState((state) => ({
          productCat: category,
          showProductLayer: ( (state.productCat !== category ) ? true : !state.showProductLayer ),
          sidebarProductActive: catName
      }));
  }
  toggleSubLayer(x) {
      if(x === 'products'){
          this.setState((state) => ({
              sidebarSubProducts: !state.sidebarSubProducts,
              showProductLayer: ( (!state.sidebarSubProducts) ? false : false )
          }));
      } else {
          this.setState((state) => ({
              sidebarSubCollections: !state.sidebarSubCollections
          }));
      }
  }
  onDrop(component, x, y) {
      const { components, newID } = this.state;
      const id = component.id;

      const newObj = {id: newID, item: component, left: x, top: y};
      const newComponentsList = _.concat([], components, newObj);

      this.setState((state) => ({
         newID: state.newID + 1,
         components: newComponentsList
      }));
  }
  moveProduct(id, item, x, y) {
      const { components } = this.state;
      const s = new Set();

      components.forEach(function(data, index){
          if(index === id) {
              const n = { id: data.id, item: data.item, left: x, top: y };
              s.add(n);
          } else {
              const o = { id: data.id, item: data.item, left: data.left, top: data.top };
              s.add(o);
          }
      });
      var a = Array.from(s);
      this.setState({
          components: a
      });

  }

  render() {
    const sidebarClass = this.state.sidebarIcons ? 'content toggleIcons' : 'content';
    const showProduct = this.state.showProductLayer ? 'model-container show' : 'model-container hidden';
    const showSidebarSubProducts = this.state.sidebarSubProducts ? 'sidebar-menu-sub show' : 'sidebar-menu-sub';
    const sidebarSubCollections = this.state.sidebarSubCollections ? 'sidebar-menu-sub show' : 'sidebar-menu-sub';
    const { components, productCat, sidebarProductActive } = this.state;

    return (
      <div className="app">
        <Header onClick={this.toggleSidebarIcons} />
        <DndProvider backend={Backend}>
            <div className={sidebarClass} >
                <div className="sidebar-wrap">
                    <Sidebar subProducts={showSidebarSubProducts} subCollections={sidebarSubCollections} productActive={sidebarProductActive} open={this.toggleSubLayer} update={this.toggleProductLayer} menuIcon={this.state.sidebarSubProducts} />
                    <div className={showProduct}>
                        <ModelList productCat={productCat} />
                    </div>
                </div>
                <div className="canvas">
                    <Canvas onDrop={this.onDrop} moveProduct={this.moveProduct} components={components} />
                </div>
            </div>
        </DndProvider>
      </div>
    );
  }
}


export default App;
