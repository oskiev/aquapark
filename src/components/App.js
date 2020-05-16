import React, { Component, useState } from 'react';
import './App.css';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import ModelList from './models/ModelList';
import Canvas from './layouts/Canvas';
import Backend from 'react-dnd-html5-backend';
import { DndProvider  } from 'react-dnd';
import _ from 'lodash';
import update from 'immutability-helper';


class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          sidebarIcons: false,
          showProductLayer: false,
          sidebarSubProducts: true,
          sidebarSubCollections: false,
          sidebarProductActive: '',
          components: [],
          dragProducts: [],
          productCat: '',
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
      const { components } = this.state;

      const newObj = { item: component, left: x, top: y };
      const newComponentsList = _.concat([], components, newObj);
      this.setState({
          components: newComponentsList
      });
  }

  moveProduct(id, component, x, y) {
      const { components, dragProducts } = this.state;
      var s = new Set();

      components.map( (data, index) => {
          if(data.item.id === id) {
              const newObj = { item: component, left: x, top: y };
              s.add(newObj);
          } else {
              const o = { item: data.item, left: data.left, top: data.top };
              s.add(o);

          }
      })
      var a = Array.from(s);
      this.setState({
          components: a
      });

  }

  render() {
    const sidebarClass = this.state.sidebarIcons ? 'content toggleIcons' : 'content';
    const showProduct = this.state.showProductLayer ? 'model-container show' : 'model-container hidden';
    const sidebarSubProducts = this.state.sidebarSubProducts ? 'sidebar-menu-sub show' : 'sidebar-menu-sub';
    const sidebarSubCollections = this.state.sidebarSubCollections ? 'sidebar-menu-sub show' : 'sidebar-menu-sub';
    const { components, productCat, sidebarProductActive } = this.state;

    return (
      <div className="app">
        <Header onClick={this.toggleSidebarIcons} />
        <DndProvider backend={Backend}>
            <div className={sidebarClass} >
                <div className="sidebar-wrap">
                    <Sidebar subProducts={sidebarSubProducts} subCollections={sidebarSubCollections} productActive={sidebarProductActive} open={this.toggleSubLayer} update={this.toggleProductLayer} />
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
