import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import ModelList from './models/ModelList';
import Canvas from './layouts/Canvas';
import Welcome from './layouts/Welcome';
import Backend from 'react-dnd-html5-backend';
import { DndProvider  } from 'react-dnd';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
      super(props);

      const store =  window.sessionStorage.getItem("userBuild");

      this.state = {
          isLoggedIn: true,
          homepage: true,
          buildNew: store,
          sidebarIcons: false,
          showProductLayer: false,
          sidebarSubProducts: false,
          sidebarSubCollections: false,
          sidebarProductActive: '',
          components: [],
          productCat: '',
          newID: 0,
      }
      this.toggleSidebarIcons = this.toggleSidebarIcons.bind(this);
      this.toggleProductLayer = this.toggleProductLayer.bind(this);
      this.toggleSubLayer = this.toggleSubLayer.bind(this);
      this.buildNew = this.buildNew.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.moveProduct = this.moveProduct.bind(this);
      this.removeProduct = this.removeProduct.bind(this);
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
  buildNew() {
      window.sessionStorage.setItem("userBuild", true);
      const store =  window.sessionStorage.getItem("userBuild");
      this.setState((state) => ({
          homepage: false,
          buildNew: store,
          sidebarIcons: false,
          sidebarSubProducts: true,
      }));
  }
  onDrop(component, x, y) {
      const { components, newID } = this.state;
      const id = newID
      const newObj = {id: id, item: component, left: x, top: y};
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
          if(data.id === id) {
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
  removeProduct(id){
      const { components } = this.state;
      const index = id;

      if( index !== -1 ){
          const newComponentsList = _.concat(components);
          newComponentsList.splice(index, 1)

          var count = 0
          var s = new Set();

          newComponentsList.forEach(function(data, index){
              const o = {id: count, item: data.item, left: data.left, top: data.top};
              s.add(o);
              count = count + 1
          });
          var a = Array.from(s);

          this.setState((state) => ({
              newID: state.newID - 1,
              components: a
          }));
      }
  }

  render() {
    const sidebarClass = this.state.sidebarIcons ? 'content toggleIcons' : 'content';
    const showProduct = this.state.showProductLayer ? 'model-container show' : 'model-container hidden';
    const showSidebarSubProducts = this.state.sidebarSubProducts ? 'sidebar-menu-sub show' : 'sidebar-menu-sub';
    const sidebarSubCollections = this.state.sidebarSubCollections ? 'sidebar-menu-sub show' : 'sidebar-menu-sub';
    const { isLoggedIn, buildNew, components, productCat, sidebarProductActive, homepage } = this.state;

    return (
    <Router>
      <div className="app">
        <Header onClick={this.toggleSidebarIcons} />
        <DndProvider backend={Backend}>
            <div className={sidebarClass} >
                <div className="sidebar-wrap">
                    <Sidebar build={buildNew} home={homepage} onBuild={this.buildNew} subProducts={showSidebarSubProducts} subCollections={sidebarSubCollections} productActive={sidebarProductActive} open={this.toggleSubLayer} update={this.toggleProductLayer} menuIcon={this.state.sidebarSubProducts} />
                    <div className={showProduct}>
                        <ModelList productCat={productCat} />
                    </div>
                </div>
                <div className="canvas">
                    <Switch>
                        <Route exact path="/">
                            {(() => {
                                if(isLoggedIn){
                                    return <Welcome onClick={this.buildNew} />
                                }
                                else {
                                    return <div>Login page</div>
                                }
                            })()}
                        </Route>
                        <Route exact path="/new-aquapark">
                            {(() => {
                                if(isLoggedIn && buildNew) {
                                    return <Canvas onDrop={this.onDrop} moveProduct={this.moveProduct} removeProduct={this.removeProduct} components={components} />
                                } else {
                                    return <Welcome onClick={this.buildNew} />
                                }
                            })()}
                        </Route>
                    </Switch>
                </div>
            </div>
        </DndProvider>
      </div>
    </Router>
    );
  }
}

export default App;
