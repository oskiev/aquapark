import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = [
    { id: 1, name: 'Climbing/Sliding', data: 'items1' },
    { id: 2, name: 'Running/Walking', data: 'items2' },
    { id: 3, name: 'Balance', data: 'items3' },
    { id: 4, name: 'Agility/Jumping', data: 'items4' },
    { id: 5, name: 'Leisure', data: 'items2' },
    { id: 6, name: 'Essentials', data: 'items1' },
    { id: 7, name: 'Accessesories', data: 'items2' },
]

//onClick={this.props.onBuild}
class Sidebar extends Component {
    render() {

        return (
            <div className='sidebar'>
                <div className='sidebar-menu'>
                    <Link to="/new-aquapark" className="sidebar-menu-wrap first" onClick={this.props.onBuild}><i className="fas fa-file-alt"></i> <span className="sidebar-menu-name">New Build</span></Link>
                    <a className="sidebar-menu-wrap"><i className="fas fa-folder-open"></i> <span className="sidebar-menu-name">Open</span></a>
                </div>
                {
                    (() => {
                        if(this.props.build && !this.props.home){
                            return (
                                <div className="sidebar-menu">
                                    <span className="sidebar-menu-wrap"><i className="fas fa-save"></i> <span className="sidebar-menu-name">Save</span></span>
                                    <span className="sidebar-menu-wrap"><i className="fas fa-save"></i> <span className="sidebar-menu-name">Save as</span></span>
                                    <span className="sidebar-menu-wrap"><i className="fas fa-share"></i> <span className="sidebar-menu-name">Share</span></span>
                                </div>
                            )
                        }
                    })()
                }
                <div className="sidebar-menu">
                    <div className="sidebar-menu-heading">
                        <span className="sidebar-menu-name" onClick={() => this.props.open('products')}>Products</span>
                        <div className="sidebar-menu-toggle" onClick={() => this.props.open('products')}><i className={ (this.props.menuIcon ? 'fas fa-minus' : 'fas fa-plus') }></i></div>
                    </div>
                    <div className={this.props.subProducts }>
                        {
                            ProductCategories.map((item) => (
                                 <span key={item.id} className={ (this.props.productActive === item.name) ? 'sidebar-menu-wrap active' : 'sidebar-menu-wrap' } onClick={() => this.props.update(item.data, item.name)}><i className="fas fa-cube"></i> <span className="sidebar-menu-name">{item.name}</span></span>
                            ))
                        }

                    </div>
                </div>
                <div className="sidebar-menu">
                    <div className="sidebar-menu-heading">
                        <span className="sidebar-menu-name" onClick={() => this.props.open('collections')}>Collections</span>
                        <div className="sidebar-menu-toggle" onClick={() => this.props.open('collections')}><i className="fas fa-plus"></i></div>
                    </div>
                    <div className={this.props.subCollections }>
                        <span className="sidebar-menu-wrap"><i className="fas fa-cubes"></i> <span className="sidebar-menu-name">Cascades</span></span>
                        <span className="sidebar-menu-wrap"><i className="fas fa-cubes"></i> <span className="sidebar-menu-name">Serria</span></span>
                        <span className="sidebar-menu-wrap"><i className="fas fa-cubes"></i> <span className="sidebar-menu-name">Olympic</span></span>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <span className="sidebar-menu-wrap"><i className="fas fa-external-link-alt"></i> <span className="sidebar-menu-name">Publish to 3d</span></span>
                </div>
                <div className="sidebar-menu help">
                    <span className="sidebar-menu-wrap"><i className="far fa-question-circle"></i> <span className="sidebar-menu-name">Help</span></span>
                </div>
            </div>
        );
    }
}

export default Sidebar;
